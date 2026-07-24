"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Badge,
  Backdrop,
  Fab,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
  Zoom,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getLocaleFromPathname, localeUsesChineseCopy, withLocale } from "@/lib/i18n-routing";
import { useInnovateXpM3Theme } from "@/components/questionnaires/useInnovateXpM3Theme";
import { useInquiryCart } from "@/context/InquiryCartContext";

const defaultWhatsAppMessage =
  "你好！我喺 InnovateXP 網站睇到，想了解點樣將 WhatsApp inquiry / 活動 lead 變成可跟進 pipeline。";

const fabSx = {
  position: "fixed" as const,
  bottom: { xs: 88, md: 28 },
  right: 24,
  zIndex: (t: { zIndex: { speedDial: number } }) => t.zIndex.speedDial,
  width: 56,
  height: 56,
  color: "#fff",
  boxShadow: "var(--shadow-fab)",
};

/**
 * Single floating action cluster:
 * - Cart has items → primary cart FAB opens inquiry drawer
 * - Empty → M3 Speed Dial (Book / WhatsApp / Questionnaire)
 */
export function PrimaryFabCluster() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const zh = localeUsesChineseCopy(locale);
  const [open, setOpen] = useState(false);
  const theme = useInnovateXpM3Theme();
  const { itemCount, setDrawerOpen } = useInquiryCart();

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  const whatsappHref = rawNumber
    ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultWhatsAppMessage)}`
    : withLocale(locale, "/bookme");

  const actions: { icon: React.ReactNode; name: string; href: string; external?: boolean }[] = [
    {
      icon: <CalendarMonthIcon />,
      name: zh ? "預約診斷" : "Book diagnosis",
      href: withLocale(locale, "/bookme"),
    },
    {
      icon: <ChatIcon />,
      name: zh ? "WhatsApp 聯絡" : "WhatsApp contact",
      href: whatsappHref,
      external: Boolean(rawNumber),
    },
    {
      icon: <AssignmentIcon />,
      name: zh ? "填諮詢問卷" : "Consultation questionnaire",
      href: withLocale(locale, "/ai-consultation-questionnaire"),
    },
  ];

  const go = (href: string, external?: boolean) => {
    setOpen(false);
    if (external) {
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(href);
  };

  return (
    <ThemeProvider theme={theme}>
      {itemCount > 0 ? (
        <Zoom in>
          <Fab
            color="primary"
            aria-label={zh ? `開啟查詢購物車，${itemCount} 項` : `Open inquiry cart, ${itemCount} items`}
            onClick={() => setDrawerOpen(true)}
            sx={fabSx}
          >
            <Badge badgeContent={itemCount} color="secondary" max={9} overlap="circular">
              <ShoppingCartIcon />
            </Badge>
          </Fab>
        </Zoom>
      ) : (
        <>
          <Backdrop open={open} sx={{ zIndex: (t) => t.zIndex.speedDial - 1 }} />
          <SpeedDial
            ariaLabel={zh ? "快捷操作" : "Quick actions"}
            sx={{
              position: "fixed",
              bottom: { xs: 88, md: 28 },
              right: 24,
              zIndex: (t) => t.zIndex.speedDial,
            }}
            icon={<SpeedDialIcon />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            FabProps={{
              color: "primary",
              sx: { width: 56, height: 56, color: "#fff", boxShadow: "var(--shadow-fab)" },
              "aria-label": zh ? "開啟快捷選單" : "Open quick actions",
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen={false}
                FabProps={{
                  sx: { minWidth: 44, minHeight: 44 },
                  "aria-label": action.name,
                }}
                onClick={() => go(action.href, action.external)}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </ThemeProvider>
  );
}
