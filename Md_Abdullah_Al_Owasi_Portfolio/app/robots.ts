export const dynamic = "force-static";
import type { MetadataRoute } from "next";
import { siteConfig } from "@/data/portfolio";
/**
 * ROBOTS EDITING GUIDE
 * Uses siteConfig.canonicalUrl from data/portfolio.ts. Update that one canonical value if the production domain changes.
 */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${siteConfig.canonicalUrl}/sitemap.xml`,
  };
}
