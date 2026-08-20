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
    title: "Enterprise Systems & Verified Speaking Record | InnovateXP",
    description:
      "Larry Lo delivery cases: Real Messenger iOS and Android apps, public transport maintenance, EMSD lift and escalator monitoring, HKMC Annuity IT assets, and verified speaking records.",
  },
  "zh-hk": {
    title: "企業系統案例及已核實公開分享紀錄｜InnovateXP",
    description:
      "Larry Lo 企業交付案例：Real Messenger iOS／Android apps、公共交通維修、EMSD 升降機／扶手電梯監控、HKMC Annuity IT 資產，以及已核實公開分享紀錄。",
  },
  "zh-tw": {
    title: "相關經驗與交付能力｜InnovateXP",
    description:
      "InnovateXP 相關經驗與交付能力：AI 培訓、AI 陪跑課程、中小企業 workflow design、dashboard、booking flows、internal tools 與系統交付。",
  },
  ja: {
    title: "InnovateXP ケーススタディ | AI研修・SME AIワークフロー・CRM",
    description:
      "InnovateXP のプロジェクト事例：EventXP、SmartSales CRM、AI トレーニング、AI コーチング、Proposal-to-Cash AI、ダッシュボード、社内ツール、システム改善。",
  },
  de: {
    title: "InnovateXP Fallstudien | AI-Training, SME AI-Workflow & CRM",
    description:
      "Projektbeispiele und Proof Points für InnovateXP: EventXP, SmartSales CRM, AI-Training, AI-Coaching, Proposal-to-Cash AI, Dashboards, interne Tools und Clean-Architecture-Rettung.",
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
