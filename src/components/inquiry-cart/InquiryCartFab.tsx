"use client";

import { Badge, Fab, ThemeProvider, Zoom } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, localeUsesChineseCopy } from "@/lib/i18n-routing";
import { useInnovateXpM3Theme } from "@/components/questionnaires/useInnovateXpM3Theme";
import { useInquiryCart } from "@/context/InquiryCartContext";

export function InquiryCartFab() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const zh = localeUsesChineseCopy(locale);
  const theme = useInnovateXpM3Theme();
  const { itemCount, setDrawerOpen } = useInquiryCart();

  return (
    <ThemeProvider theme={theme}>
      <Zoom in>
        <Fab
          color="primary"
          aria-label={zh ? "查詢購物車" : "Inquiry cart"}
          onClick={() => setDrawerOpen(true)}
          sx={{
            position: "fixed",
            bottom: 24,
            right: 96,
            zIndex: (t) => t.zIndex.speedDial,
            boxShadow: 4,
          }}
        >
          <Badge
            badgeContent={itemCount}
            color="secondary"
            overlap="circular"
            max={9}
            invisible={itemCount === 0}
          >
            <ShoppingCartIcon />
          </Badge>
        </Fab>
      </Zoom>
    </ThemeProvider>
  );
}
