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
      "Hong Kong AI business consultancy founded by Larry Lo. Fix one SME workflow first, then adopt AI, CRM, or automation when justified. Discovery Sprint from HK$6,800.",
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

export function getAIConsultingServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Business Consultancy — Discovery Sprint",
    description:
      "InnovateXP helps Hong Kong SMEs start with one workflow, prove a measurable quick win in 30 days (Discovery Sprint from HK$6,800), then expand AI or automation with controlled risk.",
    provider: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrl,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hong Kong",
    },
    url: `${siteUrl}/ai-consulting`,
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
