"use client";

import { useEffect, useRef, useState } from "react";
import { CART_COPY, CART_PENDING_KEY, CART_RETRY_KEY } from "@/content/cart-copy";
import { OFFERS, isOfferId, type OfferId } from "@/content/commerce";
import { CART_OFFERS } from "@/content/commerce-cart";
import { useInquiryCart } from "@/context/InquiryCartContext";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { AppLocale } from "@/lib/i18n-routing";

type StatusItem = { offer: OfferId; status: string; intakeUrl?: string };

export function CartPaymentStatus({ locale }: { locale: AppLocale }) {
  const c = CART_COPY[locale];
  const [status, setStatus] = useState("pending");
  const [orders, setOrders] = useState<StatusItem[]>([]);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(0);
  const { items, setQty } = useInquiryCart();
  const itemsRef = useRef(items);
  useEffect(() => { itemsRef.current = items; }, [items]);

  useEffect(() => {
    const controller = new AbortController();
    let timer: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;
    const poll = async () => {
      try {
        const response = await fetch("/api/commerce/cart-status", { signal: controller.signal, cache: "no-store" });
        const data = await response.json();
        if (!response.ok || typeof data.status !== "string" || !Array.isArray(data.items) || !data.items.length || data.items.some((item: StatusItem) => !isOfferId(item.offer) || typeof item.status !== "string")) throw new Error("Unavailable");
        if (controller.signal.aborted) return;
        let pending: { requestId?: string; items?: { id: string; offer: OfferId }[] } | null = null;
        try { pending = JSON.parse(sessionStorage.getItem(CART_PENDING_KEY) || "null"); } catch { /* Server verification does not depend on browser storage. */ }
        if (pending?.requestId && pending.requestId !== data.requestId) throw new Error("Checkout mismatch");
        setStatus(data.status); setOrders(data.items); setError(false);
        if (data.status === "paid" && data.items.every((item: StatusItem) => item.status === "paid")) {
          try {
            sessionStorage.removeItem(CART_PENDING_KEY);
            const retry = JSON.parse(sessionStorage.getItem(CART_RETRY_KEY) || "null");
            if (retry?.id === data.requestId) sessionStorage.removeItem(CART_RETRY_KEY);
            if (Array.isArray(pending?.items)) {
              const removed = new Set<string>();
              for (const entry of pending.items) {
                if (!entry || typeof entry.id !== "string" || removed.has(entry.id) || (CART_OFFERS as Partial<Record<string, OfferId>>)[entry.id] !== entry.offer || !data.items.some((order: StatusItem) => order.offer === entry.offer && order.status === "paid")) continue;
                removed.add(entry.id);
                const line = itemsRef.current.find((item) => item.id === entry.id);
                if (line) setQty(entry.id as InquiryCatalogItemId, line.qty - 1);
              }
            }
          } catch { /* Storage is optional; payment verification is server-side. */ }
        }
        if (data.status === "pending" && ++attempts < 12) timer = setTimeout(() => void poll(), 5000);
      } catch { if (!controller.signal.aborted) setError(true); }
    };
    void poll();
    return () => { controller.abort(); clearTimeout(timer); };
  }, [refresh, setQty]);

  const label = (state: string) => state === "paid" ? c.paid : state.includes("refunded") ? c.refunded : state === "failed" ? c.failed : c.pending;
  return <section className="mt-7 max-w-2xl space-y-5" aria-label={c.payment}>
    <p role="status" className="text-lg font-semibold">{label(status)}</p>
    {error ? <p role="alert" className="leading-7">{c.statusError}</p> : null}
    <ul className="space-y-5">{orders.map((order) => <li key={order.offer} className="border-t border-[#c8bba9] pt-4">
      <h2 className="text-xl">{OFFERS[order.offer].name}</h2><p className="mt-2">{label(order.status)}</p>
      {order.status === "paid" && order.intakeUrl?.startsWith("/api/commerce/access?") ? <a className="mt-3 inline-flex min-h-11 items-center underline" href={order.intakeUrl}>{c.intake}</a> : null}
    </li>)}</ul>
    <button type="button" onClick={() => setRefresh((value) => value + 1)} className="inline-flex min-h-11 items-center border border-[#8b6b43] px-5 py-3">{c.retry}</button>
  </section>;
}
