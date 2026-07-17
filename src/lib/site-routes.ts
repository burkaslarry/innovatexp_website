import type { MetadataRoute } from "next";

import { BLOG_POST_SLUGS } from "@/content/blog-posts";
import type { AppLocale } from "@/lib/i18n-routing";
import { LOCALES } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";

/** Path segment after locale prefix, always starting with `/`. Home is `/`. */
export const STATIC_LOCALIZED_PATHS = Object.freeze<
  readonly { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"] }[]
>([
  { path: "/", priority: 1, changeFrequency: "weekly" },
  { path: "/bookme", priority: 0.85, changeFrequency: "monthly" },
  { path: "/smartsales-crm", priority: 0.82, changeFrequency: "monthly" },
  { path: "/eventxp", priority: 0.82, changeFrequency: "monthly" },
  { path: "/ai-consulting", priority: 0.82, changeFrequency: "monthly" },
  { path: "/private-ai-solutions", priority: 0.8, changeFrequency: "monthly" },
  { path: "/customer-experience-consulting", priority: 0.78, changeFrequency: "monthly" },
  { path: "/ai-training", priority: 0.84, changeFrequency: "monthly" },
  { path: "/ai-coaching", priority: 0.84, changeFrequency: "monthly" },
  { path: "/sme-ai-workflow", priority: 0.86, changeFrequency: "monthly" },
  { path: "/proposal-to-cash-ai", priority: 0.8, changeFrequency: "monthly" },
  { path: "/case-studies", priority: 0.8, changeFrequency: "monthly" },
  { path: "/ai-era-quality", priority: 0.78, changeFrequency: "monthly" },
  { path: "/premium-ai-consulting", priority: 0.78, changeFrequency: "monthly" },
  { path: "/ai-seo-update-package", priority: 0.72, changeFrequency: "monthly" },
  { path: "/reliability", priority: 0.74, changeFrequency: "monthly" },
  { path: "/pitch-decks", priority: 0.65, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.58, changeFrequency: "weekly" },
  { path: "/compare/smartsales-vs-salesforce", priority: 0.68, changeFrequency: "monthly" },
  { path: "/compare/eventxp-vs-eventbrite", priority: 0.68, changeFrequency: "monthly" },
]);

export function buildLocalizedSitemap(): MetadataRoute.Sitemap {
  const siteUrl = getSiteUrl();
  const entries: MetadataRoute.Sitemap = [];
  const modified = new Date();

  for (const locale of LOCALES as unknown as AppLocale[]) {
    for (const row of STATIC_LOCALIZED_PATHS) {
      const suffix = row.path === "/" ? "" : row.path;
      entries.push({
        url: `${siteUrl}/${locale}${suffix}`,
        lastModified: modified,
        priority: row.priority,
        changeFrequency: row.changeFrequency,
      });
    }
    for (const slug of BLOG_POST_SLUGS) {
      entries.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: modified,
        priority: 0.55,
        changeFrequency: "monthly",
      });
    }
  }

  return entries;
}
