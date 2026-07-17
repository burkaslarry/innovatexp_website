import Link from "next/link";
import { CalendarCheck, MessageSquare, Receipt, Sparkles, Target, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import {
  BNI_MEMBER_DISCOUNT_PERCENT,
  PRICING,
  formatBniDiscountNote,
  formatHkd,
  formatHkdFrom,
  type PricingLocale,
} from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";

function toPricingLocale(locale: AppLocale): PricingLocale {
  if (locale === "zh-hk" || locale === "zh-tw" || locale === "ja" || locale === "de") return locale;
  return "en";
}

const copy = {
  "zh-hk": {
    quickEyebrow: "Quick Cash 入場",
    quickTitle: "低門檻開始，先驗證一條流程",
    quickIntro:
      "主打 advisory 同 quick-cash 服務。工具試用係 product-led 入口；客製 AI workflow 實施唔會喺網站公開報價，完成 AI Discovery Sprint 後先會收到固定實施報價。",
    toolsEyebrow: "工具試用",
    toolsTitle: "EventXP 先 · SmartSales 後",
    toolsIntro: "唔係租軟件套餐，而係顧問式試用：先設定 workflow，再決定值唔值得長期落地。",
    eventTitle: "EventXP 試用",
    eventPrice: "",
    eventBody: "1 場活動：簽到設定、名單評分、follow-up 自動化設定（唔只係 QR check-in app）。",
    eventCta: "了解 EventXP 試用",
    salesTitle: "SmartSales CRM 試用",
    salesPrice: "",
    salesBody: "WhatsApp workflow 接入、CRM 基礎設定、1 條銷售流程試跑。",
    salesCta: "了解 SmartSales 試用",
    trainTitle: "Prompt 實戰訓練營",
    trainPrice: "",
    trainBody: "1 日實戰體驗價，幫團隊建立 AI 使用習慣，再決定是否進入陪跑計劃。",
    auditTitle: "AI 準備度評估",
    auditPrice: "",
    auditBody: "快速診斷 + 優先排序清單，適合未清楚第一條 workflow 做邊度嘅團隊。",
    sprintTitle: "AI Discovery Sprint",
    sprintPrice: "",
    sprintBody: "1–2 週：workshop、workflow map、優先排序、固定實施報價（取代「Contact us for custom quote」）。",
    sprintCta: "預約 Discovery Sprint",
    accountingEyebrow: "示範場景 · 會計 / 收據管理",
    accountingTitle: "收據行政唔再靠月尾對數",
    accountingIntro:
      "運用 chatbot upload 收條，連結 AI Agent 做初步分類同每週狀態檢查。示範場景，實際方案需先診斷。",
    accountingBefore: "Before：收據散落 WhatsApp/email、人手輸入 Excel、月尾先對數。",
    accountingAfter: "After：單據集中收集、AI 輔助分類、每週狀態檢查同業務報告摘要。",
    bniNote: "",
  },
  en: {
    quickEyebrow: "Quick entry offers",
    quickTitle: "Start low-friction, validate one workflow first",
    quickIntro:
      "Advisory and quick-cash offers lead. Tool trials are product-led entry points. Custom AI workflow implementation is not listed publicly — you receive a fixed quote after the AI Discovery Sprint.",
    toolsEyebrow: "Tool trials",
    toolsTitle: "EventXP first · SmartSales second",
    toolsIntro: "Not a software rental — advisor-led trials that set up your workflow before you commit to full rollout.",
    eventTitle: "EventXP trial",
    eventPrice: "",
    eventBody: "One event: check-in setup, lead scoring, and follow-up automation — not just a QR check-in app.",
    eventCta: "Explore EventXP trial",
    salesTitle: "SmartSales CRM trial",
    salesPrice: "",
    salesBody: "WhatsApp workflow setup, CRM baseline, and one sales process trial run.",
    salesCta: "Explore SmartSales trial",
    trainTitle: "Prompt practical training camp",
    trainPrice: "",
    trainBody: "One-day experiential pricing to build team AI habits before a longer advisory program.",
    auditTitle: "AI readiness assessment",
    auditPrice: "",
    auditBody: "Fast diagnosis plus a prioritized improvement list for teams unsure where to start.",
    sprintTitle: "AI Discovery Sprint",
    sprintPrice: "",
    sprintBody: "1–2 weeks: workshop, workflow map, prioritization, and a fixed implementation quote — replacing vague “contact us for custom quote”.",
    sprintCta: "Book Discovery Sprint",
    accountingEyebrow: "Example workflow · Accounting / receipts",
    accountingTitle: "Receipt admin without month-end chaos",
    accountingIntro:
      "Chatbot receipt upload linked to an AI agent for first-pass classification and weekly status checks. Example scenario — actual scope requires diagnosis first.",
    accountingBefore: "Before: receipts scattered across WhatsApp/email, manual Excel entry, month-end reconciliation.",
    accountingAfter: "After: centralized collection, AI-assisted classification, weekly status checks and summary reports.",
    bniNote: "",
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
  const from = formatHkdFrom(pl);
  const q = PRICING.quickCash;

  const cards = [
    {
      icon: CalendarCheck,
      title: c.eventTitle,
      price: formatHkd(q.eventXpTrial, pl),
      body: c.eventBody,
      href: eventXpHref,
      cta: c.eventCta,
      featured: true,
    },
    {
      icon: MessageSquare,
      title: c.salesTitle,
      price: formatHkd(q.smartSalesTrial, pl),
      body: c.salesBody,
      href: smartSalesHref,
      cta: c.salesCta,
    },
    {
      icon: Target,
      title: c.auditTitle,
      price: from(q.aiReadinessAssessment),
      body: c.auditBody,
      href: bookingHref,
      cta: c.sprintCta,
    },
    {
      icon: Users,
      title: c.trainTitle,
      price: `${formatHkd(q.promptTrainingDay, pl)}${pl.startsWith("zh") ? "/日" : "/ day"}`,
      body: c.trainBody,
      href: bookingHref,
      cta: c.sprintCta,
    },
    {
      icon: Sparkles,
      title: c.sprintTitle,
      price: formatHkd(q.aiDiscoverySprint, pl),
      body: c.sprintBody,
      href: bookingHref,
      cta: c.sprintCta,
      featured: true,
    },
  ];

  return (
    <>
      <section id="quick-cash-pricing" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-white to-cyan-50 p-6 shadow-card dark:border-amber-500/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-900 md:p-10">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-amber-700 dark:text-amber-300">
            {c.quickEyebrow}
          </p>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">{c.quickTitle}</h2>
          <p className="mt-4 text-base leading-relaxed text-slate-700 dark:text-slate-300 md:text-lg">{c.quickIntro}</p>
        </div>
        <div className="mb-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">{c.toolsEyebrow}</p>
          <h3 className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">{c.toolsTitle}</h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-700 dark:text-slate-300">{c.toolsIntro}</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {cards.map(({ icon: Icon, title, price, body, href, cta, featured }) => (
            <article
              key={title}
              className={`flex h-full flex-col rounded-2xl border p-5 shadow-sm ${
                featured
                  ? "border-brand-primary/55 bg-white dark:border-teal-500/50 dark:bg-slate-800"
                  : "border-slate-200 bg-white/90 dark:border-slate-700 dark:bg-slate-800"
              }`}
            >
              <Icon className="mb-3 h-6 w-6 text-brand-primary dark:text-teal-300" aria-hidden />
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h3>
              <p className="mt-2 text-2xl font-extrabold text-brand-primary dark:text-teal-300">{price}</p>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{body}</p>
              <Link
                href={href}
                className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full border-2 border-brand-primary px-4 py-2 text-sm font-bold text-brand-primary transition hover:bg-brand-primary hover:text-white dark:border-teal-300 dark:text-teal-300 dark:hover:bg-teal-300 dark:hover:text-slate-950"
              >
                {cta}
              </Link>
            </article>
          ))}
        </div>
        <p className="mx-auto mt-6 max-w-3xl rounded-2xl border border-amber-200 bg-white/80 p-4 text-center text-sm leading-relaxed text-amber-900 dark:border-amber-500/40 dark:bg-slate-800 dark:text-amber-100">
          {formatBniDiscountNote(pl).replace(String(BNI_MEMBER_DISCOUNT_PERCENT), String(BNI_MEMBER_DISCOUNT_PERCENT))}
        </p>
      </section>

      <section id="accounting-tools-demo" className="mb-16 scroll-mt-[var(--header-offset)] rounded-3xl border border-slate-200 bg-white p-6 shadow-card dark:border-slate-700 dark:bg-slate-900 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
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
            <div className="mt-6">
              <Button href={bookingHref}>{c.sprintCta}</Button>
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-950 shadow-lg dark:border-slate-700">
            <video
              className="aspect-video w-full bg-black"
              controls
              playsInline
              preload="metadata"
              poster="/IMG_0956.png"
            >
              <source src="/videos/accounting-receipt-workflow.mov" type="video/quicktime" />
              <track kind="captions" />
            </video>
            <p className="px-4 py-3 text-center text-xs text-slate-400">
              {pl.startsWith("zh") ? "示範：收據上傳 → AI 分類 → 每週報告（需先 workflow 診斷）" : "Demo: receipt upload → AI classification → weekly report (diagnosis required first)"}
            </p>
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
