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
      ? "業務聽診前小問卷｜約2分鐘｜InnovateXP"
      : "Pre-diagnosis Mini Questionnaire | ~2 min | InnovateXP",
    description: zh
      ? "免費業務聽診前小問卷：帶你最亂嗰條線嚟，篩合資格同上下文。聽完先講下一步——落地、陪跑，定係直講你暫時唔使買系統。再預約 30 分鐘聽診。"
      : "Free pre-diagnosis mini form: bring your messiest workflow, qualify fit, and share context. After the call we say land, co-run, or don’t buy a system yet. Then book a 30-min diagnosis.",
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
      ? "你好，我填完業務聽診前小問卷，想預約 30 分鐘業務聽診。"
      : "Hi — I completed the pre-diagnosis questionnaire and would like to book a 30-minute Business Workflow Diagnosis.",
  );

  return (
    <main className="min-h-screen bg-[#f7f9fc] py-16 text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <div className="container mx-auto max-w-3xl px-4">
        <section className="mb-8 space-y-4 text-base leading-8 text-slate-700 dark:text-slate-300">
          <p>
            {zh
              ? "呢份問卷係 30 分鐘業務聽診嘅入口：篩合資格、收集夠用嘅上下文，又唔硬推產品。填完可以即刻揀時間。"
              : "This form is the entry to a 30-minute Business Workflow Diagnosis: qualify fit, collect enough context, and never hard-sell a product. After submit you can pick a time."}
          </p>
          <nav aria-label={zh ? "相關連結" : "Related links"} className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href={`/${loc}/`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "首頁" : "Home"}
            </Link>
            <Link href={`/${loc}/ai-consulting`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "AI 顧問服務" : "AI consulting"}
            </Link>
            <Link href={`/${loc}/bookme`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "直接預約聽診" : "Book diagnosis directly"}
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
