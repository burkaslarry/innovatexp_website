import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { commerceCopy } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";

export const metadata: Metadata = { title: "Checkout | InnovateXP", robots: { index: false, follow: false, googleBot: { index: false, follow: false } } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound(); const c = commerceCopy(locale);
  return <SitePageShell title={c.cancel}><p>{c.cancelBody}</p><Link className="mt-6 inline-flex min-h-11 items-center border-b border-[#8b6b43]" href={`/${locale}/services/snapshot`}>{c.detail}</Link></SitePageShell>;
}
