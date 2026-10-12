import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { cookies } from "next/headers";
import { SitePageShell } from "@/components/SitePageShell";
import { CheckoutForm } from "@/components/commerce/CheckoutForm";
import { commerceCopy, isOfferId, OFFERS } from "@/content/commerce";
import { isValidLocale } from "@/lib/i18n-routing";
import { commerceSql, tokenHash } from "@/lib/commerce/orders";
import { paymentsEnabled } from "@/lib/commerce/config";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Agreed service | InnovateXP", robots: { index: false, follow: false, googleBot: { index: false, follow: false } } };
export default async function Page({ params, searchParams }: { params: Promise<{ locale: string }>; searchParams: Promise<{ token?: string }> }) {
  const { locale } = await params; if (!isValidLocale(locale)) notFound();
  const incoming = await searchParams;
  if (incoming.token) redirect(`/api/commerce/invitation?locale=${locale}&token=${encodeURIComponent(incoming.token)}`);
  const token = (await cookies()).get("ixp_checkout_invitation")?.value;
  const c = commerceCopy(locale);
  let invitation = null;
  if (token && /^[a-f0-9]{64}$/.test(token) && paymentsEnabled()) {
    try { const rows = await commerceSql()`SELECT offer, scope FROM commerce_invitations WHERE token_hash = ${tokenHash(token)} AND expires_at > NOW()`; invitation = rows[0]; } catch { /* unavailable */ }
  }
  const offer = invitation && isOfferId(invitation.offer) ? invitation.offer : null;
  return <SitePageShell title={offer ? OFFERS[offer].name : c.failed}>
    {offer ? <><p className="text-3xl">HK${OFFERS[offer].amount / 100}{OFFERS[offer].mode === "subscription" ? " / month" : ""}</p><p className="mt-5 whitespace-pre-wrap leading-8">{String(invitation!.scope)}</p><CheckoutForm locale={locale} offer={offer} invitation={token} /></> : <p>{c.invalid}</p>}
  </SitePageShell>;
}
