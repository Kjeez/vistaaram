/** Public origin of the storefront, used for canonical URLs, the sitemap and social previews. */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "https://vistaaram.in").replace(/\/$/, "");

export const PRODUCT_PATH = "/product/natural-sambrani-hawan-cup";

/**
 * True on a staging deployment (e.g. store.vistaaram.in while WordPress still serves
 * vistaaram.in). Search engines are then told not to index anything.
 */
export const IS_STAGING = process.env.NEXT_PUBLIC_STAGING === "true";
