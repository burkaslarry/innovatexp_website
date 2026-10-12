"use client";
import { useState } from "react";
import { commerceCopy } from "@/content/commerce";
import type { AppLocale } from "@/lib/i18n-routing";

export function PaidIntake({ locale, completed, subscription }: { locale: AppLocale; completed: boolean; subscription: boolean }) {
  const c = commerceCopy(locale);
  const zh = locale.startsWith("zh");
  const [done, setDone] = useState(completed);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return <>
    {done ? <p role="status">{c.received}</p> : <form className="max-w-xl space-y-5" onSubmit={async (e) => {
      e.preventDefault(); setBusy(true); setError("");
      const f = new FormData(e.currentTarget);
      try {
        const r = await fetch("/api/commerce/intake", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(f)) });
        if (!r.ok) throw new Error("Unavailable"); setDone(true);
      } catch { setError(c.error); } finally { setBusy(false); }
    }}>
      <p>{zh ? "請勿提交客戶名單、財務明細或敏感個人資料。" : "Do not submit customer lists, financial records or sensitive personal data."}</p>
      <label className="block">{zh ? "公司／品牌" : "Company / brand"}<input name="company" required maxLength={200} className="mt-2 block w-full border border-[#c8bba9] bg-white p-3" /></label>
      <label className="block">{c.workflow}<textarea name="workflow" required minLength={10} maxLength={4000} rows={5} className="mt-2 block w-full border border-[#c8bba9] bg-white p-3" /></label>
      <label className="block">{zh ? "時區" : "Timezone"}<input name="timezone" defaultValue={Intl.DateTimeFormat().resolvedOptions().timeZone} required maxLength={80} className="mt-2 block w-full border border-[#c8bba9] bg-white p-3" /></label>
      <button disabled={busy} className="min-h-11 bg-[#251f19] px-6 py-3 text-white disabled:opacity-50">{c.send}</button>
    </form>}
    {subscription && <button className="mt-6 min-h-11 border border-[#8b6b43] px-6 py-3" onClick={async () => {
      try { const r = await fetch("/api/stripe/portal", { method: "POST" }); const data = await r.json();
        if (!r.ok || new URL(data.url).hostname !== "billing.stripe.com") throw new Error("Unavailable"); window.location.assign(data.url);
      } catch { setError(c.error); }
    }}>{c.portal}</button>}
    {error && <p className="mt-4" role="alert">{error}</p>}
  </>;
}
