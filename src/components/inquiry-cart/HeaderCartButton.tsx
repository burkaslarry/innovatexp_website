"use client";

import { ShoppingCart } from "lucide-react";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { getLocaleFromPathname } from "@/lib/i18n-routing";
import { uiStrings } from "@/content/ui-strings";
import { usePathname } from "next/navigation";

export function HeaderCartButton() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = uiStrings(locale);
  const { itemCount, setDrawerOpen } = useInquiryCart();

  const ariaLabel = itemCount > 0 ? ui.mobileBar.cartAria(itemCount) : ui.cart.emptyAria;

  return (
    <button
      type="button"
      onClick={() => setDrawerOpen(true)}
      className={`relative flex h-10 w-10 items-center justify-center rounded-full border transition active:scale-95 ${
        itemCount > 0
          ? "border-brand-primary/40 bg-surface-secondary text-brand-primary hover:bg-surface"
          : "border-[color:var(--border-light)] bg-surface-secondary text-[color:var(--text-tertiary)] hover:border-brand-primary/30 hover:text-brand-primary"
      }`}
      aria-label={ariaLabel}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      {itemCount > 0 ? (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center btn-brand px-0.5 text-[10px] font-bold leading-none ">
          {itemCount > 9 ? "9+" : itemCount}
        </span>
      ) : null}
    </button>
  );
}
