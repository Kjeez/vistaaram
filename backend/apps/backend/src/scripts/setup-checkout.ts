import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"
import {
  createReturnReasonsWorkflow,
  createShippingOptionsWorkflow,
  deleteShippingOptionsWorkflow,
  updateRegionsWorkflow,
  updateShippingOptionsWorkflow,
} from "@medusajs/medusa/core-flows"

const FREE_SHIPPING_THRESHOLD = 499
const STANDARD_SHIPPING_FEE = 49

/**
 * Prepares the India region for checkout. Safe to re-run.
 *
 * - Enables COD (pp_system_default) and, when configured, PhonePe / Razorpay on the India region.
 * - Adds return reasons and a free "Return Pickup" option so customers can request returns.
 * - Collapses shipping into one "Standard Delivery" option priced at 49, free when the
 *   cart's item total is at least 499. The seed's separate free option had no total rule,
 *   so any cart could select it.
 */
export default async function setupCheckout({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: regions } = await query.graph({
    entity: "region",
    fields: ["id", "name", "currency_code", "payment_providers.id"],
  })
  const india = regions.find((r) => r.currency_code === "inr")
  if (!india) {
    throw new MedusaError(MedusaError.Types.NOT_FOUND, "India (INR) region not found. Run the seed-vistaaram script first.")
  }

  const { data: providers } = await query.graph({
    entity: "payment_provider",
    fields: ["id", "is_enabled"],
  })
  // Provider rows outlive config changes, so online gateways also require their keys to be set now.
  const configured: Record<string, boolean> = {
    pp_system_default: true,
    pp_phonepe_phonepe: Boolean(process.env.PHONEPE_CLIENT_ID && process.env.PHONEPE_CLIENT_SECRET),
    pp_razorpay_razorpay: Boolean(process.env.RAZORPAY_KEY_ID && process.env.RAZORPAY_KEY_SECRET),
  }
  const providerIds = Object.keys(configured).filter(
    (id) => configured[id] && providers.some((p) => p.id === id && p.is_enabled)
  )
  if (!providerIds.some((id) => id !== "pp_system_default")) {
    logger.warn("No online payment gateway configured (PhonePe or Razorpay); only Cash on Delivery is enabled.")
  }

  await updateRegionsWorkflow(container).run({
    input: {
      selector: { id: india.id },
      update: { payment_providers: providerIds },
    },
  })
  logger.info(`India region payment providers: ${providerIds.join(", ")}`)

  const { data: options } = await query.graph({
    entity: "shipping_option",
    fields: ["id", "name", "type.code", "service_zone_id", "shipping_profile_id"],
  })
  const standard = options.find((o) => o.type?.code === "standard_in")
  const free = options.filter((o) => o.type?.code === "free_shipping_in")

  if (standard) {
    await updateShippingOptionsWorkflow(container).run({
      input: [
        {
          id: standard.id,
          name: "Standard Delivery",
          prices: [
            { currency_code: "inr", amount: STANDARD_SHIPPING_FEE },
            {
              currency_code: "inr",
              amount: 0,
              rules: [{ attribute: "item_total", operator: "gte", value: FREE_SHIPPING_THRESHOLD }],
            },
          ],
        },
      ],
    })
    logger.info(`Standard Delivery: ₹${STANDARD_SHIPPING_FEE}, free from ₹${FREE_SHIPPING_THRESHOLD}`)
  } else {
    logger.warn("Standard shipping option (standard_in) not found; shipping left unchanged.")
  }

  if (standard && free.length) {
    await deleteShippingOptionsWorkflow(container).run({
      input: { ids: free.map((o) => o.id) },
    })
    logger.info(`Removed ${free.length} unconditional free shipping option(s).`)
  }

  const { data: reasons } = await query.graph({
    entity: "return_reason",
    fields: ["id", "value"],
  })
  const missingReasons = RETURN_REASONS.filter((r) => !reasons.some((existing) => existing.value === r.value))
  if (missingReasons.length) {
    await createReturnReasonsWorkflow(container).run({ input: { data: missingReasons } })
    logger.info(`Added ${missingReasons.length} return reason(s).`)
  }

  const hasReturnOption = options.some((o) => o.type?.code === "return_in")
  if (standard && !hasReturnOption) {
    await createShippingOptionsWorkflow(container).run({
      input: [
        {
          name: "Return Pickup",
          price_type: "flat",
          provider_id: "manual_manual",
          service_zone_id: standard.service_zone_id,
          shipping_profile_id: standard.shipping_profile_id,
          type: {
            label: "Return Pickup",
            description: "We arrange a pickup from your delivery address.",
            code: "return_in",
          },
          prices: [{ currency_code: "inr", amount: 0 }],
          rules: [
            { attribute: "enabled_in_store", value: "true", operator: "eq" },
            { attribute: "is_return", value: "true", operator: "eq" },
          ],
        },
      ],
    })
    logger.info("Added free Return Pickup shipping option.")
  }
}

const RETURN_REASONS = [
  { value: "damaged", label: "Arrived damaged or broken" },
  { value: "wrong_item", label: "Received the wrong item" },
  { value: "quality", label: "Quality not as expected" },
  { value: "not_needed", label: "No longer needed" },
  { value: "other", label: "Other" },
]
