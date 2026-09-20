import type { Metadata } from "next";
import Link from "next/link";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { isValidLocale, type AppLocale, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { aiSeoPackageSeo } from "@/content/page-seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = aiSeoPackageSeo(locale as AppLocale);
  return {
    title: seo.title,
    description: seo.description,
    alternates: localeAlternates(locale, "/ai-seo-update-package"),
  };
}

type Copy = {
  eyebrow: string;
  h1: string;
  lead: string;
  fit: string;
  unfit: string;
  updated: string;
  stepLabel: string;
  diagnosisName: string;
  diagnosisPrice: string;
  diagnosisNote: string;
  diagnosisItems: string[];
  retainersLabel: string;
  minTerm: string;
  liteName: string;
  litePrice: string;
  liteItems: string[];
  growthName: string;
  growthPrice: string;
  growthItems: string[];
  projectName: string;
  projectPrice: string;
  projectItems: string[];
  metricsTitle: string;
  metrics: string[];
  deliverTitle: string;
  deliver: string[];
  excludeTitle: string;
  exclude: string[];
  whyTitle: string;
  whyBody: string;
  cta: string;
};

const ZH: Copy = {
  eyebrow: "InnovateXP · AI SEO / AEO",
  h1: "AI 搜尋時代，客戶問 AI 之前唔會見到你",
  lead: "InnovateXP AI SEO / AEO 月費服務：每月幫你維護結構化資料、更新 answer-first 文案，並提供 AI 引用追蹤報告，令你嘅網站被 ChatGPT、Google AI Overview 引用。",
  fit: "適合：已有網站、想長期被 AI 搜尋引用嘅香港中小企。",
  unfit: "唔適合：只想一次性改幾隻字、唔追蹤成效。",
  updated: "套餐更新：2026 年 9 月",
  stepLabel: "第一步（入門鈎）",
  diagnosisName: "AI Visibility 診斷",
  diagnosisPrice: "HKD 2,800",
  diagnosisNote: "簽 6 個月起 retainer 可全額抵扣首月。",
  diagnosisItems: [
    "你被 ChatGPT / Google AI Overview / Perplexity 引用嘅現況報告",
    "問題清單 + 3 個立即可執行 quick wins",
    "12 個月 AEO 路線圖",
  ],
  retainersLabel: "之後先係月費（持續戰）",
  minTerm: "月費最低約期 6 個月。SEO／AEO 唔會一星期見到穩定成效；約期係為咗真係量到數字，而唔係改完就散。",
  liteName: "Lite 月費",
  litePrice: "HKD 1,800／月",
  liteItems: ["每月 schema 維護", "1–2 個核心頁優化", "月報：3 個可見數字"],
  growthName: "Growth 月費",
  growthPrice: "HKD 3,800／月",
  growthItems: ["每月 4–6 項內容／結構更新", "AI 引用追蹤 + 競爭對手比對", "月報會議"],
  projectName: "Project（一次性）",
  projectPrice: "HKD 12,000 起",
  projectItems: ["全站 AEO 重整", "適合新網站或從未做過結構化資料"],
  metricsTitle: "月費一定有客戶睇得到嘅數字",
  metrics: ["AI 答案引用次數", "品牌關鍵字曝光", "網站詢盤數"],
  deliverTitle: "每月實際做什麼",
  deliver: [
    "結構化資料維護（Organization / Service / FAQ；唔會把示範頁標成購物商品）",
    "Answer-first 文案：標題、描述、AI 可引用嘅一句答案",
    "Search Console + Bing：收錄、sitemap、需要時申請索引",
    "llms.txt／引用簡報：俾答案引擎一份可引用事實",
    "月報對住三個指標，唔用「改動次數」交差",
  ],
  excludeTitle: "不包含",
  exclude: [
    "保證 Google 第 1 名或 AI 一定提到你",
    "無限改版、代寫所有社交帖",
    "購買付費 SEO 工具戶口給你",
  ],
  whyTitle: "點解唔係一次改 3 個位？",
  whyBody:
    "AI 模型、schema 規則同對手內容成日變。一次性改完無法驗證成效，客戶亦唔會覺得值。先診斷、再 retainer，先有數字可以續約。",
  cta: "預約 AI Visibility 診斷",
};

