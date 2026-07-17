import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChineseOverlay from "../../components/ChineseOverlay";
import { getFAQPageSchema, getSmartSalesProductSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const OG_IMAGE = "/opengraph-image" as const;

function smartSalesMeta(locale: AppLocale) {
  if (localeUsesChineseCopy(locale)) {
    return {
      title: "SmartSales CRM｜香港 WhatsApp 銷售管道・Smart Sales 跟進",
      description:
        "SmartSales CRM 為香港中小企及 B2B 團隊整合名單、WhatsApp／聊天情境同跟進提醒，喺同一個 pipeline 睇晒 smart sales 進度——減少試算表同 inbox 失聯，提升回覆節奏。",
      ogTitle: "SmartSales CRM — 香港 WhatsApp 銷售管道",
      ogDesc:
        "將 smart sales／WhatsApp 查詢變成可跟進嘅客戶紀錄同階段管理。適合需要快跟進、少行政負擔嘅香港團隊。",
    };
  }
  return {
    title: "SmartSales CRM Hong Kong | WhatsApp Sales Pipeline & Smart Sales Follow-Up",
    description:
      "SmartSales CRM helps Hong Kong SMEs run a WhatsApp-led sales pipeline: one place for leads, chat context, reminders, and stages—built for teams searching smart sales CRM and practical B2B follow-up without enterprise overhead.",
    ogTitle: "SmartSales CRM — Hong Kong WhatsApp pipeline",
    ogDesc:
      "Centralize leads, conversation context, and next actions for smart sales teams. Practical CRM for HK B2B follow-up.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const loc = locale as AppLocale;
  const m = smartSalesMeta(loc);
  const alternates = localeAlternates(locale, "/smartsales-crm");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/smartsales-crm`;
  return {
    title: m.title,
    description: m.description,
    alternates,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP SmartSales CRM" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDesc,
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
          question: "SmartSales CRM 適合香港中小企嗎？",
          answer:
            "適合。SmartSales CRM 針對實務 SME 流程設計——團隊需要清晰跟進紀律，又唔想承受大型 enterprise 實施成本。",
        },
        {
          question: "可唔可以配合以 WhatsApp 為主嘅銷售溝通？",
          answer:
            "可以。系統結構支援以聊天為主嘅工作方式，方便團隊保留客戶情境、下一步行動同負責人。",
        },
        {
          question: "我哋而家用試算表／Inbox，點樣過渡？",
          answer:
            "可以分階段遷移：先同步最活躍嘅名單同階段定義，再逐步補齊歷史紀錄，減少日常營運中斷。",
        },
        {
          question: "Onboarding 一般要幾耐？",
          answer:
            "多數可分階段完成：先做必要設定同主要流程，之後按採用情況微調規則同欄位。",
        },
        {
          question: "遷移期可唔可以保持現有做法？",
          answer:
            "可以。通常用分段上線降低風險，團隊可以邊營運邊切換。",
        },
      ]
    : [
        {
          question: "Is SmartSales CRM suitable for Hong Kong SMEs?",
          answer:
            "Yes. SmartSales CRM is designed for practical SME workflows where teams need clear follow-up discipline without enterprise-level implementation overhead.",
        },
        {
          question: "Can it support WhatsApp-led sales communication?",
          answer:
            "Yes. It is structured to support chat-driven workflows, so your team can track lead context and next actions consistently.",
        },
        {
          question: "We run our pipeline in spreadsheets and inboxes today—how do we migrate?",
          answer:
            "We usually migrate in phases: align active leads and stage definitions first, then backfill history so day-to-day operations keep moving.",
        },
        {
          question: "How long does onboarding usually take?",
          answer:
            "Typical onboarding can be completed in phased steps, starting with essential setup and then refining workflow rules as adoption grows.",
        },
        {
          question: "Can we keep our current process while migrating?",
          answer:
            "Yes. Migration is usually staged to reduce disruption, so your team can continue daily operations during transition.",
        },
      ];

  const pageUrl = `${siteUrl}/${locale}/smartsales-crm`;
  const productSchema = getSmartSalesProductSchema();
  const jsonLd = [
    { ...productSchema, url: pageUrl },
    getFAQPageSchema({ url: pageUrl, questions: faqQuestions }),
  ];

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
          {localeUsesChineseCopy(loc)
            ? "SmartSales CRM — 香港中小企 WhatsApp／Smart Sales 銷售管道"
            : "SmartSales CRM for Hong Kong B2B & smart sales teams"}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {localeUsesChineseCopy(loc)
            ? "SmartSales CRM 係實務向嘅客戶管理與銷售跟進平台，專為香港中小企同 B2B 團隊而設：將名單、對話紀錄、下一步任務放喺同一視圖，減少 WhatsApp、試算表同 inbox 之間失聯，等「smart sales」流程更穩定、老闆同 manager 每週都睇到清晰進度。"
            : "SmartSales CRM is a practical customer management platform for Hong Kong SMEs and B2B teams that run a WhatsApp-led smart sales motion. It combines lead tracking, conversation context, and task reminders so you stop losing deals across chat apps, spreadsheets, and inboxes—while keeping pipeline visibility realistic for founders and managers."}
        </p>
        <ChineseOverlay section="smartsales-crm-hero" />

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">What it is</h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            SmartSales CRM is built for teams that need structured sales execution without heavy enterprise complexity. It keeps customer records, interaction notes, and follow-up tasks connected so staff can work from a single operational view.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            For Hong Kong businesses that rely on WhatsApp and fast response cycles, SmartSales CRM helps standardize how leads are handled, assigned, and progressed across bilingual customer communication.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Who it&apos;s for</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Hong Kong SMEs with growing inbound and repeat customer pipelines.</li>
            <li>B2B sales teams that need cleaner handoff between consultants and account managers.</li>
            <li>Founder-led companies that want better visibility without adding admin headcount.</li>
            <li>Service teams managing mixed Cantonese and English customer communication.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">How it works</h2>
          <ol className="list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Map your current lead flow and customer follow-up process during onboarding.</li>
            <li>Set up fields, stages, and ownership rules for your Hong Kong team structure.</li>
            <li>Import existing contacts and align active opportunities into a unified pipeline.</li>
            <li>Run daily operations with reminders, notes, and stage updates in one dashboard.</li>
            <li>Review weekly activity and conversion bottlenecks with manager-level reporting.</li>
            <li>Optimize workflow rules and templates as team usage grows.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Features</h2>
          <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>Lead pipeline tracking with stage ownership, so every opportunity has clear next action.</li>
            <li>Contact timeline view to keep calls, messages, and follow-up notes in one record.</li>
            <li>Follow-up reminders and task queues to reduce missed responses in busy periods.</li>
            <li>WhatsApp-friendly workflow structure for teams that close deals through chat-first communication.</li>
            <li>Bilingual-ready operations for Cantonese and English customer contexts.</li>
            <li>Team performance snapshots for owners who need practical pipeline visibility each week.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Pricing</h2>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            Start with a SmartSales CRM trial (HKD 5,000: WhatsApp workflow setup, CRM baseline, and one sales process trial run). Full rollout and maintenance tiers are scoped after validation — not a software-only subscription pitch.
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Trial: WhatsApp workflow + CRM baseline for one core sales process.</li>
            <li>Starter: for small teams building a structured sales process.</li>
            <li>Growth: for teams that need stronger automation and reporting cadence.</li>
            <li>Enterprise: for multi-team workflows and deeper integration requirements.</li>
          </ul>
          <p className="mt-3 text-gray-700 dark:text-gray-300">
            Verified BNI members receive 30% off advisory and quick-cash services. Book a workflow review to confirm scope.
          </p>
        </section>

        <p className="mb-6 text-gray-700 dark:text-gray-300">
          Comparing CRMs? See{" "}
          <Link
            href={`/${locale}/compare/smartsales-vs-salesforce`}
            className="font-semibold text-brand-primary underline dark:text-teal-300"
          >
            SmartSales vs Salesforce (Hong Kong SME lens)
          </Link>
          .
        </p>

        <section className="mb-12 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Related AI workflow pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sme-ai-workflow", label: "SME AI Workflow" },
              { href: "/proposal-to-cash-ai", label: "Proposal-to-Cash AI" },
              { href: "/ai-coaching", label: "AI Coaching / AI 陪跑課程" },
              { href: "/case-studies", label: "Delivery Capability" },
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
            Ready to streamline your sales in Hong Kong?
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Book a practical consultation to map your current process and define the fastest rollout path.
          </p>
          <Link
            href={`/${locale}/bookme`}
            className="inline-block rounded-full bg-brand-primary px-6 py-3 font-semibold text-white transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            Book a free consultation
          </Link>
        </section>
      </div>
    </main>
  );
}
