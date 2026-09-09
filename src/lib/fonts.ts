import {
  Bodoni_Moda,
  Geist_Mono,
  Inter,
  Noto_Sans_HK,
  Noto_Sans_TC,
  Noto_Serif_TC,
  Shippori_Mincho,
} from "next/font/google";

/**
 * Locale-specific font pairing.
 * EN  : Bodoni Moda (headings) + Inter (body)
 * ZH  : Noto Serif TC (headings) + Noto Sans TC (body)
 * JA  : Shippori Mincho (headings) + Noto Sans TC (body)
 * Fallback for all: Noto Sans HK (already covers Latin + CJK).
 */

// --- English ---
export const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
  display: "swap",
});

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

// --- Chinese ---
export const notoSerifTC = Noto_Serif_TC({
  variable: "--font-noto-serif-tc",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
  display: "swap",
  preload: false,
});

export const notoSansTC = Noto_Sans_TC({
  variable: "--font-noto-sans-tc",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  display: "swap",
  preload: false,
});

// --- Japanese ---
export const shipporiMincho = Shippori_Mincho({
  variable: "--font-shippori-mincho",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
  preload: false,
});

// --- Existing bilingual fallback + mono ---
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

/** All font CSS variables applied on the document root. */
export const rootFontClassName = [
  bodoniModa.variable,
  inter.variable,
  notoSerifTC.variable,
  notoSansTC.variable,
  shipporiMincho.variable,
  notoSansHk.variable,
  geistMono.variable,
  "antialiased",
].join(" ");

/**
 * Single stack for CSS, MUI, and inline styles (fallback).
 * Locale-specific heading/body stacks are defined in globals.css via [data-locale].
 */
export const FONT_STACK =
  'var(--font-noto-sans-hk), system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif';
