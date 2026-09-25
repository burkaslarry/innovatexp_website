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
import { AUTHOR } from "@/lib/author";

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
      "Larry Lo",
      "Larry Lo InnovateXP",
      "業務聽診",
      "先執順流程再落地 AI",
      "Business workflow diagnosis Hong Kong",
      "AI Discovery Sprint",
      "Hong Kong AI consultant",
      "AI顧問",
      "香港 AI 顧問",
      "AI business consultant Hong Kong",
      "中小企 AI 顧問",
      "香港 AI 商業顧問",
      "中小企業務流程診斷香港",
      "WhatsApp Excel 管理太亂",
      "SOP 自動化顧問",
      "AI 導入前準備",
      "香港 AI 工作坊",
      "BNI Power Team",
      "Discovery Sprint",
      "SOP 流程優化",
      "generative engine optimization",
      "AI SEO GEO Hong Kong",
    ].join(", "),
    authors: [
      { name: AUTHOR.name, url: AUTHOR.linkedInPersonal },
      { name: AUTHOR.organization, url: siteUrl },
    ],
    creator: AUTHOR.name,
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
            <div data-locale={locale}>{children}</div>
            <InquiryCheckoutDrawer />
            <PrimaryFabCluster />
            <DesktopScrollCta />
          </InquiryCartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
