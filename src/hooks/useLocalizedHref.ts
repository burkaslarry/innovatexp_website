"use client";

import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";

/** Prefix a site path with the current URL locale (e.g. /bookme → /zh-hk/bookme). */
export function useLocalizedHref() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  return (path: string) => withLocale(locale, path);
}
