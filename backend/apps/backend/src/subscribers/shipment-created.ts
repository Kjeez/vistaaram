import type { SubscriberArgs, SubscriberConfig } from "@medusajs/framework"
import { ContainerRegistrationKeys, Modules } from "@medusajs/framework/utils"
import { EmailOrder, ORDER_EMAIL_FIELDS, renderOrderEmail, storeEmail, storefrontUrl } from "../lib/email"

const COD_PROVIDER_ID = "pp_system_default"

type ShipmentCreatedData = {
  id: string
  no_notification?: boolean
}

/** "Your order has shipped" email, sent when a shipment is marked in the admin. */
export default async function shipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<ShipmentCreatedData>) {
  // The admin's "Send notification" checkbox maps to no_notification.
  if (data.no_notification) {
    return
  }
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const notificationService = container.resolve(Modules.NOTIFICATION)

  const { data: [fulfillment] } = await query.graph({
    entity: "fulfillment",
    fields: ["id", "labels.tracking_number", "labels.tracking_url", ...ORDER_EMAIL_FIELDS.map((f) => `order.${f}`)],
    filters: { id: data.id },
  })
  const order = fulfillment?.order
  if (!order?.email) {
    return
  }

  const isCod = order.payment_collections?.some((pc) =>
    pc?.payment_sessions?.some((s) => s?.provider_id === COD_PROVIDER_ID)
  )
  const labels = (fulfillment.labels ?? []).filter((l): l is NonNullable<typeof l> => !!l?.tracking_number)
  const tracking = labels[0]
  const hasTrackingLink = !!tracking?.tracking_url && tracking.tracking_url !== "#"
  const replyTo = storeEmail()

  await notificationService.createNotifications({
    to: order.email,
    channel: "email",
    template: "order-shipped",
    idempotency_key: `order-shipped-${fulfillment.id}`,
    provider_data: replyTo ? { reply_to: replyTo } : undefined,
    data: { order_id: order.id },
    content: renderOrderEmail({
      subject: `Order #${order.display_id} has shipped — Vistaaram`,
      heading: "Your order is on its way!",
      paragraphs: [
        `Good news — order #${order.display_id} has left our workshop in Dehradun. Delivery usually takes 3–5 days.`,
        ...(isCod ? ["Please keep the amount below ready to pay on delivery."] : []),
      ],
      extraHtml: tracking
        ? `<p style="margin:0 0 16px;font-size:14px;color:#4A423C">Tracking number: <strong>${tracking.tracking_number}</strong></p>`
        : "",
      extraText: tracking ? `Tracking number: ${tracking.tracking_number}` : undefined,
      order: order as unknown as EmailOrder,
      paymentLabel: isCod ? "Cash on Delivery" : "Paid online",
      buttonLabel: hasTrackingLink ? "TRACK YOUR PARCEL" : "VIEW YOUR ORDER",
      buttonUrl: hasTrackingLink ? tracking.tracking_url! : `${storefrontUrl()}/account/orders/${order.id}`,
    }),
  })
}

export const config: SubscriberConfig = {
  event: "shipment.created",
}
