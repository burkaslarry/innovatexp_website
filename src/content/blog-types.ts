import type { AppLocale } from "@/lib/i18n-routing";

export const BLOG_CATEGORIES = [
  "workflow-sop",
  "ai-data-governance",
  "crm-events-membership",
  "ai-visibility",
  "guides-comparisons",
] as const;

export type BlogCategory = (typeof BLOG_CATEGORIES)[number];
/** Internal links are locale-neutral paths; external references must be verified sources. */
export type BlogLink = { label: string; href: string };
export type BlogFaq = { question: string; answer: string };
export type BlogSection = { heading: string; paragraphs: string[] };

export type BlogLocaleCopy = {
  title: string;
  excerpt: string;
  directAnswer: string;
  disclaimer: string;
  sections: BlogSection[];
  faqs: BlogFaq[];
  cta: string;
};

export type WorkflowBlogCopy = BlogLocaleCopy & {
  keyTakeaways: [string, string, string];
  limitations: string;
  sources: BlogLink[];
  relatedServices: BlogLink[];
  relatedCases: BlogLink[];
};

export type WorkflowBlogPost = {
  slug: string;
  date: string;
  /** Set only when an editorial revision is actually tracked. */
  modifiedDate?: string;
  category: BlogCategory;
  locales: Record<AppLocale, WorkflowBlogCopy>;
};

export type LocalizedBlogPost = {
  slug: string;
  date: string;
  series: string | null;
  copy: BlogLocaleCopy;
};

export type PdpoPost = {
  slug: string;
  date: string;
  order: number;
  locales: Record<AppLocale, BlogLocaleCopy>;
};
