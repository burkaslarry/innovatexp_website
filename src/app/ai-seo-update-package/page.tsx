import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI SEO 更新套餐 | InnovateXP",
  description:
    "AI SEO 更新套餐：Starter HKD 2,000（3次改動、1星期、1次follow-up）及 Growth HKD 6,000（10次改動、1個月、2次follow-up）。",
};

const plans = [
  {
    name: "Starter",
    price: "HKD 2,000",
    revisions: "3 次改動",
    period: "1 星期完成",
    followUp: "1 次 follow-up",
  },
  {
    name: "Growth",
    price: "HKD 6,000",
    revisions: "10 次改動",
    period: "1 個月完成",
    followUp: "2 次 follow-up",
  },
];

export default function AiSeoUpdatePackagePage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 text-slate-900 dark:text-slate-100">
      <section className="mb-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-teal-300">
          InnovateXP Service
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">AI SEO 更新套餐</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          專為香港中小企而設的 AI SEO 快速更新服務。聚焦你現有網站內容與結構化資料，提升 AI Agent 可讀性與搜尋可見度。
        </p>
        <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
          最後套餐更新：2026 年 3 月底
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {plans.map((plan) => (
          <article
            key={plan.name}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <h2 className="text-2xl font-bold text-brand-primary dark:text-teal-300">{plan.name}</h2>
            <p className="mt-3 text-3xl font-bold">{plan.price}</p>
            <ul className="mt-5 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              <li>改動次數：{plan.revisions}</li>
              <li>Period：{plan.period}</li>
              <li>跟進支援：{plan.followUp}</li>
            </ul>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-xl font-bold">交付內容</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-600 dark:text-slate-300">
          <li>首頁與核心服務頁文案優化（機器可讀與轉換導向）</li>
          <li>JSON-LD 結構化資料更新（Organization / Service / FAQ）</li>
          <li>圖片 alt 與 heading 結構檢查</li>
          <li>最終交付驗證清單（lint / schema / basic crawlability）</li>
        </ul>
        <p className="mt-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:bg-amber-900/20 dark:text-amber-100">
          限時加值：今期簽約可額外獲得 1 次 schema 微調（不另收費）。
        </p>
        <div className="mt-6">
          <Link
            href="/bookme#quotation-wizard"
            className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-primary px-6 py-3 text-sm font-bold text-white transition hover:bg-brand-primary-hover dark:bg-teal-400 dark:text-slate-950"
          >
            預約 AI SEO 更新套餐
          </Link>
        </div>
      </section>
    </main>
  );
}
