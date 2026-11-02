import crypto from "crypto"
import { AbstractNotificationProviderService, MedusaError } from "@medusajs/framework/utils"
import type {
  Logger,
  ProviderSendNotificationDTO,
  ProviderSendNotificationResultsDTO,
} from "@medusajs/framework/types"

type Options = {
  /** Base64 of the Google Cloud service-account JSON key (one line, safe for .env files). */
  service_account_key_base64: string
  /** Workspace mailbox the emails are sent as, e.g. sales@vistaaram.in. */
  sender: string
  /** Display name shown in the From header, e.g. "Vistaaram". */
  sender_name?: string
  /** Default Reply-To address (defaults to the sender). */
  reply_to?: string
}

type ServiceAccount = { client_email: string; private_key: string }

const SCOPE = "https://www.googleapis.com/auth/gmail.send"
const TOKEN_URL = "https://oauth2.googleapis.com/token"

const base64url = (input: Buffer | string) =>
  Buffer.from(input).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "")

/** RFC 2047 encoding so non-ASCII subjects and names (₹, Hindi) survive mail headers. */
const encodeHeader = (value: string) =>
  /^[\x20-\x7E]*$/.test(value) ? value : `=?UTF-8?B?${Buffer.from(value, "utf8").toString("base64")}?=`

const wrap76 = (b64: string) => b64.replace(/.{1,76}/g, "$&\r\n").trimEnd()

/**
 * Sends email through Google Workspace with the Gmail API, using a service account with
 * domain-wide delegation (no mailbox password involved). Subscribers pass the rendered message
 * as `content` ({ subject, html, text }); `provider_data.reply_to` overrides the Reply-To.
 */
class GmailNotificationProviderService extends AbstractNotificationProviderService {
  static identifier = "gmail"

  protected logger_: Logger
  protected options_: Options
  private account_: ServiceAccount
  private token_: { value: string; expiresAt: number } | null = null

  static validateOptions(options: Record<string, unknown>) {
    if (!options.service_account_key_base64 || !options.sender) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "Gmail provider requires `service_account_key_base64` and `sender` options."
      )
    }
  }

  constructor(container: { logger: Logger }, options: Options) {
    super()
    this.logger_ = container.logger
    this.options_ = options
    try {
      const json = JSON.parse(Buffer.from(options.service_account_key_base64, "base64").toString("utf8"))
      this.account_ = { client_email: json.client_email, private_key: json.private_key }
    } catch {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "GMAIL_SERVICE_ACCOUNT_KEY_BASE64 is not a valid base64 JSON key.")
    }
    if (!this.account_.client_email || !this.account_.private_key) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "Service account key is missing client_email or private_key.")
    }
  }

  /** OAuth token for the sender mailbox via a signed JWT (domain-wide delegation), cached ~1h. */
  private async getToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000)
    if (this.token_ && this.token_.expiresAt - 120 > now) {
      return this.token_.value
    }
    const header = base64url(JSON.stringify({ alg: "RS256", typ: "JWT" }))
    const claims = base64url(
      JSON.stringify({
        iss: this.account_.client_email,
        sub: this.options_.sender,
        scope: SCOPE,
        aud: TOKEN_URL,
        iat: now,
        exp: now + 3600,
      })
    )
    const signature = crypto.createSign("RSA-SHA256").update(`${header}.${claims}`).sign(this.account_.private_key)
    const assertion = `${header}.${claims}.${base64url(signature)}`

    const res = await fetch(TOKEN_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.access_token) {
      // Typical cause: domain-wide delegation not yet authorised for this client ID + scope.
      this.logger_.error(`Gmail auth failed (${res.status}): ${JSON.stringify(json)}`)
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, "Could not authorise with Google to send email")
    }
    this.token_ = { value: json.access_token, expiresAt: now + Number(json.expires_in || 3600) }
    return json.access_token
  }

  private buildMime(opts: { to: string; subject: string; html?: string; text?: string; replyTo?: string }) {
    const from = this.options_.sender_name
      ? `${encodeHeader(this.options_.sender_name)} <${this.options_.sender}>`
      : this.options_.sender
    const boundary = `vst_${crypto.randomBytes(12).toString("hex")}`
    const part = (type: string, body: string) =>
      [
        `--${boundary}`,
        `Content-Type: ${type}; charset="UTF-8"`,
        "Content-Transfer-Encoding: base64",
        "",
        wrap76(Buffer.from(body, "utf8").toString("base64")),
      ].join("\r\n")

    return [
      `From: ${from}`,
      `To: ${opts.to}`,
      `Reply-To: ${opts.replyTo || this.options_.reply_to || this.options_.sender}`,
      `Subject: ${encodeHeader(opts.subject)}`,
      "MIME-Version: 1.0",
      `Content-Type: multipart/alternative; boundary="${boundary}"`,
      "",
      part("text/plain", opts.text || ""),
      part("text/html", opts.html || (opts.text || "").replace(/\n/g, "<br>")),
      `--${boundary}--`,
      "",
    ].join("\r\n")
  }

  async send(notification: ProviderSendNotificationDTO): Promise<ProviderSendNotificationResultsDTO> {
    const { content } = notification
    if (!content?.subject || !(content.html || content.text)) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        `Notification "${notification.template}" has no subject or body`
      )
    }
    const replyTo = notification.provider_data?.reply_to as string | undefined
    const raw = base64url(
      this.buildMime({ to: notification.to, subject: content.subject, html: content.html, text: content.text, replyTo })
    )

    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
      method: "POST",
      headers: { Authorization: `Bearer ${await this.getToken()}`, "Content-Type": "application/json" },
      body: JSON.stringify({ raw }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      this.logger_.error(`Gmail send failed for "${notification.template}" (${res.status}): ${JSON.stringify(json)}`)
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, "Failed to send email")
    }
    return { id: json.id }
  }
}

export default GmailNotificationProviderService
