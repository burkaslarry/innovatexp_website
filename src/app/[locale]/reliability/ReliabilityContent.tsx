"use client";

/* F14: Reliability (client) - Bilingual copy, comparison table, and CTAs for /reliability. */
import Link from "next/link";
import { useLanguage } from "../../LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

const content = {
  en: {
    eyebrow: "InnovateXP Reliability Manifesto",
    title: "Why we don't build AI autopilot hype",
    intro:
      "We build AI-augmented workflows that survive production: deterministic backbone, LLM at the edges, and human checkpoints before customer-facing actions.",
    promises: [
      "Deterministic backbone: check-in, task routing, billing, and reminders stay rule-based.",
      "LLM at the edges only: AI classifies, extracts, drafts, and suggests within narrow, verifiable steps.",
      "Human-in-the-loop: people approve before customer-facing actions are sent.",
    ],
    tableTitle: "Industry vs InnovateXP",
    common: "Common AI hype",
    pragmatic: "InnovateXP pragmatic AI",
    comparison: [
      ["Set a goal and let the agent run", "Every step is predictable, observable, and reversible"],
      ["Autopilot demos with too many hidden decisions", "Deterministic pipeline + focused LLM steps"],
      ["Auto-send that feels like a bot", "Draft-first CRM: AI writes, human approves"],
      ["Demo looks good, production breaks", "Demo mirrors production workflow and fallback rules"],
    ],
    examples: [
      {
        title: "EventXP",
        body: "QR check-in, attendance, and report generation stay deterministic. AI only helps rank follow-up priority.",
        cta: "Download EventXP deck",
        href: "/decks/ixp-eventxp-pitch-deck.pdf",
        download: true,
      },
      {
        title: "SmartSales CRM",
        body: "WhatsApp inquiries become tasks and pipeline stages. AI drafts replies; your team approves before sending.",
        cta: "Download SmartSales deck",
        href: "/decks/ixp-smartsales-pitch-deck.pdf",
        download: true,
      },
      {
        title: "Custom AI Training",
        body: "We train your team to use AI safely across cloud platforms (Azure OpenAI, Alibaba Cloud, GCP, AWS) or self-hosted / on-premise deployments.",
        cta: "Book a consultation",
        href: "/bookme",
        download: false,
      },
    ],
    ctaTitle: "Want a workflow that survives production?",
    ctaBody:
      "Start with one lead-flow problem: event check-in, WhatsApp inquiry triage, or internal AI training.",
    cta: "Free 15-min chat",
  },
  zh: {
    eyebrow: "InnovateXP 可靠 AI 原則",
    title: "點解我哋唔賣 AI 自動駕駛 hype",
    intro:
      "我哋做嘅係落到地、捱到 production 嘅 AI-augmented workflow：核心流程用可控規則，AI 只負責分類、抽取、建議同草稿，出街前一定有人確認。",
    promises: [
      "Deterministic backbone：簽到、任務分配、收費、提醒等核心流程保持 rule-based。",
      "LLM at the edges only：AI 只做細範圍、可驗證嘅分類、抽取、草稿同建議。",
      "Human-in-the-loop：所有對客訊息同重要操作，都要真人確認先發出。",
    ],
    tableTitle: "一般 AI hype vs InnovateXP 做法",
    common: "常見 AI hype",
    pragmatic: "InnovateXP 實戰做法",
    comparison: [
      ["Set 個 goal，等 AI 自己跑", "每一步都可預測、可監察、可回滾"],
      ["Demo 好似好智能，但入面好多黑盒決定", "Deterministic pipeline + 單步 LLM 輔助"],
      ["自動 send，客人覺得似 bot", "Draft-first CRM：AI 草擬，你確認先發"],
      ["Demo 靚，production 易死", "Demo 等於 production 流程，有 fallback rule"],
    ],
    examples: [
      {
        title: "EventXP",
        body: "QR 簽到、出席紀錄同報告生成保持可控流程；AI 只協助排 follow-up 優先次序。",
        cta: "下載 EventXP deck",
        href: "/decks/ixp-eventxp-pitch-deck.pdf",
        download: true,
      },
      {
        title: "SmartSales CRM",
        body: "WhatsApp 查詢變成任務同 pipeline stage；AI 草擬回覆，團隊確認先發送。",
        cta: "下載 SmartSales deck",
        href: "/decks/ixp-smartsales-pitch-deck.pdf",
        download: true,
      },
      {
        title: "客製 AI Training",
        body: "培訓團隊安全使用 AI，並按需要支援 Cloud Platform（Azure OpenAI、Alibaba Cloud、GCP、AWS）或自家主機／On-Premise 部署。",
        cta: "預約諮詢",
        href: "/bookme",
        download: false,
      },
    ],
    ctaTitle: "想要一條真係捱到 production 嘅 workflow？",
    ctaBody:
      "先由一個 lead-flow 問題開始：活動簽到、WhatsApp 查詢分類，或者內部 AI training。",
    cta: "免費傾 15 分鐘",
  },
};

export function ReliabilityContent() {
  const { language } = useLanguage();
  const loc = useLocalizedHref();
  const copy = content[language];

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-12 text-slate-900 dark:text-slate-100">
      <section className="rounded-3xl border border-slate-200 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-8 shadow-sm dark:border-slate-700 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-teal-300">
          {copy.eyebrow}
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-5xl">{copy.title}</h1>
        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-slate-700 dark:text-slate-300">
          {copy.intro}
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {copy.promises.map((promise) => (
            <div key={promise} className="rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-relaxed text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300">
              <span className="mb-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary text-white dark:bg-teal-400 dark:text-slate-950">✓</span>
              <p>{promise}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-2xl font-bold">{copy.tableTitle}</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="text-slate-500 dark:text-slate-400">
              <tr>
                <th className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">{copy.common}</th>
                <th className="border-b border-slate-200 px-4 py-3 dark:border-slate-700">{copy.pragmatic}</th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.map(([left, right]) => (
                <tr key={left}>
                  <td className="border-b border-slate-100 px-4 py-4 text-slate-600 dark:border-slate-800 dark:text-slate-400">{left}</td>
                  <td className="border-b border-slate-100 px-4 py-4 font-semibold text-slate-900 dark:border-slate-800 dark:text-slate-100">{right}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {copy.examples.map((item) => (
          <article key={item.title} className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
            <h2 className="text-xl font-bold text-brand-primary dark:text-teal-300">{item.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{item.body}</p>
            <a
              href={item.download ? item.href : loc(item.href)}
              download={item.download ? "" : undefined}
              className="mt-5 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-primary-hover dark:bg-teal-400 dark:text-slate-950"
            >
              {item.cta}
            </a>
          </article>
        ))}
      </section>

      <section className="mt-8 rounded-3xl border border-cyan-200 bg-gradient-to-br from-cyan-50 via-teal-50 to-sky-100 p-8 text-slate-950 shadow-sm dark:border-slate-700 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950 dark:text-white">
        <h2 className="text-2xl font-bold">{copy.ctaTitle}</h2>
        <p className="mt-3 text-slate-700 dark:text-slate-300">{copy.ctaBody}</p>
        <Link
          href={loc("/bookme")}
          className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-slate-950 transition hover:bg-[#1ebe5d]"
        >
          {copy.cta}
        </Link>
      </section>
    </main>
  );
}
