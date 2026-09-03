import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { privateAiSeo } from "@/content/page-seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = privateAiSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/private-ai-solutions");
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: typeof alternates?.canonical === "string" ? alternates.canonical : undefined,
      siteName: "InnovateXP Limited",
    },
  };
}

export default async function PrivateAiSolutionsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const zh = localeUsesChineseCopy(locale as AppLocale);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/private-ai-solutions`;

  const faqs = zh
    ? [
        {
          question: "私有 AI 同公開 ChatGPT 有咩分別？",
          answer:
            "私有 AI 強調資料可控：入庫加密、存取權限、部署環境（私有雲／On-Premise）按你公司 data policy 設計，而唔係把敏感單據直接丟去公用模型。",
        },
        {
          question: "邊類公司最需要 private AI solutions／企業 private AI？",
          answer:
            "會計、金融、專業服務、有客戶機密或銀行單據／收據流程嘅團隊——任何對資料外洩零容忍嘅香港企業場景。",
        },
        {
          question: "會唔會一開始就建完整私有堆疊？",
          answer:
            "唔會。InnovateXP 先驗證 workflow 同 KPI，再決定雲、私有雲定 On-Premise。工具係引流；顧問陪跑先係落地實體。",
        },
        {
          question: "香港企業 private AI 通常由邊度起步？",
          answer:
            "多數由一條可量度流程起步——例如收據分類、月結單摘要、或內部知識庫問答——並設定人工覆核關卡，再擴展到更多部門。",
        },
      ]
    : [
        {
          question: "How is private AI different from public ChatGPT?",
          answer:
            "Private AI prioritizes controlled data: encrypted storage, access controls, and deployment (private cloud / on-prem) aligned to your data policy—not dumping sensitive documents into a public model.",
        },
        {
          question: "Who needs private AI solutions?",
          answer:
            "Accounting, finance, professional services, and any Hong Kong team handling confidential receipts, bank statements, or client data with zero tolerance for leakage.",
        },
        {
          question: "Do you build a full private stack on day one?",
          answer:
            "No. InnovateXP validates workflow and KPIs first, then chooses cloud, private cloud, or on-prem. Tools lead acquisition; advisory programs deliver the real service.",
        },
        {
          question: "Where do Hong Kong enterprise private AI projects usually start?",
          answer:
            "Most start with one measurable workflow—receipt classification, statement summarisation, or internal knowledge Q&A—with human review gates before expanding to more teams.",
        },
      ];

  const jsonLd = getFAQPageSchema({ url: pageUrl, questions: faqs });

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl px-4 py-16">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
        />
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
          Private AI Solutions
        </p>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {zh
            ? "企業 Private AI 方案：資料可控，再談自動化"
            : "Private AI solutions for Hong Kong enterprises"}
        </h1>
        <p className="mb-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {zh
            ? "搜尋「private AI solutions」或「企業 private AI」嘅團隊通常唔係想再買一個 chatbot——而係要喺嚴格 data policy 下，用 AI 處理收據、銀行月結單、客戶文件。香港 AI 顧問 Larry Lo／InnovateXP 以流程診斷定位：先畫清風險邊界，再設計私有雲／On-Premise／加密入庫方案。"
            : "Teams searching for private AI solutions or enterprise private AI rarely need another public chatbot—they need AI that can touch receipts, bank statements, and client files under a strict data policy. Hong Kong AI consultant Larry Lo / InnovateXP maps the risk boundary first, then designs private-cloud, on-prem, or encrypted-storage options."}
        </p>
        <p className="mb-8 leading-relaxed text-gray-700 dark:text-gray-300">
          {zh
            ? "私有 AI 唔等於一開始就買齊伺服器。多數香港中小企同專業服務團隊，會先喺可控雲端（例如 Azure OpenAI 私有端點）驗證一個可量度試點，確認人工覆核同權限模型可行，先至考慮更嚴格嘅 On-Premise。InnovateXP 會同你對齊：邊啲資料永遠唔入模型、邊啲可以入庫加密、邊個角色可以覆核輸出。"
            : "Private AI does not mean buying servers on day one. Most Hong Kong SMEs and professional-services teams validate one measurable pilot on a controlled cloud endpoint (for example Azure OpenAI private endpoints), prove human review and access models, then decide whether stricter on-prem is required. InnovateXP aligns what never enters a model, what may be encrypted at rest, and who may approve outputs."}
        </p>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "香港企業點樣用 private AI" : "How Hong Kong enterprises use private AI"}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "會計／財務：收據 OCR、費用分類、月結摘要——敏感欄位留喺可控環境。"
                : "Accounting/finance: receipt OCR, expense classification, statement summaries—sensitive fields stay controlled."}
            </li>
            <li>
              {zh
                ? "專業服務：客戶合約／會議紀錄摘要，配合權限同審計軌跡。"
                : "Professional services: client contract and meeting summaries with permissions and audit trails."}
            </li>
            <li>
              {zh
                ? "內部知識庫：只服務員工嘅問答，唔對公眾開放模型。"
                : "Internal knowledge bases: employee-only Q&A—not a public-facing model."}
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "點解公開模型唔夠" : "Why public models are not enough"}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "會計／銀行單據含帳戶、金額、客戶身份——外洩成本極高。"
                : "Accounting and bank documents contain accounts, amounts, and identities—leakage cost is high."}
            </li>
            <li>
              {zh
                ? "政策要求：入庫要加密、存取要可稽核、部署位置要可控。"
                : "Policy requires encryption at rest, auditable access, and controllable residency."}
            </li>
            <li>
              {zh
                ? "圖片 OCR 同文字抽取要喺可控環境做功課，唔係一鍵丟雲端。"
                : "Image OCR and text extraction need controlled environments—not a one-click public upload."}
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "我哋點落地" : "How we deliver"}
          </h2>
          <ol className="list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "Workflow 診斷：邊啲資料可入 AI、邊啲必須人工覆核。"
                : "Workflow diagnosis: what data may enter AI, what must stay human-reviewed."}
            </li>
            <li>
              {zh
                ? "架構選項：Azure OpenAI／多雲、私有雲、或 On-Premise。"
                : "Architecture options: Azure OpenAI / multi-cloud, private cloud, or on-premise."}
            </li>
            <li>
              {zh
                ? "試點：例如 Accounting Chatbot（收據 upload → 分類 → 每週報告）。"
                : "Pilot: e.g. Accounting Chatbot (receipt upload → classify → weekly report)."}
            </li>
            <li>
              {zh
                ? "安全錨點：建議引入 IT security／IT audit 角色把關（人嘅問題同技術同樣重要）。"
                : "Security anchor: involve IT security / IT audit stakeholders—people and process matter as much as tech."}
            </li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">FAQ</h2>
          <dl className="space-y-6">
            {faqs.map((f) => (
              <div key={f.question}>
                <dt className="text-xl font-semibold text-gray-900 dark:text-white">{f.question}</dt>
                <dd className="mt-2 text-gray-700 dark:text-gray-300">{f.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
            {zh ? "下一步" : "Next step"}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {zh
              ? "預約 30 分鐘診斷，釐清資料邊界同第一個私有 AI 試點。"
              : "Book a 30-minute diagnosis to clarify data boundaries and your first private AI pilot."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/bookme`}
              className="inline-block btn-brand px-6 py-3 font-semibold "
            >
              {zh ? "預約諮詢" : "Book a consultation"}
            </Link>
            <Link
              href={`/${locale}/ai-consulting`}
              className="inline-block rounded-full border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary dark:border-brand-primary dark:text-[color:var(--primary-hover)]"
            >
              {zh ? "AI 顧問服務" : "AI consulting"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