const EN: Copy = {
  eyebrow: "InnovateXP · AI SEO / AEO",
  h1: "In the AI-search era, buyers ask an AI before they ever see you",
  lead: "Monthly AI SEO / AEO: we maintain schema, update answer-first copy, and send an AI-citation report so ChatGPT and Google AI Overviews can cite your site.",
  fit: "For: Hong Kong SMEs with a live site who want to be cited in AI search over time.",
  unfit: "Not for: a one-off copy tweak with no measurement.",
  updated: "Updated: September 2026",
  stepLabel: "Step 1 — entry hook",
  diagnosisName: "AI Visibility diagnosis",
  diagnosisPrice: "HKD 2,800",
  diagnosisNote: "Fully credited to month 1 if you start a 6-month retainer.",
  diagnosisItems: [
    "Where you are cited in ChatGPT / Google AI Overviews / Perplexity",
    "Issue list + 3 executable quick wins",
    "12-month AEO roadmap",
  ],
  retainersLabel: "Then the retainer (ongoing)",
  minTerm: "Retainers are 6 months minimum. SEO/AEO does not stabilize in a week; the term exists so we can measure, not so we can vanish after three edits.",
  liteName: "Lite monthly",
  litePrice: "HKD 1,800 / month",
  liteItems: ["Monthly schema upkeep", "1–2 core-page updates", "Monthly report on 3 visible metrics"],
  growthName: "Growth monthly",
  growthPrice: "HKD 3,800 / month",
  growthItems: ["4–6 content/structure updates per month", "AI citation tracking + competitor compare", "Monthly review call"],
  projectName: "Project (one-off)",
  projectPrice: "From HKD 12,000",
  projectItems: ["Full-site AEO rebuild", "Best for new sites or sites with no schema yet"],
  metricsTitle: "Every retainer ships numbers you can see",
  metrics: ["AI-answer citation count", "Brand-keyword impressions", "Site enquiries"],
  deliverTitle: "What we actually do each month",
  deliver: [
    "Schema upkeep (Organization / Service / FAQ — demos are not marked as shop products)",
    "Answer-first titles, descriptions, and a citeable one-line answer",
    "Search Console + Bing: coverage, sitemap, index requests when needed",
    "llms.txt citation brief for answer engines",
    "Monthly report against three metrics — not a “revision count”",
  ],
  excludeTitle: "Not included",
  exclude: ["Guaranteed #1 or guaranteed AI mentions", "Unlimited redesigns or all social posts", "Paid SEO tool licences in your name"],
  whyTitle: "Why not three one-off edits?",
  whyBody:
    "Models, schema rules, and competitor copy keep changing. A one-shot change cannot prove impact. Diagnosis then retainer is how we get numbers you can renew on.",
  cta: "Book an AI Visibility diagnosis",
};

export default async function AiSeoUpdatePackagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (isValidLocale(locale) ? locale : "zh-hk") as AppLocale;
  const c = localeUsesChineseCopy(loc) ? ZH : EN;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 text-slate-900 dark:text-slate-100">
      <BackToHomeControl />
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-[color:var(--primary-hover)]">
          {c.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">{c.h1}</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">{c.lead}</p>
        <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{c.fit}</p>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{c.unfit}</p>
        <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">{c.updated}</p>
      </section>

      <section className="mb-6 rounded-2xl border-2 border-brand-primary/30 bg-white p-8 dark:border-brand-primary/40 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">{c.stepLabel}</p>
        <div className="mt-2 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-2xl font-bold">{c.diagnosisName}</h2>
          <p className="text-2xl font-bold text-brand-primary">{c.diagnosisPrice}</p>
        </div>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{c.diagnosisNote}</p>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {c.diagnosisItems.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <p className="mb-4 text-sm font-semibold text-slate-700 dark:text-slate-200">{c.retainersLabel}</p>
      <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {[
          { name: c.liteName, price: c.litePrice, items: c.liteItems },
          { name: c.growthName, price: c.growthPrice, items: c.growthItems },
          { name: c.projectName, price: c.projectPrice, items: c.projectItems },
        ].map((plan) => (
          <article
            key={plan.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <h2 className="text-xl font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">{plan.name}</h2>
            <p className="mt-3 text-2xl font-bold">{plan.price}</p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {plan.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        ))}
      </section>
      <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.minTerm}</p>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-bold">{c.metricsTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {c.metrics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-xl font-bold">{c.deliverTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {c.deliver.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-xl font-bold">{c.excludeTitle}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          {c.exclude.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <h2 className="mt-8 text-xl font-bold">{c.whyTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.whyBody}</p>
        <div className="mt-6">
          <Link
            href={`/${loc}/bookme#quotation-wizard`}
            className="inline-flex min-h-[44px] items-center justify-center btn-brand px-6 py-3 text-sm font-bold transition hover:brightness-105"
          >
            {c.cta}
          </Link>
        </div>
      </section>
    </main>
  );
}
