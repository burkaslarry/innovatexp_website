import type { OfferId } from "@/content/commerce";
import { getInquiryCatalogItem, type InquiryCatalogItemId } from "@/content/inquiry-catalog";
import type { AppLocale } from "@/lib/i18n-routing";
import type { PaymentState } from "@/lib/commerce/state";

/** Only these public catalogue entries can resolve to existing, approved offers. */
export const CART_OFFERS = {
  aiReadinessAssessment: "snapshot",
  aiDiscoverySprint: "discovery",
  discoverySprint30Day: "discovery",
  accountXpExperience: "accountXp",
  eventXpTrial: "eventXp",
  systemCareEssential: "systemCareEssential",
  systemCareGrowth: "systemCareGrowth",
  systemCarePriority: "systemCarePriority",
} as const satisfies Partial<Record<InquiryCatalogItemId, OfferId>>;

export const MAX_CART_ITEMS = 8;
export function getCartOffer(id: unknown): OfferId | null {
  if (typeof id !== "string" || !Object.prototype.hasOwnProperty.call(CART_OFFERS, id)) return null;
  const item = getInquiryCatalogItem(id);
  if (!item || item.hidePublicPrice) return null;
  return CART_OFFERS[id as keyof typeof CART_OFFERS];
}

export type CartCheckoutItem = { id: InquiryCatalogItemId; qty: 1; invitation?: string };
export type CartCheckoutRequest = {
  items: CartCheckoutItem[]; email: string; locale: AppLocale; requestId: string;
  policyVersion: string; acceptTerms: true;
};
export type CartAvailability = { availableOffers: OfferId[] };
export type CartStatus = {
  status: PaymentState; requestId: string;
  items: { offer: OfferId; status: PaymentState; intakeUrl?: string }[];
};
