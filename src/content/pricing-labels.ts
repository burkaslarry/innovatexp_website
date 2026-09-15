/** Locales that expose public pricing copy. Kept here to avoid circular imports with pricing.ts. */
export type PricingLabelLocale = "en" | "zh-hk" | "zh-tw" | "ja" | "de";

/** Public copy when consulting program price is not a fixed HKD list price. */
export const SCOPED_SOP_PRICE_LABEL: Record<PricingLabelLocale, string> = {
  en: "Quoted after diagnosis by workflow complexity",
  "zh-hk": "按流程複雜程度報價，聽診後提供",
  "zh-tw": "按流程複雜程度報價，聽診後提供",
  ja: "フローの複雑さに応じて診断後に見積",
  de: "Honorar nach Diagnose nach Workflow-Komplexität",
};
