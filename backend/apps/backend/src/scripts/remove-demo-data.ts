import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys } from "@medusajs/framework/utils"
import { deleteProductsWorkflow, deleteRegionsWorkflow } from "@medusajs/medusa/core-flows"

const KEEP_PRODUCT_HANDLES = ["sambrani-cup"]
const KEEP_CURRENCIES = ["inr"]

/**
 * Removes the Medusa starter template's demo data (sample products, the Europe region) that the
 * initial-data-seed migration script creates on a fresh database. Keeps the Vistaaram product
 * and the India (INR) region.
 *
 * Lists what it would delete unless run with CONFIRM=yes:
 *   npx medusa exec ./src/scripts/remove-demo-data.ts
 *   CONFIRM=yes npx medusa exec ./src/scripts/remove-demo-data.ts
 */
export default async function removeDemoData({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const confirmed = process.env.CONFIRM === "yes"

  const { data: products } = await query.graph({ entity: "product", fields: ["id", "handle", "title"] })
  const demoProducts = products.filter((p) => !KEEP_PRODUCT_HANDLES.includes(p.handle))

  const { data: regions } = await query.graph({ entity: "region", fields: ["id", "name", "currency_code"] })
  const demoRegions = regions.filter((r) => !KEEP_CURRENCIES.includes(r.currency_code))

  logger.info(`Products to remove (${demoProducts.length}): ${demoProducts.map((p) => p.handle).join(", ") || "none"}`)
  logger.info(`Regions to remove (${demoRegions.length}): ${demoRegions.map((r) => r.name).join(", ") || "none"}`)

  if (!confirmed) {
    logger.info("Dry run only. Re-run with CONFIRM=yes to delete.")
    return
  }

  if (demoProducts.length) {
    await deleteProductsWorkflow(container).run({ input: { ids: demoProducts.map((p) => p.id) } })
  }
  if (demoRegions.length) {
    await deleteRegionsWorkflow(container).run({ input: { ids: demoRegions.map((r) => r.id) } })
  }
  logger.info("Demo data removed.")
}
