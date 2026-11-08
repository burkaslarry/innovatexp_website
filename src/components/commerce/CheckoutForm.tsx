"use client";
import { useState } from "react";
import Link from "next/link";
import { commerceCopy, PURCHASE_POLICY_VERSION, type OfferId } from "@/content/commerce";
import type { AppLocale } from "@/lib/i18n-routing";
import { trackConversion } from "@/lib/analytics";

export function CheckoutForm({ locale, offer = "snapshot", invitation }: { locale: AppLocale; offer?: OfferId; invitation?: string }) {
  const c = commerceCopy(locale);
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");
  return <form className="mt-6 max-w-xl space-y-4" onSubmit={async (event) => {
    event.preventDefault(); setBusy(true); setError("");
    const id = requestId || crypto.randomUUID(); setRequestId(id);
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ offer, email, locale, requestId: id, invitation, policyVersion: PURCHASE_POLICY_VERSION, acceptTerms: accepted }) });
      const data = await response.json();
      if (!response.ok || !data.url || new URL(data.url).hostname !== "checkout.stripe.com") throw new Error("Unavailable");
      trackConversion("checkout_started", { offer, locale });
      window.location.assign(data.url);
    } catch { setError(c.error); setBusy(false); }
  }}>
    <label className="block">{c.email}<input type="email" required maxLength={254} autoComplete="email" value={email} onChange={(e) => { setEmail(e.target.value); setRequestId(""); }} className="mt-2 block w-full rounded border border-[#c8bba9] bg-white p-3 text-[#251f19]" /></label>
    <p className="text-sm"><Link href={`/${locale}/purchase-terms`} className="underline">{c.terms}</Link> · <Link href={`/${locale}/privacy-policy`} className="underline">{c.policy}</Link></p>
    <label className="flex items-start gap-3 text-sm"><input type="checkbox" required checked={accepted} onChange={(e) => setAccepted(e.target.checked)} className="mt-1 h-5 w-5 shrink-0" />{c.agree}</label>
    <button disabled={busy} className="inline-flex min-h-11 items-center bg-[#251f19] px-6 py-3 text-white disabled:opacity-50">{c.continue}</button>
    {error && <p role="alert">{error}</p>}
  </form>;
}
