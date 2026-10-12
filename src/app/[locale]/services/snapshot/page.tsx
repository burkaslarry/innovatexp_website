import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { SitePageShell } from "@/components/SitePageShell";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { commerceCopy, OFFERS } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";
import { localeAlternates } from "@/lib/alternate-metadata";
import { snapshotCheckoutAvailable } from "@/lib/commerce/config";
import { getSiteUrl } from "@/lib/site-url";
import { formatHkd } from "@/content/pricing";

export const dynamic = "force-dynamic";
export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isValidLocale(locale)) return {};
  const c = commerceCopy(locale);
  return { title: "AI Readiness Snapshot · HK$3,880 | InnovateXP", description: c.intro, alternates: localeAlternates(locale, "/services/snapshot") };
}
export default async function SnapshotPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound();
  const c = commerceCopy(locale);
  const enabled = snapshotCheckoutAvailable();
  return <SitePageShell title={c.snapshot}>
    <p className="text-xs font-semibold uppercase tracking-widest text-[#8b6b43]">{c.price}</p>
    <p className="mt-3 text-4xl">{formatHkd(OFFERS.snapshot.amount / 100, locale)}</p>
    <p className="mt-6 max-w-3xl text-lg leading-8">{c.intro}</p><p className="mt-3 max-w-3xl leading-8">{c.fit}</p>
    <section className="mt-8 border-t border-[#c8bba9] pt-6"><h2 className="text-2xl">{c.includes}</h2><ul className="mt-4 list-disc space-y-3 pl-5">{c.deliverables.map((x) => <li key={x}>{x}</li>)}</ul></section>
    <div className="mt-7 max-w-3xl space-y-4 leading-8"><p>{c.excludes}</p><p>{c.schedule}</p><p>{c.corrections}</p><p>{c.upgrade}</p></div>
    {enabled ? <CheckoutForm locale={locale} /> : <Link className="mt-8 inline-flex min-h-11 items-center bg-[#251f19] px-6 py-3 text-white" href={`/${locale}/bookme`}>{c.booking}</Link>}
    <p className="mt-6 text-sm"><Link className="underline" href={`/${locale}/purchase-terms`}>{c.terms}</Link></p>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@type": "Service", name: OFFERS.snapshot.name, description: c.intro, provider: { "@type": "Organization", name: "InnovateXP Limited" }, url: `${getSiteUrl()}/${locale}/services/snapshot`, offers: { "@type": "Offer", price: OFFERS.snapshot.amount / 100, priceCurrency: "HKD", url: `${getSiteUrl()}/${locale}/services/snapshot` } }).replace(/</g, "\\u003c") }} />
  </SitePageShell>;
}
