"use client";

import { useMemo, useState } from "react";
import {
  PRICING,
  RUSH_SURCHARGE_PERCENT,
  WEBSITE_ADDON_IDS,
  WEBSITE_ADDON_LABELS_EN,
  WEBSITE_ADDON_LABELS_ZH,
  computeWebsiteQuote,
  formatHkd,
  type PricingLocale,
  type WebsiteAddonId,
} from "@/content/pricing";

const FLAT_ADDONS = WEBSITE_ADDON_IDS.filter((id) => id !== "extraPage" && id !== "extraLocale");

type Props = {
  locale: PricingLocale;
  /** When provided, expose live quote to parent (e.g. wizard). */
  onQuoteChange?: (payload: {
    addons: WebsiteAddonId[];
    extraPages: number;
    extraLocales: number;
    rush: boolean;
    totalOneTime: number;
  }) => void;
};

export function WebsiteQuoteBuilder({ locale, onQuoteChange }: Props) {
  const zh = locale.startsWith("zh");
  const labels = zh ? WEBSITE_ADDON_LABELS_ZH : WEBSITE_ADDON_LABELS_EN;
  const [addons, setAddons] = useState<WebsiteAddonId[]>([]);
  const [extraPages, setExtraPages] = useState(0);
  const [extraLocales, setExtraLocales] = useState(0);
  const [rush, setRush] = useState(false);

  const quote = useMemo(
    () => computeWebsiteQuote({ addons, extraPages, extraLocales, rush }),
    [addons, extraPages, extraLocales, rush],
  );

  const emit = (
    next: Partial<{ addons: WebsiteAddonId[]; extraPages: number; extraLocales: number; rush: boolean }>,
  ) => {
    const payload = {
      addons: next.addons ?? addons,
      extraPages: next.extraPages ?? extraPages,
      extraLocales: next.extraLocales ?? extraLocales,
      rush: next.rush ?? rush,
    };
    const q = computeWebsiteQuote(payload);
    onQuoteChange?.({ ...payload, totalOneTime: q.totalOneTime });
  };

  const toggleAddon = (id: WebsiteAddonId) => {
    const next = addons.includes(id) ? addons.filter((x) => x !== id) : [...addons, id];
    setAddons(next);
    emit({ addons: next });
  };

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-brand-primary/30 bg-cyan-50/80 p-5 dark:border-teal-500/40 dark:bg-slate-800/80">
        <p className="text-xs font-bold uppercase tracking-wide text-brand-primary dark:text-teal-300">
          {zh ? "Base Package（一次）" : "Base Package (one-time)"}
        </p>
        <p className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white">
          {formatHkd(PRICING.tools.website.starter, locale)}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          {zh
            ? "1 個 Landing Page（含 contact us、簡介、5–10 張 photos + logo）+ Mobile Responsive + WhatsApp/Booking 按鈕 + 基本 SEO + 1 種語言 + Figma design 稿 · 10 個工作日交付"
            : "1 landing page (contact us, intro, 5–10 photos + logo) + mobile responsive + WhatsApp/Booking CTA + basic SEO + 1 language + Figma design · 10 working days"}
        </p>
      </div>

      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          {zh ? "點心紙（Add-on Menu）" : "Add-on menu"}
        </h3>
        <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
          {zh ? "揀 item 加埋 base package 就係實際報價。" : "Pick items — base package + add-ons = your quote."}
        </p>
        <ul className="mt-4 grid gap-2">
          {FLAT_ADDONS.map((id) => {
            const selected = addons.includes(id);
            return (
              <li key={id}>
                <button
                  type="button"
                  onClick={() => toggleAddon(id)}
                  className={`flex w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-sm transition ${
                    selected
                      ? "border-brand-primary bg-brand-primary text-white"
                      : "border-slate-200 bg-white text-slate-800 hover:border-brand-primary/40 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
                  }`}
                >
                  <span className="font-semibold">{labels[id]}</span>
                  <span className={`shrink-0 font-bold ${selected ? "text-white" : "text-brand-primary dark:text-teal-300"}`}>
                    {formatHkd(PRICING.websiteAddons[id], locale)}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-900">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {zh ? "額外頁面" : "Extra pages"}
          </span>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            value={extraPages}
            onChange={(e) => {
              const v = Number(e.target.value);
              setExtraPages(v);
              emit({ extraPages: v });
            }}
          >
            {[0, 1, 2, 3, 4, 5, 8, 10].map((n) => (
              <option key={n} value={n}>
                {n} × {formatHkd(PRICING.websiteAddons.extraPage, locale)}
              </option>
            ))}
          </select>
        </label>
        <label className="block rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-900">
          <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
            {zh ? "多語言版本" : "Extra languages"}
          </span>
          <select
            className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-600 dark:bg-slate-800"
            value={extraLocales}
            onChange={(e) => {
              const v = Number(e.target.value);
              setExtraLocales(v);
              emit({ extraLocales: v });
            }}
          >
            {[0, 1, 2, 3].map((n) => (
              <option key={n} value={n}>
                {n} × {formatHkd(PRICING.websiteAddons.extraLocale, locale)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 dark:border-slate-600 dark:bg-slate-900">
        <input
          type="checkbox"
          checked={rush}
          onChange={(e) => {
            setRush(e.target.checked);
            emit({ rush: e.target.checked });
          }}
          className="h-5 w-5"
        />
        <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
          {zh ? `加急交付（+${RUSH_SURCHARGE_PERCENT}% 總費用）` : `Rush delivery (+${RUSH_SURCHARGE_PERCENT}% of total)`}
        </span>
      </label>

      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/50">
        <p className="text-sm font-semibold text-slate-600 dark:text-slate-400">
          {zh ? "一次性合計" : "One-time total"}
        </p>
        <p className="mt-1 text-3xl font-extrabold text-brand-primary dark:text-teal-300">
          {formatHkd(quote.totalOneTime, locale)}
        </p>
        {quote.rushAmount > 0 ? (
          <p className="mt-1 text-xs text-slate-500">
            {zh ? "含加急" : "Includes rush"} {formatHkd(quote.rushAmount, locale)}
          </p>
        ) : null}
        <p className="mt-4 text-sm text-slate-700 dark:text-slate-300">
          {zh ? "基本維護月費" : "Maintenance (monthly)"}:{" "}
          <strong>
            {formatHkd(quote.maintenanceMonthly.starter, locale)} /{" "}
            {formatHkd(quote.maintenanceMonthly.growth, locale)} /{" "}
            {formatHkd(quote.maintenanceMonthly.enterprise, locale)}
          </strong>
        </p>
      </div>
    </div>
  );
}
