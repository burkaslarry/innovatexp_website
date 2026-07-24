import Link from "next/link";
import { CalendarCheck, MessageSquare, Receipt } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import {
  PRICING,
  formatBniDiscountNote,
  formatHkd,
  type PricingLocale,
} from "@/content/pricing";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { AppLocale } from "@/lib/i18n-routing";

function toPricingLocale(locale: AppLocale): PricingLocale {
  if (locale === "zh-hk" || locale === "zh-tw" || locale === "ja" || locale === "de") return locale;
  return "en";
}

const copy = {
  "zh-hk": {
    toolsEyebrow: "工具試用",
    toolsTitle: "Product-led 入門 — 先試用，再決定落地",
    toolsIntro:
      "工具係引流入口；consultation / 陪跑先係 service 實體。試用期滿可以約我傾買斷、訂閱或唔續；填好 feedback 問卷，下次回購有 discount；referral 成功亦有折扣，BNI 會友再折。",
    eventTitle: "EventXP 試用",
    eventBody: "1 場活動：簽到設定、名單評分、follow-up 自動化設定（唔只係 QR check-in app）。",
    eventCta: "了解 EventXP 試用",
    salesTitle: "SmartSales CRM 試用",
    salesBody: "WhatsApp workflow 接入、CRM 基礎設定、1 條銷售流程試跑。",
    salesCta: "了解 SmartSales 試用",
    accountingCardTitle: "AccountXP 體驗方案",
    accountingCardBody:
      "收據擷取 pilot 設定 + 首月正式使用（一次性）。WhatsApp 收條 upload → AI 分類 → 每週報告；其後維護月費 880 / 1,280 / 1,480。",
    accountingCardCta: "睇示範同定價",
    accountingEyebrow: "AccountXP · Accounting Tools",
    accountingTitle: "收據 / 銀行對數 Chatbot（AccountXP）",
    accountingIntro:
      "類似中四 Accounting 嘅 Bank Reconciliation：先 reminder 同事定期拎公司銀行月結單，鼓勵 upload 存款 / 取款單，再做初步對數。Receipt upload、AI 分類、每週狀態報告一條龍；data policy 嚴格，入庫資料加密處理（圖片 OCR 按 scope 配置）。",
    accountingBefore: "Before：收據散落 WhatsApp/email、人手輸入 Excel、月尾先對數、老闆追問先知進度。",
    accountingAfter: "After：單據集中收集、AI 輔助分類、銀行單據 reminder、每週狀態同對數摘要。",
    trialTitle: "體驗方案定價",
    trialWeek: "體驗方案（一次）",
    trialMonth: "維護月費（三層）",
    trialFunnelTitle: "體驗後 funnel",
    trialFunnelSteps: [
      "體驗期滿 → 約 30 分鐘 review，決定續維護、升級或唔續",
      "填寫 feedback 問卷 → 下次回購 / 升級可享折扣",
      "成功 referral 其他團隊 → referral discount",
      "查證 BNI 會友 → 額外 BNI 折扣（可與 referral 分開確認）",
    ],
    outcomesTitle: "預期效果（示範場景）",
    outcomesDisclaimer: "示範場景，實際方案需先 workflow 診斷。KPI 會按你公司流程 baseline 調整。",
    outcomes: [
      { label: "每月整理時間", before: "50–70 小時人手", after: "約 2.5 小時 AI 初步處理" },
      { label: "漏交 / 遲交率", before: "10–15%", after: "<3%" },
      { label: "月尾結算", before: "3–5 日", after: "半日內" },
      { label: "管理層可見度", before: "月尾先知數", after: "每週自動報告" },
    ],
    outcomesHighlight: "AI 約 1 分鐘處理 7 張 receipt · 每月可節省 70–80% 整理時間",
    videoCaption: "示範：Accounting Chatbot — 收條 upload → AI 分類 → 每週報告",
    trialCta: "預約 AccountXP 體驗方案",
  },
  en: {
    toolsEyebrow: "Tool trials",
    toolsTitle: "Product-led entry — try first, then decide rollout",
    toolsIntro:
      "Tools are the lead-in; consultation and advisory programs are the core service. After your trial, book a review to choose buyout, subscription, or stop. Complete the feedback form for a return discount; referrals and verified BNI members receive additional discounts.",
    eventTitle: "EventXP trial",
    eventBody: "One event: check-in setup, lead scoring, and follow-up automation — not just a QR check-in app.",
    eventCta: "Explore EventXP trial",
    salesTitle: "SmartSales CRM trial",
    salesBody: "WhatsApp workflow setup, CRM baseline, and one sales process trial run.",
    salesCta: "Explore SmartSales trial",
    accountingCardTitle: "AccountXP experience",
    accountingCardBody:
      "Receipt-capture pilot setup + first month live use (one-time). WhatsApp upload → AI classify → weekly report; then maintenance at HKD 880 / 1,280 / 1,480.",
    accountingCardCta: "See demo & pricing",
    accountingEyebrow: "AccountXP · Accounting Tools",
    accountingTitle: "Receipt / bank reconciliation chatbot (AccountXP)",
    accountingIntro:
      "Inspired by Form 4 bank reconciliation: reminders to collect monthly bank statements, encourage upload of deposit/withdrawal slips, then first-pass matching. Receipt upload, AI classification, and weekly status in one flow. Strict data policy with encrypted storage; image OCR configured per scope.",
    accountingBefore: "Before: receipts scattered across WhatsApp/email, manual Excel entry, month-end reconciliation, owner chasing for status.",
    accountingAfter: "After: centralized collection, AI-assisted classification, bank-slip reminders, weekly status and reconciliation summaries.",
    trialTitle: "Experience pricing",
    trialWeek: "Experience package (one-time)",
    trialMonth: "Maintenance (3 tiers)",
    trialFunnelTitle: "After the experience",
    trialFunnelSteps: [
      "Package ends → 30-minute review to decide maintenance, upgrade, or stop",
      "Complete feedback form → discount on your next purchase or upgrade",
      "Successful referral → referral discount",
      "Verified BNI member → additional BNI discount (confirmed separately)",
    ],
    outcomesTitle: "Expected outcomes (example scenario)",
    outcomesDisclaimer: "Example scenario only. Actual KPIs are baselined during diagnosis.",
    outcomes: [
      { label: "Monthly processing time", before: "50–70 hours manual", after: "~2.5 hours AI pre-processing" },
      { label: "Missed / late receipts", before: "10–15%", after: "<3%" },
      { label: "Month-end close", before: "3–5 days", after: "Within half a day" },
      { label: "Management visibility", before: "Numbers known at month-end", after: "Weekly automated reports" },
    ],
    outcomesHighlight: "AI ~1 minute for 7 receipts · save 70–80% monthly processing time",
    videoCaption: "Demo: Accounting Chatbot — upload → classify → weekly report",
    trialCta: "Book AccountXP experience",
  },
} as const;

