/* F10: Sitemap generation - Declares static routes and blog slugs for search engines. */
import { MetadataRoute } from "next";
import { LOCALES } from "@/lib/i18n-routing";

const blogSlugs = [
  "getting-started-ai-consulting",
  "event-check-in-best-practices",
  "crm-automation-without-the-hype",
];

const paths = [
  { path: "", priority: 1, changeFrequency: "weekly" as const },
  { path: "/bookme", priority: 0.9, changeFrequency: "monthly" as const },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/smartsales-crm", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/eventxp", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/ai-consulting", priority: 0.8, changeFrequency: "weekly" as const },
  { path: "/ai-seo-update-package", priority: 0.7, changeFrequency: "weekly" as const },
  { path: "/pitch-decks", priority: 0.6, changeFrequency: "monthly" as const },
  { path: "/reliability", priority: 0.7, changeFrequency: "monthly" as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [];

  for (const locale of LOCALES) {
    for (const { path, priority, changeFrequency } of paths) {
      staticPages.push({
        url: `${siteUrl}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
      });
    }
  }

  const blogPosts: MetadataRoute.Sitemap = [];
  for (const locale of LOCALES) {
    for (const slug of blogSlugs) {
      blogPosts.push({
        url: `${siteUrl}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...blogPosts];
}
