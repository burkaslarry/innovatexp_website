import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { getAiVideoCopy } from "@/content/ai-video-production";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale, type AppLocale } from "@/lib/i18n-routing";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";
import { getSiteUrl } from "@/lib/site-url";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = getAiVideoCopy(locale as AppLocale);
  return {
    title: c.metaTitle, description: c.description,
    alternates: localeAlternates(locale, "/ai-video-production"),
    openGraph: { title: c.metaTitle, description: c.description, url: `${getSiteUrl()}/${locale}/ai-video-production`, images: [{ url: "/opengraph-image", width: 1200, height: 630 }] },
    twitter: { card: "summary_large_image", title: c.metaTitle, description: c.description, images: ["/opengraph-image"] },
  };
}

export default async function AiVideoProductionPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const c = getAiVideoCopy(locale as AppLocale);
  const href = buildWhatsAppHref(c.prefill);
  const url = `${getSiteUrl()}/${locale}/ai-video-production`;
  const schema = {
    "@context": "https://schema.org", "@graph": [
      { "@type": "Service", "@id": `${url}#service`, name: c.metaTitle, description: c.description, serviceType: "AI video production", url, provider: { "@type": "Organization", name: "InnovateXP Limited", url: getSiteUrl() }, areaServed: { "@type": "Place", name: "Hong Kong" } },
      { "@type": "FAQPage", mainEntity: c.faqs.map(f => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })) },
    ],
  };
  const h2 = "text-2xl font-normal leading-snug md:text-3xl";
  const block = "mt-14 border-t border-[#c8bba9] pt-8 md:mt-20 md:pt-10";
  const button = "inline-flex min-h-12 items-center justify-center bg-[#251f19] px-6 py-3 text-sm font-semibold text-[#fffdfa] transition hover:bg-[#6f5436] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4";
  return (
    <SitePageShell title={c.title} actionLabel={c.cta} actionHref={href}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
      <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <p className="text-xs uppercase tracking-widest text-[#8b6b43]">{c.positioning}</p>
          <p className="mt-5 max-w-2xl text-xl leading-9">{c.lead}</p>
          <a href={href} className={`${button} mt-7`}>{c.cta} ↗</a>
        </div>
        <aside className="border border-[#c8bba9] bg-[#eee8de] p-6 md:p-8">
          <h2 className="text-2xl">{c.quote}</h2>
          <p className="mt-4 text-sm leading-7 text-[#51483d]">{c.quoteBody}</p>
          <dl className="mt-6 space-y-4">{c.facts.map(([label, value]) => <div key={label} className="border-t border-[#c8bba9] pt-3"><dt className="text-xs text-[#6f5436]">{label}</dt><dd className="mt-1 text-sm leading-6">{value}</dd></div>)}</dl>
        </aside>
      </div>
      <section className={block}><h2 className={h2}>{c.fitTitle}</h2><ul className="mt-5 grid gap-4 md:grid-cols-3">{c.fits.map(item => <li key={item} className="border-l-2 border-[#8b6b43] pl-4 text-base leading-8">{item}</li>)}</ul></section>
      <section className={block}><h2 className={h2}>{c.flowTitle}</h2><ol className="mt-6">{c.steps.map(([number, title, body]) => <li key={number} className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-[#d8cfc2] py-6 md:grid-cols-[4rem_1fr]"><span className="font-mono text-sm text-[#8b6b43]">{number}</span><div><h3 className="text-xl">{title}</h3><p className="mt-3 max-w-3xl text-base leading-8 text-[#51483d]">{body}</p></div></li>)}</ol></section>
      <section className={block}><h2 className={h2}>{c.materialsTitle}</h2><dl className="mt-6 grid gap-x-10 gap-y-6 md:grid-cols-2">{c.materials.map(([title, body]) => <div key={title}><dt className="text-lg font-semibold">{title}</dt><dd className="mt-2 text-base leading-8 text-[#51483d]">{body}</dd></div>)}</dl></section>
      <section className={block}><h2 className={h2}>{c.termsTitle}</h2><dl className="mt-6">{c.terms.map(([title, body]) => <div key={title} className="grid gap-3 border-b border-[#d8cfc2] py-5 md:grid-cols-[14rem_1fr]"><dt className="text-lg font-semibold">{title}</dt><dd className="text-base leading-8 text-[#51483d]">{body}</dd></div>)}</dl></section>
      <section className={block}><h2 className={h2}>{c.deliverTitle}</h2><ul className="mt-5 list-disc space-y-3 pl-5 text-base leading-8">{c.deliver.map(item => <li key={item}>{item}</li>)}</ul></section>
      <section className={block}><h2 className={h2}>{c.faqTitle}</h2><div className="mt-5">{c.faqs.map(f => <details key={f.question} className="border-b border-[#d8cfc2] py-5"><summary className="cursor-pointer text-lg font-semibold">{f.question}</summary><p className="mt-3 max-w-3xl text-base leading-8 text-[#51483d]">{f.answer}</p></details>)}</div></section>
      <section className="mt-14 bg-[#eee8de] p-6 md:p-10"><h2 className={h2}>{c.closing}</h2><p className="mt-4 max-w-3xl text-base leading-8">{c.closingBody}</p><a href={href} className={`${button} mt-6`}>{c.cta} ↗</a></section>
    </SitePageShell>
  );
}
