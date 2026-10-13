import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { smartSalesScope } from "@/content/smartsales-scope";
import { formatHkd } from "@/content/pricing";
import { smartSalesSeo } from "@/content/page-seo";
import { localeAlternates } from "@/lib/alternate-metadata";
import { getFAQPageSchema, getSmartSalesProductSchema } from "@/lib/schema";
import { isValidLocale, localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const seo = smartSalesSeo(locale as AppLocale);
  return { title: seo.title, description: seo.description, alternates: localeAlternates(locale, "/smartsales-crm"), openGraph: { title: seo.ogTitle || seo.title, description: seo.ogDescription || seo.description, images: ["/opengraph-image"] } };
}
export default async function SmartSalesCrmPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isValidLocale(locale)) notFound();
  const loc = locale as AppLocale;
  const zh = localeUsesChineseCopy(loc);
  const c = smartSalesScope(loc);
  const price = (amount: number) => formatHkd(amount, loc);
  const h2 = "text-2xl leading-snug md:text-3xl";
  const section = "mt-14 border-t border-[#c8bba9] pt-8";
  const schema = [getSmartSalesProductSchema(), getFAQPageSchema({ url: `https://www.innovatexp.co/${locale}/smartsales-crm`, questions: c.faqs })];
  return <SitePageShell title={c.title} actionLabel={c.cta} actionHref={`/${locale}/bookme`}>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
    <p className="max-w-3xl text-xl leading-9">{c.lead}</p>
    <p className="mt-5 border-l-2 border-[#8b6b43] pl-4 text-base leading-8">{c.boundary}</p>
    <section className={section} aria-labelledby="pilot-title">
      <h2 id="pilot-title" className={h2}>{c.pilot.name}</h2>
      <p className="mt-4 text-3xl text-[#6f5436]">{price(c.pilot.amount)} <span className="text-sm">{zh ? "一次性" : "one-time"}</span></p>
      <p className="mt-3 leading-8">{c.pilot.summary}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 leading-8">{c.pilot.items.map(item => <li key={item}>{item}</li>)}</ul>
    </section>
    <section className={section} aria-labelledby="setup-title">
      <h2 id="setup-title" className={h2}>{zh ? "正式上線：一次性建置費。" : "Production setup: one-time implementation."}</h2>
      <div className="mt-6 grid gap-6 md:grid-cols-2">{c.setup.map(tier => <article key={tier.name} className="border border-[#c8bba9] p-6">
        <h3 className="text-2xl">{tier.name}</h3><p className="mt-3 text-3xl text-[#6f5436]">{price(tier.amount)} <span className="text-sm">{zh ? "起／一次性" : "from / one-time"}</span></p>
        <p className="mt-4 leading-8">{tier.summary}</p><ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-7">{tier.items.map(item => <li key={item}>{item}</li>)}</ul>
      </article>)}</div>
    </section>
    <section className={section} aria-labelledby="care-title">
      <h2 id="care-title" className={h2}>{c.careTitle}</h2><p className="mt-4 max-w-3xl leading-8">{c.careBody}</p>
      <div className="mt-6 grid gap-4 md:grid-cols-3">{c.care.map(tier => <article key={tier.name} className="bg-[#eee8de] p-5"><h3 className="text-lg">{tier.name}</h3><p className="mt-3 text-2xl">{price(tier.amount)} <span className="text-sm">{zh ? "／月起" : "/month from"}</span></p><p className="mt-3 text-sm leading-7">{zh ? `每月最多 ${tier.hours} 小時遠程支援` : `Up to ${tier.hours} remote support hours per month`}</p></article>)}</div>
      <p className="mt-5 border-l-2 border-[#8b6b43] pl-4 text-sm leading-7">{c.careExcludes}</p>
    </section>
    <section className={section}><h2 className={h2}>{c.casesTitle}</h2><p className="mt-3 text-sm leading-7 text-[#6f5436]">{c.casesNote}</p>
      <div className="mt-6 space-y-6">{c.cases.map(example => <article key={example.title} className="border border-[#c8bba9] p-6"><h3 className="text-xl">{example.title}</h3><p className="mt-3 leading-8">{example.scope}</p><p className="mt-3 leading-8">{example.result}</p><p className="mt-4 font-semibold text-[#6f5436]">{example.budget}</p></article>)}</div>
    </section>
    <section className={section}><h2 className={h2}>{c.existingTitle}</h2><p className="mt-4 max-w-3xl leading-8">{c.existingBody}</p><Link href={`/${locale}/compare/smartsales-vs-salesforce`} className="mt-4 inline-flex min-h-11 items-center underline">{zh ? "SmartSales 與 Salesforce 比較" : "Compare SmartSales and Salesforce"}</Link></section>
    <section className={section}><h2 className={h2}>{c.acceptanceTitle}</h2><ol className="mt-5 list-decimal space-y-3 pl-5 leading-8">{c.acceptance.map(item => <li key={item}>{item}</li>)}</ol></section>
    <section className={section}><h2 className={h2}>{c.faqTitle}</h2><div className="mt-5">{c.faqs.map(faq => <details key={faq.question} className="border-b border-[#d8cfc2] py-5"><summary className="cursor-pointer text-lg font-semibold">{faq.question}</summary><p className="mt-3 max-w-3xl leading-8">{faq.answer}</p></details>)}</div></section>
  </SitePageShell>;
}
