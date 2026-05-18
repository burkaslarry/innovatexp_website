"use client";

import { useEffect } from "react";
import type { AppLocale } from "@/lib/i18n-routing";
import { localeToHtmlLang } from "@/lib/i18n-routing";

export function LocaleHtmlLang({ locale }: { locale: AppLocale }) {
  useEffect(() => {
    document.documentElement.lang = localeToHtmlLang(locale);
  }, [locale]);
  return null;
}
