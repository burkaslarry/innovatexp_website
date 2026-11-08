"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { CART_OFFERS } from "@/content/commerce-cart";
import { OFFERS, PURCHASE_POLICY_VERSION, isOfferId, type OfferId } from "@/content/commerce";
import { CART_COPY, CART_PENDING_KEY, CART_RETRY_KEY } from "@/content/cart-copy";
import { catalogTitle, getInquiryCatalogItem } from "@/content/inquiry-catalog";
import { formatHkd } from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";
import { trackConversion } from "@/lib/analytics";

export function CartCheckout({ locale, open }: { locale: AppLocale; open: boolean }) {
  const c = CART_COPY[locale];
  const { items, invitations } = useInquiryCart();
  const [available, setAvailable] = useState<OfferId[] | null>(null);
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [mode, setMode] = useState<"payment" | "subscription">("payment");
  const [subscription, setSubscription] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const submitting = useRef(false);
  const retry = useRef({ fingerprint: "", id: "" });

  useEffect(() => {
    if (!open) return;
    const controller = new AbortController();
    setAvailable(null);
    void fetch("/api/stripe/cart", { signal: controller.signal, cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("Unavailable");
        const data = await response.json();
        if (!Array.isArray(data.availableOffers)) throw new Error("Unavailable");
        if (!controller.signal.aborted) setAvailable(data.availableOffers.filter(isOfferId));
      }).catch(() => { if (!controller.signal.aborted) setAvailable([]); });
    return () => controller.abort();
  }, [open]);

  const eligible = items.flatMap((line) => {
    const offer = (CART_OFFERS as Partial<Record<string, OfferId>>)[line.id];
    if (!offer || !available?.includes(offer) || (OFFERS[offer].qualification && !invitations[line.id])) return [];
    return [{ ...line, offer }];
  });
  const oneTime = eligible.filter((line) => OFFERS[line.offer].mode === "payment");
  const subscriptions = eligible.filter((line) => OFFERS[line.offer].mode === "subscription");
  const selected = mode === "payment" ? oneTime : subscriptions.filter((line) => line.offer === subscription);
  const badQuantity = selected.some((line) => line.qty !== 1);
  const duplicate = new Set(selected.map((line) => line.offer)).size !== selected.length;
  const total = selected.reduce((sum, line) => sum + OFFERS[line.offer].amount / 100, 0);

  return <section aria-label={c.payment} className="mb-5 space-y-4 border-b border-[color:var(--border-light)] pb-5">
    <h2 className="text-lg font-semibold">{c.payment}</h2>
    {available === null ? <p role="status" className="text-sm">{c.loading}</p> : !available.length ? <p className="text-sm leading-6">{c.unavailable}</p> : !eligible.length ? <p className="text-sm leading-6">{c.noEligible}</p> : <>
      {subscriptions.length > 0 ? <fieldset disabled={busy} className="space-y-2">
        <legend className="text-sm">{c.separate}</legend>
        <label className="flex min-h-11 items-center gap-3"><input type="radio" name="cart-payment-mode" checked={mode === "payment"} onChange={() => { setMode("payment"); setAccepted(false); }} />{c.oneTime}</label>
        <label className="flex min-h-11 items-center gap-3"><input type="radio" name="cart-payment-mode" checked={mode === "subscription"} onChange={() => { setMode("subscription"); setAccepted(false); }} />{c.monthly}</label>
        {mode === "subscription" ? <label className="block text-sm">{c.monthly}<select className="mt-2 block min-h-11 w-full rounded border bg-[color:var(--bg-primary)] p-2" value={subscription} onChange={(event) => { setSubscription(event.target.value); setAccepted(false); }}><option value="">—</option>{subscriptions.map((line) => <option key={line.id} value={line.offer}>{OFFERS[line.offer].name} · {formatHkd(OFFERS[line.offer].amount / 100, locale)} {c.monthlySuffix}</option>)}</select></label> : null}
      </fieldset> : null}
      {selected.length ? <>
        <h3 className="text-sm font-semibold">{c.includes}</h3>
        <ul className="list-disc space-y-2 pl-5 text-sm">{selected.map((line) => <li key={line.id}>{catalogTitle(getInquiryCatalogItem(line.id)!, locale.startsWith("zh"))} · {formatHkd(OFFERS[line.offer].amount / 100, locale)}{mode === "subscription" ? ` ${c.monthlySuffix}` : ""}</li>)}</ul>
        {items.length > selected.length ? <p className="text-sm leading-6">{c.remaining}</p> : null}
        {badQuantity ? <p role="alert" className="text-sm">{c.quantity}</p> : null}
        {duplicate ? <p role="alert" className="text-sm">{c.duplicate}</p> : null}
        <form className="space-y-4" onSubmit={async (event) => {
          event.preventDefault();
          if (submitting.current || badQuantity || duplicate || !accepted || !selected.length) return;
          submitting.current = true; setBusy(true); setError("");
          const checkoutItems = selected.map((line) => ({ id: line.id, qty: 1, invitation: invitations[line.id] })).sort((a, b) => a.id.localeCompare(b.id));
          const normalizedEmail = email.trim().toLowerCase();
          try {
            const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify({ items: checkoutItems, email: normalizedEmail, locale })));
            const fingerprint = Array.from(new Uint8Array(digest), byte => byte.toString(16).padStart(2, "0")).join("");
            if (retry.current.fingerprint !== fingerprint) {
              let id = crypto.randomUUID();
              try {
                const saved = JSON.parse(sessionStorage.getItem(CART_RETRY_KEY) || "null");
                if (saved?.fingerprint === fingerprint && typeof saved.id === "string" && /^[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89ab][a-f0-9]{3}-[a-f0-9]{12}$/.test(saved.id)) id = saved.id;
                sessionStorage.setItem(CART_RETRY_KEY, JSON.stringify({ fingerprint, id }));
              } catch { /* Preserve same-page retries when browser storage is unavailable. */ }
              retry.current = { fingerprint, id };
            }
            const requestId = retry.current.id;
            const response = await fetch("/api/stripe/cart", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items: checkoutItems, email: normalizedEmail, locale, requestId, policyVersion: PURCHASE_POLICY_VERSION, acceptTerms: accepted }) });
            const data = await response.json();
            if (!response.ok || typeof data.url !== "string") throw new Error("Unavailable");
            const url = new URL(data.url);
            if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Unavailable");
            try { sessionStorage.setItem(CART_PENDING_KEY, JSON.stringify({ requestId, items: selected.map(({ id, offer }) => ({ id, offer })) })); } catch { /* Cart cleanup must not block a verified checkout URL. */ }
            trackConversion("checkout_started", { locale, offer: "cart" });
            window.location.assign(url.href);
          } catch { setError(c.error); setBusy(false); submitting.current = false; }
        }}>
          <label className="block text-sm">{c.email}<input type="email" autoComplete="email" required maxLength={254} disabled={busy} value={email} onChange={(event) => setEmail(event.target.value)} className="mt-2 block min-h-11 w-full rounded border border-[color:var(--border-light)] bg-[color:var(--bg-primary)] p-3 text-[color:var(--text-primary)]" /></label>
          <p className="text-sm"><Link className="underline" href={`/${locale}/purchase-terms`}>{c.termsLink}</Link> · <Link className="underline" href={`/${locale}/privacy-policy`}>{c.privacyLink}</Link></p>
          <label className="flex items-start gap-3 text-sm leading-6"><input type="checkbox" required disabled={busy} checked={accepted} onChange={(event) => setAccepted(event.target.checked)} className="mt-1 h-5 w-5 shrink-0" />{c.terms}</label>
          <button type="submit" disabled={busy || badQuantity || duplicate} className="min-h-12 w-full rounded px-4 py-3 font-semibold btn-brand disabled:opacity-50">{busy ? c.busy : `${c.pay} · ${formatHkd(total, locale)}${mode === "subscription" ? ` ${c.monthlySuffix}` : ""}`}</button>
          {error ? <p role="alert" className="text-sm leading-6">{error}</p> : null}
        </form>
      </> : <p className="text-sm">{c.noEligible}</p>}
    </>}
  </section>;
}
