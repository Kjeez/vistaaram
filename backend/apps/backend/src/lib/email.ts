const BRAND = "#751E29"

export const storefrontUrl = () => (process.env.STOREFRONT_URL || "http://localhost:3000").replace(/\/$/, "")

/** Inbox that receives new-order alerts and customer replies (Google Workspace). */
export const storeEmail = () => process.env.STORE_EMAIL || process.env.GMAIL_SENDER || ""

/** Public backend URL, used for links into the Medusa admin. */
export const adminUrl = () => `${(process.env.MEDUSA_BACKEND_URL || "http://localhost:9000").replace(/\/$/, "")}/app`

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
}

const escapeHtml = (s: string) => s.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c])

export const formatINR = (amount: number | string | null | undefined) =>
  `₹${Number(amount || 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })}`

/** Shared email frame: brand header, white card, footer with contact details. */
function frame(inner: string) {
  const contact = storeEmail()
  return `<!doctype html><html><body style="margin:0;background:#FAF6EE;font-family:Arial,sans-serif">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:32px 16px">
<table width="100%" style="max-width:560px;background:#ffffff;border:1px solid #E6DED2;border-radius:12px" cellpadding="0" cellspacing="0">
<tr><td style="padding:32px">
<p style="margin:0 0 24px;font-family:Georgia,serif;font-size:22px;color:${BRAND}">Vistaaram</p>
${inner}
</td></tr></table>
<p style="margin:16px 0 0;font-size:12px;color:#8E8783">Vistaaram · Natural Sambrani from Devbhoomi, Uttarakhand${contact ? ` · ${escapeHtml(contact)}` : ""}</p>
</td></tr></table></body></html>`
}

const button = (label: string, url: string) =>
  `<p style="margin:24px 0"><a href="${escapeHtml(url)}" style="display:inline-block;background:${BRAND};color:#FAF6EE;text-decoration:none;padding:12px 28px;border-radius:999px;font-size:13px;font-weight:bold;letter-spacing:1px">${escapeHtml(label)}</a></p>`

const paragraph = (text: string) =>
  `<p style="margin:0 0 16px;font-size:15px;line-height:1.6;color:#4A423C">${escapeHtml(text)}</p>`

const heading = (text: string) =>
  `<h1 style="margin:0 0 16px;font-family:Georgia,serif;font-size:22px;font-weight:normal;color:${BRAND}">${escapeHtml(text)}</h1>`

/** Minimal branded email with one call-to-action button. */
export function renderActionEmail(opts: {
  subject: string
  heading: string
  paragraphs: string[]
  buttonLabel: string
  buttonUrl: string
  footnote?: string
}) {
  const footnote = opts.footnote
    ? `<p style="margin:0;font-size:12px;color:#8E8783">${escapeHtml(opts.footnote)}</p>`
    : ""
  const html = frame(
    `${heading(opts.heading)}${opts.paragraphs.map(paragraph).join("")}${button(opts.buttonLabel, opts.buttonUrl)}${footnote}`
  )
  const text = [opts.heading, "", ...opts.paragraphs, "", `${opts.buttonLabel}: ${opts.buttonUrl}`, opts.footnote ?? ""].join("\n")
  return { subject: opts.subject, html, text }
}

export type EmailOrder = {
  id: string
  display_id: number
  email?: string | null
  item_subtotal?: number | null
  shipping_total?: number | null
  discount_total?: number | null
  total?: number | null
  items?: ({ title?: string | null; product_title?: string | null; variant_title?: string | null; quantity: number; subtotal?: number | null } | null)[] | null
  shipping_address?: {
    first_name?: string | null
    last_name?: string | null
    address_1?: string | null
    address_2?: string | null
    city?: string | null
    province?: string | null
    postal_code?: string | null
    phone?: string | null
  } | null
}

export const ORDER_EMAIL_FIELDS = [
  "id",
  "display_id",
  "email",
  "item_subtotal",
  "shipping_total",
  "discount_total",
  "total",
  "items.title",
  "items.product_title",
  "items.variant_title",
  "items.quantity",
  "items.subtotal",
  "shipping_address.*",
  "payment_collections.payment_sessions.provider_id",
]

