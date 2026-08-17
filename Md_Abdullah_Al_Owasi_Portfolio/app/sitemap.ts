export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
/**
 * SITEMAP EDITING GUIDE
 * Uses siteConfig.canonicalUrl from data/portfolio.ts. Update that one canonical value if the production domain changes.
 */

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: siteConfig.canonicalUrl, lastModified: new Date(), changeFrequency: "monthly", priority: 1 }];
}
