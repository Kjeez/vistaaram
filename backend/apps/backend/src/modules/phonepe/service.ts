import crypto from "crypto"
import {
  AbstractPaymentProvider,
  MedusaError,
  PaymentActions,
  PaymentSessionStatus,
} from "@medusajs/framework/utils"
import type {
  AuthorizePaymentInput,
  AuthorizePaymentOutput,
  CancelPaymentInput,
  CancelPaymentOutput,
  CapturePaymentInput,
  CapturePaymentOutput,
  DeletePaymentInput,
  DeletePaymentOutput,
  GetPaymentStatusInput,
  GetPaymentStatusOutput,
  InitiatePaymentInput,
  InitiatePaymentOutput,
  Logger,
  ProviderWebhookPayload,
  RefundPaymentInput,
  RefundPaymentOutput,
  RetrievePaymentInput,
  RetrievePaymentOutput,
  UpdatePaymentInput,
  UpdatePaymentOutput,
  WebhookActionResult,
} from "@medusajs/framework/types"

type Options = {
  client_id: string
  client_secret: string
  client_version: string
  /** "production" (default) or "sandbox" (PhonePe UAT). */
  env?: "production" | "sandbox"
  webhook_username?: string
  webhook_password?: string
}

type OrderState = "PENDING" | "COMPLETED" | "FAILED"

type CreatePaymentResponse = {
  orderId: string
  state: OrderState
  expireAt: number
  redirectUrl: string
}

type OrderStatusResponse = {
  orderId: string
  state: OrderState
  amount: number
  paymentDetails?: { transactionId: string; paymentMode: string; state: OrderState }[]
}

const HOSTS = {
  production: {
    token: "https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
    pg: "https://api.phonepe.com/apis/pg",
  },
  sandbox: {
    token: "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token",
    pg: "https://api-preprod.phonepe.com/apis/pg-sandbox",
  },
}

// Medusa amounts are in rupees (279); PhonePe wants paise (27900).
const toPaise = (amount: unknown) => Math.round(Number(amount) * 100)
const fromPaise = (amount: number) => amount / 100
// merchantOrderId / merchantRefundId: max 63 chars, letters, digits, "_" and "-" only.
const safeId = (value: string) => value.replace(/[^A-Za-z0-9_-]/g, "").slice(0, 63)

/**
 * PhonePe Payment Gateway (Standard Checkout v2).
 *
 * Flow: the storefront creates a payment session with `data.redirect_url` (its return page);
 * initiatePayment creates a PhonePe order and returns PhonePe's `checkout_url`; the shopper pays
 * there and is sent back; cart completion calls authorizePayment, which asks PhonePe for the
 * order status server-side. The webhook completes the order too if the shopper never returns.
 */
class PhonePeProviderService extends AbstractPaymentProvider<Options> {
  static identifier = "phonepe"

  protected logger_: Logger
  protected options_: Options
  private token_: { value: string; expiresAt: number } | null = null

  static validateOptions(options: Record<string, unknown>) {
    if (!options.client_id || !options.client_secret || !options.client_version) {
      throw new MedusaError(
        MedusaError.Types.INVALID_DATA,
        "PhonePe provider requires `client_id`, `client_secret` and `client_version`."
      )
    }
  }

  constructor(container: { logger: Logger }, options: Options) {
    super(container, options)
    this.logger_ = container.logger
    this.options_ = options
  }

  private get hosts() {
    return HOSTS[this.options_.env === "sandbox" ? "sandbox" : "production"]
  }

