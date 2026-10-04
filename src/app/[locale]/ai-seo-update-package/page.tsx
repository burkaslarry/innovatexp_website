import type { Metadata } from "next";
import Link from "next/link";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { isValidLocale, type AppLocale, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { aiSeoPackageSeo } from "@/content/page-seo";
import { getFAQPageSchema } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";

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
  toolNoteTitle: string;
  toolNote: string;
  cta: string;
};

const ZH: Copy = {
  eyebrow: "InnovateXP · AI 能見度與競爭對手追蹤",
  h1: "當客戶問 AI 推薦供應商，你有冇出現？",
  lead: "每月檢查 ChatGPT、Google AI 搜尋同 Perplexity 點樣描述你同競爭對手，再用清楚、可引用嘅網站內容補回差距。",
  fit: "適合：已有網站、想知道自己點解冇被 AI 提及，以及下一步應該改邊度嘅香港中小企。",
  unfit: "唔適合：只想一次性改幾隻字、之後唔再量度成效。",
  updated: "套餐更新：2026 年 9 月",
  stepLabel: "第一步",
  diagnosisName: "AI 能見度與競爭對手診斷",
  diagnosisPrice: "HKD 2,800",
  diagnosisNote: "開始 6 個月持續追蹤，可全額抵扣首月。",
  diagnosisItems: [
    "用 20 條真實買家問題，檢查你喺主要 AI 搜尋嘅出現情況",
    "比較最多 5 個競爭對手：定位、價格、被引用來源同內容空位",
    "3 個可以立即執行嘅改善，以及 90 日優先次序",
  ],
  retainersLabel: "持續追蹤方案",
  minTerm: "月費訂 3 個月或以上享有 20% 折扣。AI 搜尋能見度唔會一星期穩定改變；六個月先足夠比較前後數字。",
  liteName: "監察月費",
  litePrice: "HKD 1,800／月",
  liteItems: ["每月重查 10 條買家問題", "改善 1–2 個核心頁", "一頁月報：提及、引用、詢盤"],
  growthName: "增長月費",
  growthPrice: "HKD 3,800／月",
  growthItems: ["每月重查 25 條買家問題", "追蹤最多 3 個競爭對手", "4–6 項內容改善 + 月度檢討"],
  projectName: "全站重整（一次性）",
  projectPrice: "HKD 12,000 起",
  projectItems: ["全站內容與網站資料重整", "適合新網站，或從未為 AI 搜尋整理過嘅網站"],
  metricsTitle: "月費一定有客戶睇得到嘅數字",
  metrics: ["你同競爭對手被提及嘅比例", "引用你網站嘅答案數量", "由搜尋帶來嘅網站詢盤"],
  deliverTitle: "每月實際做什麼",
  deliver: [
    "保持公司、服務同常見問題資料一致",
    "把核心頁改成先回答、後解釋，方便客戶同 AI 理解",
    "檢查 Google 與 Bing 有冇正常收錄重要頁面",
    "維護一份清楚、可核實嘅公司與服務事實摘要",
    "月報對住提及、引用、詢盤三個指標",
  ],
  excludeTitle: "不包含",
  exclude: [
    "保證 Google 第 1 名或 AI 一定提到你",
    "無限改版、代寫所有社交帖",
    "代購第三方付費追蹤工具",
  ],
  whyTitle: "點解唔係一次改 3 個位？",
  whyBody:
    "AI 答案同對手內容會持續改變。先做基準診斷，再按月重查同改善，先可以知道邊啲改動真係令你更常被提及。",
  toolNoteTitle: "追蹤工具點安排",
  toolNote:
    "基本診斷會用即時搜尋同有紀錄嘅人工核對。客戶已有 Finseo 或其他追蹤帳戶時，可以接入做持續報告；未有帳戶亦可以先完成診斷，唔需要為買工具而買工具。",
  cta: "預約 AI 能見度診斷",
};

