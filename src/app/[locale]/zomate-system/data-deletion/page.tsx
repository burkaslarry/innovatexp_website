import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getZomateDataDeletion } from "@/content/legal-zomate";
import { LegalPolicyPage } from "@/features/legal/LegalPolicyPage";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/zomate-system/data-deletion";
const OG_IMAGE = "/opengraph-image" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const content = getZomateDataDeletion(locale);
  const alternates = localeAlternates(locale, PATH);
  const canonical =
    typeof alternates?.canonical === "string"
      ? alternates.canonical
      : `${getSiteUrl()}/${locale}${PATH}`;

  return {
    title: content.metaTitle,
    description: content.metaDescription,
    alternates,
    robots: { index: true, follow: true },
    openGraph: {
      title: content.metaTitle,
      description: content.metaDescription,
      url: canonical,
      siteName: "ZOMATE FITNESS",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Zomate User Data Deletion" }],
    },
    twitter: {
      card: "summary_large_image",
      title: content.metaTitle,
      description: content.metaDescription,
      images: [OG_IMAGE],
    },
  };
}

export default async function ZomateDataDeletionPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const content = getZomateDataDeletion(loc);

  return <LegalPolicyPage locale={loc} content={content} />;
}
