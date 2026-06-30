import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getServicePage } from "@/content/service-pages";
import { ServiceLandingPage } from "@/features/marketing/ServiceLandingPage";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { buildServicePageJsonLd } from "@/lib/seo/service-page-schema";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/proposal-to-cash-ai";
const SLUG = "proposal-to-cash-ai" as const;
const OG_IMAGE = "/opengraph-image" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const content = getServicePage(SLUG, locale);
  const alternates = localeAlternates(locale, PATH);
  const canonical = typeof alternates?.canonical === "string" ? alternates.canonical : `${getSiteUrl()}/${locale}${PATH}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates,
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP Proposal-to-Cash AI" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function ProposalToCashAiPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const content = getServicePage(SLUG, loc);
  const jsonLd = buildServicePageJsonLd({ locale: loc, content });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <ServiceLandingPage locale={loc} content={content} />
    </>
  );
}