const EN: Copy = {
  eyebrow: "InnovateXP · AI visibility and competitor tracking",
  h1: "When buyers ask AI for a supplier, does your company appear?",
  lead: "Each month, we check how ChatGPT, Google AI search, and Perplexity describe you and your competitors, then close the gaps with clear, citable website content.",
  fit: "For: Hong Kong SMEs with a live site that want to know why they are missing from AI answers and what to improve next.",
  unfit: "Not for: a one-off copy tweak with no measurement.",
  updated: "Updated: September 2026",
  stepLabel: "Step 1",
  diagnosisName: "AI visibility and competitor diagnosis",
  diagnosisPrice: "HKD 2,800",
  diagnosisNote: "Fully credited to month 1 if you start 6 months of ongoing tracking.",
  diagnosisItems: [
    "Test 20 real buyer questions across major AI search services",
    "Compare up to 5 competitors: position, pricing, cited sources, and content gaps",
    "3 immediate improvements and a 90-day priority plan",
  ],
  retainersLabel: "Ongoing tracking plans",
  minTerm: "Subscribe to a monthly plan for 3 months or more and receive 20% off. AI-search visibility does not stabilise in a week; six months gives us a meaningful before-and-after comparison.",
  liteName: "Monitoring monthly",
  litePrice: "HKD 1,800 / month",
  liteItems: ["Recheck 10 buyer questions monthly", "Improve 1–2 core pages", "One-page report: mentions, citations, enquiries"],
  growthName: "Growth monthly",
  growthPrice: "HKD 3,800 / month",
  growthItems: ["Recheck 25 buyer questions monthly", "Track up to 3 competitors", "4–6 content improvements + monthly review"],
  projectName: "Project (one-off)",
  projectPrice: "From HKD 12,000",
  projectItems: ["Full-site content and business-fact rebuild", "Best for new sites or sites never prepared for AI search"],
  metricsTitle: "Every monthly plan reports numbers you can see",
  metrics: ["Your mention share versus competitors", "Answers that cite your website", "Website enquiries from search"],
  deliverTitle: "What we actually do each month",
  deliver: [
    "Keep company, service, and common-question facts consistent",
    "Rewrite core pages to answer first and explain second",
    "Check that Google and Bing can find the important pages",
    "Maintain a clear, verifiable summary of company and service facts",
    "Report against mentions, citations, and enquiries",
  ],
  excludeTitle: "Not included",
  exclude: ["Guaranteed #1 or guaranteed AI mentions", "Unlimited redesigns or all social posts", "Purchasing third-party tracking licences for you"],
  whyTitle: "Why not three one-off edits?",
  whyBody:
    "AI answers and competitor content keep changing. A baseline diagnosis followed by monthly checks shows which changes actually make your company appear more often.",
  toolNoteTitle: "How tracking tools fit",
  toolNote:
    "The base diagnosis uses live search with documented manual checks. If you already have Finseo or another tracking account, we can connect it for ongoing reports. You can complete the diagnosis without buying another tool first.",
  cta: "Book an AI visibility diagnosis",
};

export default async function AiSeoUpdatePackagePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (isValidLocale(locale) ? locale : "zh-hk") as AppLocale;
  const c = localeUsesChineseCopy(loc) ? ZH : EN;
  const zh = localeUsesChineseCopy(loc);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/ai-seo-update-package`;

  const faqs = zh
    ? [
        {
          question: "AI 能見度診斷同一般 SEO 有咩分別？",
          answer:
            "一般 SEO 針對傳統搜尋引擎排名；AI 能見度診斷針對 AI 答案引擎（ChatGPT、Perplexity、Google AI Overviews）點樣提及同引用你。診斷用 20 條真實買家問題檢查你嘅出現情況，比較最多 5 個競爭對手，再畀可執行嘅改善方向。費用 HKD 2,800。",
        },
        {
          question: "月費同一次性全站重整點揀？",
          answer:
            "已有網站、想持續量度同改善嘅團隊適合月費（監察 HKD 1,800/月或增長 HKD 3,800/月，6 個月起）。新網站或從未為 AI 搜尋整理過嘅網站適合一次性全站重整（HKD 12,000 起）。可以先做診斷再決定邊條路線。",
        },
        {
          question: "會保證 AI 一定提到我嗎？",
          answer:
            "唔會。唔包含保證 Google 第 1 名或 AI 一定提到你、無限改版、代寫所有社交帖、或代購第三方付費追蹤工具。AI 答案同對手內容會持續改變，先做基準診斷再按月重查先知道邊啲改動真係令你更常被提及。",
        },
        {
          question: "每個月會量度咩數字？",
          answer:
            "三個指標：你同競爭對手被提及嘅比例、引用你網站嘅答案數量、同埋由搜尋帶嚟嘅網站詢盤。月報會對住呢三個指標報告。",
        },
        {
          question: "要唔要自己買追蹤工具？",
          answer:
            "唔使。基本診斷用即時搜尋同有紀錄嘅人工核對。客戶已有 Finseo 或其他追蹤帳戶時可以接入做持續報告；未有帳戶亦可以先完成診斷，唔需要為買工具而買工具。",
        },
        {
          question: "AI Visibility Mini Check 係咩？",
          answer:
            "Mini Check 係免費入門體驗：提供網站同主要服務，我哋用 3 條買家問題做一次基礎檢查，交一頁摘要。唔包括競爭對手分析、網站修改或持續追蹤；完整 20 條問題診斷係另一個收費服務。",
        },
      ]
    : [
        {
          question: "How is AI visibility diagnosis different from regular SEO?",
          answer:
            "Regular SEO targets traditional search rankings; AI visibility diagnosis targets how AI answer engines (ChatGPT, Perplexity, Google AI Overviews) mention and cite you. The diagnosis tests 20 real buyer questions, compares up to 5 competitors, and gives actionable improvements. Fee HKD 2,800.",
        },
        {
          question: "How do I choose between the monthly retainer and a one-off full-site rebuild?",
          answer:
            "Teams with an existing site that want ongoing measurement fit the monthly retainer (Monitoring HKD 1,800/mo or Growth HKD 3,800/mo, 6-month minimum). New sites or sites never prepared for AI search fit the one-off full-site rebuild (from HKD 12,000). You can start with the diagnosis and then choose.",
        },
        {
          question: "Do you guarantee AI will mention me?",
          answer:
            "No. Not included: guaranteed #1 rankings or guaranteed AI mentions, unlimited redesigns, all social posts, or purchasing third-party tracking licences for you. AI answers and competitor content keep changing; a baseline diagnosis followed by monthly rechecks shows which changes actually make you appear more often.",
        },
        {
          question: "What numbers are measured each month?",
          answer:
            "Three metrics: your mention share versus competitors, the number of answers that cite your website, and website enquiries from search. The monthly report reports against these three.",
        },
        {
          question: "Do I need to buy a tracking tool myself?",
          answer:
            "No. The base diagnosis uses live search with documented manual checks. If you already have Finseo or another tracking account, we can connect it for ongoing reports. You can complete the diagnosis without buying another tool first.",
        },
        {
          question: "What is the AI Visibility Mini Check?",
          answer:
            "The Mini Check is a free starter experience: share your website and main service, we check 3 buyer questions once and send a one-page summary. It excludes competitor analysis, website edits, and ongoing tracking; the full 20-question diagnosis is a separate paid service.",
        },
      ];

  const jsonLd = [getFAQPageSchema({ url: pageUrl, questions: faqs })];

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 text-slate-900 dark:text-slate-100">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
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

      <section id="mini-check" className="mb-6 scroll-mt-24 rounded-2xl border-2 border-brand-primary/40 bg-white p-8 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-primary">
          {localeUsesChineseCopy(loc) ? "免費入門體驗 · 首輪 6 個名額" : "Free starter experience · first 6 places"}
        </p>
        <h2 className="mt-2 text-2xl font-bold">
          {localeUsesChineseCopy(loc) ? "AI Visibility 迷你檢查" : "AI Visibility Mini Check"}
        </h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {localeUsesChineseCopy(loc)
            ? "提供你嘅網站同主要服務，我哋用 3 條買家問題做一次基礎檢查，交一頁摘要：品牌有冇出現、答案引用咗乜嘢來源，同一個可先做嘅改善方向。"
            : "Share your website and main service. We check 3 buyer questions once and send a one-page summary: whether your brand appears, which sources are cited, and one practical next step."}
        </p>
        <p className="mt-3 text-xs leading-6 text-slate-500 dark:text-slate-400">
          {localeUsesChineseCopy(loc)
            ? "17/10 活動即場登記，每間公司一次；首 6 位成功提交會即時收到確認。檢查於會後進行，3 個工作天內經 Email／WhatsApp 交付。不包括競爭對手分析、網站修改或持續追蹤；完整 20 條問題診斷另有收費。"
            : "Register at the 17 October event, one per company. The first 6 successful submissions are confirmed on screen. The check is completed after the event and delivered by email/WhatsApp within 3 working days. Excludes competitor analysis, website edits and ongoing tracking; the full 20-question diagnosis is a separate paid service."}
        </p>
        <Link
          href={`/${loc}/ai-visibility-mini-check`}
          className="mt-5 inline-flex min-h-[44px] items-center justify-center btn-brand px-6 py-3 text-sm font-bold"
        >
          {localeUsesChineseCopy(loc) ? "查看活動登記頁" : "View the event registration page"}
        </Link>
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
        <h2 className="mt-8 text-xl font-bold">{c.toolNoteTitle}</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.toolNote}</p>
        <div className="mt-6">
          <Link
            href={`/${loc}/bookme#quotation-wizard`}
            className="inline-flex min-h-[44px] items-center justify-center btn-brand px-6 py-3 text-sm font-bold transition hover:brightness-105"
          >
            {c.cta}
          </Link>
        </div>
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">{zh ? "常見問題" : "FAQ"}</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.question}>
              <dt className="text-lg font-semibold text-slate-900 dark:text-slate-100">{f.question}</dt>
              <dd className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{f.answer}</dd>
            </div>
          ))}
        </dl>
      </section>
    </main>
  );
}
