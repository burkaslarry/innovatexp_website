"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  Backdrop,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  ThemeProvider,
} from "@mui/material";
import ChatIcon from "@mui/icons-material/Chat";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { getLocaleFromPathname, localeUsesChineseCopy, withLocale } from "@/lib/i18n-routing";
import { useInnovateXpM3Theme } from "@/components/questionnaires/useInnovateXpM3Theme";
import { buildWhatsAppHref } from "@/lib/whatsapp-contact";

const defaultWhatsAppMessage =
  "你好！我喺 InnovateXP 網站睇到，想了解點樣將 WhatsApp inquiry / 活動 lead 變成可跟進 pipeline。";

export function FloatingActionMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const zh = localeUsesChineseCopy(locale);
  const [open, setOpen] = useState(false);
  const theme = useInnovateXpM3Theme();

  const whatsappHref = buildWhatsAppHref(defaultWhatsAppMessage);

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
      icon: <ChatIcon />,
      name: zh ? "WhatsApp 聯絡" : "WhatsApp contact",
      href: whatsappHref,
      external: true,
    },
    {
      icon: <CalendarMonthIcon />,
      name: zh ? "預約診斷" : "Book diagnosis",
      href: withLocale(locale, "/bookme"),
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
      <Backdrop open={open} sx={{ zIndex: (t) => t.zIndex.speedDial - 1 }} />
      <SpeedDial
        ariaLabel={zh ? "InnovateXP 快捷聯絡" : "InnovateXP quick actions"}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: (t) => t.zIndex.speedDial,
        }}
        icon={<SpeedDialIcon />}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        FabProps={{
          color: "primary",
          sx: { width: 56, height: 56, color: "#fff" },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => go(action)}
          />
        ))}
      </SpeedDial>
    </ThemeProvider>
  );
}
