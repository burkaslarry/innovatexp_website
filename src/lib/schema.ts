type FAQQuestion = {
  question: string;
  answer: string;
};

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "InnovateXP",
    url: siteUrl,
    logo: `${siteUrl}/innovatexp_color_no_bg.svg`,
    sameAs: [
      "https://www.linkedin.com/company/innovatexp",
      "https://www.linkedin.com/in/larry-lo-804a50165/",
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
      "SmartSales CRM is a practical CRM solution for Hong Kong sales teams that centralizes lead follow-up and improves pipeline visibility.",
    offers: {
      "@type": "Offer",
      price: "18888",
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
      "EventXP is an event management platform for Hong Kong teams to manage check-in flow, attendance tracking, and post-event follow-up actions.",
    offers: {
      "@type": "Offer",
      price: "18888",
      priceCurrency: "HKD",
    },
    url: `${siteUrl}/eventxp`,
  };
}

export function getAIConsultingServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "AI Consulting Services",
    description:
      "AI consulting services for Hong Kong SMEs focused on practical implementation roadmaps, workflow automation, and operational improvements.",
    provider: {
      "@type": "Organization",
      name: "InnovateXP",
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
