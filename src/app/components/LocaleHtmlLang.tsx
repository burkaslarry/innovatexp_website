"use client";

import { useEffect } from "react";
import type { AppLocale } from "@/lib/i18n-routing";

const LOCALE_HTML_LANG: Record<AppLocale, string> = {
  en: "en",
  "zh-hk": "zh-HK",
};

export function LocaleHtmlLang({ locale }: { locale: AppLocale }) {
  useEffect(() => {
    document.documentElement.lang = LOCALE_HTML_LANG[locale];
  }, [locale]);
  return null;
}
