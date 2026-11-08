"use client";

import { usePathname } from "next/navigation";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { CART_OFFERS } from "@/content/commerce-cart";
import { CART_COPY } from "@/content/cart-copy";
import type { OfferId } from "@/content/commerce";
import type { InquiryCatalogItemId } from "@/content/inquiry-catalog";
import { getLocaleFromPathname } from "@/lib/i18n-routing";

export function AddApprovedToCart({ offer, invitation }: { offer: OfferId; invitation: string }) {
  const { addItem } = useInquiryCart();
  const locale = getLocaleFromPathname(usePathname());
  const id = Object.entries(CART_OFFERS).find(([, value]) => value === offer)?.[0] as InquiryCatalogItemId | undefined;
  if (!id) return null;
  return <button type="button" onClick={() => addItem(id, { invitation })} className="mt-6 inline-flex min-h-11 items-center border border-[#8b6b43] px-5 py-3 font-semibold">{CART_COPY[locale].approvedAdd}</button>;
}