  /** OAuth token, cached and refreshed 5 minutes before it expires (expires_at is epoch seconds). */
  private async getToken(): Promise<string> {
    const now = Math.floor(Date.now() / 1000)
    if (this.token_ && this.token_.expiresAt - 300 > now) {
      return this.token_.value
    }
    const res = await fetch(this.hosts.token, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: this.options_.client_id,
        client_version: String(this.options_.client_version),
        client_secret: this.options_.client_secret,
        grant_type: "client_credentials",
      }),
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok || !json.access_token) {
      this.logger_.error(`PhonePe auth failed (${res.status}): ${JSON.stringify(json)}`)
      throw new MedusaError(MedusaError.Types.UNEXPECTED_STATE, "Could not connect to PhonePe. Please try again.")
    }
    // Some responses report milliseconds; normalise to seconds.
    const expiresAt = Number(json.expires_at) > 1e12 ? Math.floor(Number(json.expires_at) / 1000) : Number(json.expires_at)
    this.token_ = { value: json.access_token, expiresAt: expiresAt || now + 600 }
    return json.access_token
  }

  private async request<T>(path: string, init: { method?: string; body?: unknown } = {}): Promise<T> {
    const token = await this.getToken()
    const res = await fetch(`${this.hosts.pg}${path}`, {
      method: init.method ?? "GET",
      headers: { "Content-Type": "application/json", Authorization: `O-Bearer ${token}` },
      body: init.body ? JSON.stringify(init.body) : undefined,
    })
    const json = await res.json().catch(() => ({}))
    if (!res.ok) {
      this.logger_.error(`PhonePe ${init.method ?? "GET"} ${path} failed (${res.status}): ${JSON.stringify(json)}`)
      throw new MedusaError(
        MedusaError.Types.UNEXPECTED_STATE,
        json?.message || `PhonePe request failed (${res.status})`
      )
    }
    return json as T
  }

  private async createOrder(amount: unknown, data: Record<string, unknown> | undefined) {
    const redirectUrl = data?.redirect_url
    if (typeof redirectUrl !== "string" || !/^https?:\/\//.test(redirectUrl)) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "PhonePe needs `data.redirect_url` (the storefront return page).")
    }
    const sessionId = typeof data?.session_id === "string" ? data.session_id : ""
    // Unique per attempt: a FAILED PhonePe order can't be paid again, so retries need a new id.
    const merchantOrderId = safeId(`${sessionId || "vst"}-${Date.now().toString(36)}`)
    const paise = toPaise(amount)

    const order = await this.request<CreatePaymentResponse>("/checkout/v2/pay", {
      method: "POST",
      body: {
        merchantOrderId,
        amount: paise,
        expireAfter: 1200,
        metaInfo: { udf1: sessionId },
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: "Vistaaram order",
          merchantUrls: { redirectUrl },
        },
      },
    })

    return {
      merchant_order_id: merchantOrderId,
      phonepe_order_id: order.orderId,
      // PhonePe's hosted payment page; the storefront sends the shopper here unmodified.
      checkout_url: order.redirectUrl,
      amount: paise,
      redirect_url: redirectUrl,
      session_id: sessionId,
    }
  }

  private async fetchStatus(merchantOrderId: string) {
    return this.request<OrderStatusResponse>(
      `/checkout/v2/order/${encodeURIComponent(merchantOrderId)}/status?details=false`
    )
  }

  private statusOf(state?: OrderState) {
    if (state === "COMPLETED") return PaymentSessionStatus.CAPTURED
    if (state === "FAILED") return PaymentSessionStatus.ERROR
    return PaymentSessionStatus.PENDING
  }

  async initiatePayment(input: InitiatePaymentInput): Promise<InitiatePaymentOutput> {
    const data = await this.createOrder(input.amount, input.data)
    return { id: data.merchant_order_id, data }
  }

  async updatePayment(input: UpdatePaymentInput): Promise<UpdatePaymentOutput> {
    // A PhonePe order's amount is fixed, so a changed cart total needs a new order.
    if (input.data?.amount === toPaise(input.amount)) {
      return { data: input.data }
    }
    return { data: await this.createOrder(input.amount, input.data) }
  }

  async authorizePayment(input: AuthorizePaymentInput): Promise<AuthorizePaymentOutput> {
    const merchantOrderId = input.data?.merchant_order_id as string | undefined
    if (!merchantOrderId) {
      return { status: PaymentSessionStatus.ERROR, data: input.data }
    }
    const status = await this.fetchStatus(merchantOrderId)
    // Logged so a failed or unpaid checkout can be traced (PhonePe's own error code is included when present).
    const detail = status as unknown as { errorCode?: string; detailedErrorCode?: string }
    this.logger_.info(
      `PhonePe order ${merchantOrderId}: ${status.state}${detail.errorCode ? ` (${detail.errorCode}${detail.detailedErrorCode ? `/${detail.detailedErrorCode}` : ""})` : ""}`
    )
    return {
      status: this.statusOf(status.state),
      data: {
        ...input.data,
        phonepe_state: status.state,
        transaction_id: status.paymentDetails?.[0]?.transactionId,
        payment_mode: status.paymentDetails?.[0]?.paymentMode,
      },
    }
  }

  async capturePayment(input: CapturePaymentInput): Promise<CapturePaymentOutput> {
    // PhonePe captures automatically once the order is COMPLETED.
    return { data: input.data }
  }

  async refundPayment(input: RefundPaymentInput): Promise<RefundPaymentOutput> {
    const merchantOrderId = input.data?.merchant_order_id as string | undefined
    if (!merchantOrderId) {
      throw new MedusaError(MedusaError.Types.INVALID_DATA, "Missing PhonePe merchant order id")
    }
    const merchantRefundId = safeId(`${merchantOrderId.slice(0, 40)}-R${Date.now().toString(36)}`)
    const refund = await this.request<{ refundId: string; state: string }>("/payments/v2/refund", {
      method: "POST",
      body: {
        merchantRefundId,
        originalMerchantOrderId: merchantOrderId,
        amount: toPaise(input.amount),
      },
    })
    return {
      data: { ...input.data, last_refund_id: refund.refundId, last_merchant_refund_id: merchantRefundId, last_refund_state: refund.state },
    }
  }

  async cancelPayment(input: CancelPaymentInput): Promise<CancelPaymentOutput> {
    // Unpaid PhonePe orders simply expire; there is no cancel call.
    return { data: input.data }
  }

  async deletePayment(input: DeletePaymentInput): Promise<DeletePaymentOutput> {
    return { data: input.data }
  }

  async getPaymentStatus(input: GetPaymentStatusInput): Promise<GetPaymentStatusOutput> {
    const merchantOrderId = input.data?.merchant_order_id as string | undefined
    if (!merchantOrderId) return { status: PaymentSessionStatus.PENDING, data: input.data }
    const status = await this.fetchStatus(merchantOrderId)
    return { status: this.statusOf(status.state), data: input.data }
  }

  async retrievePayment(input: RetrievePaymentInput): Promise<RetrievePaymentOutput> {
    const merchantOrderId = input.data?.merchant_order_id as string | undefined
    if (!merchantOrderId) return { data: input.data }
    const status = await this.fetchStatus(merchantOrderId)
    return { data: { ...input.data, phonepe_status: status } }
  }

  /** Webhook: PhonePe sends Authorization = SHA256("username:password") set in its dashboard. */
  async getWebhookActionAndData(
    payload: ProviderWebhookPayload["payload"]
  ): Promise<WebhookActionResult> {
    const { webhook_username: username, webhook_password: password } = this.options_
    const received = String(payload.headers["authorization"] ?? "").replace(/^SHA256\s+/i, "").trim()
    if (!username || !password || !received) {
      return { action: PaymentActions.NOT_SUPPORTED }
    }
    // The docs don't state the encoding, so accept the SHA256 digest as hex or base64.
    const digest = crypto.createHash("sha256").update(`${username}:${password}`).digest()
    const safeEqual = (expected: string) =>
      expected.length === received.length && crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received))
    const matches = safeEqual(digest.toString("hex")) || safeEqual(digest.toString("base64"))
    if (!matches) {
      this.logger_.warn("PhonePe webhook rejected: Authorization header did not match")
      return { action: PaymentActions.NOT_SUPPORTED }
    }

    const event = payload.data as {
      event?: string
      payload?: { merchantOrderId?: string; state?: OrderState; amount?: number; metaInfo?: Record<string, string> }
    }
    const order = event.payload
    const sessionId = order?.metaInfo?.udf1
    if (!sessionId || !order?.amount) {
      return { action: PaymentActions.NOT_SUPPORTED }
    }
    const data = { session_id: sessionId, amount: fromPaise(order.amount) }

    if (event.event === "checkout.order.completed" && order.state === "COMPLETED") {
      return { action: PaymentActions.SUCCESSFUL, data }
    }
    if (event.event === "checkout.order.failed") {
      return { action: PaymentActions.FAILED, data }
    }
    return { action: PaymentActions.NOT_SUPPORTED }
  }
}

export default PhonePeProviderService
