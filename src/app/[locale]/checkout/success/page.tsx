import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { PaymentStatus } from "@/components/commerce/PaymentStatus";
import { CartPaymentStatus } from "@/components/commerce/CartPaymentStatus";
import { commerceCopy } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";

export const metadata: Metadata = { title: "Payment status | InnovateXP", robots: { index: false, follow: false, googleBot: { index: false, follow: false } } };
export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ cart?: string }> }) {
  const [{ locale }, query] = await Promise.all([params, searchParams]); if (!isValidLocale(locale)) notFound(); const c = commerceCopy(locale);
  return <SitePageShell title={c.success}><p className="max-w-2xl leading-8">{c.successBody}</p>{query.cart === "1" ? <CartPaymentStatus locale={locale} /> : <PaymentStatus locale={locale} />}</SitePageShell>;
}
