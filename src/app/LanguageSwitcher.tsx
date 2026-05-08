"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLanguage } from "./LanguageContext";
import {
  getLocaleFromPathname,
  languageToLocale,
  stripLocaleFromPathname,
  withLocale,
  type AppLocale,
} from "@/lib/i18n-routing";

/**
 * Segmented EN | 繁中 control — navigates to the other locale prefix (hreflang-aligned URLs).
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname() || "/";
  const router = useRouter();

  const switchLocale = (lang: "en" | "zh") => {
    const nextLocale: AppLocale = languageToLocale(lang);
    const current = getLocaleFromPathname(pathname);
    const bare = stripLocaleFromPathname(pathname);
    const href = withLocale(nextLocale, bare);
    if (nextLocale !== current) {
      setLanguage(lang);
      router.push(href);
      return;
    }
    setLanguage(lang);
  };

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-slate-200/90 bg-slate-100/80 p-0.5 shadow-sm dark:border-slate-600 dark:bg-slate-800/90"
    >
      <button
        type="button"
        onClick={() => switchLocale("en")}
        className={`relative rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
          language === "en"
            ? "bg-brand-primary text-white shadow-sm dark:bg-[#00B9B3] dark:text-slate-950"
            : "text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        EN
      </button>
      <span className="select-none px-0.5 text-slate-300 dark:text-slate-600" aria-hidden>
        |
      </span>
      <button
        type="button"
        onClick={() => switchLocale("zh")}
        className={`rounded-full px-2.5 py-1 text-xs font-semibold transition-colors sm:px-3 sm:text-sm ${
          language === "zh"
            ? "bg-brand-primary text-white shadow-sm dark:bg-[#00B9B3] dark:text-slate-950"
            : "text-slate-600 hover:text-brand-primary dark:text-slate-400 dark:hover:text-white"
        }`}
      >
        繁中
      </button>
    </div>
  );
}
