import type { AppLocale } from "@/lib/i18n-routing";
import landingEn from "@/messages/landing.en.json";
import landingZhHk from "@/messages/landing.zh-hk.json";
import landingZhTw from "@/messages/landing.zh-tw.json";
import landingJa from "@/messages/landing.ja.json";
import landingDe from "@/messages/landing.de.json";

export const HOMEPAGE_PLACEHOLDERS = {
  emailAddress: "info@innovatexp.co",
  linkedinUrl: "https://www.linkedin.com/in/innovatexp/",
} as const;

type SectionItem = {
  title: string;
  body: string;
};

export type VisionXpCopy = {
  eyebrow: string;
  title: string;
  tagline: string;
  intro: string;
  price: string;
  points: string[];
  portals: { name: string; body: string }[];
  demoCta: string;
  pageCta: string;
  note: string;
  /** Legal / compliance block — required on every VisionXP surface */
  compliance: {
    title: string;
    lead: string;
    items: { title: string; body: string }[];
  };
  page: {
    whatTitle: string;
    whatBody: string;
    whoTitle: string;
    whoItems: string[];
    notTitle: string;
    notItems: string[];
    howTitle: string;
    howItems: { name: string; text: string }[];
    faqTitle: string;
    faqs: { question: string; answer: string }[];
    relatedTitle: string;
    ctaTitle: string;
    ctaBody: string;
  };
};

type CaseStudy = {
  industry: string;
  title: string;
  before: string;
  sprint: string;
  after: string;
  metric: string;
};

/*
 * Product merchandising copy is one type per job so UI components
 * depend on a single shape, not the whole homepage dictionary.
 */
export type ProductPosterItem = {
  id: string;
  poster: string;
  eyebrow: string;
  name: string;
  tagline: string;
  price: string;
  body: string;
  points: string[];
};

export type SystemCareCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  tiers: {
    name: string;
    price: string;
    response: string;
    points: string[];
  }[];
  boundary: string;
};

export type ReadinessCopy = {
  eyebrow: string;
  title: string;
  price: string;
  intro: string;
  points: string[];
  excludes: string;
  upgrade: string;
  educationTitle: string;
  educationIntro: string;
  educationPoints: string[];
};

export type ProductPackagesCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  navLabel: string;
  securityTitle: string;
  securityNote: string;
  items: ProductPosterItem[];
  systemCare: SystemCareCopy;
  readiness: ReadinessCopy;
};

export type HomepageContent = {
  brandTitle: string;
  brandSubtitle: string;
  nav: {
    home: string;
    diagnosis: string;
    services: string;
    plans: string;
    products: string;
    visionXp: string;
    cases: string;
    about: string;
    faq: string;
    cta: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    description: string;
    fitAudience: string;
    primaryCta: string;
    secondaryCta: string;
    trustPoints: string[];
    diagnosticInputs: string[];
    diagnosticOutput: string;
    diagnosticCaption: string;
    imageAlt: string;
  };
  problem: {
    eyebrow: string;
    title: string;
    items: SectionItem[];
    quote: string;
  };
  approach: {
    eyebrow: string;
    title: string;
    intro: string;
    steps: { label: string; title: string; body: string }[];
  };
  services: {
    eyebrow: string;
    title: string;
    items: SectionItem[];
  };
  consultancy: {
    eyebrow: string;
    title: string;
    intro: string;
    fitNote: string;
    startingBadge: string;
    plans: {
      name: string;
      /** Public price line — fixed HKD for Sprint; scoped quote for longer programs */
      priceLabel: string;
      body: string;
      deliverables: string[];
      cta: string;
    }[];
  };
  products: ProductPackagesCopy;
  visionXp: VisionXpCopy;
  cases: {
    eyebrow: string;
    title: string;
    intro: string;
    beforeLabel: string;
    sprintLabel: string;
    afterLabel: string;
    metricLabel: string;
    items: CaseStudy[];
  };
  whyUs: {
    eyebrow: string;
    title: string;
    intro: string;
    rows: { opponent: string; difference: string }[];
    punchline: string;
  };
  about: {
    eyebrow: string;
    title: string;
    intro: string;
    body: string[];
    identity: string;
    portraitAlt: string;
  };
  faq: {
    title: string;
    items: { question: string; answer: string }[];
  };
  finalCta: {
    title: string;
    body: string;
    primary: string;
    secondary: string;
  };
  footer: {
    title: string;
    role: string;
    tagline: string;
    privacy: string;
    copyright: string;
  };
};

/**
 * Landing-page copy dictionaries live in `src/messages/landing.*.json`
 * (en / zh-hk / zh-tw / ja / de). Keep structure aligned with HomepageContent.
 */
const byLocale: Record<AppLocale, HomepageContent> = {
  en: landingEn as HomepageContent,
  "zh-hk": landingZhHk as HomepageContent,
  "zh-tw": landingZhTw as HomepageContent,
  ja: landingJa as HomepageContent,
  de: landingDe as HomepageContent,
};

export function getHomepageContent(locale: AppLocale): HomepageContent {
  return byLocale[locale] ?? byLocale["zh-hk"];
}
