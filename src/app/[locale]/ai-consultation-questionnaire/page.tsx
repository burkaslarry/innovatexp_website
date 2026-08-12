import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AiConsultationQuestionnaire } from "@/components/questionnaires/AiConsultationQuestionnaire";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";

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
      ? "3 分鐘 AI 流程健康檢查｜諮詢問卷｜InnovateXP"
      : "3-min AI Workflow Health Check | Consultation Questionnaire | InnovateXP",
    description: zh
      ? "免費 AI Consultation Questionnaire：了解行業、流程痛點、AI 準備度，再決定預約 30 分鐘流程診斷。"
      : "Free AI consultation questionnaire: industry, workflow pain, AI readiness—then book a 30-minute workflow diagnosis.",
    alternates: localeAlternates(locale, "/ai-consultation-questionnaire"),
  };
}

export default async function AiConsultationQuestionnairePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const whatsappHref = buildWhatsAppHref(
    "你好，我填完 AI Consultation Questionnaire，想預約 30 分鐘流程診斷。",
  );

  return (
    <main className="min-h-screen bg-[#f7f9fc] py-16 text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <div className="container mx-auto max-w-3xl px-4">
        <AiConsultationQuestionnaire
          locale={loc}
          bookingHref={`/${loc}/bookme`}
          whatsappHref={whatsappHref}
        />
      </div>
    </main>
  );
}
