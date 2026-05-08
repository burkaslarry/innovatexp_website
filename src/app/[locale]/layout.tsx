import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ThemeProvider } from "../ThemeContext";
import { LanguageProvider } from "../LanguageContext";
import StructuredData from "../components/StructuredData";
import { FloatingWhatsAppButton } from "@/components/FloatingWhatsAppButton";
import { LocaleHtmlLang } from "../components/LocaleHtmlLang";
import { isValidLocale, localeToLanguage } from "@/lib/i18n-routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "https://www.innovatexp.co");

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: loc } = await params;
  if (!isValidLocale(loc)) return {};

  const canonical = `${siteUrl}/${loc}`;

  return {
    title: "InnovateXP | WhatsApp CRM, EventXP, AI Training",
    description:
      loc === "en"
        ? "Turn WhatsApp inquiries and event attendee lists into a structured sales pipeline for Hong Kong SMEs — cloud or on-premise deployment and practical AI training."
        : "香港中小企 AI CRM：將 WhatsApp 查詢同活動名單變成可跟進 pipeline，支援 Cloud Platform 或 On-Premise 上架及 AI training。",
    keywords:
      "香港 WhatsApp CRM, 香港中小企 AI 自動化, BNI 跟進系統, AI training Hong Kong, Azure OpenAI implementation, Alibaba Cloud AI, GCP AI deployment, AWS AI deployment, on-premise AI deployment, AI consulting, AI CRM, Hong Kong SME AI automation, smart sales automation, WhatsApp CRM, event check-in system, EventXP, SmartSales CRM",
    authors: [{ name: "Larry Lo", url: "https://www.linkedin.com/in/larry-lo-804a50165/" }],
    creator: "InnovateXP Limited",
    publisher: "InnovateXP Limited",
    metadataBase: new URL(siteUrl),
    openGraph: {
      type: "website",
      locale: loc === "en" ? "en_HK" : "zh_HK",
      alternateLocale: loc === "en" ? ["zh_HK"] : ["en_HK"],
      url: canonical,
      siteName: "InnovateXP Limited",
      title: "InnovateXP | WhatsApp CRM, EventXP, AI Training",
      description:
        loc === "en"
          ? "Structured follow-up for Hong Kong SMEs: WhatsApp CRM, EventXP, AI training — cloud or on-premise."
          : "香港中小企 AI CRM：WhatsApp 查詢同活動名單變成可跟進 pipeline，支援 Cloud Platform / On-Premise 上架。",
      images: [
        {
          url: "/innovatexp_color_no_bg.svg",
          width: 1200,
          height: 630,
          alt: "InnovateXP – AI Consulting & Global AI Solutions",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "InnovateXP | WhatsApp CRM, EventXP, AI Training",
      description:
        loc === "en"
          ? "Structured follow-up for Hong Kong SMEs: WhatsApp CRM, EventXP, AI training."
          : "香港中小企 AI CRM：WhatsApp 查詢同活動名單變成可跟進 pipeline，支援 Cloud Platform / On-Premise 上架。",
      images: ["/innovatexp_color_no_bg.svg"],
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
  return [{ locale: "en" }, { locale: "zh-hk" }];
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
        <LanguageProvider initialLang={localeToLanguage(locale)}>
          <StructuredData />
          {children}
          <FloatingWhatsAppButton />
        </LanguageProvider>
      </ThemeProvider>
    </>
  );
}
