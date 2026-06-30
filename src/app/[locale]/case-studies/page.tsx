import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudies } from "@/content/case-studies";
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
    title: "InnovateXP Case Studies | AI Training, SME AI Workflow & CRM Projects",
    description:
      "Project cases and proof points for InnovateXP: EventXP, SmartSales CRM, AI training, AI coaching, Proposal-to-Cash AI, dashboards, internal tools, and clean architecture rescue.",
  },
  "zh-hk": {
    title: "InnovateXP 案例｜AI 教班、AI 陪跑、SME AI 工作流與 CRM",
    description:
      "InnovateXP 項目案例與 proof points：EventXP、SmartSales CRM、AI 教班、AI 陪跑課程、Proposal-to-Cash AI、dashboard、internal tools 與系統 rescue。",
  },
  "zh-tw": {
    title: "InnovateXP 案例｜AI 培訓、AI 陪跑、中小企業 AI 工作流與 CRM",
    description:
      "InnovateXP 專案案例與 proof points：EventXP、SmartSales CRM、AI 教班、AI 陪跑課程、Proposal-to-Cash AI、dashboard、internal tools 與系統 rescue。",
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
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP Case Studies" }],
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
  const localizedVision = getInnovatexpVision(loc);
  const jsonLd = buildCaseStudiesJsonLd({ locale: loc, cases: localizedCases });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <CaseStudiesPage locale={loc} cases={localizedCases} vision={localizedVision} />
    </>
  );
}
