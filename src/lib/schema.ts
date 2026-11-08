/* F04: Shared schema builders - Reusable Organization/Product helpers consumed by JSON-LD and tooling. */
import { AUTHOR, authorSameAs } from "@/lib/author";
import { PRICING } from "@/content/pricing";
import { getSiteUrl } from "@/lib/site-url";

type FAQQuestion = {
  question: string;
  answer: string;
};

/** Escape HTML delimiters before embedding JSON in a script element. */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function getPersonSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#founder`,
    name: AUTHOR.name,
    alternateName: AUTHOR.alternateName,
    jobTitle: AUTHOR.jobTitle,
    url: siteUrl,
    image: `${siteUrl}/mypresent.jpg`,
    description:
      `Founder of InnovateXP Limited and AI Business Consultant in Hong Kong. ${AUTHOR.yearsExperience} years of IT delivery. Method: Business Workflow Diagnosis — say so if a team should not buy a system yet.`,
    sameAs: authorSameAs(),
    worksFor: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: AUTHOR.organization,
      url: siteUrl,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "North Point",
      addressRegion: "Hong Kong",
      addressCountry: "HK",
    },
    knowsAbout: [
      "Business Workflow Diagnosis",
      "業務聽診",
      "Event and membership operations",
      "EventXP",
      "SmartSales CRM",
      "Generative Engine Optimization",
      "AI SEO",
      "Hong Kong SME workflow",
    ],
  };
}

export function getOrganizationSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${siteUrl}/#organization`,
    name: AUTHOR.organization,
    alternateName: ["InnovateXP", "IXP"],
    legalName: AUTHOR.organization,
    url: siteUrl,
    logo: `${siteUrl}/innovatexp_color_no_bg.svg`,
    image: `${siteUrl}/innovatexp_color_no_bg.svg`,
    geo: {
      "@type": "GeoCoordinates",
      latitude: 22.2908,
      longitude: 114.195,
    },
    priceRange: "$$",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    description:
      "Hong Kong AI business consultancy founded by Larry Lo. Diagnose first, then AI agents and co-run. Fees quoted after diagnosis by workflow complexity.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "North Point",
      addressRegion: "Hong Kong",
      addressCountry: "HK",
    },
    areaServed: { "@type": "AdministrativeArea", name: "Hong Kong" },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: AUTHOR.email,
      availableLanguage: ["zh-HK", "en"],
    },
    founder: { "@id": `${siteUrl}/#founder` },
    sameAs: [AUTHOR.linkedInCompany],
    knowsAbout: [
      "Business Workflow Diagnosis",
      "業務聽診",
      "Hong Kong SME workflow",
      "EventXP",
      "SmartSales CRM",
    ],
  };
}

export function getWebSiteSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteUrl}/#website`,
    name: AUTHOR.organization,
    alternateName: "InnovateXP",
    url: siteUrl,
    inLanguage: ["zh-HK", "en", "zh-TW", "ja", "de"],
    publisher: { "@id": `${siteUrl}/#organization` },
    author: { "@id": `${siteUrl}/#founder` },
  };
}

export function getSmartSalesProductSchema() {
  const siteUrl = getSiteUrl();
  const s = PRICING.tools.smartSales;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#smartsales-crm`,
    name: "SmartSales CRM",
    serviceType: "CRM workflow implementation and technical care",
    description: "Scoped CRM workflow pilot, production setup and monthly technical care, priced separately. Third-party licences, WhatsApp APIs, AI usage, membership rules and custom integrations or development are separately scoped.",
    url: `${siteUrl}/smartsales-crm`,
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: { "@type": "AdministrativeArea", name: "Hong Kong and Greater Bay Area" },
    offers: [
      { "@type": "Offer", name: "Bounded workflow pilot", price: s.trial, priceCurrency: "HKD", description: "3 participants, 1 workflow, 50 sample records and 14 trial days. No production integration." },
      { "@type": "Offer", name: "Starter setup", priceCurrency: "HKD", priceSpecification: { "@type": "PriceSpecification", minPrice: s.setupStarter, priceCurrency: "HKD" }, description: "One-time setup from this amount; up to 5 users and 1 pipeline. Care and licences separate." },
      { "@type": "Offer", name: "Starter technical care", priceCurrency: "HKD", priceSpecification: { "@type": "UnitPriceSpecification", minPrice: s.maintenanceStarterMonthly, priceCurrency: "HKD", unitText: "per month" }, description: "Post-setup care with 1 remote support hour monthly; not implementation or custom development." },
    ],
  };
}

