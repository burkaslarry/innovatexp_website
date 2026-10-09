import type { AppLocale } from "@/lib/i18n-routing";
import { blogPosts } from "@/content/blog-posts";
import { PDPO_BLOG_SERIES } from "@/content/pdpo-blog-series";

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
};

const SERIES_TOTAL = PDPO_BLOG_SERIES.length;

export const BLOG_POST_SLUGS = Object.freeze([
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
  };
}

export function getBlogView(slug: string, locale: AppLocale): BlogView | null {
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
