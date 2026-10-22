import Medusa from "@medusajs/js-sdk"

const CONFIGURED_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

const LOOPBACK = /^(localhost|127\.0\.0\.1)$/

/**
 * In local development the backend URL is localhost, which a phone on the same Wi-Fi can't
 * reach. When the page itself was opened via a LAN address (e.g. 192.168.0.108:3000), point
 * the API at that host instead. Production backend URLs are never rewritten.
 */
function resolveBackendUrl() {
  if (typeof window === "undefined") return CONFIGURED_BACKEND_URL
  const configured = new URL(CONFIGURED_BACKEND_URL)
  const pageHost = window.location.hostname
  if (!LOOPBACK.test(configured.hostname) || LOOPBACK.test(pageHost)) return CONFIGURED_BACKEND_URL
  configured.hostname = pageHost
  return configured.origin
}

export const MEDUSA_BACKEND_URL = resolveBackendUrl()

export const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  "pk_0dbc551000c77770a5ea227dc2ca85e371e9d5e699efc6c9502b808db49f1fb6"

// IDs differ per database. Production values come from the backend script
// `npx medusa exec ./src/scripts/print-storefront-env.ts`; the defaults are the local dev database.
export const INDIA_REGION_ID =
  process.env.NEXT_PUBLIC_MEDUSA_REGION_ID || "reg_01M4T777DJJSBC5PNVXPDK98WN"

export const VISTAARAM_VARIANTS = {
  // 1 Box (12 Cups) - ₹279
  BOX_1: process.env.NEXT_PUBLIC_VARIANT_BOX_1 || "variant_01M4T777QKQ3M2B6CBFYQR1MZK",
  // 2 Boxes (24 Cups) - ₹502
  BOX_2: process.env.NEXT_PUBLIC_VARIANT_BOX_2 || "variant_01M4T777QK8YW12QB6JAGDBBF0",
  // 4 Boxes (48 Cups) - ₹948
  BOX_4: process.env.NEXT_PUBLIC_VARIANT_BOX_4 || "variant_01M4T777QK0ECHA4RV5YJ2B1GQ",
} as const

export interface ProductPackOption {
  id: string;
  name: string;
  shortTitle: string;
  boxes: number;
  cups: number;
  price: number;
  mrp: number;
  savings: number;
  savingsPercent: number;
  ratePerCup: string;
  ratePerBox: string;
  tagline: string;
  badge?: string;
  badgeType?: "gold" | "green";
  variantId: string;
  freeShipping: boolean;
}

export const PACK_OPTIONS: ProductPackOption[] = [
  {
    id: "pack-1",
    name: "Pack of 1",
    shortTitle: "1 Box",
    boxes: 1,
    cups: 12,
    price: 279,
    mrp: 399,
    savings: 120,
    savingsPercent: 30,
    ratePerCup: "₹23 / cup",
    ratePerBox: "₹279 / box",
    tagline: "That's ₹23 per cup — less than a day's agarbatti",
    variantId: VISTAARAM_VARIANTS.BOX_1,
    freeShipping: false,
  },
  {
    id: "pack-2",
    name: "Pack of 2",
    shortTitle: "2 Boxes",
    boxes: 2,
    cups: 24,
    price: 502,
    mrp: 798,
    savings: 296,
    savingsPercent: 37,
    ratePerCup: "₹20.9 / cup",
    ratePerBox: "₹251 / box",
    tagline: "That's ₹21 per cup — ₹251 per box (Save extra 10%)",
    badge: "MOST POPULAR",
    badgeType: "gold",
    variantId: VISTAARAM_VARIANTS.BOX_2,
    freeShipping: true,
  },
  {
    id: "pack-4",
    name: "Pack of 4",
    shortTitle: "4 Boxes",
    boxes: 4,
    cups: 48,
    price: 948,
    mrp: 1596,
    savings: 648,
    savingsPercent: 41,
    ratePerCup: "₹19.7 / cup",
    ratePerBox: "₹237 / box",
    tagline: "That's ₹19.7 per cup — ₹237 per box (Save 15% + Free Shipping)",
    badge: "BEST VALUE",
    badgeType: "green",
    variantId: VISTAARAM_VARIANTS.BOX_4,
    freeShipping: true,
  },
];

export const medusa = new Medusa({
  baseUrl: MEDUSA_BACKEND_URL,
  debug: process.env.NODE_ENV === "development",
  publishableKey: MEDUSA_PUBLISHABLE_KEY,
  // Customer sessions are a JWT kept in localStorage and sent as a bearer token.
  auth: { type: "jwt", jwtTokenStorageMethod: "local" },
})

/** Medusa handle of the sambrani cup product (see backend seed-vistaaram.ts). */
export const PRODUCT_HANDLE = "sambrani-cup"

let productIdPromise: Promise<string | null> | null = null

/** Resolves the Medusa product id behind the storefront's single product page. */
export function getProductId(): Promise<string | null> {
  productIdPromise ??= medusa.store.product
    .list({ handle: PRODUCT_HANDLE, fields: "id" })
    .then(({ products }) => products[0]?.id ?? null)
    .catch(() => {
      productIdPromise = null;
      return null;
    });
  return productIdPromise;
}

export default medusa

