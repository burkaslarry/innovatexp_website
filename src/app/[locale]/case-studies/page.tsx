import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudies, getSpeakingRecords } from "@/content/case-studies";
import { getInnovatexpVision } from "@/content/service-pages";
import { CaseStudiesPage } from "@/features/marketing/CaseStudiesPage";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { buildCaseStudiesJsonLd } from "@/lib/seo/service-page-schema";
import { getSiteUrl } from "@/lib/site-url";

const PATH = "/case-studies";
const OG_IMAGE = "/opengraph-image" as const;

const CASE_STUDY_META: Record<AppLocale, { title: string; description: string }> = {
  en: {
    title: "Case Studies & Speaking Record | InnovateXP",
    description:
      "Larry Lo delivery cases: Real Messenger apps, transport maintenance, EMSD monitoring, HKMC Annuity IT assets, plus verified 2025 speaking records.",
  },
  "zh-hk": {
    title: "Agilizing 案例｜教材 10 日變 3 小時",
    description:
      "業主確認：Agilizing Limited 教材製作由 10 日縮到 3 小時。InnovateXP Larry Lo，香港 AI 商業顧問。",
  },
  "zh-tw": {
    title: "Agilizing 案例｜教材 10 天變成 3 小時",
    description:
      "業主確認：Agilizing Limited 教材製作由 10 天縮到 3 小時。InnovateXP Larry Lo，香港 AI 商業顧問。",
  },
  ja: {
    title: "Agilizing事例｜教材が10日から3時間",
    description:
      "オーナー確認：Agilizing Limited の教材制作を10日から3時間に短縮。InnovateXP、香港の AI ビジネス顧問 Larry Lo。",
  },
  de: {
    title: "Agilizing-Fall | Kursmaterial von 10 Tagen auf 3 Stunden",
    description:
      "Belegt: Agilizing verkürzte die Kursmaterial-Produktion von 10 Tagen auf 3 Stunden und spart mindestens HK$50.000 Assistentenkosten pro Monat. InnovateXP, KI-Berater Larry Lo in Hongkong.",
  },
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as AppLocale;
  const alternates = localeAlternates(locale, PATH);
  const canonical = typeof alternates?.canonical === "string" ? alternates.canonical : `${getSiteUrl()}/${locale}${PATH}`;
  const { title, description } = CASE_STUDY_META[loc];

  return {
    title,
    description,
    alternates,
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP delivery capability" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export default async function CaseStudiesRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const localizedCases = getCaseStudies(loc);
  const localizedSpeaking = getSpeakingRecords(loc);
  const localizedVision = getInnovatexpVision(loc);
  const jsonLd = buildCaseStudiesJsonLd({ locale: loc, cases: localizedCases, speaking: localizedSpeaking });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CaseStudiesPage locale={loc} cases={localizedCases} speaking={localizedSpeaking} vision={localizedVision} />
    </>
  );
}
