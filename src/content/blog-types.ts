import type { AppLocale } from "@/lib/i18n-routing";

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
