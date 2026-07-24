/* F12: Pitch decks download page - Lists PDF deck links under public/decks. */
import type { Metadata } from "next";
import { BackToHomeControl } from "@/components/BackToHomeControl";
import { WebsiteQuoteBuilder } from "@/components/WebsiteQuoteBuilder";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { pitchDecksSeo } from "@/content/page-seo";
import { PRICING, formatHkd, type PricingLocale } from "@/content/pricing";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = pitchDecksSeo(locale as AppLocale);
  return {
    title: seo.title,
    description: seo.description,
    alternates: localeAlternates(locale, "/pitch-decks"),
  };
}

const decks = [
  {
    title: "SmartSales CRM Pitch Deck",
    description:
      "AI-assisted WhatsApp CRM for Hong Kong SMEs: lead triage, reply drafts, and follow-up workflows.",
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
    description:
      "Website Starter from HKD 7,800 plus add-on menu — landing, SEO, WhatsApp/Booking, and optional e-commerce.",
    href: "/decks/ixp-customised-website-pitch-deck.pdf",
    filename: "IXP_Customised_Website_Pitch_Deck.pdf",
  },
];

function toPricingLocale(locale: AppLocale): PricingLocale {
  if (locale === "zh-hk" || locale === "zh-tw" || locale === "ja" || locale === "de") return locale;
  return "en";
}

export default async function PitchDecksPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: loc } = await params;
  const locale = (isValidLocale(loc) ? loc : "en") as AppLocale;
  const zh = localeUsesChineseCopy(locale);
  const pl = toPricingLocale(locale);
  const web = PRICING.tools.website;
  const ax = PRICING.tools.accountXp;

  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12 text-slate-900 dark:text-slate-100">
      <BackToHomeControl />
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-700 dark:bg-slate-900">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary dark:text-teal-300">
          InnovateXP Downloads
        </p>
        <h1 className="mt-3 text-3xl font-bold md:text-4xl">
          {zh ? "Pitch Deck 下載 + 公開定價" : "Pitch decks + public pricing"}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-300">
          {zh
            ? "下載 SmartSales、EventXP、客製網站 deck；Website Starter 可用點心紙即時計價。"
            : "Download SmartSales, EventXP, and customised website decks. Build a Website Starter quote from the add-on menu."}
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

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {zh ? "AccountXP 體驗方案" : "AccountXP experience"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {zh
            ? "收據擷取 pilot 設定 + 首月正式使用（一次性），取代舊有按星期／按月雙軌。"
            : "Receipt-capture pilot setup + first month live use (one-time), replacing the old weekly/monthly dual track."}
        </p>
        <p className="mt-4 text-3xl font-extrabold text-brand-primary dark:text-teal-300">
          {formatHkd(ax.experience, pl)}
        </p>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          {zh ? "維護月費" : "Maintenance"}:{" "}
          <strong>
            {formatHkd(ax.maintenanceStarterMonthly, pl)} / {formatHkd(ax.maintenanceGrowthMonthly, pl)} /{" "}
            {formatHkd(ax.maintenanceEnterpriseMonthly, pl)}
          </strong>
        </p>
      </section>

      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900 md:p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {zh ? "Customised Website Starter" : "Customised Website Starter"}
        </h2>
        <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {zh
            ? `公開起步價 ${formatHkd(web.starter, pl)}（一次），唔再只靠純 custom quote。`
            : `Public starting price ${formatHkd(web.starter, pl)} (one-time) — not custom-quote-only.`}
        </p>
        <div className="mt-6">
          <WebsiteQuoteBuilder locale={pl} />
        </div>
      </section>
    </main>
  );
}
