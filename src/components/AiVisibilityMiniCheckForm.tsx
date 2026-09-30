"use client";

import { useEffect, useState, type FormEvent } from "react";
import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy, withLocale } from "@/lib/i18n-routing";

type Capacity = { open: boolean; remaining: number | null };
type Response = { ok: boolean; outcome?: string; reason?: string; reference?: string; seatNumber?: number };

export function AiVisibilityMiniCheckForm({ locale }: { locale: AppLocale }) {
  const zh = localeUsesChineseCopy(locale);
  const [capacity, setCapacity] = useState<Capacity | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [confirmation, setConfirmation] = useState<Response | null>(null);

  useEffect(() => {
    fetch("/api/ai-visibility-mini-check", { cache: "no-store" })
      .then(async (response) => {
        if (!response.ok) throw new Error("unavailable");
        return response.json() as Promise<Capacity>;
      })
      .then(setCapacity)
      .catch(() => setError(zh ? "暫時未能查詢名額，請稍後再試。" : "Unable to check availability. Please try again later."))
      .finally(() => setLoading(false));
  }, [zh]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError("");
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = Object.fromEntries(data.entries());
    try {
      const response = await fetch("/api/ai-visibility-mini-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, consent: data.get("consent") === "on", locale }),
      });
      const result = (await response.json()) as Response;
      if (response.ok && result.outcome === "confirmed") {
        setConfirmation(result);
        return;
      }
      if (result.reason === "full") {
        setCapacity({ open: true, remaining: 0 });
        setError(zh ? "6 個名額已滿，多謝你關注。" : "All 6 places have been taken. Thank you for your interest.");
      } else if (result.reason === "duplicate") {
        setError(zh ? "呢間公司／聯絡方法已登記，請保留原本確認資料。" : "This company or contact is already registered. Please keep the original confirmation.");
      } else {
        setError(zh ? "未能完成登記，請檢查資料或稍後再試。" : "Registration could not be completed. Check your details or try again later.");
      }
    } catch {
      setError(zh ? "網絡連線有問題，請稍後再試。" : "Network issue. Please try again later.");
    } finally {
      setSubmitting(false);
    }
  }

  if (confirmation) {
    return (
      <div role="status" className="rounded-2xl border-2 border-green-600 bg-green-50 p-6 text-slate-900">
        <h2 className="text-2xl font-bold">{zh ? "登記確認成功！" : "Your place is confirmed!"}</h2>
        <p className="mt-3 text-base leading-7">
          {zh
            ? `你係第 ${confirmation.seatNumber} 位確認參加者。請截圖或記低編號 ${confirmation.reference}。`
            : `You have place ${confirmation.seatNumber} of 6. Save or screenshot reference ${confirmation.reference}.`}
        </p>
        <p className="mt-2 text-sm leading-7">
          {zh
            ? "InnovateXP 會喺 3 個工作天內，經你提供嘅 Email／WhatsApp 交付一頁摘要。檢查唔會喺現場完成。"
            : "InnovateXP will deliver the one-page summary by your email or WhatsApp within 3 working days. The check is completed after the event."}
        </p>
      </div>
    );
  }

  if (loading) return <p className="text-sm text-slate-600">{zh ? "查詢名額中…" : "Checking availability…"}</p>;
  if (!capacity?.open) {
    return <p className="rounded-xl bg-slate-100 p-5 text-sm text-slate-700">{error || (zh ? "登記將於 2026 年 10 月 17 日開放，當日掃 QR 即可填表。" : "Registration opens on 17 October 2026. Scan the QR code at the event to sign up.")}</p>;
  }
  if (capacity.remaining === 0) {
    return <p className="rounded-xl bg-slate-100 p-5 text-sm text-slate-700">{zh ? "6 個免費名額已滿，多謝你關注。" : "All 6 free places are full. Thank you for your interest."}</p>;
  }

  const inputClass = "mt-1 block w-full rounded-lg border border-slate-300 bg-white px-3 py-3 text-slate-900 focus:border-brand-primary focus:outline-none focus:ring-2 focus:ring-brand-primary/20";
  return (
    <form onSubmit={submit} className="grid gap-5">
      <p className="text-sm font-semibold text-brand-primary">
        {zh ? `現餘 ${capacity.remaining} 個名額；成功提交後即場顯示確認。` : `${capacity.remaining} places left; successful registration is confirmed on screen.`}
      </p>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">{zh ? "姓名 *" : "Name *"}<input className={inputClass} name="name" required maxLength={120} autoComplete="name" /></label>
        <label className="text-sm font-medium">{zh ? "公司名稱 *" : "Company *"}<input className={inputClass} name="company" required maxLength={160} autoComplete="organization" /></label>
      </div>
      <label className="text-sm font-medium">{zh ? "公司網站 *" : "Company website *"}<input className={inputClass} name="website" type="text" inputMode="url" placeholder="https://example.com" required maxLength={400} /></label>
      <label className="text-sm font-medium">{zh ? "主要服務 *" : "Main service *"}<textarea className={inputClass} name="service" rows={2} required maxLength={500} /></label>
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="text-sm font-medium">Email<input className={inputClass} name="email" type="email" maxLength={180} autoComplete="email" /></label>
        <label className="text-sm font-medium">WhatsApp<input className={inputClass} name="whatsapp" type="tel" maxLength={50} autoComplete="tel" /></label>
      </div>
      <p className="-mt-3 text-xs text-slate-500">{zh ? "Email 或 WhatsApp 至少填一項，用作交付摘要。" : "Enter at least one contact method so we can deliver your summary."}</p>
      <label className="text-sm font-medium">{zh ? "最想客戶問 AI 嘅問題（選填）" : "A question you want buyers to ask AI (optional)"}<textarea className={inputClass} name="question" rows={2} maxLength={500} /></label>
      <label className="absolute -left-[9999px]" aria-hidden="true">Fax<input name="fax" tabIndex={-1} autoComplete="off" /></label>
      <label className="flex items-start gap-3 text-sm leading-6 text-slate-600">
        <input type="checkbox" name="consent" required className="mt-1" />
        <span>{zh ? "我同意 InnovateXP 用以上資料處理今次登記及交付摘要，並已閱讀" : "I agree that InnovateXP may use these details to process this registration and deliver the summary. I have read the "}<a className="underline" href={withLocale(locale, "/privacy-policy")}>{zh ? "私隱政策" : "privacy policy"}</a>{zh ? "。" : "."}</span>
      </label>
      {error ? <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      <button type="submit" disabled={submitting} className="btn-brand min-h-12 px-6 py-3 font-semibold disabled:opacity-60">
        {submitting ? (zh ? "提交中…" : "Submitting…") : (zh ? "確認免費名額" : "Confirm my free place")}
      </button>
    </form>
  );
}
