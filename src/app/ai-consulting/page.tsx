import type { Metadata } from "next";
import Link from "next/link";
import ChineseOverlay from "../components/ChineseOverlay";
import {
  getAIConsultingServiceSchema,
  getFAQPageSchema,
  getOrganizationSchema,
} from "@/lib/schema";

export const metadata: Metadata = {
  title: "AI Consulting Services for Hong Kong SMEs | InnovateXP",
  description:
    "AI consulting services for Hong Kong SMEs and founders, focused on practical implementation roadmaps, workflow automation planning, and measurable operational gains.",
  alternates: {
    canonical: "./",
  },
};

export default function AiConsultingPage() {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://innovatexp.co";

  const faqQuestions = [
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
      question: "How long is a typical consulting engagement?",
      answer:
        "Duration depends on scope, but most teams start with a focused phase and expand only after practical validation.",
    },
    {
      question: "Can you support implementation after strategy planning?",
      answer:
        "Yes. Implementation and optimization support can continue after the planning phase based on your roadmap.",
    },
  ];

  const jsonLd = [
    getOrganizationSchema(),
    getAIConsultingServiceSchema(),
    getFAQPageSchema({ url: `${siteUrl}/ai-consulting`, questions: faqQuestions }),
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
          AI Consulting Services in Hong Kong
        </h1>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-10">
          Our AI consulting service helps Hong Kong SMEs, founders, and operations leaders move from AI interest to practical implementation. We focus on real workflow outcomes: clearer process design, lower execution friction, and better decision visibility for growing teams. Instead of generic strategy decks, we work through use-case selection, setup priorities, team enablement, and continuous refinement so AI becomes a stable part of daily operations.
        </p>
        <ChineseOverlay section="ai-consulting-hero" />

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What it is</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            This is an implementation-oriented consulting service for organizations that need to apply AI in sales, customer operations, and business workflow management.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
            We help Hong Kong teams define realistic adoption scope, sequence priorities, and establish governance so automation supports business outcomes instead of creating operational noise.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Who it&apos;s for</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Hong Kong SMEs that want to adopt AI but need a practical rollout path.</li>
            <li>B2B teams that need workflow automation without disrupting daily execution.</li>
            <li>Startup founders who need clearer priorities before investing in build scope.</li>
            <li>Managers who need measurable operational improvements, not generic AI advice.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">How it works</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Discovery workshop to map current workflows, pain points, and business goals.</li>
            <li>Prioritization of high-impact use cases for phased implementation.</li>
            <li>System and process design aligned with your existing tools and team structure.</li>
            <li>Pilot setup with practical onboarding and operational documentation.</li>
            <li>Team enablement and manager review cadence for adoption quality.</li>
            <li>Ongoing optimization based on usage signals and business feedback.</li>
          </ol>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
          <ul className="list-disc list-inside space-y-3 text-gray-700 dark:text-gray-300">
            <li>
              AI readiness assessment that identifies realistic quick wins for Hong Kong SME operations.
            </li>
            <li>
              Workflow blueprinting for sales, follow-up, and operational coordination scenarios.
            </li>
            <li>
              Integration planning across common tools used by local founder-led and SME teams.
            </li>
            <li>
              Prompt and process playbooks to improve consistency in daily execution.
            </li>
            <li>
              Team training support with bilingual operating context in mind.
            </li>
            <li>
              Ongoing advisory sessions for optimization and change management.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Pricing</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-3">
            We offer simple project-based and retainer-friendly engagement models based on implementation scope.
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>Starter: discovery and readiness audit for initial implementation planning.</li>
            <li>Growth: pilot build and workflow rollout for selected team functions.</li>
            <li>Enterprise: multi-team implementation and ongoing optimization support.</li>
          </ul>
          <p className="text-gray-700 dark:text-gray-300 mt-3">
            Contact us for a custom quote for your Hong Kong team.
          </p>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">FAQ</h2>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Is this AI consulting service suitable for Hong Kong SMEs?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. The service is designed for SMEs that need practical implementation guidance with clear operational priorities.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Do we need a technical team before starting?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            No. Engagement can begin with process mapping and phased rollout planning, then scale technical depth as needed.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            How long is a typical consulting engagement?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Duration depends on scope, but most teams start with a focused phase and expand only after practical validation.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-5 mb-2">
            Can you support implementation after strategy planning?
          </h3>
          <p className="text-gray-700 dark:text-gray-300">
            Yes. Implementation and optimization support can continue after the planning phase based on your roadmap.
          </p>
        </section>

        <section className="bg-slate-50 dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Ready to implement AI in Hong Kong with less trial and error?
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-4">
            Book a consultation to define your first practical implementation phase.
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
