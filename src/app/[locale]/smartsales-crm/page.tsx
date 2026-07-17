import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChineseOverlay from "../../components/ChineseOverlay";
import { getFAQPageSchema, getSmartSalesProductSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { smartSalesSeo } from "@/content/page-seo";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const OG_IMAGE = "/opengraph-image" as const;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const m = smartSalesSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/smartsales-crm");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/smartsales-crm`;
  return {
    title: m.title,
    description: m.description,
    alternates,
    openGraph: {
      title: m.ogTitle ?? m.title,
      description: m.ogDescription ?? m.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP SmartSales CRM" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle ?? m.title,
      description: m.ogDescription ?? m.description,
      images: [OG_IMAGE],
    },
  };
}

export default async function SmartSalesCrmPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

  const faqQuestions = localeUsesChineseCopy(loc)
    ? [
        {
          question: "SmartSales CRM 同 Salesforce／HubSpot 有咩分別？",
          answer:
            "SmartSales 針對 WhatsApp／聊天主導嘅中小企銷售節奏：名單、對話情境、跟進提醒同一視圖，唔需要大型 enterprise 實施。需要對比可睇 SmartSales vs Salesforce 專頁。",
        },
        {
          question: "SmartSales CRM 適合香港中小企嗎？",
          answer:
            "適合。針對實務 SME 流程——需要清晰跟進紀律，又唔想承受大型 enterprise 實施成本。",
        },
        {
          question: "「smart sales CRM」同 SmartSales 係咪同一個產品？",
          answer:
            "係。搜尋 smart sales CRM、smartsale crm、SmartSales CRM 通常都指向呢個 WhatsApp 銷售管道產品。",
        },
        {
          question: "可唔可以配合以 WhatsApp 為主嘅銷售溝通？",
          answer:
            "可以。系統結構支援以聊天為主嘅工作方式，方便團隊保留客戶情境、下一步行動同負責人。",
        },
        {
          question: "試用點樣計？",
          answer:
            "SmartSales CRM 試用 HKD 5,000：WhatsApp workflow 接入、CRM 基礎設定、1 條銷售流程試跑。期滿可約談買斷、訂閱或唔續。",
        },
        {
          question: "我哋而家用試算表／Inbox，點樣過渡？",
          answer:
            "可以分階段遷移：先同步最活躍嘅名單同階段定義，再逐步補齊歷史紀錄，減少日常營運中斷。",
        },
      ]
    : [
        {
          question: "How is SmartSales CRM different from Salesforce or HubSpot?",
          answer:
            "SmartSales is built for WhatsApp- and chat-led SME sales: leads, conversation context, and reminders in one pipeline—without enterprise implementation overhead. See our SmartSales vs Salesforce comparison page for detail.",
        },
        {
          question: "Is SmartSales CRM suitable for SMEs?",
          answer:
            "Yes. It is designed for practical SME workflows where teams need clear follow-up discipline without enterprise-level cost or complexity.",
        },
        {
          question: "Is “smart sales CRM” the same as SmartSales?",
          answer:
            "Yes. Searches for smart sales CRM, smartsale crm, and SmartSales CRM typically refer to this WhatsApp sales pipeline product.",
        },
        {
          question: "Can it support WhatsApp-led sales communication?",
          answer:
            "Yes. It is structured for chat-driven workflows so your team can track lead context and next actions consistently.",
        },
        {
          question: "How does the trial work?",
          answer:
            "SmartSales CRM trial is HKD 5,000: WhatsApp workflow setup, CRM baseline, and one sales process trial run. After the trial, decide buyout, subscription, or stop.",
        },
        {
          question: "We run our pipeline in spreadsheets and inboxes—how do we migrate?",
          answer:
            "We migrate in phases: align active leads and stage definitions first, then backfill history so day-to-day operations keep moving.",
        },
      ];

  const pageUrl = `${siteUrl}/${locale}/smartsales-crm`;
  const productSchema = getSmartSalesProductSchema();
  const jsonLd = [
    { ...productSchema, url: pageUrl },
    getFAQPageSchema({ url: pageUrl, questions: faqQuestions }),
  ];

  const zh = localeUsesChineseCopy(loc);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {zh
            ? "SmartSales CRM — WhatsApp／Smart Sales 銷售管道"
            : "SmartSales CRM — WhatsApp sales pipeline & smart sales follow-up"}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {zh
            ? "SmartSales CRM 係實務向嘅客戶管理與銷售跟進平台：將名單、對話紀錄、下一步任務放喺同一視圖，減少 WhatsApp、試算表同 inbox 之間失聯。適合搜尋 smart sales CRM、想提升回覆節奏同 pipeline 可見度嘅 B2B／中小企團隊。"
            : "SmartSales CRM is a practical CRM for teams running a WhatsApp-led smart sales motion. It combines lead tracking, conversation context, and task reminders so you stop losing deals across chat apps, spreadsheets, and inboxes—with pipeline visibility founders and managers can actually use."}
        </p>
        <ChineseOverlay section="smartsales-crm-hero" />

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "解決咩問題" : "The problem it solves"}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "WhatsApp 查詢散落個人手機，老闆／manager 睇唔到跟進狀態。"
                : "WhatsApp enquiries live on personal phones—managers cannot see follow-up status."}
            </li>
            <li>
              {zh
                ? "試算表、inbox、聊天各有一套真相，成交機會容易漏跟。"
                : "Spreadsheets, inboxes, and chat each hold a different version of truth—deals slip."}
            </li>
            <li>
              {zh
                ? "Enterprise CRM 太重、太貴，SME 用不慣、上唔到線。"
                : "Enterprise CRM is too heavy and expensive for SMEs that need to go live fast."}
            </li>
            <li>
              {zh
                ? "搜尋「smart sales CRM」嘅團隊想要可執行嘅 pipeline，唔係另一套空泛 dashboard。"
                : "Teams searching “smart sales CRM” want an executable pipeline—not another empty dashboard."}
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "產品係咩" : "What it is"}
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            {zh
              ? "SmartSales CRM 為需要結構化銷售執行、又唔想背負大型企業複雜度嘅團隊而設。客戶紀錄、互動筆記同跟進任務連成一線，員工由單一營運視圖開工。"
              : "SmartSales CRM is built for structured sales execution without enterprise complexity. Customer records, interaction notes, and follow-up tasks stay connected so staff work from one operational view."}
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            {zh
              ? "特別適合依賴 WhatsApp、要快回覆嘅業務：標準化點樣接收、分配、推進名單，雙語溝通亦都處理得到。"
              : "It fits WhatsApp-first businesses with fast response cycles: standardize how leads are received, assigned, and progressed—including bilingual customer contexts."}
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "適合邊啲團隊" : "Who it’s for"}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "有 inbound／轉介名單、需要穩定跟進紀律嘅中小企。"
                : "SMEs with inbound or referral pipelines that need consistent follow-up discipline."}
            </li>
            <li>
              {zh
                ? "B2B 銷售／顧問團隊，顧問同 account manager 之間要清晰交接。"
                : "B2B sales and consulting teams that need clean handoffs between consultants and account managers."}
            </li>
            <li>
              {zh
                ? "創辦人主導公司，想提高可見度又唔想加行政人手。"
                : "Founder-led companies that want visibility without adding admin headcount."}
            </li>
            <li>
              {zh
                ? "粵英雙語客戶溝通嘅服務團隊。"
                : "Service teams managing mixed Cantonese and English customer communication."}
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "點樣運作" : "How it works"}
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "Onboarding 時對齊而家嘅名單流同跟進流程。"
                : "Map your current lead flow and follow-up process during onboarding."}
            </li>
            <li>
              {zh
                ? "設定欄位、階段、負責人規則。"
                : "Set up fields, stages, and ownership rules for your team structure."}
            </li>
            <li>
              {zh
                ? "匯入現有聯絡人，將活躍機會放入統一 pipeline。"
                : "Import contacts and align active opportunities into a unified pipeline."}
            </li>
            <li>
              {zh
                ? "日常用提醒、筆記、階段更新操作。"
                : "Run daily ops with reminders, notes, and stage updates in one dashboard."}
            </li>
            <li>
              {zh
                ? "每週檢視活動同轉化瓶頸。"
                : "Review weekly activity and conversion bottlenecks with manager-level reporting."}
            </li>
            <li>
              {zh
                ? "隨採用情況優化規則同模板。"
                : "Optimize workflow rules and templates as team usage grows."}
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "主要功能" : "Features"}
          </h2>
          <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "Lead pipeline 追蹤：每個機會有清晰負責人同下一步。"
                : "Lead pipeline tracking with stage ownership and a clear next action."}
            </li>
            <li>
              {zh
                ? "聯絡人時間線：通話、訊息、跟進筆記同一紀錄。"
                : "Contact timeline for calls, messages, and follow-up notes in one record."}
            </li>
            <li>
              {zh
                ? "跟進提醒同任務佇列，減少忙碌期漏回覆。"
                : "Follow-up reminders and task queues to reduce missed replies in busy periods."}
            </li>
            <li>
              {zh
                ? "WhatsApp-friendly 結構，配合 chat-first 成交。"
                : "WhatsApp-friendly structure for teams that close deals through chat-first communication."}
            </li>
            <li>
              {zh
                ? "雙語營運就緒（粵／英情境）。"
                : "Bilingual-ready operations for Cantonese and English contexts."}
            </li>
            <li>
              {zh
                ? "團隊表現快照，老闆每週睇到實務 pipeline。"
                : "Team performance snapshots for owners who need practical weekly pipeline visibility."}
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "Before → After" : "Before → After"}
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900 dark:border-red-500/30 dark:bg-red-950/30 dark:text-red-100">
              <p className="font-bold">Before</p>
              <p className="mt-2">
                {zh
                  ? "WhatsApp 散落、Excel 對唔齊、漏跟無人知、月尾先發現流失。"
                  : "Scattered WhatsApp threads, misaligned Excel, missed follow-ups, month-end discovery of lost deals."}
              </p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-500/30 dark:bg-emerald-950/30 dark:text-emerald-100">
              <p className="font-bold">After</p>
              <p className="mt-2">
                {zh
                  ? "單一 pipeline、對話有紀錄、提醒有人負責、每週可見進度。"
                  : "One pipeline, conversation context retained, owned reminders, weekly visible progress."}
              </p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "定價" : "Pricing"}
          </h2>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            {zh
              ? "先由 SmartSales CRM 試用開始（HKD 5,000：WhatsApp workflow、CRM 基礎、1 條銷售流程試跑）。完整上線同維護方案喺驗證後再定 scope——唔係純租軟件。"
              : "Start with a SmartSales CRM trial (HKD 5,000: WhatsApp workflow setup, CRM baseline, and one sales process trial run). Full rollout and maintenance are scoped after validation—not a software-only subscription pitch."}
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "試用：WhatsApp workflow + CRM baseline（一條核心銷售流程）。"
                : "Trial: WhatsApp workflow + CRM baseline for one core sales process."}
            </li>
            <li>
              {zh
                ? "Starter：小型團隊建立結構化銷售流程。"
                : "Starter: for small teams building a structured sales process."}
            </li>
            <li>
              {zh
                ? "Growth：需要更強自動化同報告節奏嘅團隊。"
                : "Growth: for teams that need stronger automation and reporting cadence."}
            </li>
            <li>
              {zh
                ? "Enterprise：多團隊流程同更深整合需求。"
                : "Enterprise: for multi-team workflows and deeper integration requirements."}
            </li>
          </ul>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            {zh
              ? "查證 BNI 會員可享 advisory／工具試用折扣。預約流程診斷確認 scope。"
              : "Verified BNI members receive discounts on advisory and tool trials. Book a workflow review to confirm scope."}
          </p>
        </section>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          {zh ? "比較 CRM？" : "Comparing CRMs?"}{" "}
          <Link
            href={`/${locale}/compare/smartsales-vs-salesforce`}
            className="font-semibold text-brand-primary underline dark:text-teal-300"
          >
            {zh ? "SmartSales vs Salesforce（SME 視角）" : "SmartSales vs Salesforce (SME lens)"}
          </Link>
          .
        </p>

        <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {zh ? "相關頁面" : "Related pages"}
          </h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sme-ai-workflow", label: zh ? "中小企自動化／SME AI Workflow" : "SME Automation / AI Workflow" },
              { href: "/proposal-to-cash-ai", label: "Proposal-to-Cash AI" },
              { href: "/ai-coaching", label: zh ? "AI 陪跑課程" : "AI Coaching" },
              { href: "/private-ai-solutions", label: zh ? "私有 AI 方案" : "Private AI Solutions" },
              { href: "/case-studies", label: zh ? "交付能力" : "Delivery Capability" },
            ].map((item) => (
              <Link
                key={item.href}
                href={`/${locale}${item.href}`}
                className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-300"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">FAQ</h2>
          <dl className="space-y-6">
            {faqQuestions.map((f) => (
              <div key={f.question}>
                <dt className="text-xl font-semibold text-gray-900 dark:text-white">{f.question}</dt>
                <dd className="mt-2 text-gray-700 dark:text-gray-300">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {zh ? "準備整理銷售跟進？" : "Ready to tighten your sales follow-up?"}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {zh
              ? "預約實務諮詢：對齊而家流程，訂最快上線路徑。"
              : "Book a practical consultation to map your current process and define the fastest rollout path."}
          </p>
          <Link
            href={`/${locale}/bookme`}
            className="inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            {zh ? "預約免費諮詢" : "Book a free consultation"}
          </Link>
        </section>
      </div>
    </main>
  );
}
