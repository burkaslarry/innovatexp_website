"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { commerceCopy, isOfferId, OFFERS } from "@/content/commerce";
import { creditsForOffer, getCreditCheckoutCopy } from "@/content/credit-checkout";
import { formatHkd } from "@/content/pricing";
import { sessionCreditWhatsAppHref } from "@/content/session-credits";
import type { AppLocale } from "@/lib/i18n-routing";

export function PaymentStatus({ locale }: { locale: AppLocale }) {
  const [status, setStatus] = useState("pending");
  const [offer, setOffer] = useState("");
  const c = commerceCopy(locale);
  useEffect(() => {
    let stopped = false; let attempts = 0; let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const r = await fetch("/api/commerce/status", { cache: "no-store" });
        const data = await r.json();
        if (!stopped && r.ok) {
          setStatus(data.status);
          if (typeof data.offer === "string") setOffer(data.offer);
        }
        if (!stopped && data.status === "pending" && ++attempts < 12) timer = setTimeout(poll, 5000);
      } catch { /* Keep honest pending state and offer manual reload. */ }
    };
    void poll();
    return () => { stopped = true; clearTimeout(timer); };
  }, []);
  const credits = creditsForOffer(offer);
  const x = getCreditCheckoutCopy(locale);
  const creditPrice = isOfferId(offer) ? formatHkd(OFFERS[offer].amount / 100, locale) : "";
  const creditCount = credits.toLocaleString(locale === "de" ? "de-DE" : "en-HK");
  return <div className="mt-6" aria-live="polite"><p className="font-semibold">{status === "paid" ? c.paid : status.includes("refunded") ? c.refunded : status === "failed" ? c.failed : c.pending}</p>
    {status === "paid" && credits > 0 ? <div className="mt-5 max-w-2xl rounded-xl border border-[color:var(--border-light)] p-5">
      <p className="font-semibold text-[color:var(--heading-foreground)]">{x.paidHeading}</p>
      <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">{x.paidBody}</p>
      <p className="mt-3 text-sm font-semibold text-[color:var(--heading-foreground)]">{creditCount} {x.creditsWord}</p>
      <a className="btn-brand mt-4 inline-flex min-h-11 items-center px-6 py-3 text-sm font-bold" href={sessionCreditWhatsAppHref(x.prefill(creditCount, creditPrice))} target="_blank" rel="noopener noreferrer">{x.bookLabel}</a>
    </div> : status === "paid" && <Link className="mt-5 inline-flex min-h-11 items-center bg-[#251f19] px-6 py-3 text-white" href={`/${locale}/intake/snapshot`}>{c.next}</Link>}
  </div>;
}
