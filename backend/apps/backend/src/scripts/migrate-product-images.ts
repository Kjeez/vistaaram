import path from "path"
import { ExecArgs } from "@medusajs/framework/types"
import { ContainerRegistrationKeys, MedusaError, Modules } from "@medusajs/framework/utils"
import { updateProductsWorkflow } from "@medusajs/medusa/core-flows"

const MIME_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
}

/**
 * Moves product images that still point at a local dev URL (e.g. http://localhost:3000/images/...)
 * into the configured file storage (Oracle Object Storage in production) and updates the products.
 *
 * Images are downloaded from IMAGE_SOURCE_URL, the deployed storefront that serves /images/...
 * Safe to re-run: products whose images are already off localhost are skipped.
 *
 *   IMAGE_SOURCE_URL=https://store.vistaaram.in npx medusa exec ./src/scripts/migrate-product-images.ts
 */
export default async function migrateProductImages({ container }: ExecArgs) {
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER)
  const query = container.resolve(ContainerRegistrationKeys.QUERY)
  const fileService = container.resolve(Modules.FILE)

  const source = process.env.IMAGE_SOURCE_URL?.replace(/\/$/, "")
  if (!source) {
    throw new MedusaError(MedusaError.Types.INVALID_DATA, "Set IMAGE_SOURCE_URL to the deployed storefront URL.")
  }

  const isLocal = (url?: string | null) => !!url && /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?\//.test(url)

  const { data: products } = await query.graph({
    entity: "product",
    fields: ["id", "handle", "thumbnail", "images.url", "images.rank"],
  })

  // The same local file may be used as thumbnail and image; upload it once.
  const uploaded = new Map<string, string>()
  const upload = async (localUrl: string) => {
    const cached = uploaded.get(localUrl)
    if (cached) {
      return cached
    }
    const pathname = new URL(localUrl).pathname
    const res = await fetch(`${source}${pathname}`)
    if (!res.ok) {
      throw new MedusaError(MedusaError.Types.NOT_FOUND, `Could not download ${source}${pathname} (${res.status})`)
    }
    const ext = path.extname(pathname).toLowerCase()
    const [file] = await fileService.createFiles([
      {
        filename: `products${pathname.replace(/^\/images/, "")}`,
        mimeType: MIME_TYPES[ext] ?? "application/octet-stream",
        content: Buffer.from(await res.arrayBuffer()).toString("base64"),
        access: "public",
      },
    ])
    uploaded.set(localUrl, file.url)
    logger.info(`Uploaded ${pathname} -> ${file.url}`)
    return file.url
  }

  let updated = 0
  for (const product of products) {
    const images = [...(product.images ?? [])]
      .filter((img): img is NonNullable<typeof img> => !!img)
      .sort((a, b) => (a.rank ?? 0) - (b.rank ?? 0))
    const needsWork = isLocal(product.thumbnail) || images.some((img) => isLocal(img.url))
    if (!needsWork) {
      continue
    }

    const newImages: string[] = []
    for (const img of images) {
      newImages.push(isLocal(img.url) ? await upload(img.url) : img.url)
    }
    const thumbnail = isLocal(product.thumbnail) ? await upload(product.thumbnail!) : product.thumbnail ?? undefined

    await updateProductsWorkflow(container).run({
      input: { products: [{ id: product.id, images: newImages.map((url) => ({ url })), thumbnail }] },
    })
    updated++
    logger.info(`Updated images for product "${product.handle}"`)
  }

  logger.info(updated ? `Done: ${updated} product(s) updated.` : "No products had local image URLs.")
}
