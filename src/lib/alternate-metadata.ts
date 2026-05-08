import type { Metadata } from "next";
import { alternateLanguageUrls, isValidLocale } from "@/lib/i18n-routing";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co";

/** Path without locale prefix, e.g. `/` or `/bookme` */
export function localeAlternates(locale: string, pathWithoutLocale: string): Metadata["alternates"] {
  if (!isValidLocale(locale)) {
    return { canonical: `${siteUrl}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}` };
  }
  const suffix = pathWithoutLocale === "/" ? "" : pathWithoutLocale;
  return {
    canonical: `${siteUrl}/${locale}${suffix}`,
    languages: { ...alternateLanguageUrls(siteUrl, pathWithoutLocale) },
  };
}
