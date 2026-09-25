/* F04: Shared schema builders - Reusable Organization/Product helpers consumed by JSON-LD and tooling. */
import { AUTHOR, authorSameAs } from "@/lib/author";
import { PRICING } from "@/content/pricing";

type FAQQuestion = {
  question: string;
  answer: string;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export function getPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${siteUrl}/#founder`,
    name: AUTHOR.name,
    alternateName: AUTHOR.alternateName,
    jobTitle: AUTHOR.jobTitle,
    url: siteUrl,
    image: `${siteUrl}/mypresent.jpg`,
    sameAs: authorSameAs(),
    worksFor: {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: AUTHOR.organization,
      url: siteUrl,
    },
    knowsAbout: [
      "Business Workflow Diagnosis",
      "Event and membership operations",
      "EventXP",
      "SmartSales CRM",
      "Generative Engine Optimization",
      "AI SEO",
      "Hong Kong SME automation",
    ],
  };
}

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: AUTHOR.organization,
    alternateName: "InnovateXP",
    url: siteUrl,
    logo: `${siteUrl}/innovatexp_color_no_bg.svg`,
    description:
      "Hong Kong AI business consultancy founded by Larry Lo. Diagnose first, then AI agents and co-run. Fees quoted after diagnosis by workflow complexity.",
    founder: {
      "@type": "Person",
      "@id": `${siteUrl}/#founder`,
      name: AUTHOR.name,
      sameAs: authorSameAs(),
    },
    sameAs: [AUTHOR.linkedInCompany, AUTHOR.linkedInPersonal],
  };
}

export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: AUTHOR.organization,
    alternateName: "InnovateXP",
    url: siteUrl,
    inLanguage: ["zh-HK", "en", "zh-TW", "ja", "de"],
    publisher: { "@id": `${siteUrl}/#organization` },
    author: { "@id": `${siteUrl}/#founder` },
  };
}

export function getSmartSalesProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "SmartSales CRM",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description:
      "SmartSales CRM is a WhatsApp-led sales CRM for Hong Kong SMEs: centralize leads, chat context, reminders, and pipeline stages. Trial HK$5,000.",
    offers: {
      "@type": "Offer",
      price: "5000",
      priceCurrency: "HKD",
    },
    url: `${siteUrl}/smartsales-crm`,
  };
}

export function getEventXPProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
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

export function getVisionXPProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "VisionXP",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    inLanguage: ["zh-HK", "en"],
    isAccessibleForFree: true,
    description:
      "VisionXP is InnovateXP’s technology prototype / AI visual-tracking demo for paediatric training workflows (ages 3–12). Frontend-only public demo — no login, no patient data. Not a medical diagnostic tool, not a registered medical device, and not a substitute for professional optometry or ophthalmology examination.",
    featureList: [
      "Parent portal: daily tasks, progress, streaks",
      "Optometrist portal: prescriptions, compliance, reports",
      "Ages 3–12; daily 15–20 minute sessions",
      "Cantonese / English UI",
      "Frontend-only demo; no login; no patient data stored",
    ],
    sameAs: ["https://visionquest-web.vercel.app"],
    url: `${siteUrl}/visionxp`,
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
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Business Consultancy — Discovery",
    description:
      "InnovateXP helps Hong Kong SMEs diagnose one revenue-blocking workflow, validate it, then expand with practical AI support or co-run advisory when justified.",
    provider: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrl,
    },
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
        "Snapshot HK$3,000; Discovery Sprint HK$6,800 for up to 10 people or HK$13,600 for 11–30. Deeper implementation is scoped after diagnosis.",
      url: `${siteUrl}/zh-hk/bookme`,
    },
  };
}

export function getArtkalBeadPatternSchema(url: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Artkal Bead Pattern Generator",
    alternateName: "拼豆圖紙生成器",
    applicationCategory: "DesignApplication",
    operatingSystem: "Web",
    isAccessibleForFree: true,
    url,
    description:
      "Browser tool that converts photos into Artkal fuse-bead blueprints with CIEDE2000 color matching, per-color bead counts, and 1:1 PDF/PNG export.",
    provider: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrl,
    },
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "HKD",
    },
  };
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
