import { Geist, Geist_Mono, Noto_Sans_TC } from "next/font/google";

/** Latin UI face — loaded via next/font for consistent metrics across browsers. */
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/** CJK fallback shipped as webfont so Windows / Linux match macOS rendering. */
export const notoSansCjk = Noto_Sans_TC({
  variable: "--font-noto-cjk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

/** Apply on `<body>`: CSS variables + default Latin family class. */
export const rootFontClassName = [
  geistSans.variable,
  geistMono.variable,
  notoSansCjk.variable,
  geistSans.className,
  "antialiased",
  "font-sans",
].join(" ");

/**
 * Single stack for CSS, MUI, and inline styles.
 * Geist + Noto first; local system faces only as last resort.
 */
export const FONT_STACK =
  "var(--font-geist-sans), var(--font-noto-cjk), PingFang HK, PingFang TC, Hiragino Sans GB, Microsoft JhengHei, sans-serif";
