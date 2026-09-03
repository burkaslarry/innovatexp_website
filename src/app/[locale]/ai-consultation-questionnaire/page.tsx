import type { Metadata } from "next";
import Link from "next/link";
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
      ? "AI流程健康檢查｜諮詢問卷｜InnovateXP"
      : "AI Workflow Health Check | Questionnaire | InnovateXP",
    description: zh
      ? "免費 AI 諮詢問卷：了解行業、流程痛點與 AI 準備度，再預約香港 AI 顧問 Larry Lo 30 分鐘流程診斷。約 3 分鐘完成。"
      : "Free AI consultation questionnaire: industry, workflow pain, and AI readiness—then book a 30-minute diagnosis with Hong Kong AI consultant Larry Lo.",
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
  const zh = localeUsesChineseCopy(loc);
  const whatsappHref = buildWhatsAppHref(
    zh
      ? "你好，我填完 AI Consultation Questionnaire，想預約 30 分鐘流程診斷。"
      : "Hi — I completed the AI Consultation Questionnaire and would like to book a 30-minute workflow diagnosis.",
  );

  return (
    <main className="min-h-screen bg-[#f7f9fc] py-16 text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <div className="container mx-auto max-w-3xl px-4">
        <section className="mb-8 space-y-4 text-base leading-8 text-slate-700 dark:text-slate-300">
          <p>
            {zh
              ? "呢份問卷幫你喺約見香港 AI 顧問之前，先整理行業、痛點同 AI 準備度。答案會用嚟對齊 Discovery Sprint、SmartSales CRM、私有 AI 定培訓邊條路徑最啱——唔係硬推工具。"
              : "This questionnaire helps you organise industry, pain points, and AI readiness before meeting a Hong Kong AI consultant. Answers align whether Discovery Sprint, SmartSales CRM, private AI, or training fits—without pushing tools first."}
          </p>
          <nav aria-label={zh ? "相關連結" : "Related links"} className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href={`/${loc}/`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "首頁" : "Home"}
            </Link>
            <Link href={`/${loc}/ai-consulting`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "AI 顧問服務" : "AI consulting"}
            </Link>
            <Link href={`/${loc}/private-ai-solutions`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "私有 AI" : "Private AI"}
            </Link>
            <Link href={`/${loc}/bookme`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "直接預約" : "Book directly"}
            </Link>
          </nav>
        </section>

        <AiConsultationQuestionnaire
          locale={loc}
          bookingHref={`/${loc}/bookme`}
          whatsappHref={whatsappHref}
        />
      </div>
    </main>
  );
}
