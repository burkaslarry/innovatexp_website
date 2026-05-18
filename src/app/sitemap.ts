import type { MetadataRoute } from "next";

import { buildLocalizedSitemap } from "@/lib/site-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  return buildLocalizedSitemap();
}
