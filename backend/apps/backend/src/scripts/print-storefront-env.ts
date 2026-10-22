import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, MedusaError } from "@medusajs/framework/utils"

const VARIANT_SKUS: Record<string, string> = {
  NEXT_PUBLIC_VARIANT_BOX_1: "VIST-SAMB-1",
  NEXT_PUBLIC_VARIANT_BOX_2: "VIST-SAMB-2",
  NEXT_PUBLIC_VARIANT_BOX_4: "VIST-SAMB-4",
}

/**
 * Prints the storefront environment variables that depend on this database's IDs, ready to
 * paste into Vercel (Project -> Settings -> Environment Variables).
 *
 *   npx medusa exec ./src/scripts/print-storefront-env.ts
 */
export default async function printStorefrontEnv({ container }: ExecArgs) {
  const query = container.resolve(ContainerRegistrationKeys.QUERY)

  const { data: regions } = await query.graph({ entity: "region", fields: ["id", "currency_code"] })
  const india = regions.find((r) => r.currency_code === "inr")

  const { data: variants } = await query.graph({
    entity: "product_variant",
    fields: ["id", "sku"],
    filters: { sku: Object.values(VARIANT_SKUS) },
  })

  const { data: keys } = await query.graph({
    entity: "api_key",
    fields: ["token", "type", "revoked_at"],
    filters: { type: "publishable" },
  })
  const publishable = keys.find((k) => !k.revoked_at)

  const lines: string[] = []
  const missing: string[] = []
  const add = (name: string, value?: string | null) => (value ? lines.push(`${name}=${value}`) : missing.push(name))

  add("NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY", publishable?.token)
  add("NEXT_PUBLIC_MEDUSA_REGION_ID", india?.id)
  for (const [name, sku] of Object.entries(VARIANT_SKUS)) {
    add(name, variants.find((v) => v.sku === sku)?.id)
  }

  // Printed with console.log so the block can be copied without logger prefixes.
  console.log("\n# ---- Paste into Vercel environment variables ----")
  console.log(lines.join("\n"))
  console.log("# -------------------------------------------------\n")

  if (missing.length) {
    throw new MedusaError(
      MedusaError.Types.NOT_FOUND,
      `Missing: ${missing.join(", ")}. Run the seed-vistaaram and setup-checkout scripts first.`
    )
  }
}
