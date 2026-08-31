import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "../ThemeContext";
import { LanguageProvider } from "../LanguageContext";
import StructuredData from "../components/StructuredData";
import { PrimaryFabCluster } from "@/components/PrimaryFabCluster";
import { DesktopScrollCta } from "@/components/DesktopScrollCta";
import { InquiryCheckoutDrawer } from "@/components/inquiry-cart/InquiryCheckoutDrawer";
import { InquiryCartProvider } from "@/context/InquiryCartContext";
import { LocaleHtmlLang } from "../components/LocaleHtmlLang";
import {
  isValidLocale,
  localeToOgLocale,
  ogAlternateLocales,
  LOCALES,
  type AppLocale,
} from "@/lib/i18n-routing";
import { homeSeo } from "@/content/page-seo";

const OG_IMAGE_DEFAULT = {
  url: "/opengraph-image" as const,
  width: 1200,
  height: 630,
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.innovatexp.co");
  const canonical = `${siteUrl}/${loc}`;
  const seo = homeSeo(loc as AppLocale);
  const ogTitle = seo.ogTitle ?? seo.title;
  const ogDescription = seo.ogDescription ?? seo.description;

  return {
    title: seo.title,
    description: seo.description,
    keywords: [
      "Hong Kong AI consultant",
      "AI business consultant Hong Kong",
      "中小企 AI 顧問",
      "香港 AI 商業顧問",
      "WhatsApp CRM Hong Kong",
      "SmartSales CRM",
      "EventXP",
      "VisionXP",
      "strabismus training",
      "斜視訓練",
      "SME AI workflow",
      "Discovery Sprint",
      "SOP 流程優化",
      "generative engine optimization",
      "AI SEO GEO Hong Kong",
      "Larry Lo InnovateXP",
    ].join(", "),
    authors: [{ name: "InnovateXP Limited", url: "https://www.innovatexp.co" }],
    creator: "InnovateXP Limited",
    publisher: "InnovateXP Limited",
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: "website",
      locale: localeToOgLocale(loc),
      alternateLocale: ogAlternateLocales(loc),
      url: canonical,
      siteName: "InnovateXP Limited",
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          ...OG_IMAGE_DEFAULT,
          alt: "InnovateXP – Hong Kong AI Business Consultancy",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [OG_IMAGE_DEFAULT.url],
      creator: "@innovatexp",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    },
  };
}

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  return (
    <>
      <LocaleHtmlLang locale={locale} />
      <ThemeProvider>
        <LanguageProvider locale={locale as AppLocale}>
          <InquiryCartProvider>
            <StructuredData />
            <div>{children}</div>
            <InquiryCheckoutDrawer />
            <PrimaryFabCluster />
            <DesktopScrollCta />
          </InquiryCartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
