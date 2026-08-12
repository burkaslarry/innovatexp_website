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
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { getLocaleFromPathname, localeUsesChineseCopy, withLocale } from "@/lib/i18n-routing";
import { uiStrings } from "@/content/ui-strings";
import { useInnovateXpM3Theme } from "@/components/questionnaires/useInnovateXpM3Theme";
import { useInquiryCart } from "@/context/InquiryCartContext";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";

function whatsappPrefillForLocale(locale: ReturnType<typeof getLocaleFromPathname>) {
  return uiStrings(locale).whatsappPrefill;
}

const fabSx = {
  position: "fixed" as const,
  bottom: 28,
  right: 24,
  zIndex: (t: { zIndex: { speedDial: number } }) => t.zIndex.speedDial,
  width: 56,
  height: 56,
  color: "var(--btn-primary-fg)",
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

  const whatsappHref = buildWhatsAppHref(whatsappPrefillForLocale(locale));

  const scrollToFaq = () => {
    setOpen(false);
    const homePath = withLocale(locale, "/");
    if (pathname !== homePath && pathname !== `${homePath}/`) {
      router.push(`${homePath}#faq`);
      return;
    }
    const el = document.getElementById("faq");
    if (!el) {
      router.push(`${homePath}#faq`);
      return;
    }
    const offset =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue("--header-offset"), 10) || 180;
    window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - offset, behavior: "smooth" });
  };

  const actions: { icon: React.ReactNode; name: string; href?: string; external?: boolean; onClick?: () => void }[] = [
    {
      icon: <CalendarMonthIcon />,
      name: zh ? "預約診斷" : "Book diagnosis",
      href: withLocale(locale, "/bookme"),
    },
    {
      icon: <ChatIcon />,
      name: zh ? "WhatsApp 聯絡" : "WhatsApp contact",
      href: whatsappHref,
      external: true,
    },
    {
      icon: <HelpOutlineIcon />,
      name: zh ? "常見問題" : "FAQ",
      onClick: scrollToFaq,
    },
    {
      icon: <AssignmentIcon />,
      name: zh ? "填諮詢問卷" : "Consultation questionnaire",
      href: withLocale(locale, "/ai-consultation-questionnaire"),
    },
  ];

  const go = (action: (typeof actions)[number]) => {
    setOpen(false);
    if (action.onClick) {
      action.onClick();
      return;
    }
    if (!action.href) return;
    if (action.external) {
      window.open(action.href, "_blank", "noopener,noreferrer");
      return;
    }
    router.push(action.href);
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
              <ShoppingCartIcon sx={{ color: "var(--btn-primary-fg)" }} />
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
              bottom: "calc(24px + env(safe-area-inset-bottom))",
              right: 24,
              zIndex: (t) => t.zIndex.speedDial,
            }}
            icon={<SpeedDialIcon />}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            FabProps={{
              color: "primary",
              sx: { width: 56, height: 56, color: "var(--btn-primary-fg)", boxShadow: "var(--shadow-fab)" },
              "aria-label": zh ? "開啟快捷選單" : "Open quick actions",
            }}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                icon={action.icon}
                tooltipTitle={action.name}
                tooltipOpen
                FabProps={{
                  sx: {
                    minWidth: 48,
                    minHeight: 48,
                    color: "var(--btn-primary-fg)",
                    backgroundImage: "var(--btn-primary-bg)",
                    backgroundColor: "transparent",
                    boxShadow: "var(--shadow-card)",
                    "&:hover": {
                      color: "var(--btn-primary-fg)",
                      backgroundImage: "var(--btn-primary-bg)",
                      backgroundColor: "transparent",
                      filter: "brightness(1.04)",
                    },
                    "& .MuiSvgIcon-root": { color: "inherit" },
                  },
                  "aria-label": action.name,
                }}
                onClick={() => go(action)}
              />
            ))}
          </SpeedDial>
        </>
      )}
    </ThemeProvider>
  );
}
