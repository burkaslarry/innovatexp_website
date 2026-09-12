/* F04: Shared schema builders - Reusable Organization/Product helpers consumed by JSON-LD and tooling. */
type FAQQuestion = {
  question: string;
  answer: string;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InnovateXP Limited",
    alternateName: "InnovateXP",
    url: siteUrl,
    logo: `${siteUrl}/innovatexp_color_no_bg.svg`,
    description:
      "Hong Kong AI business consultancy founded by Larry Lo. Diagnose first, then AI agents and co-run. Public prices: Snapshot HK$3,000, Discovery from HK$6,800.",
    sameAs: [
      "https://www.linkedin.com/company/innovatexp",
      "https://www.linkedin.com/in/innovatexp/",
    ],
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
      "EventXP helps Hong Kong event teams run QR check-in, attendance tracking, lead scoring, and post-event follow-up. Trial HK$4,000 per event.",
    offers: {
      "@type": "Offer",
      price: "4000",
      priceCurrency: "HKD",
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
    offers: {
      "@type": "Offer",
      url: "https://visionquest-web.vercel.app",
      price: "0",
      priceCurrency: "HKD",
      description: "Frontend-only public demo. Implementation scoped after Discovery.",
    },
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
      "InnovateXP helps Hong Kong SMEs diagnose one revenue-blocking workflow, validate it in 30 days (Discovery from HK$6,800), then expand with AI agents or co-run advisory when justified.",
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
      lowPrice: "3000",
      highPrice: "13600",
      offerCount: 4,
      offers: [
        {
          "@type": "Offer",
          name: "AI Readiness Snapshot",
          price: "3000",
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          name: "30-day Discovery (up to 10 people)",
          price: "6800",
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          name: "Discovery workshop (11–30 people)",
          price: "13600",
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          name: "14-day automation trial",
          price: "3800",
          priceCurrency: "HKD",
        },
      ],
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
