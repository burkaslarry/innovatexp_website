import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pitch Deck Downloads | InnovateXP",
  description:
    "Download InnovateXP pitch decks for SmartSales CRM, EventXP, and customised website projects.",
};

const decks = [
  {
    title: "SmartSales CRM Pitch Deck",
    description: "AI-assisted WhatsApp CRM for Hong Kong SMEs: lead triage, reply drafts, and follow-up workflows.",
    href: "/decks/ixp-smartsales-pitch-deck.pdf",
    filename: "IXP_SmartSales_Pitch_Deck.pdf",
  },
  {
    title: "EventXP Pitch Deck",
    description: "QR check-in, attendee reporting, and ranked follow-up lists for event teams.",
    href: "/decks/ixp-eventxp-pitch-deck.pdf",
    filename: "IXP_EventXP_Pitch_Deck.pdf",
  },
  {
    title: "Customised Website Pitch Deck",
    description: "Website development package for SMEs that need clearer positioning, SEO, and conversion flow.",
    href: "/decks/ixp-customised-website-pitch-deck.pdf",
    filename: "IXP_Customised_Website_Pitch_Deck.pdf",
  },
];

export default function PitchDecksPage() {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 text-slate-900 dark:text-slate-100">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-teal-300">
          InnovateXP Downloads
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">Pitch Deck Downloads</h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          Download the latest compressed PDF decks for SmartSales CRM, EventXP, and customised website projects.
        </p>
      </section>

      <section className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
        {decks.map((deck) => (
          <article
            key={deck.href}
            className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900"
          >
            <h2 className="text-xl font-bold text-brand-primary dark:text-teal-300">{deck.title}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {deck.description}
            </p>
            <a
              href={deck.href}
              download={deck.filename}
              className="mt-6 inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-primary px-5 py-2 text-sm font-bold text-white transition hover:bg-brand-primary-hover dark:bg-teal-400 dark:text-slate-950"
            >
              Download PDF
            </a>
          </article>
        ))}
      </section>

      <div className="mt-8">
        <Link href="/" className="text-sm font-semibold text-brand-primary hover:underline dark:text-teal-300">
          Back to homepage
        </Link>
      </div>
    </main>
  );
}
