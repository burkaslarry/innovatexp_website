import type { Metadata } from "next";
import { isValidLocale, localeToOgLocale, ogAlternateLocales } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const HOME_TITLE = "InnovateXP｜香港中小企 WhatsApp AI CRM・活動簽到・AI 顧問";
const HOME_DESCRIPTION =
  "為香港中小企提供 SmartSales CRM、EventXP 活動簽到系統與 AI 顧問服務。將 WhatsApp 查詢與活動 200 人名單變成可跟進 sales pipeline。雲端／On-Premise 可諮詢。Founder-led、14 年實戰經驗，免費 15 分鐘諮詢。";

const OG_IMAGE = { url: "/opengraph-image" as const, width: 1200, height: 630 };

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const alternates = localeAlternates(locale, "/");
  const ogUrl = typeof alternates?.canonical === "string" ? alternates.canonical : undefined;
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    alternates,
    openGraph: {
      type: "website",
      locale: localeToOgLocale(locale),
      alternateLocale: ogAlternateLocales(locale),
      url: ogUrl,
      siteName: "InnovateXP Limited",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: [{ ...OG_IMAGE, alt: "InnovateXP – Hong Kong SME AI CRM, EventXP, AI consulting" }],
    },
    twitter: {
      card: "summary_large_image",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
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
