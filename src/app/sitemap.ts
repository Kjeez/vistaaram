import type { MetadataRoute } from "next";
import { PRODUCT_PATH, SITE_URL } from "@/lib/site";

/** Public, indexable pages only. Account, cart and checkout pages are excluded on purpose. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; priority: number; changeFrequency: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, changeFrequency: "weekly" },
    { path: PRODUCT_PATH, priority: 0.9, changeFrequency: "weekly" },
    { path: "/story", priority: 0.7, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.6, changeFrequency: "monthly" },
    { path: "/track", priority: 0.4, changeFrequency: "yearly" },
    { path: "/shipping", priority: 0.3, changeFrequency: "yearly" },
    { path: "/returns", priority: 0.3, changeFrequency: "yearly" },
    { path: "/privacy", priority: 0.2, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.2, changeFrequency: "yearly" },
  ];
  return pages.map(({ path, priority, changeFrequency }) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency,
    priority,
  }));
}
