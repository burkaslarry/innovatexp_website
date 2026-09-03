import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BniPowerTeamQuestionnaire } from "@/components/BniPowerTeamQuestionnaire";
import { getBniPowerTeamCopy } from "@/content/bni-power-team";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getBniPowerTeamCopy(locale as AppLocale);
  return {
    title: c.metaTitle,
    description: c.metaDescription,
    keywords: [
      "BNI Power Team",
      "BNI referral",
      "Power Team",
      "Hong Kong BNI",
      "Larry Lo",
      "InnovateXP",
    ],
    alternates: localeAlternates(locale, "/bni-power-team"),
  };
}

export default async function BniPowerTeamPage({
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
      ? "你好，我用咗 BNI Power Team 工具，想同 Larry 傾吓轉介／合作。"
      : "Hi — I used the BNI Power Team tool and would like to discuss referrals / collaboration with Larry.",
  );

  return (
    <main className="min-h-screen bg-[#f7f9fc] py-16 text-slate-900 dark:bg-gray-950 dark:text-slate-100">
      <div className="container mx-auto max-w-3xl px-4">
        <section className="mb-8 space-y-4 text-base leading-8 text-slate-700 dark:text-slate-300">
          <p>
            {zh
              ? "BNI Power Team 工具幫香港創業者快速畫出上游 Channel、平行 Referral Partner 同下游供應商地圖——輸入行業同產品／服務，即刻得到可討論嘅轉介方向。創辦人 Larry Lo／InnovateXP 用同一套流程思維：先釐清「邊個介紹你、你介紹邊個」，再談 AI、CRM 或自動化。"
              : "The BNI Power Team tool helps Hong Kong entrepreneurs map upstream channels, parallel referral partners, and downstream suppliers—enter your industry and offerings to get discussable referral directions. Founder Larry Lo / InnovateXP uses the same workflow mindset: clarify who introduces you and whom you introduce, before AI, CRM, or automation."}
          </p>
          <p>
            {zh
              ? "適合 BNI 會員、專業服務同中小企老闆：唔使再空白諗「邊啲行業互補」。同 AI／流程相關嘅方向會標示可與 InnovateXP 合作，方便你喺 chapter 會議即場跟進。"
              : "Built for BNI members, professional services, and SME owners who should not blank on complementary industries. AI / workflow-related directions are flagged for InnovateXP collaboration so you can follow up in chapter meetings."}
          </p>
          <nav aria-label={zh ? "相關連結" : "Related links"} className="flex flex-wrap gap-3 text-sm font-semibold">
            <Link href={`/${loc}/`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "InnovateXP 首頁" : "InnovateXP home"}
            </Link>
            <Link href={`/${loc}/ai-consulting`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "香港 AI 顧問" : "AI consulting"}
            </Link>
            <Link href={`/${loc}/smartsales-crm`} className="text-brand-primary underline-offset-2 hover:underline">
              SmartSales CRM
            </Link>
            <Link href={`/${loc}/bookme`} className="text-brand-primary underline-offset-2 hover:underline">
              {zh ? "預約 30 分鐘診斷" : "Book a 30-min diagnosis"}
            </Link>
          </nav>
        </section>

        <BniPowerTeamQuestionnaire
          locale={loc}
          bookingHref={`/${loc}/bookme`}
          whatsappHref={whatsappHref}
        />
      </div>
    </main>
  );
}
