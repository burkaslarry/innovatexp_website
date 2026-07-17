export const LOCALES = ["en", "zh-hk", "zh-tw", "ja", "de"] as const;
export type AppLocale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: AppLocale = "zh-hk";

export function isValidLocale(s: string): s is AppLocale {
  return (LOCALES as readonly string[]).includes(s);
}

/** Legacy UI flag: only `zh-hk` uses the Cantonese `translations.zh` bundle; other locales resolve via `t()` + overlays. */
export function localeToLanguage(locale: AppLocale): "en" | "zh" {
  if (locale === "zh-hk") return "zh";
  return "en";
}

export function languageToLocale(lang: "en" | "zh"): AppLocale {
  return lang === "en" ? "en" : DEFAULT_LOCALE;
}

/** Open Graph `locale` meta tag values */
export function localeToOgLocale(locale: AppLocale): string {
  switch (locale) {
    case "en":
      return "en_US";
    case "zh-hk":
      return "zh_HK";
    case "zh-tw":
      return "zh_TW";
    case "ja":
      return "ja_JP";
    case "de":
      return "de_DE";
    default:
      return "zh_HK";
  }
}

export function ogAlternateLocales(locale: AppLocale): string[] {
  return LOCALES.filter((l) => l !== locale).map(localeToOgLocale);
}

/** Layout descriptions fall back sensibly before route-specific metadata overrides. */
export function localeUsesChineseCopy(locale: AppLocale): boolean {
  return locale === "zh-hk" || locale === "zh-tw";
}

/** HTML `lang`, Article `inLanguage`, and similar BCP 47 hints */
export function localeToHtmlLang(locale: AppLocale): string {
  switch (locale) {
    case "en":
      return "en-HK";
    case "zh-hk":
      return "zh-HK";
    case "zh-tw":
      return "zh-TW";
    case "ja":
      return "ja-JP";
    case "de":
      return "de-DE";
    default:
      return "zh-HK";
  }
}

/** pathname e.g. /zh-hk/bookme */
export function getLocaleFromPathname(pathname: string | null): AppLocale {
  if (!pathname) return DEFAULT_LOCALE;
  const seg = pathname.split("/").filter(Boolean)[0];
  if (seg && isValidLocale(seg)) return seg;
  return DEFAULT_LOCALE;
}

/** Strips locale prefix (`/en`, `/zh-hk`, `/zh-tw`, `/ja`, `/de`); returns path starting with `/` */
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
    "zh-TW": `${siteUrl}/zh-tw${suffix}`,
    ja: `${siteUrl}/ja${suffix}`,
    de: `${siteUrl}/de${suffix}`,
    "x-default": `${siteUrl}/${DEFAULT_LOCALE}${suffix}`,
  } as const;
}
