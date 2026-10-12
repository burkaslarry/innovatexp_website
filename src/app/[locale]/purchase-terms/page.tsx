import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { purchaseTerms } from "@/content/purchase-terms";
import { localeAlternates } from "@/lib/alternate-metadata";
import { isValidLocale } from "@/lib/i18n-routing";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params; if (!isValidLocale(locale)) return {};
  const c = purchaseTerms(locale); return { title: c.metaTitle, description: c.metaDescription, alternates: localeAlternates(locale, "/purchase-terms") };
}
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound(); const c = purchaseTerms(locale);
  return <SitePageShell title={c.title}><p className="text-sm">{c.lastUpdated}</p><div className="mt-6 max-w-3xl space-y-4 leading-8">{c.intro.map((p) => <p key={p}>{p}</p>)}{c.sections.map((s) => <section key={s.title} className="pt-7"><h2 className="text-2xl">{s.title}</h2>{s.paragraphs.map((p) => <p key={p} className="mt-4">{p}</p>)}</section>)}<p className="pt-7"><a className="underline" href="mailto:info@innovatexp.co">info@innovatexp.co</a></p></div></SitePageShell>;
}
