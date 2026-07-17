import type { Metadata } from "next";
import Link from "next/link";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

const path = "/compare/eventxp-vs-eventbrite";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const alternates = localeAlternates(locale, path);
  const ogUrl =
    typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}${path}`;
  const title = "EventXP vs Eventbrite — 香港活動主辦點揀？";
  const description =
    "香港主辦方選 EventXP 定 Eventbrite？比較 setup、價錢模式、現場 check-in、語言支援同邊種活動最合適。";
  return {
    title,
    description,
    authors: [{ name: "InnovateXP founder", url: "https://www.linkedin.com/in/innovatexp/" }],
    alternates,
    openGraph: {
      title,
      description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function EventXpVsEventbritePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";
  const pageUrl = `${siteUrl}/${locale}${path}`;

  const headline = "EventXP vs Eventbrite: Which is right for Hong Kong event teams?";

  const faqQuestions = [
    {
      question: "Can EventXP replace Eventbrite for ticketed public events?",
      answer:
        "EventXP is strongest for Hong Kong operators who own the attendee journey—corporate briefings, chambers, associations, and B2B programs—where check-in discipline and post-event follow-up matter as much as ticket sales. If your primary goal is mass-market ticket discovery on a global marketplace, Eventbrite’s consumer reach can still complement your stack.",
    },
    {
      question: "How does pricing compare?",
      answer:
        "EventXP is typically positioned as a predictable Hong Kong–dollar subscription for operations and intelligence. Eventbrite commonly combines paid organizer plans with per-ticket fees, so total cost scales with volume and payment processing—compare both models against your expected ticket mix.",
    },
    {
      question: "What is the migration path from Eventbrite?",
      answer:
        "Export attendee and order data from Eventbrite, align fields with your EventXP event templates, then run a pilot event before switching registration links. Founder-led onboarding helps map check-in stations and follow-up rules so the team is not learning a new flow on production day.",
    },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${pageUrl}#article`,
    headline,
    inLanguage: ["en", "zh-HK"],
    url: pageUrl,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
      url: pageUrl,
    },
    datePublished: "2026-05-08",
    dateModified: "2026-05-08",
    image: [`${siteUrl}/innovatexp_color_no_bg.svg`],
    author: {
      "@type": "Person",
      name: "InnovateXP founder",
      url: "https://www.linkedin.com/in/innovatexp/",
    },
    publisher: {
      "@type": "Organization",
      name: "InnovateXP Limited",
      url: siteUrl,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/innovatexp_color_no_bg.svg`,
      },
    },
    about: ["EventXP", "Eventbrite", "Hong Kong events", "event check-in", "event platform comparison"],
  };

  const jsonLd = [articleSchema, getFAQPageSchema({ url: pageUrl, questions: faqQuestions })];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <BackToHomeControl />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{headline}</h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-6">
          <strong className="font-semibold text-gray-900 dark:text-white">EventXP</strong> fits Hong Kong teams that need dependable on-site check-in, bilingual comms, and structured post-event follow-up without fighting a generic global product roadmap.{" "}
          <strong className="font-semibold text-gray-900 dark:text-white">Eventbrite</strong> fits organizers who prioritize self-serve ticketing, payment rails, and broad consumer discovery—especially for higher-volume public ticket sales.
        </p>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Quick comparison table</h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-gray-700">
            <table className="w-full min-w-[640px] text-left text-sm text-gray-700 dark:text-gray-300">
              <thead className="bg-slate-50 dark:bg-gray-800 text-gray-900 dark:text-white">
                <tr>
                  <th className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700" scope="col" />
                  <th className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700" scope="col">
                    EventXP
                  </th>
                  <th className="p-3 font-semibold border-b border-slate-200 dark:border-gray-700" scope="col">
                    Eventbrite
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Setup time
                  </th>
                  <td className="p-3">3–10 days (phased)</td>
                  <td className="p-3">Same-day self-serve; complex programs vary</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Typical pricing shape
                  </th>
                  <td className="p-3">Trial HKD 4,000 (1 event) + optional maintenance</td>
                  <td className="p-3">Organizer plan + per-ticket / processing fees</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    On-site check-in & HK ops
                  </th>
                  <td className="p-3">✅ built around local run-of-show</td>
                  <td className="p-3">✅ strong tooling; less HK-specific playbooks</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Cantonese / mixed CN-EN
                  </th>
                  <td className="p-3">✅ native workflows</td>
                  <td className="p-3">⚠️ UI/ support mainly English</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Ticket marketplace reach
                  </th>
                  <td className="p-3">Your channels + CRM-style follow-up</td>
                  <td className="p-3">✅ large consumer discovery surface</td>
                </tr>
                <tr className="border-b border-slate-100 dark:border-gray-800">
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Implementation
                  </th>
                  <td className="p-3">Founder-led, in-person Hong Kong</td>
                  <td className="p-3">Self-serve + global partner network</td>
                </tr>
                <tr>
                  <th className="p-3 font-medium text-gray-900 dark:text-white align-top" scope="row">
                    Best for
                  </th>
                  <td className="p-3">HK corporate, chamber, B2B programs needing ops + follow-up</td>
                  <td className="p-3">High-volume public ticketing & broad audience acquisition</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">When to choose EventXP</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>現場 check-in 同遲到名單係你嘅痛點</li>
            <li>活動後 48 小時內要跟進 leads / 會員</li>
            <li>要广东话沟通同埋有人喺香港落地实施</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">When to choose Eventbrite</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>主要靠公开市场卖飞、销量要大</li>
            <li>团队熟 Eventbrite 生态同埋自己 handle 到中英客服</li>
            <li>要多币种、全球支付方式开箱即用</li>
          </ul>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
          {faqQuestions.map((item) => (
            <div key={item.question} className="mb-8">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{item.question}</h3>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{item.answer}</p>
            </div>
          ))}
        </section>

        <section className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Plan your next event workflow</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Book a consultation to compare run-of-show, ticketing economics, and whether EventXP or a marketplace-first stack fits your calendar.
          </p>
          <Link
            href={`/${locale}/bookme`}
            className="inline-block rounded-full bg-brand-primary py-3 px-6 font-semibold text-white transition-colors hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
          >
            Book a free consultation
          </Link>
        </section>
      </div>
    </main>
  );
}
