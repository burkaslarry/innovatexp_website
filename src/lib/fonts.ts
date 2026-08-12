import { Geist_Mono, Noto_Sans_HK, Plus_Jakarta_Sans } from "next/font/google";

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Ship Chinese glyphs with the app so every browser uses the same CJK face. */
export const notoSansHk = Noto_Sans_HK({
  variable: "--font-noto-sans-hk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Apply self-hosted Latin and CJK faces on the document root. */
export const rootFontClassName = [
  plusJakartaSans.variable,
  geistMono.variable,
  notoSansHk.variable,
  "antialiased",
].join(" ");

/**
 * Self-hosted webfonts keep Chrome and Safari aligned. Native sans faces are
 * retained only as a non-serif safety fallback before the font files load.
 */
export const FONT_STACK =
  'var(--font-plus-jakarta-sans), var(--font-noto-sans-hk), system-ui, -apple-system, BlinkMacSystemFont, "PingFang HK", "PingFang TC", "Hiragino Sans GB", "Microsoft JhengHei", "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';
