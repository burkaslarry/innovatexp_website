import type { Metadata } from "next";
import Link from "next/link";
import ChineseOverlay from "../components/ChineseOverlay";
import {
  getFAQPageSchema,
  getOrganizationSchema,
  getSmartSalesProductSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "SmartSales CRM for Hong Kong Sales Teams | InnovateXP",
  description:
    "SmartSales CRM helps Hong Kong sales teams and SMEs centralize leads, streamline follow-up, and improve pipeline visibility with practical CRM workflows.",
  alternates: {
    canonical: "./",
  },
};

export default function SmartSalesCrmPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

  const faqQuestions = [
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

  const jsonLd = [
    getOrganizationSchema(),
    getSmartSalesProductSchema(),
    getFAQPageSchema({ url: `${siteUrl}/smartsales-crm`, questions: faqQuestions }),
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
          SmartSales CRM for Hong Kong B2B Teams
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-10">
          SmartSales CRM is a practical customer management platform designed for Hong Kong SMEs and B2B sales teams that need faster follow-up and clearer pipeline control. It combines lead tracking, conversation history, and task reminders in one place so teams stop losing context across chat apps, spreadsheets, and inboxes. The result is a more consistent sales process with less manual admin and better daily visibility for owners and managers.
        </p>
        <ChineseOverlay section="smartsales-crm-hero" />

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What it is</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            SmartSales CRM is built for teams that need structured sales execution without heavy enterprise complexity. It keeps customer records, interaction notes, and follow-up tasks connected so staff can work from a single operational view.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            For Hong Kong businesses that rely on WhatsApp and fast response cycles, SmartSales CRM helps standardize how leads are handled, assigned, and progressed across bilingual customer communication.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who it&apos;s for</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Hong Kong SMEs with growing inbound and repeat customer pipelines.</li>
            <li>B2B sales teams that need cleaner handoff between consultants and account managers.</li>
            <li>Founder-led companies that want better visibility without adding admin headcount.</li>
            <li>Service teams managing mixed Cantonese and English customer communication.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Map your current lead flow and customer follow-up process during onboarding.</li>
            <li>Set up fields, stages, and ownership rules for your Hong Kong team structure.</li>
            <li>Import existing contacts and align active opportunities into a unified pipeline.</li>
            <li>Run daily operations with reminders, notes, and stage updates in one dashboard.</li>
            <li>Review weekly activity and conversion bottlenecks with manager-level reporting.</li>
            <li>Optimize workflow rules and templates as team usage grows.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              Lead pipeline tracking with stage ownership, so every opportunity has clear next action.
            </li>
            <li>
              Contact timeline view to keep calls, messages, and follow-up notes in one record.
            </li>
            <li>
              Follow-up reminders and task queues to reduce missed responses in busy periods.
            </li>
            <li>
              WhatsApp-friendly workflow structure for teams that close deals through chat-first communication.
            </li>
            <li>
              Bilingual-ready operations for Cantonese and English customer contexts.
            </li>
            <li>
              Team performance snapshots for owners who need practical pipeline visibility each week.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            SmartSales CRM is available as a simple monthly subscription, with no long-term lock-in.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Starter: for small teams building a structured sales process.</li>
            <li>Growth: for teams that need stronger automation and reporting cadence.</li>
            <li>Enterprise: for multi-team workflows and deeper integration requirements.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Contact us for a custom quote for your Hong Kong team.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Is SmartSales CRM suitable for Hong Kong SMEs?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. SmartSales CRM is designed for practical SME workflows where teams need clear follow-up discipline without enterprise-level implementation overhead.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Can it support WhatsApp-led sales communication?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. It is structured to support chat-driven workflows, so your team can track lead context and next actions consistently.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            How long does onboarding usually take?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Typical onboarding can be completed in phased steps, starting with essential setup and then refining workflow rules as adoption grows.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Can we keep our current process while migrating?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. Migration is usually staged to reduce disruption, so your team can continue daily operations during transition.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to streamline your sales in Hong Kong?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Book a practical consultation to map your current process and define the fastest rollout path.
          </p>
          <Link
            href="/bookme"
            className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-full transition-colors"
          >
            Book a free consultation
          </Link>
        </section>
      </div>
    </main>
  );
}
