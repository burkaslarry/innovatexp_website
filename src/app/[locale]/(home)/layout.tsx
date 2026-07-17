import type { Metadata } from "next";
import { isValidLocale, localeToOgLocale, ogAlternateLocales, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { homeSeo } from "@/content/page-seo";

const OG_IMAGE = { url: "/opengraph-image" as const, width: 1200, height: 630 };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = homeSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/");
  const ogUrl = typeof alternates?.canonical === "string" ? alternates.canonical : undefined;
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      type: "website",
      locale: localeToOgLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      url: ogUrl,
      siteName: "InnovateXP Limited",
      title: seo.title,
      description: seo.description,
      images: [{ ...OG_IMAGE, alt: "InnovateXP – AI Business Consultancy" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      images: [OG_IMAGE.url],
      creator: "@innovatexp",
    },
  };
}

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
