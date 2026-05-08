export const LOCALES = ["en", "zh-hk"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "zh-hk";

export function isValidLocale(s: string): s is AppLocale {
  return (LOCALES as readonly string[]).includes(s);
}

export function localeToLanguage(locale: AppLocale): "en" | "zh" {
  return locale === "en" ? "en" : "zh";
}

export function languageToLocale(lang: "en" | "zh"): AppLocale {
  return lang === "en" ? "en" : "zh-hk";
}

/** pathname e.g. /zh-hk/bookme */
export function getLocaleFromPathname(pathname: string | null): AppLocale {
  if (!pathname) return DEFAULT_LOCALE;
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && isValidLocale(seg)) return seg;
  return DEFAULT_LOCALE;
}

/** Strips /en or /zh-hk prefix; returns path starting with / */
export function stripLocaleFromPathname(pathname: string): string {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return "/";
  if (isValidLocale(parts[0]!)) {
    const rest = parts.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

/**
 * @param path - site path without locale, e.g. /bookme or /bookme#x or /
 */
export function withLocale(locale: AppLocale, path: string): string {
  const [base, hash] = path.split("#");
  const normalized =
    base === "" || base === "/" ? "" : base.startsWith("/") ? base : `/${base}`;
  const prefix = `/${locale}`;
  const middle = normalized === "/" || normalized === "" ? "" : normalized;
  const full = `${prefix}${middle}`;
  return hash !== undefined && hash !== "" ? `${full}#${hash}` : full;
}

export function alternateLanguageUrls(siteUrl: string, pathnameWithoutLocale: string) {
  const suffix = pathnameWithoutLocale === "/" ? "" : pathnameWithoutLocale;
  return {
    en: `${siteUrl}/en${suffix}`,
    "zh-HK": `${siteUrl}/zh-hk${suffix}`,
    "x-default": `${siteUrl}/${DEFAULT_LOCALE}${suffix}`,
  } as const;
}
