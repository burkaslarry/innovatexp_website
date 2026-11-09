"use client";

import { useState } from "react";
import Link from "next/link";
import { commerceCopy, PURCHASE_POLICY_VERSION } from "@/content/commerce";
import { getCreditCheckoutCopy } from "@/content/credit-checkout";
import type { sessionCreditPacks } from "@/content/session-credits";
import type { AppLocale } from "@/lib/i18n-routing";
import { trackConversion } from "@/lib/analytics";

type CreditPack = ReturnType<typeof sessionCreditPacks>[number];

export function CreditCheckoutForm({
  locale,
  packs,
  enabled,
  variant = "credits",
}: {
  locale: AppLocale;
  packs: CreditPack[];
  enabled: boolean;
  variant?: "credits" | "clinic";
}) {
  const c = commerceCopy(locale);
  const x = getCreditCheckoutCopy(locale, variant);
  const [offer, setOffer] = useState<CreditPack["id"]>(packs[1]?.id ?? packs[0]!.id);
  const [email, setEmail] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [requestId, setRequestId] = useState("");

  const selected = packs.find((pack) => pack.id === offer) ?? packs[0]!;
  const inputClass =
    "mt-2 block min-h-11 w-full rounded border border-[color:var(--border-light)] bg-[color:var(--bg-primary)] p-3 text-[color:var(--text-primary)]";

  return (
    <section className="mt-12 max-w-2xl" aria-labelledby="credit-checkout-heading">
      <h2
        id="credit-checkout-heading"
        className="font-[family-name:var(--font-heading)] text-2xl text-[color:var(--heading-foreground)]"
      >
        {x.heading}
      </h2>
      <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">{x.intro}</p>

      {!enabled ? (
        <p className="mt-5 rounded-xl border border-[color:var(--border-light)] p-4 text-sm leading-7 text-[color:var(--text-secondary)]">
          {x.unavailable}
        </p>
      ) : (
        <form
          className="mt-6 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            if (busy || !accepted) return;
            setBusy(true);
            setError("");
            const id = requestId || crypto.randomUUID();
            setRequestId(id);
            try {
              const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  offer,
                  email: email.trim().toLowerCase(),
                  locale,
                  requestId: id,
                  policyVersion: PURCHASE_POLICY_VERSION,
                  acceptTerms: accepted,
                }),
              });
              const data = await response.json();
              if (!response.ok || typeof data.url !== "string") throw new Error("Unavailable");
              const url = new URL(data.url);
              if (url.protocol !== "https:" || url.hostname !== "checkout.stripe.com") throw new Error("Unavailable");
              trackConversion("checkout_started", { locale, offer });
              window.location.assign(url.href);
            } catch {
              setError(c.error);
              setBusy(false);
            }
          }}
        >
          <fieldset disabled={busy}>
            <legend className="text-sm font-semibold text-[color:var(--heading-foreground)]">{x.selectLabel}</legend>
            <div className="mt-3 space-y-2">
              {packs.map((pack) => (
                <label
                  key={pack.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 border p-4 text-sm ${
                    offer === pack.id
                      ? "border-[color:var(--heading-foreground)] bg-[color:var(--bg-primary)]"
                      : "border-[color:var(--border-light)]"
                  }`}
                >
                  <span className="flex items-center gap-3">
                    <input
                      type="radio"
                      name="credit-pack"
                      value={pack.id}
                      checked={offer === pack.id}
                      onChange={() => {
                        setOffer(pack.id);
                        setRequestId("");
                      }}
                      className="h-5 w-5"
                    />
                    <span>
                      <span className="font-semibold text-[color:var(--heading-foreground)]">
                        {pack.total.toLocaleString(locale === "de" ? "de-DE" : "en-HK")} {x.creditsWord}
                      </span>
                      <span className="block text-xs text-[color:var(--text-tertiary)]">
                        {pack.bonusCredits > 0 ? x.bonus(pack.bonusCredits) : x.noBonus}
                      </span>
                    </span>
                  </span>
                  <span className="font-semibold text-[color:var(--heading-foreground)]">{pack.priceLabel}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <label className="block text-sm text-[color:var(--text-primary)]">
            {c.email}
            <input
              type="email"
              autoComplete="email"
              required
              maxLength={254}
              disabled={busy}
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
                setRequestId("");
              }}
              className={inputClass}
            />
          </label>

          <p className="text-sm text-[color:var(--text-secondary)]">
            <Link className="underline" href={`/${locale}/purchase-terms`}>
              {c.terms}
            </Link>
            {" · "}
            <Link className="underline" href={`/${locale}/privacy-policy`}>
              {c.policy}
            </Link>
          </p>
          <label className="flex items-start gap-3 text-sm leading-6 text-[color:var(--text-secondary)]">
            <input
              type="checkbox"
              required
              disabled={busy}
              checked={accepted}
              onChange={(event) => setAccepted(event.target.checked)}
              className="mt-1 h-5 w-5 shrink-0"
            />
            {c.agree}
          </label>
          <button
            type="submit"
            disabled={busy || !accepted}
            className="btn-brand inline-flex min-h-[48px] w-full items-center justify-center px-6 text-sm font-bold disabled:opacity-50"
          >
            {busy ? x.busy : `${c.continue} · ${selected.priceLabel}`}
          </button>
          {error ? (
            <p role="alert" className="text-sm text-[color:var(--text-secondary)]">
              {error}
            </p>
          ) : null}
        </form>
      )}
    </section>
  );
}
