import type { Metadata } from "next";
import { isValidLocale } from "@/lib/i18n-routing";

const HOME_TITLE = "InnovateXP｜香港中小企 WhatsApp AI CRM・活動簽到・AI 顧問";
const HOME_DESCRIPTION =
  "為香港中小企提供 SmartSales CRM、EventXP 活動簽到系統與 AI 顧問服務。將 WhatsApp 查詢與活動 200 人名單變成可跟進 sales pipeline。雲端／On-Premise 可諮詢。Founder-led、14 年實戰經驗，免費 15 分鐘諮詢。";

const HOME_ALTERNATES: Metadata["alternates"] = {
  // Next metadata URL resolver drops ?query when pathname is "/"; `//` keeps ?lang= in output.
  canonical: "https://www.innovatexp.co/",
  languages: {
    "zh-HK": "https://www.innovatexp.co//?lang=zh-HK",
    en: "https://www.innovatexp.co//?lang=en",
    "x-default": "https://www.innovatexp.co/",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  return {
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    alternates: HOME_ALTERNATES,
    openGraph: {
      type: "website",
      locale: locale === "en" ? "en_HK" : "zh_HK",
      alternateLocale: locale === "en" ? ["zh_HK"] : ["en_HK"],
      url: "https://www.innovatexp.co/",
      siteName: "InnovateXP Limited",
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
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
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      images: ["/innovatexp_color_no_bg.svg"],
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
