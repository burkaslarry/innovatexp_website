"use client";

import { Button } from "@mui/material";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { useInquiryCart } from "@/context/InquiryCartContext";
import {
  catalogTitle,
  getInquiryCatalogItem,
  type InquiryCatalogItemId,
} from "@/content/inquiry-catalog";

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
  const { addItem } = useInquiryCart();
  const catalog = getInquiryCatalogItem(itemId);

  if (!catalog) return null;

  return (
    <Button
      variant="contained"
      color="primary"
      size={size}
      fullWidth={fullWidth}
      startIcon={<AddShoppingCartIcon />}
      onClick={() =>
        addItem(itemId, {
          title: catalogTitle(catalog, zh),
          amountHkd: catalog.amountHkd,
        })
      }
      sx={{ fontWeight: 800, minHeight: 44, borderRadius: 999 }}
    >
      {zh ? "加入查詢" : "Add to inquiry"}
    </Button>
  );
}
