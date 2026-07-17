import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { cxConsultingSeo } from "@/content/page-seo";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = cxConsultingSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/customer-experience-consulting");
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

export default async function CustomerExperienceConsultingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const zh = localeUsesChineseCopy(locale as AppLocale);
  const siteUrl = getSiteUrl();
  const pageUrl = `${siteUrl}/${locale}/customer-experience-consulting`;

  const faqs = zh
    ? [
        {
          question: "CX consulting 同買 chatbot 有咩分別？",
          answer:
            "我哋先畫接觸點、SLA、負責人同 KPI，再決定邊度用 AI 草稿、邊度必須真人。工具係支援，唔係起點。",
        },
        {
          question: "適合邊類中小企？",
          answer:
            "服務型、培訓、專業服務、B2B 銷售——任何靠 WhatsApp／email 跟進客戶、而家回覆節奏唔穩嘅團隊。",
        },
        {
          question: "可唔可以同 SmartSales／EventXP 一齊做？",
          answer:
            "可以。CX 流程釐清之後，常會接到 SmartSales（銷售跟進）或 EventXP（活動後跟進）試用，再決定長期落地。",
        },
      ]
    : [
        {
          question: "How is CX consulting different from buying a chatbot?",
          answer:
            "We map touchpoints, SLAs, ownership, and KPIs first—then decide where AI drafts help and where humans must stay. Tools support the process; they are not the starting point.",
        },
        {
          question: "Who is this for?",
          answer:
            "Service firms, training providers, professional services, and B2B sales teams that follow up via WhatsApp/email and currently have uneven response rhythm.",
        },
        {
          question: "Can this connect to SmartSales or EventXP?",
          answer:
            "Yes. After CX workflows are clear, teams often trial SmartSales (sales follow-up) or EventXP (post-event follow-up) before longer rollout.",
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
          Customer Experience Consulting
        </p>
        <h1 className="mb-6 text-4xl font-bold text-gray-900 dark:text-white md:text-5xl">
          {zh
            ? "客戶體驗顧問：先執順接觸點，再談 AI"
            : "Customer experience consulting: fix touchpoints, then add AI"}
        </h1>
        <p className="mb-8 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {zh
            ? "搜尋「customer experience consulting」嘅團隊，多數已經有客服／銷售工具——問題係回覆唔穩、交接唔清、客戶感受斷層。InnovateXP 用 CX consulting 梳理接觸點同跟進紀律，再用 AI／自動化提升節奏，而唔係堆另一個 bot。"
            : "Teams searching for customer experience consulting often already have service tools—the gap is uneven replies, unclear handoffs, and broken moments of truth. InnovateXP maps touchpoints and follow-up discipline first, then adds AI where it improves pace—not another bot pile-on."}
        </p>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "CX 診斷涵蓋咩" : "What the CX diagnosis covers"}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "接觸點地圖：查詢 → 回覆 → 成交 → 售後。"
                : "Touchpoint map: enquiry → reply → close → aftercare."}
            </li>
            <li>
              {zh
                ? "回覆 SLA、負責人、升級路徑。"
                : "Response SLAs, owners, and escalation paths."}
            </li>
            <li>
              {zh
                ? "WhatsApp／email／表格之間嘅真相斷層。"
                : "Truth gaps between WhatsApp, email, and forms."}
            </li>
            <li>
              {zh
                ? "邊度適合 AI 草稿、邊度必須真人。"
                : "Where AI drafts help vs where humans must stay."}
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">
            {zh ? "預期改善方向" : "Typical improvement directions"}
          </h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              {zh
                ? "更快、更一致嘅首次回覆。"
                : "Faster, more consistent first responses."}
            </li>
            <li>
              {zh
                ? "跟進唔再靠個人記憶。"
                : "Follow-up that no longer depends on personal memory."}
            </li>
            <li>
              {zh
                ? "管理層每週睇到 CX／銷售瓶頸。"
                : "Weekly visibility of CX and sales bottlenecks for managers."}
            </li>
          </ul>
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
            {zh ? "開始 CX 診斷" : "Start a CX diagnosis"}
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            {zh
              ? "預約 30 分鐘，對齊一條最痛嘅客戶旅程。"
              : "Book 30 minutes to align on your most painful customer journey."}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/bookme`}
              className="inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white dark:bg-[#00B9B3] dark:text-slate-950"
            >
              {zh ? "預約諮詢" : "Book a consultation"}
            </Link>
            <Link
              href={`/${locale}/smartsales-crm`}
              className="inline-block rounded-full border-2 border-brand-primary px-6 py-3 font-semibold text-brand-primary dark:border-teal-300 dark:text-teal-300"
            >
              SmartSales CRM
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
