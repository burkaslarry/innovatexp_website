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
          question: "邊類公司最需要 private AI solutions？",
          answer:
            "會計、金融、專業服務、有客戶機密或銀行單據／收據流程嘅團隊——任何對資料外洩零容忍嘅場景。",
        },
        {
          question: "會唔會一開始就建完整私有堆疊？",
          answer:
            "唔會。InnovateXP 先驗證 workflow 同 KPI，再決定雲、私有雲定 On-Premise。工具係引流；顧問陪跑先係落地實體。",
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
            "Accounting, finance, professional services, and any team handling confidential receipts, bank statements, or client data with zero tolerance for leakage.",
        },
        {
          question: "Do you build a full private stack on day one?",
          answer:
            "No. InnovateXP validates workflow and KPIs first, then chooses cloud, private cloud, or on-prem. Tools lead acquisition; advisory programs deliver the real service.",
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
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-teal-300">
          Private AI Solutions
        </p>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {zh
            ? "私有 AI 方案：資料可控，再談自動化"
            : "Private AI solutions: control the data, then automate"}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {zh
            ? "搜尋「private AI solutions」嘅團隊通常唔係想再買一個 chatbot——而係要喺嚴格 data policy 下，用 AI 處理收據、銀行月結單、客戶文件。InnovateXP 以 AI 商業顧問定位：先畫清流程同風險邊界，再設計私有雲／On-Premise／加密入庫方案。"
            : "Teams searching for private AI solutions rarely need another public chatbot—they need AI that can touch receipts, bank statements, and client files under a strict data policy. InnovateXP leads with consultancy: map the workflow and risk boundary first, then design private-cloud, on-prem, or encrypted-storage options."}
        </p>

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
              className="inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white dark:bg-[#00B9B3] dark:text-slate-950"
            >
              {zh ? "預約諮詢" : "Book a consultation"}
            </Link>
            <Link
              href={`/${locale}/ai-consulting`}
              className="inline-block rounded-full border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary dark:border-teal-300 dark:text-teal-300"
            >
              {zh ? "AI 顧問服務" : "AI consulting"}
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
