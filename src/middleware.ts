/* F17: Locale prefix & hreflang - Redirect bare paths to default locale; let crawlers see distinct /en vs /zh-hk URLs. */
import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES } from "@/lib/i18n-routing";

const FILE_EXTENSION = /\.(ico|png|jpg|jpeg|svg|webp|gif|txt|xml|pdf|webmanifest)$/i;

function shouldSkipLocale(pathname: string) {
  return (
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    FILE_EXTENSION.test(pathname)
  );
}

function pathnameHasLocale(pathname: string) {
  return LOCALES.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (shouldSkipLocale(pathname)) return NextResponse.next();
  if (pathnameHasLocale(pathname)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${DEFAULT_LOCALE}${pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
