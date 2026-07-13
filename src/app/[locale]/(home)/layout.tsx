import type { Metadata } from "next";
import { isValidLocale, localeToOgLocale, ogAlternateLocales } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const HOME_TITLE = "AI商業升級教練｜中小企AI陪跑、SOP及流程優化｜InnovateXP";
const HOME_DESCRIPTION =
  "InnovateXP 由 Larry Lo 擔任 AI 商業升級教練，陪香港中小企先梳理 SOP、流程與 KPI，再按需要落地 AI 陪跑、automation、CRM 或 SaaS。";

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
      images: [{ ...OG_IMAGE, alt: "InnovateXP – AI Business Upgrade Coach for Hong Kong SMEs" }],
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
