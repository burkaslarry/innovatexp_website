import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiFeedbackQuestionnaire } from "@/components/questionnaires/AiFeedbackQuestionnaire";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const zh = localeUsesChineseCopy(locale as AppLocale);
  return {
    title: zh
      ? "服務後 Feedback 問卷｜InnovateXP"
      : "Post-service Feedback Questionnaire | InnovateXP",
    description: zh
      ? "AI Feedback Questionnaire：滿意度、前後差異、匿名案例授權。約 2 分鐘，唔會連結預約。"
      : "AI feedback questionnaire: satisfaction, before/after change, optional anonymous case permission. About 2 minutes; no booking link.",
    alternates: localeAlternates(locale, "/ai-feedback-questionnaire"),
    robots: { index: false, follow: false },
  };
}

export default async function AiFeedbackQuestionnairePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();

  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);

  return (
    <main className="min-h-screen bg-[#f7f9fc] py-16 text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <div className="container mx-auto max-w-3xl px-4">
        <p className="mb-6 text-base leading-8 text-slate-700 dark:text-slate-300">
          {zh
            ? "呢份服務後 feedback 問卷用嚟收集滿意度同前後差異，幫助 InnovateXP 改善交付。頁面設為 noindex，唔會作為公開 SEO 入口。"
            : "This post-service feedback form collects satisfaction and before/after change to improve InnovateXP delivery. The page is noindex and is not a public SEO entry point."}
        </p>
        <AiFeedbackQuestionnaire locale={loc} />
      </div>
    </main>
  );
}
