import type { AppLocale } from "@/lib/i18n-routing";
import { blogPosts } from "@/content/blog-posts";
import { PDPO_BLOG_SERIES } from "@/content/pdpo-blog-series";
import { WORKFLOW_BLOG_POSTS } from "@/content/workflow-blog-posts";
import type { BlogCategory, BlogLink } from "@/content/blog-types";
import { AUTHOR, authorSameAs } from "@/lib/author";
import { localeToHtmlLang } from "@/lib/i18n-routing";

export type BlogView = {
  slug: string;
  date: string;
  title: string;
  excerpt: string;
  directAnswer: string | null;
  disclaimer: string | null;
  cta: string | null;
  sections: { heading: string; paragraphs: string[] }[];
  faqs: { question: string; answer: string }[];
  body: string | null;
  seriesOrder: number | null;
  category?: BlogCategory;
  modifiedDate?: string;
  keyTakeaways?: string[];
  limitations?: string;
  sources?: BlogLink[];
  relatedServices?: BlogLink[];
  relatedCases?: BlogLink[];
};

const SERIES_TOTAL = PDPO_BLOG_SERIES.length;

export const BLOG_POST_SLUGS = Object.freeze([
  ...WORKFLOW_BLOG_POSTS.map((post) => post.slug),
  ...PDPO_BLOG_SERIES.map((post) => post.slug),
  ...Object.keys(blogPosts),
]);

function seriesView(slug: string, locale: AppLocale): BlogView | null {
  const post = PDPO_BLOG_SERIES.find((item) => item.slug === slug);
  if (!post) return null;
  const copy = post.locales[locale];
  return {
    slug: post.slug,
    date: post.date,
    title: copy.title,
    excerpt: copy.excerpt,
    directAnswer: copy.directAnswer,
    disclaimer: copy.disclaimer,
    cta: copy.cta,
    sections: copy.sections,
    faqs: copy.faqs,
    body: null,
    seriesOrder: post.order,
    category: "ai-data-governance",
    keyTakeaways: copy.sections.slice(0, 3).map((section) => section.paragraphs[0]),
  };
}

export function getBlogView(slug: string, locale: AppLocale): BlogView | null {
  const workflow = WORKFLOW_BLOG_POSTS.find((post) => post.slug === slug);
  if (workflow) {
    return {
      ...workflow.locales[locale],
      slug: workflow.slug,
      date: workflow.date,
      ...(workflow.modifiedDate ? { modifiedDate: workflow.modifiedDate } : {}),
      category: workflow.category,
      body: null,
      seriesOrder: null,
    };
  }
  const series = seriesView(slug, locale);
  if (series) return series;
  const legacy = blogPosts[slug];
  if (!legacy) return null;
  return {
    slug,
    date: legacy.date,
    title: legacy.title,
    excerpt: legacy.excerpt,
    directAnswer: null,
    disclaimer: null,
    cta: null,
    sections: [],
    faqs: [],
    body: legacy.body,
    seriesOrder: null,
  };
}

/** The new editorial collection; PDPO and legacy archives retain their own order. */
export function listInsights(locale: AppLocale, category?: BlogCategory): BlogView[] {
  return WORKFLOW_BLOG_POSTS
    .filter((post) => !category || post.category === category)
    .map((post) => getBlogView(post.slug, locale)!)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function blogLinkHref(locale: AppLocale, href: string): string {
  return href.startsWith("/") ? `/${locale}${href}` : href;
}

/** Use recorded editorial dates only, never a build/request timestamp. */
export function buildBlogArticleSchema(post: BlogView, locale: AppLocale, siteUrl: string) {
  const root = siteUrl.replace(/\/+$/, "");
  const url = `${root}/${locale}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    ...(post.modifiedDate ? { dateModified: post.modifiedDate } : {}),
    inLanguage: localeToHtmlLang(locale),
    author: {
      "@type": "Person",
      "@id": `${root}/#founder`,
      name: AUTHOR.name,
      url: `${root}/${locale}/about`,
      sameAs: authorSameAs(),
    },
    publisher: {
      "@type": "Organization",
      "@id": `${root}/#organization`,
      name: AUTHOR.organization,
      url: root,
      logo: { "@type": "ImageObject", url: `${root}/innovatexp_color_no_bg.svg` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url, url },
    url,
  };
}

export function listSeries(locale: AppLocale): BlogView[] {
  return [...PDPO_BLOG_SERIES]
    .sort((a, b) => a.order - b.order)
    .map((post) => seriesView(post.slug, locale)!);
}

export function listArchive(): BlogView[] {
  return Object.entries(blogPosts)
    .map(([slug]) => getBlogView(slug, "en")!)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function seriesNeighbors(order: number): { previous: string | null; next: string | null } {
  const previous = PDPO_BLOG_SERIES.find((post) => post.order === order - 1)?.slug ?? null;
  const next = PDPO_BLOG_SERIES.find((post) => post.order === order + 1)?.slug ?? null;
  return { previous, next };
}

export function seriesTotal(): number {
  return SERIES_TOTAL;
}
