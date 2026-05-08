/* F10: Sitemap generation - Declares static routes and blog slugs for search engines. */
import type { MetadataRoute } from "next";

/** Keep sitemap self-contained (no @/lib imports) to avoid metadata-route bundling/runtime issues. */
const SITE_LOCALES = ["en", "zh-hk"] as const;

const blogSlugs = [
  "getting-started-ai-consulting",
  "event-check-in-best-practices",
  "crm-automation-without-the-hype",
];

const paths: Array<{
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[0]["changeFrequency"];
}> = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/bookme", priority: 0.9, changeFrequency: "monthly" },
  { path: "/blog", priority: 0.8, changeFrequency: "weekly" },
  { path: "/smartsales-crm", priority: 0.8, changeFrequency: "weekly" },
  { path: "/eventxp", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ai-consulting", priority: 0.8, changeFrequency: "weekly" },
  { path: "/ai-seo-update-package", priority: 0.7, changeFrequency: "weekly" },
  { path: "/pitch-decks", priority: 0.6, changeFrequency: "monthly" },
  { path: "/reliability", priority: 0.7, changeFrequency: "monthly" },
];

function getOrigin(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://www.innovatexp.co";
  const trimmed = String(raw).trim();
  const noTrail = trimmed.replace(/\/+$/, "");
  try {
    const u = new URL(noTrail);
    return `${u.protocol}//${u.host}`;
  } catch {
    return "https://www.innovatexp.co";
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const origin = getOrigin();
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [];
  for (const locale of SITE_LOCALES) {
    for (const { path, priority, changeFrequency } of paths) {
      staticPages.push({
        url: `${origin}/${locale}${path}`,
        lastModified: now,
        changeFrequency,
        priority,
      });
    }
  }

  const blogPosts: MetadataRoute.Sitemap = [];
  for (const locale of SITE_LOCALES) {
    for (const slug of blogSlugs) {
      blogPosts.push({
        url: `${origin}/${locale}/blog/${slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return [...staticPages, ...blogPosts];
}