function localeCopy(locale: AppLocale) {
  if (locale === "zh-hk" || locale === "zh-tw") return copy["zh-hk"];
  return copy.en;
}

export function PricingFunnelSections({
  locale,
  bookingHref,
  eventXpHref,
  smartSalesHref,
}: {
  locale: AppLocale;
  bookingHref: string;
  eventXpHref: string;
  smartSalesHref: string;
}) {
  const pl = toPricingLocale(locale);
  const c = localeCopy(locale);
  const q = PRICING.quickCash;
  const ax = PRICING.tools.accountXp;
  const monthSuffix = pl.startsWith("zh") ? "/ 月" : "/ mo";

  const productCards: {
    icon: typeof CalendarCheck;
    title: string;
    price: string;
    body: string;
    href: string;
    cta: string;
    inquiryId: InquiryCatalogItemId;
    featured?: boolean;
  }[] = [
    {
      icon: CalendarCheck,
      title: c.eventTitle,
      price: formatHkd(q.eventXpTrial, pl),
      body: c.eventBody,
      href: eventXpHref,
      cta: c.eventCta,
      inquiryId: "eventXpTrial",
    },
    {
      icon: MessageSquare,
      title: c.salesTitle,
      price: formatHkd(q.smartSalesTrial, pl),
      body: c.salesBody,
      href: smartSalesHref,
      cta: c.salesCta,
      inquiryId: "smartSalesTrial",
    },
    {
      icon: Receipt,
      title: c.accountingCardTitle,
      price: formatHkd(q.accountXpExperience, pl),
      body: c.accountingCardBody,
      href: "#accounting-tools-demo",
      cta: c.accountingCardCta,
      inquiryId: "accountXpExperience",
      featured: true,
    },
  ];

  return (
    <>
      <section id="tool-trials-pricing" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/25 bg-white p-6 shadow-card dark:border-teal-500/30 dark:bg-slate-900 md:p-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
            {c.toolsEyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">{c.toolsTitle}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">{c.toolsIntro}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {productCards.map(({ icon: Icon, title, price, body, href, cta, inquiryId, featured }) => (
            <article
              key={title}
              className={`flex h-full flex-col rounded-2xl border p-5 shadow-sm ${
                featured
                  ? "border-brand-primary/55 bg-gradient-to-br from-cyan-50 via-white to-amber-50 dark:border-teal-500/50 dark:from-slate-800 dark:via-slate-900 dark:to-slate-900"
                  : "border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              <Icon className="mb-3 h-6 w-6 text-brand-primary dark:text-teal-300" aria-hidden />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-lg font-extrabold leading-snug text-brand-primary dark:text-teal-300">{price}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
              <div className="mt-5 grid gap-2">
                <AddToInquiryButton itemId={inquiryId} />
                <Link
                  href={href}
                  className="inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-brand-primary px-4 py-2 text-sm font-bold text-brand-primary transition hover:bg-brand-primary hover:text-white dark:border-teal-300 dark:text-teal-300 dark:hover:bg-teal-300 dark:hover:text-slate-950"
                >
                  {cta}
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
          {formatBniDiscountNote(pl)}
        </p>
      </section>

      <section id="accounting-tools-demo" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-brand-primary/25 bg-white p-6 shadow-card dark:border-teal-500/30 dark:bg-slate-900 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
              <Receipt className="h-4 w-4" aria-hidden />
              {c.accountingEyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">{c.accountingTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300">{c.accountingIntro}</p>
            <ul className="mt-6 grid gap-3 text-sm leading-relaxed">
              <li className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-900 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-100">
                {c.accountingBefore}
              </li>
              <li className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-100">
                {c.accountingAfter}
              </li>
            </ul>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-brand-primary/30 bg-cyan-50 p-4 dark:border-teal-500/40 dark:bg-slate-800">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-primary dark:text-teal-300">{c.trialWeek}</p>
                <p className="mt-1 text-2xl font-extrabold text-gray-900 dark:text-white">
                  {formatHkd(q.accountXpExperience, pl)}
                </p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">
                  {pl.startsWith("zh")
                    ? "收據擷取 pilot 設定 + 首月正式使用"
                    : "Receipt pilot setup + first month live use"}
                </p>
              </div>
              <div className="rounded-2xl border border-brand-primary/30 bg-cyan-50 p-4 dark:border-teal-500/40 dark:bg-slate-800">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-primary dark:text-teal-300">{c.trialMonth}</p>
                <p className="mt-1 text-lg font-extrabold leading-snug text-gray-900 dark:text-white">
                  {formatHkd(ax.maintenanceStarterMonthly, pl)}
                  <span className="text-sm font-semibold text-slate-500"> / </span>
                  {formatHkd(ax.maintenanceGrowthMonthly, pl)}
                  <span className="text-sm font-semibold text-slate-500"> / </span>
                  {formatHkd(ax.maintenanceEnterpriseMonthly, pl)}
                  <span className="text-base font-semibold text-slate-600 dark:text-slate-400">{monthSuffix}</span>
                </p>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{c.trialFunnelTitle}</h3>
              <ol className="mt-3 grid gap-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {c.trialFunnelSteps.map((step, index) => (
                  <li key={step} className="flex gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-800">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-primary text-xs font-bold text-white dark:bg-teal-500 dark:text-slate-950">
                      {index + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">{c.outcomesTitle}</h3>
              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{c.outcomesDisclaimer}</p>
              <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-700">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th className="p-3 font-semibold text-slate-700 dark:text-slate-200">KPI</th>
                      <th className="p-3 font-semibold text-red-700 dark:text-red-300">Before</th>
                      <th className="p-3 font-semibold text-emerald-700 dark:text-emerald-300">After</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {c.outcomes.map((row) => (
                      <tr key={row.label} className="bg-white dark:bg-slate-900">
                        <td className="p-3 font-medium text-slate-800 dark:text-slate-200">{row.label}</td>
                        <td className="p-3 text-slate-600 dark:text-slate-400">{row.before}</td>
                        <td className="p-3 font-semibold text-emerald-800 dark:text-emerald-200">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <p className="mt-4 rounded-xl border border-brand-primary/30 bg-cyan-50 p-4 text-sm font-semibold leading-relaxed text-brand-primary dark:border-teal-500/40 dark:bg-slate-800 dark:text-teal-300">
                {c.outcomesHighlight}
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <AddToInquiryButton itemId="accountXpExperience" />
              <Button href={bookingHref}>{c.trialCta}</Button>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg dark:border-slate-700">
            <div className="border-b border-slate-800 bg-slate-900 px-4 py-3">
              <p className="text-sm font-semibold text-teal-300">AccountXP</p>
              <p className="text-xs text-slate-400">WhatsApp · upload receipt · AI classify</p>
            </div>
            <video
              className="aspect-video w-full bg-black"
              controls
              playsInline
              preload="metadata"
              poster="/IMG_0956.png"
              aria-label={c.videoCaption}
            >
              <source src="/videos/accounting-receipt-workflow.mp4" type="video/mp4" />
              <source src="/videos/accounting-receipt-workflow.mov" type="video/quicktime" />
            </video>
            <p className="px-4 py-3 text-center text-xs text-slate-400">{c.videoCaption}</p>
          </div>
        </div>
      </section>
    </>
  );
}

export function consultancyPlanPrice(planIndex: number, locale: AppLocale): string {
  const pl = toPricingLocale(locale);
  const prices = [
    PRICING.consultancy.discoverySprint30Day,
    PRICING.consultancy.foundation3Month,
    PRICING.consultancy.accelerator6Month,
    PRICING.consultancy.partnership12Month,
  ];
  return formatHkd(prices[planIndex] ?? prices[0], pl);
}