export function getEventXPProductSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "@id": `${siteUrl}/#eventxp-software`,
    provider: { "@id": `${siteUrl}/#organization` },
    name: "EventXP",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "EventXP is a configurable event and membership operations solution for Hong Kong organisations. Start with a one-event workflow trial at HK$4,000; ongoing care starts at HK$880 per month.",
    featureList: [
      "Event setup and attendee fields",
      "Member, guest and observer records",
      "QR and kiosk check-in",
      "Real-time attendance tracking and reporting",
      "Roster import and export",
      "Optional membership status / scoring",
      "Optional AI matching and seating recommendations",
      "Post-event follow-up workflow",
    ],
    offers: {
      "@type": "Offer",
      price: "4000",
      priceCurrency: "HKD",
      description:
        "One-event workflow trial. Larger implementation is scoped after diagnosis.",
      url: `${siteUrl}/bookme`,
    },
    url: `${siteUrl}/eventxp`,
  };
}

export function getFitnessXPProductSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "FitnessXP",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "FitnessXP helps Hong Kong training centres, tutoring schools, and fitness / yoga / pilates studios manage class timetables, coaches, attendance, and renewals—starting simple after a business diagnosis. From HK$499 / month.",
    featureList: [
      "Class timetable management",
      "Coach / instructor scheduling",
      "Student attendance and package renewal",
      "Reduce WhatsApp and Excel chase-ups",
    ],
    offers: {
      "@type": "Offer",
      price: "499",
      priceCurrency: "HKD",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: "499",
        priceCurrency: "HKD",
        unitText: "per month",
      },
    },
    url: `${siteUrl}/fitnessxp`,
  };
}

export function getHowToSchema({
  name,
  description,
  url,
  steps,
}: {
  name: string;
  description: string;
  url: string;
  steps: { name: string; text: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    url,
    step: steps.map((item, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: item.name,
      text: item.text,
    })),
  };
}

export function getAIConsultingServiceSchema() {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteUrl}/#ai-consulting`,
    name: "AI Business Consultancy — Discovery",
    description:
      "InnovateXP helps Hong Kong SMEs diagnose one revenue-blocking workflow, validate it, then expand with practical AI support or co-run advisory when justified.",
    provider: { "@id": `${siteUrl}/#organization` },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hong Kong",
    },
    url: `${siteUrl}/zh-hk/ai-consulting`,
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.quickCash.aiReadinessAssessment),
      highPrice: String(PRICING.consultancy.discoveryWorkshop11To30),
      offerCount: 3,
      description:
        "Snapshot HK$3,880; Discovery Sprint HK$6,880 for up to 10 people or HK$13,600 for 11–30. Deeper implementation is scoped after diagnosis.",
      url: `${siteUrl}/zh-hk/bookme`,
    },
  };
}

export function getBeadPatternSchema(url: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Bead Pattern Generator",
    alternateName: "拼豆圖紙生成器",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    url,
    description:
      "Browser tool that converts photos into fuse-bead blueprints with CIEDE2000 color matching, per-color bead counts, and 1:1 PDF/PNG export.",
    provider: { "@id": `${siteUrl}/#organization` },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "HKD",
    },
  };
}

/** @deprecated Use getBeadPatternSchema */
export function getArtkalBeadPatternSchema(url: string) {
  return getBeadPatternSchema(url);
}

export function getFAQPageSchema({
  url,
  questions,
}: {
  url: string;
  questions: FAQQuestion[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url,
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}
