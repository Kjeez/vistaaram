import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import {
  adminUrl,
  EmailOrder,
  formatINR,
  ORDER_EMAIL_FIELDS,
  renderOrderEmail,
  storeEmail,
  storefrontUrl,
} from "../lib/email"

const COD_PROVIDER_ID = "pp_system_default"

/** Order confirmation to the customer and a new-order alert to the store inbox. */
export default async function orderPlacedHandler({ event: { data }, container }: SubscriberArgs<{ id: string }>) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const notificationService = container.resolve(Modules.NOTIFICATION)
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)

  const { data: [order] } = await query.graph({
    entity: "order",
    fields: ORDER_EMAIL_FIELDS,
    filters: { id: data.id },
  })
  if (!order) {
    return
  }

  const isCod = order.payment_collections?.some((pc) =>
    pc?.payment_sessions?.some((s) => s?.provider_id === COD_PROVIDER_ID)
  )
  const paymentLabel = isCod ? "Cash on Delivery" : "Paid online"
  const emailOrder = order as unknown as EmailOrder
  const total = formatINR(order.total as number)
  const replyTo = storeEmail()

  if (order.email) {
    await notificationService.createNotifications({
      to: order.email,
      channel: "email",
      template: "order-placed",
      idempotency_key: `order-placed-customer-${order.id}`,
      provider_data: replyTo ? { reply_to: replyTo } : undefined,
      data: { order_id: order.id },
      content: renderOrderEmail({
        subject: `Order #${order.display_id} confirmed — Vistaaram`,
        heading: "Thank you for your order!",
        paragraphs: [
          `We've received order #${order.display_id} and will ship it within 24 hours. Delivery usually takes 3–5 days.`,
          isCod
            ? `You chose Cash on Delivery — please keep ${total} ready when your parcel arrives.`
            : `We've received your payment of ${total}.`,
        ],
        order: emailOrder,
        paymentLabel,
        buttonLabel: "VIEW YOUR ORDER",
        buttonUrl: `${storefrontUrl()}/order/confirmed/${order.id}`,
      }),
    })
  }

  if (replyTo) {
    await notificationService.createNotifications({
      to: replyTo,
      channel: "email",
      template: "order-placed-admin",
      idempotency_key: `order-placed-admin-${order.id}`,
      provider_data: order.email ? { reply_to: order.email } : undefined,
      data: { order_id: order.id },
      content: renderOrderEmail({
        subject: `New order #${order.display_id} — ${total} (${paymentLabel})`,
        heading: `New order #${order.display_id}`,
        paragraphs: [
          `Customer: ${order.email ?? "unknown"}`,
          isCod
            ? `Cash on Delivery — consider confirming by phone before shipping.`
            : `Paid online. Ready to pack and ship.`,
        ],
        order: emailOrder,
        paymentLabel,
        buttonLabel: "OPEN IN ADMIN",
        buttonUrl: `${adminUrl()}/orders/${order.id}`,
      }),
    })
  } else {
    logger.warn("STORE_EMAIL is not set; skipping the new-order alert email.")
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
}
