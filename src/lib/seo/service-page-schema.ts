import { localeToHtmlLang, type AppLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";
import type { CaseStudyContent, ServicePageContent } from "@/types/marketing";

function breadcrumbFor(locale: AppLocale, path: string, pageName: string) {
  const siteUrl = getSiteUrl();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: `${siteUrl}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: pageName,
        item: `${siteUrl}/${locale}${path}`,
      },
    ],
  };
}

export function buildServicePageJsonLd({
  locale,
  content,
}: {
  locale: AppLocale;
  content: ServicePageContent;
}) {
  const siteUrl = getSiteUrl();
  const path = `/${content.slug}`;
  const pageUrl = `${siteUrl}/${locale}${path}`;
  const provider = {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: "InnovateXP Limited",
    url: siteUrl,
  };

  const serviceOrCourse =
    content.schemaKind === "Course"
      ? {
          "@context": "https://schema.org",
          "@type": "Course",
          "@id": `${pageUrl}#course`,
          name: content.title,
          description: content.metaDescription,
          inLanguage: localeToHtmlLang(locale),
          provider,
          educationalCredentialAwarded: "Practical AI workflow capability",
          teaches: content.modules ?? content.deliverables,
          audience: content.audience,
          url: pageUrl,
        }
      : {
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          "@id": `${pageUrl}#service`,
          name: content.title,
          description: content.metaDescription,
          provider,
          areaServed: {
            "@type": "AdministrativeArea",
            name: "Hong Kong",
          },
          serviceType: content.eyebrow,
          audience: content.audience,
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: content.pricing?.title ?? `${content.title} deliverables`,
            itemListElement: content.pricing
              ? content.pricing.plans.map((plan, index) => ({
                  "@type": "Offer",
                  position: index + 1,
                  name: plan.name,
                  priceCurrency: "HKD",
                  description: `${plan.fit} ${plan.features.join(" ")}`,
                  itemOffered: {
                    "@type": "Service",
                    name: plan.name,
                  },
                }))
              : content.deliverables.map((item, index) => ({
                  "@type": "Offer",
                  position: index + 1,
                  itemOffered: {
                    "@type": "Service",
                    name: item,
                  },
                })),
          },
          url: pageUrl,
        };

  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    url: pageUrl,
    mainEntity: content.faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return [serviceOrCourse, faq, breadcrumbFor(locale, path, content.title)];
}

export function buildCaseStudiesJsonLd({
  locale,
  cases,
}: {
  locale: AppLocale;
  cases: CaseStudyContent[];
}) {
  const siteUrl = getSiteUrl();
  const path = "/case-studies";
  const pageUrl = `${siteUrl}/${locale}${path}`;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${pageUrl}#collection`,
    name: "InnovateXP project cases and proof points",
    description:
      "Project cases for InnovateXP AI training, SME AI workflow consulting, SmartSales CRM, EventXP, Proposal-to-Cash AI, and system rescue work.",
    inLanguage: localeToHtmlLang(locale),
    url: pageUrl,
    about: ["AI training", "SME AI workflow consulting", "AI coaching", "WhatsApp CRM automation"],
    mainEntity: cases.map((item) => ({
      "@type": "CreativeWork",
      name: item.title,
      description: item.summary,
      audience: item.audience,
      keywords: item.proofType,
    })),
  };

  return [collection, breadcrumbFor(locale, path, "Case Studies")];
}
