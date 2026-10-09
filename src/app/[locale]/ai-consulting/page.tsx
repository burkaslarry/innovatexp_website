import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { aiConsultingSeo } from "@/content/page-seo";
import { PRICING, formatHkd } from "@/content/pricing";
import { getSiteUrl } from "@/lib/site-url";

const OG_IMAGE = "/opengraph-image" as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const m = aiConsultingSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/ai-consulting");
  const ogUrl = `${getSiteUrl()}/${locale}/ai-consulting`;
  return {
    title: m.title,
    description: m.description,
    alternates,
    openGraph: {
      title: m.ogTitle ?? m.title,
      description: m.ogDescription ?? m.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP AI Consulting" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle ?? m.title,
      description: m.ogDescription ?? m.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function AiConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const moneyLocale = zh ? "zh-hk" : "en";
  const snapshot = formatHkd(PRICING.quickCash.aiReadinessAssessment, moneyLocale);
  const discovery = formatHkd(PRICING.consultancy.discoverySprint30Day, moneyLocale);
  const foundation = formatHkd(PRICING.consultancy.foundation3Month, moneyLocale);
  const accelerator = formatHkd(PRICING.consultancy.accelerator6Month, moneyLocale);
  const local = (path: string) => `/${loc}${path}`;

  const faqs = zh
    ? [
        {
          question: "香港中小企幾時需要 AI 商業顧問？",
          answer: "當 WhatsApp 查詢、Excel 記錄或人手交接令銷售同營運卡住，可以先做業務聽診。InnovateXP 會揀一條最值得改善嘅流程，定清負責人、起始數字同下一步，之後先決定需唔需要 AI 或系統。",
        },
        {
          question: "30 分鐘業務聽診會做咩？",
          answer: "同 Larry Lo 聚焦一條銷售或營運流程，找出漏位、交接責任同可以量度嘅結果。需要書面診斷、流程圖或落地方案時，再按範圍選 Snapshot 或 Discovery。",
        },
        {
          question: "一定要買 AI 或 CRM 系統？",
          answer: "唔一定。現有工具夠用就先執流程同責任。只有當試行證明需要，先建議自動化、SmartSales CRM、EventXP 或其他工具。",
        },
        {
          question: "由診斷到落地有咩選擇？",
          answer: `Snapshot 由 ${snapshot} 起；10 人或以下嘅 30 日 Discovery 由 ${discovery} 起。之後如需陪團隊建立穩定做法，3 個月 Foundation 由 ${foundation} 起；6 個月 Accelerator 由 ${accelerator} 起。實際範圍聽診後確認。`,
        },
        {
          question: "AI 專業顧問服務同賣軟件有咩分別？",
          answer: "賣軟件由產品開始。AI 專業顧問服務由一條卡住嘅流程開始。唔需要系統會直講。專業顧問支援可以先試一條線。",
        },
        {
          question: "Agilizing 嘅結果可唔可以當我哋嘅預測？",
          answer: "教材由 10 日縮至 3 小時，係善敏教育中心業主確認嘅結果。未聽你條流程之前，我哋唔承諾同一回報。",
        },
      ]
    : [
        {
          question: "When should a Hong Kong SME speak to an AI business consultant?",
          answer: "When WhatsApp enquiries, spreadsheets or handoffs slow sales and operations, start with one Business Workflow Diagnosis. InnovateXP identifies ownership, a baseline metric and a practical next step before recommending AI or software.",
        },
        {
          question: "What happens in the 30-minute diagnosis?",
          answer: "Larry Lo focuses on one sales or operations workflow, identifies leakage and handoff gaps, and agrees on a measurable result. A written diagnosis, process map or implementation plan can follow as a scoped Snapshot or Discovery engagement.",
        },
        {
          question: "Must we buy AI or a CRM system?",
          answer: "No. If your current tools are enough, clarify the workflow and responsibilities first. Automation, SmartSales CRM or EventXP is considered only when a trial shows it is useful.",
        },
        {
          question: "What does the next stage cost?",
          answer: `Snapshot starts at ${snapshot}; a 30-day Discovery for up to 10 people starts at ${discovery}. For ongoing adoption, a 3-month Foundation starts at ${foundation} and a 6-month Accelerator at ${accelerator}. The scope is confirmed after diagnosis.`,
        },
        {
          question: "How is AI Automation Consulting different from buying software?",
          answer: "Software starts from a product. Consulting starts from one stuck workflow. If you should not buy yet, Larry says so. You can trial one line before a large contract.",
        },
        {
          question: "Can we treat the Agilizing saving as our forecast?",
          answer: "Training materials fell from 10 days to 3 hours at Agilizing. That figure is verified for that centre. It is not a promise before we see your workflow.",
        },
      ];

  const stages = zh
    ? [
        { title: "1. 聽診一條流程", body: "例如 WhatsApp 查詢到報價、活動報名到會後跟進，或課堂出席到續期；先搵出最易漏同最慢嘅一步。" },
        { title: "2. 定清責任同數字", body: "畫出目前交接、負責人同起始指標；用真實個案確認邊個改動值得先試。" },
        { title: "3. 細步試行同陪跑", body: "需要時先加 AI、自動化或產品，教團隊使用，並按使用情況同結果逐月檢討。" },
      ]
    : [
        { title: "1. Diagnose one workflow", body: "Start with a real path such as WhatsApp enquiry to quote, event registration to follow-up, or class attendance to renewal." },
        { title: "2. Build the working version", body: "Name the owner, the review point, and the one change worth trying on real cases." },
        { title: "3. Launch within 30 days", body: "Put AI integration only where the team will use it, then review before a second workflow." },
      ];

  const packages = zh
    ? [
        { name: "Snapshot", price: snapshot, detail: "書面診斷與下一步；適合想先睇清一條流程。" },
        { name: "30 日 Discovery", price: `${discovery} 起`, detail: "10 人或以下：流程、負責人、基準數字同 30／60／90 日行動。" },
        { name: "3 個月 Foundation", price: `${foundation} 起`, detail: "改善 1–2 條流程，團隊用真實個案試行，每月檢討。" },
        { name: "6 個月 Accelerator", price: `${accelerator} 起`, detail: "改善一個團隊內 3–4 條相關流程，追蹤採用同管理層進度。" },
      ]
    : [
        { name: "Snapshot", price: snapshot, detail: "A written diagnosis and next step for one workflow." },
        { name: "30-day Discovery", price: `From ${discovery}`, detail: "For up to 10 people: workflow, owners, baseline and a 30/60/90-day plan." },
        { name: "3-month Foundation", price: `From ${foundation}`, detail: "Improve 1–2 workflows with real-case team practice and monthly reviews." },
        { name: "6-month Accelerator", price: `From ${accelerator}`, detail: "Improve 3–4 related workflows in one team, with adoption and management reviews." },
      ];

  const jsonLd = getFAQPageSchema({ url: `${getSiteUrl()}/${loc}/ai-consulting`, questions: faqs });

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-4 py-12 text-slate-900 dark:text-slate-100 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <header className="rounded-2xl bg-slate-950 px-6 py-10 text-white md:px-10">
        <p className="ixp-eyebrow text-sm font-semibold text-cyan-300">InnovateXP · {locale === "en" ? "AI business consultant" : locale === "ja" ? "AIビジネスコンサルタント" : locale === "de" ? "KI-Berater" : "AI 商業顧問"}</p>
        <h1 className="mt-4 text-3xl font-normal leading-tight md:text-5xl">
          {loc === "ja"
            ? `AIビジネスコンサルタント：30分の診断、${snapshot}から`
            : loc === "de"
              ? `KI-Berater für Hongkonger KMU: 30-Minuten-Diagnose ab ${snapshot}`
              : loc === "zh-tw"
                ? `AI 商業顧問：30 分鐘業務診斷，${snapshot} 起`
                : zh
                  ? `AI 商業顧問：30 分鐘業務聽診，${snapshot} 起`
                  : `AI business consultant: 30-minute diagnosis from ${snapshot}`}
        </h1>
        <p className="mt-5 max-w-3xl text-base font-medium leading-8 text-white" data-geo-answer>
          {loc === "ja"
            ? `InnovateXPは香港の3〜30人企業のボトルネックを整え、その後AIを入れます。Agilizingの教材は10日から3時間です。`
            : loc === "de"
              ? `InnovateXP richtet bei Hongkonger KMU mit 3–30 Personen zuerst den Engpass, dann die KI. Bei Agilizing: 10 Tage auf 3 Stunden.`
              : loc === "zh-tw"
                ? "InnovateXP 協助香港 3–30 人中小企業處理業務瓶頸，先整理流程再落地 AI。善敏教材由 10 日縮至 3 小時，時間縮短。"
                : zh
                  ? "InnovateXP 幫香港 3–30 人中小企處理業務樽頸，先執流程再落地 AI。善敏教材 10 日縮至 3 小時，時間縮短。"
                  : "InnovateXP helps Hong Kong SMEs of 3 to 30 fix one bottleneck, then put AI to work. Agilizing cut training materials from 10 days to 3 hours. Larry says so if you should not buy a system yet."}
        </p>
        <p className="mt-4 max-w-3xl text-base leading-8 text-slate-200">
          {zh
            ? "Larry Lo／InnovateXP 幫 3–30 人中小企由一條銷售或營運流程開始，找出漏客、慢報價同交接卡位。先定負責人同量度方法，再決定需唔需要 AI、CRM 或自動化。"
            : "Larry Lo / InnovateXP helps Hong Kong SMEs of 3–30 people fix one sales or operations workflow: lost enquiries, slow quotes or unclear handoffs. We assign ownership and a measurable baseline before choosing AI, CRM or automation."}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link href={local("/bookme")} className="inline-flex min-h-11 items-center rounded-lg bg-cyan-300 px-5 py-3 text-sm font-bold text-slate-950 hover:bg-cyan-200">
            {zh ? "預約 30 分鐘業務聽診" : "Book a 30-minute diagnosis"}
          </Link>
          <Link href={local("/case-studies")} className="inline-flex min-h-11 items-center rounded-lg border border-slate-500 px-5 py-3 text-sm font-semibold text-white hover:border-white">
            {zh ? "睇交付經驗" : "See delivery experience"}
          </Link>
        </div>
      </header>

      <section className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div>
          <h2 className="text-2xl font-bold">{zh ? "業務聽診到落地：三步" : "From diagnosis to adoption in three steps"}</h2>
          <ol className="mt-5 space-y-4">
            {stages.map((stage) => (
              <li key={stage.title} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
                <h3 className="text-lg font-semibold">{stage.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{stage.body}</p>
              </li>
            ))}
          </ol>
          <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">
            {zh ? "常見切入點：" : "Common starting points: "}
            <Link href={local("/smartsales-crm")} className="font-semibold text-brand-primary underline">{zh ? "銷售跟進" : "sales follow-up"}</Link>{" · "}
            <Link href={local("/eventxp")} className="font-semibold text-brand-primary underline">{zh ? "活動流程" : "event operations"}</Link>{" · "}
            <Link href={local("/fitnessxp")} className="font-semibold text-brand-primary underline">{zh ? "課堂營運" : "class operations"}</Link>。
          </p>
        </div>
        <div>
          <Image
            src={zh ? "/posters/zh-hk/product-06-ai-consultancy-plans-v2.png" : "/posters/en/product-06-ai-consultancy-plans.png"}
            alt={zh ? "InnovateXP AI 商業升級陪跑：30 日睇清問題、3 個月建立穩定做法、6 個月擴展到部門" : "InnovateXP AI consultancy programmes from diagnosis to team adoption"}
            width={zh ? 1122 : 787}
            height={zh ? 1402 : 1400}
            className="h-auto w-full rounded-xl"
            sizes="(max-width: 1024px) 100vw, 300px"
          />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-2xl font-bold">{zh ? "服務入口同交付範圍" : "Engagement options and deliverables"}</h2>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          {zh ? "先做 30 分鐘業務聽診，再按問題複雜程度確認付費範圍。以下係公開起步價；正式報價會寫清交付、時間同責任。" : "Start with a 30-minute diagnosis, then scope paid work by the complexity of the workflow. These are published starting prices; a proposal specifies deliverables, timing and ownership."}
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {packages.map((item) => (
            <article key={item.name} className="rounded-xl border border-slate-200 bg-white p-5 dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="mt-2 text-xl font-bold text-brand-primary">{item.price}</p>
              <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900 md:p-8">
        <h2 className="text-2xl font-bold">{zh ? "常見問題" : "Frequently asked questions"}</h2>
        <dl className="mt-6 space-y-6">
          {faqs.map((faq) => (
            <div key={faq.question}>
              <dt className="text-lg font-semibold">{faq.question}</dt>
              <dd className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{faq.answer}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={local("/bookme")} className="inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-5 py-3 text-sm font-bold text-white hover:brightness-110">
            {zh ? "預約業務聽診" : "Book a workflow diagnosis"}
          </Link>
          <Link href={local("/about")} className="inline-flex min-h-11 items-center rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold dark:border-slate-600">
            {zh ? "認識 Larry Lo" : "About Larry Lo"}
          </Link>
        </div>
      </section>
    </main>
  );
}
