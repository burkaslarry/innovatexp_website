import type { Metadata } from "next";
import Link from "next/link";
import ChineseOverlay from "../../components/ChineseOverlay";
import { getEventXPProductSchema, getFAQPageSchema } from "@/lib/schema";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { eventXpSeo } from "@/content/page-seo";

const siteUrlMeta =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = eventXpSeo(locale as AppLocale);
  const alternates = localeAlternates(locale, "/eventxp");
  const ogUrl = typeof alternates?.canonical === "string" ? alternates.canonical : `${siteUrlMeta}/${locale}/eventxp`;
  return {
    title: seo.title,
    description: seo.description,
    alternates,
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: ogUrl,
      siteName: "InnovateXP Limited",
      images: [{ url: "/innovatexp_color_no_bg.svg", width: 1200, height: 630, alt: "InnovateXP EventXP" }],
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
    },
  };
}

export default async function EventXpPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

  const faqQuestions = [
    {
      question: "Can EventXP handle bilingual events in Hong Kong?",
      answer:
        "Yes. EventXP workflows are suitable for teams that operate across Cantonese and English event communication contexts.",
    },
    {
      question: "Is EventXP suitable for recurring community events?",
      answer:
        "Yes. It is built to support repeat event operations with consistent check-in and reporting processes.",
    },
    {
      question: "How quickly can we start using EventXP?",
      answer:
        "Teams can usually start with a phased setup, beginning with essential check-in flow and expanding reporting as needed.",
    },
    {
      question: "Can EventXP support post-event follow-up workflows?",
      answer:
        "Yes. Attendance data is structured so teams can prioritize follow-up actions after each event cycle.",
    },
  ];

  const pageUrl = `${siteUrl}/${locale}/eventxp`;
  const productSchema = getEventXPProductSchema();
  const jsonLd = [
    { ...productSchema, url: pageUrl },
    getFAQPageSchema({ url: pageUrl, questions: faqQuestions }),
  ];

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          EventXP: Event Management Platform for Hong Kong
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-10">
          EventXP is an event operations and intelligence platform for Hong Kong organizers who need reliable check-in execution and clearer post-event decisions. It supports teams handling member events, business networking sessions, and corporate programs where attendance, follow-up, and conversion visibility are critical. Instead of manually reconciling lists after every event, EventXP helps teams run on-site flow smoothly and convert attendance data into practical next actions for sales and retention.
        </p>
        <ChineseOverlay section="eventxp-hero" />

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What it is</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            EventXP is an event management platform focused on check-in quality, attendee tracking, and operational visibility. It connects registration and attendance flow so organizers can execute events with fewer manual bottlenecks.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For Hong Kong teams running repeat events, EventXP provides a structured way to compare attendance patterns, identify follow-up priorities, and improve event execution over time.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who it&apos;s for</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Hong Kong event agencies and organizers managing recurring events.</li>
            <li>Business communities and membership networks tracking engagement quality.</li>
            <li>Training providers and education teams running multi-session programs.</li>
            <li>SMEs that need cleaner event-to-sales follow-up workflows.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Set up event profile, attendee fields, and check-in rules before launch.</li>
            <li>Share registration and attendee identifiers to prepare on-site check-in.</li>
            <li>Run event-day check-in with fast scanning and live attendance visibility.</li>
            <li>Track attendance completion and exception cases during the event.</li>
            <li>Review attendance outcomes and segment follow-up priorities after the event.</li>
            <li>Optimize future event setup based on recurring participation patterns.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              QR-based check-in flow that helps teams reduce queue friction at Hong Kong venue entrances.
            </li>
            <li>
              Real-time attendance tracking so event managers can monitor turnout as sessions run.
            </li>
            <li>
              Structured attendee records to support cleaner post-event follow-up.
            </li>
            <li>
              Multi-event operations support for organizers with frequent calendar schedules.
            </li>
            <li>
              Bilingual-friendly operational setup for mixed Cantonese and English events.
            </li>
            <li>
              Reporting-ready data views for retention, invite targeting, and sponsor-facing summaries.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            Start with an advisor-led EventXP trial (HKD 4,000 for one event: check-in setup, lead scoring, and follow-up automation). Monthly maintenance plans are scoped after the trial — not a pure SaaS rental.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Trial: one event with check-in, scoring, and follow-up workflow setup.</li>
            <li>Starter: core check-in and attendance visibility for smaller programs.</li>
            <li>Growth: enhanced reporting and operational support for regular events.</li>
            <li>Enterprise: advanced workflow and integration support for large-scale operations.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Verified BNI members receive 30% off advisory and quick-cash services. Book a workflow review to confirm scope.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Can EventXP handle bilingual events in Hong Kong?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. EventXP workflows are suitable for teams that operate across Cantonese and English event communication contexts.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Is EventXP suitable for recurring community events?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. It is built to support repeat event operations with consistent check-in and reporting processes.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            How quickly can we start using EventXP?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Teams can usually start with a phased setup, beginning with essential check-in flow and expanding reporting as needed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Can EventXP support post-event follow-up workflows?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. Attendance data is structured so teams can prioritize follow-up actions after each event cycle.
          </p>
        </section>

        <section className="mb-10 rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-gray-700 dark:bg-gray-800">
          <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Related AI workflow pages</h2>
          <div className="flex flex-wrap gap-3">
            {[
              { href: "/sme-ai-workflow", label: "SME AI Workflow" },
              { href: "/ai-training", label: "AI Training / AI 教班" },
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

        <section className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to run better events in Hong Kong?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Book a consultation and map your current check-in workflow to a cleaner, scalable event operation.
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
