"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getLocaleFromPathname,
  stripLocaleFromPathname,
  withLocale,
  LOCALES,
  type AppLocale,
} from "@/lib/i18n-routing";

const LABELS: Record<AppLocale, string> = {
  en: "English",
  "zh-hk": "繁中（香港）",
  "zh-tw": "繁中（台灣）",
  ja: "日本語",
  de: "Deutsch",
};

/**
 * Locale selector — navigates between hreflang-aligned URL prefixes (`/en`, `/zh-hk`, …).
 */
export default function LanguageSwitcher() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const current = getLocaleFromPathname(pathname);
  const bare = stripLocaleFromPathname(pathname);

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as AppLocale;
    router.push(withLocale(next, bare));
  };

  return (
    <div className="inline-flex items-center">
      <label className="sr-only" htmlFor="ixp-locale-select">
        Language / 語言
      </label>
      <select
        id="ixp-locale-select"
        value={current}
        onChange={onChange}
        className="max-w-[11rem] cursor-pointer rounded-full border border-slate-200/90 bg-slate-100/80 px-2.5 py-1 text-xs font-semibold text-slate-800 shadow-sm dark:border-slate-600 dark:bg-slate-800/90 dark:text-slate-100 sm:max-w-none sm:px-3 sm:text-sm"
      >
        {LOCALES.map((loc) => (
          <option key={loc} value={loc}>
            {LABELS[loc]}
          </option>
        ))}
      </select>
    </div>
  );
}
