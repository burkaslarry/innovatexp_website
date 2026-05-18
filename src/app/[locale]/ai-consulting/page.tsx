import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ChineseOverlay from "../../components/ChineseOverlay";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const OG_IMAGE = "/opengraph-image" as const;

function aiConsultingMeta(locale: AppLocale) {
  if (localeUsesChineseCopy(locale)) {
    return {
      title: "AI 顧問｜香港落地 Premium 方案・私有雲／On-Premise AI",
      description:
        "InnovateXP 提供創辦人主導嘅 AI／CRM 落地顧問：先做試點再擴展，涵蓋 WhatsApp／銷售流程、Azure OpenAI／多云／On-Premise，並附實操 AI training。",
      ogTitle: "InnovateXP AI 顧問 — 香港落地",
      ogDesc:
        "清晰範疇、固定 review、Premium done-with-you：將 AI 做成可量化嘅工作流程，唔係只得 slide。",
    };
  }
  return {
    title: "AI Consulting Hong Kong | Premium Implementation & Private AI Stack Advisory",
    description:
      "Founder-led AI consulting for Hong Kong SMEs: scoped pilots, workflow-first delivery, cloud or on-premise AI deployment options (Azure OpenAI, Alibaba Cloud, GCP, AWS), plus practical AI training.",
    ogTitle: "InnovateXP AI Consulting — Hong Kong",
    ogDesc:
      "Premium done-with-you engagements with explicit scope, review cadence, and measurable pilots—not slide-only strategy.",
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
  const m = aiConsultingMeta(loc);
  const alternates = localeAlternates(locale, "/ai-consulting");
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/ai-consulting`;
  return {
    title: m.title,
    description: m.description,
    alternates,
    openGraph: {
      title: m.ogTitle,
      description: m.ogDesc,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "InnovateXP AI Consulting" }],
    },
    twitter: {
      card: "summary_large_image",
      title: m.ogTitle,
      description: m.ogDesc,
      images: [OG_IMAGE],
    },
  };
}

export default async function AiConsultingPage({
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
          question: "香港中小企適合用咩？",
          answer:
            "適合需要落地指引同清晰優先級嘅 SME——唔係堆概念，而係聚焦一到兩條 workflow 試點再擴展。",
        },
        {
          question: "一定要有技術團隊先開始得？",
          answer:
            "唔一定要。可以由流程梳理同行為資料整理開始，再按需要加深整合與部署。",
        },
        {
          question: "Premium 模式係點？",
          answer:
            "Premium 項目會白紙黑字界定範圍、試點指標同修訂節奏；創辦人主導交付，並可按需要支援 SmartSales CRM／EventXP 或旁路自動化。",
        },
        {
          question: "遠程／混合／上门都得？",
          answer:
            "多數混合進行（香港時區 remote），必要時可安排工作坊或現場環節。",
        },
      ]
    : [
        {
          question: "Is this AI consulting service suitable for Hong Kong SMEs?",
          answer:
            "Yes. The service is designed for SMEs that need practical implementation guidance with clear operational priorities.",
        },
        {
          question: "Do we need a technical team before starting?",
          answer:
            "No. Engagement can begin with process mapping and phased rollout planning, then scale technical depth as needed.",
        },
        {
          question: "How does the premium engagement model work?",
          answer:
            "Premium programmes define explicit scope boundaries, pilot metrics, and a weekly/bi-weekly review cadence. Delivery is founder-led with hands-on implementation support across adjacent workflows where SmartSales CRM or EventXP fits.",
        },
        {
          question: "Hybrid delivery?",
          answer:
            "Most work is hybrid with Hong Kong timezone coverage; workshops can be scheduled when helpful.",
        },
      ];

  const pageUrl = `${siteUrl}/${locale}/ai-consulting`;
  const jsonLd = [getFAQPageSchema({ url: pageUrl, questions: faqQuestions })];

  const premiumHref = `/${locale}/premium-ai-consulting`;

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
            ? "好多 AI 項目頭三週就走歪——我哋用試點同清晰範疇拉住結果。"
            : "Every AI project that fails does so in the first 3 weeks — here is why."}
        </h1>
        <p className="mb-10 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {localeUsesChineseCopy(loc)
            ? "好多中小企揀錯工具、範疇太大、未見到結果就已經無動力。InnovateXP 由一條 workflow 開始，先用試點證明價值再擴展——控制風險，能量化就先量化。"
            : "Most SMEs pick the wrong tool, scope too broadly, and lose momentum before seeing results. InnovateXP consulting starts with one workflow, proves ROI in a pilot window, then expands — controlled risk, measurable outcomes."}
        </p>
        <ChineseOverlay section="ai-consulting-hero" />

        <section className="mb-10 rounded-xl border border-brand-primary/25 bg-gradient-to-r from-cyan-50 via-white to-amber-50 p-6 dark:border-teal-500/30 dark:from-slate-900 dark:via-slate-900 dark:to-gray-900">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">
            {localeUsesChineseCopy(loc) ? "Premium 落地（清晰報價範疇）" : "Premium done-with-you engagements"}
          </h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            {localeUsesChineseCopy(loc)
              ? "如果你需要創辦人級別嘅問責、固定決策節奏同修訂边界，可以看 → Premium AI／CRM 顧問頁了解商業形態同適合對象。"
              : "If you need founder accountability, explicit boundaries, and a reliable decision cadence—not slide theatre—see how we scope premium programmes."}
          </p>
          <Link
            href={premiumHref}
            className="inline-flex rounded-full bg-brand-primary px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            {localeUsesChineseCopy(loc) ? "了解 Premium 方案" : "Explore premium programmes"}
          </Link>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">What it is</h2>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            This is an implementation-oriented consulting service for organizations that need to apply AI in sales, customer operations, and business workflow management.
          </p>
          <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
            We help Hong Kong teams define realistic adoption scope, sequence priorities, and establish governance so automation supports business outcomes instead of creating operational noise.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Who it is for</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>You have tried ChatGPT but it is not connected to anything in your business.</li>
            <li>You want to automate follow-ups, reporting, or scheduling — but do not know which tool fits your stack.</li>
            <li>You have been quoted $200,000 for an AI project and want a reality check.</li>
            <li>You need someone who will actually build it, not only slide-deck it.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">How it works</h2>
          <ol className="list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>Discovery workshop to map current workflows, pain points, and business goals.</li>
            <li>Prioritization of high-impact use cases for phased implementation.</li>
            <li>System and process design aligned with your existing tools and team structure.</li>
            <li>Pilot setup with practical onboarding and operational documentation.</li>
            <li>Team enablement and manager review cadence for adoption quality.</li>
            <li>Ongoing optimization based on usage signals and business feedback.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Features</h2>
          <ul className="list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
            <li>AI readiness assessment that identifies realistic quick wins for Hong Kong SME operations.</li>
            <li>Workflow blueprinting for sales, follow-up, and operational coordination scenarios.</li>
            <li>Integration planning across common tools used by local founder-led and SME teams.</li>
            <li>Prompt and process playbooks to improve consistency in daily execution.</li>
            <li>Team training support with bilingual operating context in mind.</li>
            <li>Ongoing advisory sessions for optimization and change management.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="mb-4 text-3xl font-bold text-gray-900 dark:text-white">Pricing</h2>
          <p className="mb-3 text-gray-700 dark:text-gray-300">
            We offer simple project-based and retainer-friendly engagement models based on implementation scope.
          </p>
          <ul className="list-inside list-disc space-y-2 text-gray-700 dark:text-gray-300">
            <li>Starter: discovery and readiness audit for initial implementation planning.</li>
            <li>Growth: pilot build and workflow rollout for selected team functions.</li>
            <li>Enterprise: multi-team implementation and ongoing optimization support.</li>
          </ul>
          <p className="mt-3 text-gray-700 dark:text-gray-300">Contact us for a custom quote for your Hong Kong team.</p>
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
            Ready to implement AI in Hong Kong with less trial and error?
          </h2>
          <p className="mb-4 text-gray-700 dark:text-gray-300">
            Book a consultation to define your first practical implementation phase.
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
