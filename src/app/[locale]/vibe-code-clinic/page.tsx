import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SessionCreditsPageContent } from "@/components/pages/SessionCreditsPageContent";
import { getVibeCodeClinicCopy } from "@/content/vibe-code-clinic";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { cartAvailableOffers } from "@/lib/commerce/config";

export const dynamic = "force-dynamic";
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
  const copy = getVibeCodeClinicCopy(locale);
  const alternates = localeAlternates(locale, "/vibe-code-clinic");
  const ogUrl =
    typeof alternates?.canonical === "string"
      ? alternates.canonical
      : `${siteUrlMeta}/${locale}/vibe-code-clinic`;
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

export default async function VibeCodeClinicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const checkoutEnabled = cartAvailableOffers().includes("sessionCredits1000");
  return (
    <SessionCreditsPageContent
      key={locale as AppLocale}
      variant="clinic"
      checkoutEnabled={checkoutEnabled}
    />
  );
}
