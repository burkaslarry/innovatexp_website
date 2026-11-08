import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SitePageShell } from "@/components/SitePageShell";
import { PaidIntake } from "@/components/commerce/PaidIntake";
import { commerceCopy } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";
import { currentOrder } from "@/lib/commerce/access";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Service intake | InnovateXP", robots: { index: false, follow: false, googleBot: { index: false, follow: false } } };
export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound(); const c = commerceCopy(locale);
  let order = null; try { order = await currentOrder(); } catch { /* Fail closed if the store is unavailable. */ }
  return <SitePageShell title={c.intake}>{order?.payment_state === "paid" ? <PaidIntake locale={locale} completed={Boolean(order.intake)} subscription={Boolean(order.subscription)} /> : <p>{c.invalid}</p>}</SitePageShell>;
}
