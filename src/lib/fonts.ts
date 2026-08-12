import { Geist_Mono, Noto_Sans_HK } from "next/font/google";

/**
 * Single bilingual variable font for the entire site.
 * Noto Sans HK includes matching Latin and numeral glyphs, so mixed-script
 * lines (Chinese + English + numbers like HK$499) render as one family.
 * Variable wght 100–900 is available; no fake bolding/synthesis needed.
 */
export const notoSansHk = Noto_Sans_HK({
  variable: "--font-noto-sans-hk",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** Apply the single bilingual font on the document root. */
export const rootFontClassName = [
  notoSansHk.variable,
  geistMono.variable,
  "antialiased",
].join(" ");

/**
 * Single stack for CSS, MUI, and inline styles.
 * Noto Sans HK is self-hosted by next/font, so Chrome/Safari/Edge/Opera all
 * use the same woff2 file. Native faces are only a fallback while loading.
 */
export const FONT_STACK =
  'var(--font-noto-sans-hk), system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif';
