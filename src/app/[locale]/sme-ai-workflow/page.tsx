import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { getServicePage } from "@/content/service-pages";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/sme-ai-workflow";
const SLUG = "sme-ai-workflow" as const;
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
    alternates: {
      ...alternates,
      canonical: `${getSiteUrl()}/${locale}/ai-consulting`,
    },
    robots: { index: false, follow: true },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP SME AI Workflow" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function SmeAiWorkflowPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  permanentRedirect(`/${locale}/ai-consulting`);
}
