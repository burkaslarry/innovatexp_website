import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { AddToInquiryButton } from "@/components/inquiry-cart/AddToInquiryButton";
import { commerceCopy, OFFERS } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { snapshotCheckoutAvailable } from "@/lib/commerce/config";
import { getSiteUrl } from "@/lib/site-url";
import { formatHkd } from "@/content/pricing";
import { SERVICE_DECISION_COPY } from "@/content/service-decision-copy";
import { getFAQPageSchema } from "@/lib/schema";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = commerceCopy(locale);
  return { title: `${c.snapshot} · ${formatHkd(OFFERS.snapshot.amount / 100, locale)} | InnovateXP`, description: c.intro, alternates: localeAlternates(locale, "/services/snapshot") };
}
export default async function SnapshotPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound();
  const c = commerceCopy(locale);
  const enabled = snapshotCheckoutAvailable();
  const d = SERVICE_DECISION_COPY[locale];
  const faqs = [
    { question: d.snapshotQuestion, answer: d.snapshotDifference },
    { question: d.scheduleQuestion, answer: c.schedule },
    { question: d.correctionQuestion, answer: c.corrections },
  ];
  const faqSchema = getFAQPageSchema({ url: `${getSiteUrl()}/${locale}/services/snapshot`, questions: faqs });
  return <SitePageShell title={c.snapshot}>
    <p className="max-w-3xl text-xl leading-9" data-geo-answer>{c.intro}</p>
    <p className="mt-4 max-w-3xl leading-8">{c.fit}</p>
    <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-[#8b6b43]">{c.price}</p>
    <p className="mt-3 text-4xl">{formatHkd(OFFERS.snapshot.amount / 100, locale)}</p>
    <p className="mt-5 max-w-3xl border-l-2 border-[#8b6b43] pl-4 leading-8">{d.snapshotDifference}</p>
    <section className="mt-8 border-t border-[#c8bba9] pt-6"><h2 className="text-2xl">{c.includes}</h2><ul className="mt-4 list-disc space-y-3 pl-5">{c.deliverables.map((x) => <li key={x}>{x}</li>)}</ul></section>
    <div className="mt-7 max-w-3xl space-y-4 leading-8"><p>{c.excludes}</p><p>{c.schedule}</p><p>{c.corrections}</p><p>{c.upgrade}</p></div>
    <section className="mt-10 border-t border-[#c8bba9] pt-8">
      <h2 className="text-2xl">{d.preparation}</h2>
      <ul className="mt-4 max-w-3xl list-disc space-y-3 pl-5 leading-8">{d.inputs.map(input => <li key={input}>{input}</li>)}</ul>
    </section>
    {enabled ? <CheckoutForm locale={locale} /> : <Link className="mt-8 inline-flex min-h-11 items-center bg-[#251f19] px-6 py-3 text-white" href={`/${locale}/bookme`}>{c.booking}</Link>}
    <div className="mt-5"><AddToInquiryButton itemId="aiReadinessAssessment" fullWidth={false} /></div>
    <p className="mt-6 text-sm"><Link className="underline" href={`/${locale}/purchase-terms`}>{c.terms}</Link></p>
    <section className="mt-12 border-t border-[#c8bba9] pt-8">
      <h2 className="text-2xl">{d.faq}</h2>
      <dl className="mt-5 space-y-6">{faqs.map(faq => <div key={faq.question}><dt className="text-lg font-semibold">{faq.question}</dt><dd className="mt-2 max-w-3xl leading-8">{faq.answer}</dd></div>)}</dl>
    </section>
    <section className="mt-12 border-t border-[#c8bba9] pt-8">
      <h2 className="text-2xl">{d.cases}</h2><p className="mt-4 max-w-3xl leading-8">{d.caseNote}</p>
      <nav className="mt-4 flex flex-wrap gap-6" aria-label={d.cases}>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/case-studies#agilizing-training-materials`}>Agilizing</Link>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/case-studies`}>{d.cases}</Link>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/services`}>{d.services}</Link>
      </nav>
    </section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, "\\u003c") }} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: OFFERS.snapshot.name, description: c.intro, provider: { "@type": "Organization", name: "InnovateXP Limited" }, url: `${getSiteUrl()}/${locale}/services/snapshot`, offers: { "@type": "Offer", price: OFFERS.snapshot.amount / 100, priceCurrency: "HKD", url: `${getSiteUrl()}/${locale}/services/snapshot` } }).replace(/</g, "\\u003c") }} />
  </SitePageShell>;
}
