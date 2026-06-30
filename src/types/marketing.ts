import type { AppLocale } from "@/lib/i18n-routing";

export type MarketingFaq = {
  question: string;
  answer: string;
};

export type MarketingLink = {
  label: string;
  href: string;
};

export type ServicePageSlug =
  | "ai-training"
  | "ai-coaching"
  | "sme-ai-workflow"
  | "proposal-to-cash-ai";

export type ServiceSchemaKind = "ProfessionalService" | "Course" | "SoftwareApplication";

export type ServicePageContent = {
  slug: ServicePageSlug;
  schemaKind: ServiceSchemaKind;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  intro: string;
  audience: string[];
  painPoints: string[];
  deliverables: string[];
  expectedOutcomes: string[];
  proofPoints: string[];
  modules?: string[];
  relatedLinks: MarketingLink[];
  cta: {
    label: string;
    href: string;
    note: string;
  };
  faqs: MarketingFaq[];
};

export type LocalizedServicePageContent = Record<AppLocale, ServicePageContent>;

export type CaseStudyContent = {
  slug: string;
  title: string;
  summary: string;
  context: string;
  proofType: "product" | "training" | "implementation" | "technical-audit";
  audience: string;
  challenge: string[];
  approach: string[];
  deliverables: string[];
  outcomes: string[];
  relatedLinks: MarketingLink[];
};

export type VisionCopy = {
  statement: string;
  reason: string;
  helps: string;
  outcomes: string[];
  referralEnglish: string;
  referralTraditionalChinese: string;
};
