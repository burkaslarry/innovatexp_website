import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "../ThemeContext";
import { LanguageProvider } from "../LanguageContext";
import StructuredData from "../components/StructuredData";
import { PrimaryFabCluster } from "@/components/PrimaryFabCluster";
import { InquiryCheckoutDrawer } from "@/components/inquiry-cart/InquiryCheckoutDrawer";
import { InquiryCartProvider } from "@/context/InquiryCartContext";
import { LocaleHtmlLang } from "../components/LocaleHtmlLang";
import {
  isValidLocale,
  localeToOgLocale,
  localeUsesChineseCopy,
  ogAlternateLocales,
  LOCALES,
  type AppLocale,
} from "@/lib/i18n-routing";

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

  return {
    title: localeUsesChineseCopy(loc)
      ? "AI商業顧問｜先執順流程再落地AI｜InnovateXP"
      : "AI Business Consultancy | Fix Workflows, Then AI | InnovateXP",
    description: localeUsesChineseCopy(loc)
      ? "InnovateXP 陪中小企先執順 SOP、設定 KPI、試行 AI，再按需要落地 automation、CRM 或 SaaS。預約 30 分鐘流程診斷。"
      : "InnovateXP helps SMEs fix workflows first, then adopt AI through advisory, SOP optimization, KPI review, practical trials, and optional automation or SaaS. Book a 30-min review.",
    keywords:
      "AI business consultant, SmartSales CRM, smart sales CRM, private AI solutions, SME automation consultant, customer experience consulting, AI 商業顧問, 香港中小企 AI, SOP 流程優化, WhatsApp CRM",
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
      title: localeUsesChineseCopy(loc)
        ? "AI商業顧問｜先執順流程再落地AI｜InnovateXP"
        : "AI Business Consultancy | Fix Workflows, Then AI | InnovateXP",
      description: localeUsesChineseCopy(loc)
        ? "先執順流程，再落地 AI。30 日 Discovery Sprint、陪跑計劃與按需系統落地。"
        : "Fix the workflow first. Then put AI to work through Discovery Sprints, advisory programs, and optional systems.",
      images: [
        {
          ...OG_IMAGE_DEFAULT,
          alt: "InnovateXP – AI Consulting & Global AI Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: localeUsesChineseCopy(loc)
        ? "AI商業顧問｜先執順流程再落地AI｜InnovateXP"
        : "AI Business Consultancy | Fix Workflows, Then AI | InnovateXP",
      description: localeUsesChineseCopy(loc)
        ? "AI 商業顧問：先梳理 SOP 和 KPI，再試行 AI，最後按需要落地 automation、CRM 或 SaaS。"
        : "Clarify SOPs and KPIs first, trial AI, then implement automation, CRM, or SaaS only when needed.",
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
            {children}
            <InquiryCheckoutDrawer />
            <PrimaryFabCluster />
          </InquiryCartProvider>
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