function addressLines(order: EmailOrder) {
  const a = order.shipping_address
  if (!a) return []
  return [
    `${a.first_name ?? ""} ${a.last_name ?? ""}`.trim(),
    [a.address_1, a.address_2].filter(Boolean).join(", "),
    `${a.city ?? ""}, ${a.province ?? ""} – ${a.postal_code ?? ""}`,
    a.phone ?? "",
  ].filter(Boolean)
}

/** Items, totals and delivery address as an HTML block plus a plain-text version. */
function orderSummary(order: EmailOrder, paymentLabel: string) {
  const items = (order.items ?? []).filter((i): i is NonNullable<typeof i> => !!i)
  const row = (label: string, value: string, strong = false) =>
    `<tr><td style="padding:4px 0;font-size:14px;color:#5A4F46${strong ? ";font-weight:bold;color:" + BRAND : ""}">${escapeHtml(label)}</td><td align="right" style="padding:4px 0;font-size:14px;color:#4A423C${strong ? ";font-weight:bold;color:" + BRAND : ""}">${escapeHtml(value)}</td></tr>`
  const itemRows = items
    .map((i) =>
      row(`${i.product_title || i.title}${i.variant_title ? ` — ${i.variant_title}` : ""} × ${i.quantity}`, formatINR(i.subtotal))
    )
    .join("")
  const shipping = Number(order.shipping_total) === 0 ? "FREE" : formatINR(order.shipping_total)
  const discount = Number(order.discount_total) > 0 ? row("Discount", `-${formatINR(order.discount_total)}`) : ""
  const address = addressLines(order)

  const html = `<table width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid #E6DED2;border-bottom:1px solid #E6DED2;margin:8px 0 16px;padding:8px 0">
${itemRows}
${row("Subtotal", formatINR(order.item_subtotal))}
${row("Shipping", shipping)}
${discount}
${row(`Total (${paymentLabel})`, formatINR(order.total), true)}
</table>
${address.length ? `<p style="margin:0 0 4px;font-size:13px;font-weight:bold;color:#4A423C">Delivering to</p><p style="margin:0 0 16px;font-size:14px;line-height:1.6;color:#5A4F46">${address.map(escapeHtml).join("<br>")}</p>` : ""}`

  const text = [
    ...items.map((i) => `${i.product_title || i.title}${i.variant_title ? ` — ${i.variant_title}` : ""} x ${i.quantity}: ${formatINR(i.subtotal)}`),
    `Subtotal: ${formatINR(order.item_subtotal)}`,
    `Shipping: ${shipping}`,
    ...(Number(order.discount_total) > 0 ? [`Discount: -${formatINR(order.discount_total)}`] : []),
    `Total (${paymentLabel}): ${formatINR(order.total)}`,
    ...(address.length ? ["", "Delivering to:", ...address] : []),
  ].join("\n")

  return { html, text }
}

/** Customer-facing order email (confirmation or shipped) with the order summary. */
export function renderOrderEmail(opts: {
  subject: string
  heading: string
  paragraphs: string[]
  order: EmailOrder
  paymentLabel: string
  buttonLabel?: string
  buttonUrl?: string
  extraHtml?: string
  extraText?: string
}) {
  const summary = orderSummary(opts.order, opts.paymentLabel)
  const cta = opts.buttonLabel && opts.buttonUrl ? button(opts.buttonLabel, opts.buttonUrl) : ""
  const html = frame(
    `${heading(opts.heading)}${opts.paragraphs.map(paragraph).join("")}${opts.extraHtml ?? ""}${summary.html}${cta}<p style="margin:0;font-size:12px;color:#8E8783">Questions? Just reply to this email.</p>`
  )
  const text = [
    opts.heading,
    "",
    ...opts.paragraphs,
    ...(opts.extraText ? ["", opts.extraText] : []),
    "",
    summary.text,
    ...(opts.buttonUrl ? ["", `${opts.buttonLabel}: ${opts.buttonUrl}`] : []),
    "",
    "Questions? Just reply to this email.",
  ].join("\n")
  return { subject: opts.subject, html, text }
}
