import {
  Bodoni_Moda,
  Noto_Sans_HK,
  Noto_Serif_TC,
  Shippori_Mincho,
} from "next/font/google";

/**
 * One family for both display and body text in each locale.
 * The HK sans font is the fallback for non-localized routes.
 */

// --- English ---
export const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni-moda",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  style: ["normal", "italic"],
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

/** All font CSS variables applied on the document root. */
export const rootFontClassName = [
  bodoniModa.variable,
  notoSerifTC.variable,
  shipporiMincho.variable,
  notoSansHk.variable,
  "antialiased",
].join(" ");

/**
 * Single stack for CSS, MUI, and inline styles (fallback).
 * Locale-specific heading/body stacks are defined in globals.css via [data-locale].
 */
export const FONT_STACK =
  'var(--font-main), system-ui, "PingFang TC", "Microsoft JhengHei", sans-serif';
