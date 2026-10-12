"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { commerceCopy } from "@/content/commerce";
import type { AppLocale } from "@/lib/i18n-routing";

export function PaymentStatus({ locale }: { locale: AppLocale }) {
  const [status, setStatus] = useState("pending");
  const c = commerceCopy(locale);
  useEffect(() => {
    let stopped = false; let attempts = 0; let timer: ReturnType<typeof setTimeout>;
    const poll = async () => {
      try {
        const r = await fetch("/api/commerce/status", { cache: "no-store" });
        const data = await r.json();
        if (!stopped && r.ok) setStatus(data.status);
        if (!stopped && data.status === "pending" && ++attempts < 12) timer = setTimeout(poll, 5000);
      } catch { /* Keep honest pending state and offer manual reload. */ }
    };
    void poll();
    return () => { stopped = true; clearTimeout(timer); };
  }, []);
  return <div className="mt-6" aria-live="polite"><p className="font-semibold">{status === "paid" ? c.paid : status.includes("refunded") ? c.refunded : status === "failed" ? c.failed : c.pending}</p>
    {status === "paid" && <Link className="mt-5 inline-flex min-h-11 items-center bg-[#251f19] px-6 py-3 text-white" href={`/${locale}/intake/snapshot`}>{c.next}</Link>}
  </div>;
}
