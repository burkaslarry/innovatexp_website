/** Locales that expose public pricing copy. Kept here to avoid circular imports with pricing.ts. */
export type PricingLabelLocale = "en" | "zh-hk" | "zh-tw" | "ja" | "de";

/** Public copy when program price depends on SOP complexity (not a fixed HKD list price). */
export const SCOPED_SOP_PRICE_LABEL: Record<PricingLabelLocale, string> = {
  en: "Quoted based on SOP complexity",
  "zh-hk": "視 SOP 複雜程度決定",
  "zh-tw": "視 SOP 複雜程度決定",
  ja: "SOPの複雑さに応じて見積",
  de: "Je nach SOP-Komplexität",
};
