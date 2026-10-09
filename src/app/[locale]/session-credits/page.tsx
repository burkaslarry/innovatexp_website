import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SessionCreditsPageContent } from "@/components/pages/SessionCreditsPageContent";
import { getSessionCreditsCopy } from "@/content/session-credits";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";

const OG_IMAGE = "/opengraph-image" as const;
const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const copy = getSessionCreditsCopy(locale);
  const alternates = localeAlternates(locale, "/session-credits");
  const ogUrl =
    typeof alternates?.canonical === "string"
      ? alternates.canonical
      : `${siteUrlMeta}/${locale}/session-credits`;
  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    alternates,
    openGraph: {
      title: copy.metaTitle,
      description: copy.metaDescription,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630 }],
    },
  };
}

export default async function SessionCreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  return <SessionCreditsPageContent key={locale as AppLocale} />;
}
