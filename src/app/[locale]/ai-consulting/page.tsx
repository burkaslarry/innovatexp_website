import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { getConsultingDecisionCopy, SERVICE_DECISION_COPY } from "@/content/service-decision-copy";
import { getFAQPageSchema } from "@/lib/schema";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getConsultingDecisionCopy(locale);
  const title = `${c.title} | InnovateXP`;
  return {
    title,
    description: c.answer,
    alternates: localeAlternates(locale, "/ai-consulting"),
    openGraph: { title, description: c.answer, url: `${getSiteUrl()}/${locale}/ai-consulting`, siteName: "InnovateXP Limited", images: ["/opengraph-image"] },
    twitter: { card: "summary_large_image", title, description: c.answer, images: ["/opengraph-image"] },
  };
}

export default async function AiConsultingPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const c = getConsultingDecisionCopy(locale);
  const d = SERVICE_DECISION_COPY[locale];
  const section = "mt-12 border-t border-[#c8bba9] pt-8";
  const heading = "text-2xl leading-snug md:text-3xl";
  const jsonLd = getFAQPageSchema({ url: `${getSiteUrl()}/${locale}/ai-consulting`, questions: c.faqs });

  return (
    <SitePageShell title={c.title} actionLabel={d.book} actionHref={`/${locale}/bookme`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <p className="max-w-3xl text-xl leading-9" data-geo-answer>{c.answer}</p>
      <p className="mt-5 max-w-3xl border-l-2 border-[#8b6b43] pl-4 leading-8">{c.free}</p>
      <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={`/${locale}/bookme`}>{d.book}</Link>
        <Link className="inline-flex min-h-11 items-center underline underline-offset-4" href={`/${locale}/services/snapshot`}>{d.snapshot}</Link>
      </div>
      <div className={`${section} grid gap-8 md:grid-cols-2`}>
        <section><h2 className={heading}>{d.fit}</h2><p className="mt-4 leading-8">{c.fit}</p></section>
        <section><h2 className={heading}>{d.unfit}</h2><p className="mt-4 leading-8">{c.unfit}</p></section>
      </div>
      <section className={section}>
        <h2 className={heading}>{d.deliverables}</h2>
        <dl className="mt-5 space-y-5">
          <div><dt className="text-lg font-semibold">Snapshot</dt><dd className="mt-2 max-w-3xl leading-8">{c.snapshot}</dd></div>
          <div><dt className="text-lg font-semibold">Discovery</dt><dd className="mt-2 max-w-3xl leading-8">{c.discovery}</dd></div>
        </dl>
      </section>
      <div className={`${section} grid gap-10 md:grid-cols-2`}>
        <section><h2 className={heading}>{d.process}</h2><ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">{d.processSteps.map(step => <li key={step}>{step}</li>)}</ol></section>
        <section><h2 className={heading}>{d.preparation}</h2><ul className="mt-5 list-disc space-y-3 pl-5 leading-8">{d.inputs.map(input => <li key={input}>{input}</li>)}</ul></section>
      </div>
      <section className={section}>
        <h2 className={heading}>{c.pricing}</h2>
        <div className="mt-6 grid gap-x-10 gap-y-8 md:grid-cols-2">{c.packages.map(plan => (
          <article key={plan.name} className="border-l-2 border-[#c8bba9] pl-5">
            <h3 className="text-xl">{plan.name}</h3><p className="mt-3 text-2xl text-[#6f5436]">{plan.price}</p><p className="mt-3 leading-8">{plan.detail}</p>
          </article>
        ))}</div>
        <h3 className="mt-8 text-xl">{d.boundaries}</h3><p className="mt-3 max-w-3xl leading-8">{d.scopeNote}</p>
      </section>
      <section className={section}>
        <h2 className={heading}>{d.faq}</h2>
        <dl className="mt-6 space-y-6">{c.faqs.map(faq => <div key={faq.question}><dt className="text-lg font-semibold">{faq.question}</dt><dd className="mt-2 max-w-3xl leading-8">{faq.answer}</dd></div>)}</dl>
      </section>
      <nav className={`${section} flex flex-wrap gap-x-6 gap-y-3`} aria-label={d.services}>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/services`}>{d.services}</Link>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/case-studies`}>{d.cases}</Link>
        <Link className="inline-flex min-h-11 items-center underline" href={`/${locale}/case-studies#agilizing-training-materials`}>Agilizing</Link>
      </nav>
    </SitePageShell>
  );
}
