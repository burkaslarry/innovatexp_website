"use client";

import React from "react";
import { useLanguage } from "./LanguageContext";

/**
 * Segmented EN | 繁中 control — visually separate from nav links (used top-right in header).
 */
export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="group"
      aria-label="Language"
      className="inline-flex items-center rounded-full border border-slate-200/90 bg-slate-100/80 p-0.5 shadow-sm dark:border-slate-600 dark:bg-slate-800/90"
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
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
        onClick={() => setLanguage("zh")}
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
