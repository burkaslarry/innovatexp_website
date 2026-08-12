"use client";

import { ShoppingCart } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { useInquiryCart } from "@/context/InquiryCartContext";
import {
  catalogTitle,
  getInquiryCatalogItem,
  type InquiryCatalogItemId,
} from "@/content/inquiry-catalog";
import { uiStrings } from "@/content/ui-strings";

export function AddToInquiryButton({
  itemId,
  fullWidth = true,
  size = "medium",
}: {
  itemId: InquiryCatalogItemId;
  fullWidth?: boolean;
  size?: "small" | "medium" | "large";
}) {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const zh = localeUsesChineseCopy(locale);
  const ui = uiStrings(locale);
  const { addItem } = useInquiryCart();
  const catalog = getInquiryCatalogItem(itemId);

  if (!catalog) return null;

  const sizeClass =
    size === "small" ? "min-h-[40px] px-4 text-sm" : size === "large" ? "min-h-[52px] px-8 text-base" : "min-h-[44px] px-6 text-sm";

  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 btn-brand font-bold shadow-none transition hover:brightness-105 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 ${sizeClass} ${fullWidth ? "w-full" : ""}`}
      onClick={() =>
        addItem(itemId, {
          title: catalogTitle(catalog, zh),
          amountHkd: catalog.hidePublicPrice ? 0 : catalog.amountHkd,
        })
      }
    >
      <ShoppingCart className="h-4 w-4 shrink-0" aria-hidden />
      {ui.inquiry.addLabel}
    </button>
  );
}
