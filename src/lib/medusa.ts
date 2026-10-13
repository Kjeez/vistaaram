import Medusa from "@medusajs/js-sdk"

export const MEDUSA_BACKEND_URL =
  process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000"

export const MEDUSA_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ||
  "pk_0dbc551000c77770a5ea227dc2ca85e371e9d5e699efc6c9502b808db49f1fb6"

export const INDIA_REGION_ID = "reg_01M4T777DJJSBC5PNVXPDK98WN"

export const VISTAARAM_VARIANTS = {
  BOX_1: "variant_01M4T777QKQ3M2B6CBFYQR1MZK", // 1 Box (12 Cups) - ₹279
  BOX_2: "variant_01M4T777QK8YW12QB6JAGDBBF0", // 2 Boxes (24 Cups) - ₹502
  BOX_4: "variant_01M4T777QK0ECHA4RV5YJ2B1GQ", // 4 Boxes (48 Cups) - ₹948
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
})

export default medusa

