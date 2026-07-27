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

  if (itemCount <= 0) return null;

  return (
    <button
      type="button"
      onClick={() => setDrawerOpen(true)}
      className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[color:var(--border-light)] bg-surface-secondary text-brand-primary transition hover:border-brand-primary/40 hover:bg-surface active:scale-95"
      aria-label={ui.mobileBar.cartAria(itemCount)}
    >
      <ShoppingCart className="h-5 w-5" aria-hidden />
      <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-brand-primary px-0.5 text-[10px] font-bold leading-none text-white">
        {itemCount > 9 ? "9+" : itemCount}
      </span>
    </button>
  );
}
