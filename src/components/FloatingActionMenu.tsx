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
import LanguageIcon from "@mui/icons-material/Language";
import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import HubIcon from "@mui/icons-material/Hub";
import EventAvailableIcon from "@mui/icons-material/EventAvailable";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { getLocaleFromPathname, localeUsesChineseCopy, withLocale } from "@/lib/i18n-routing";
import { innovateXpM3Theme } from "@/lib/m3-theme";

const defaultWhatsAppMessage =
  "你好！我喺 InnovateXP 網站睇到，想了解點樣將 WhatsApp inquiry / 活動 lead 變成可跟進 pipeline。";

export function FloatingActionMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const locale = getLocaleFromPathname(pathname);
  const zh = localeUsesChineseCopy(locale);
  const [open, setOpen] = useState(false);

  const rawNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/[^\d]/g, "");
  const whatsappHref = rawNumber
    ? `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultWhatsAppMessage)}`
    : withLocale(locale, "/bookme");

  const actions: { icon: React.ReactNode; name: string; href: string; external?: boolean }[] = [
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
    {
      icon: <CalendarMonthIcon />,
      name: zh ? "預約診斷" : "Book diagnosis",
      href: withLocale(locale, "/bookme"),
    },
    {
      icon: <LanguageIcon />,
      name: zh ? "客製網站" : "Custom website",
      href: withLocale(locale, "/pitch-decks"),
    },
    {
      icon: <ReceiptLongIcon />,
      name: "Accounting Chatbot",
      href: withLocale(locale, "/#accounting-tools-demo"),
    },
    {
      icon: <HubIcon />,
      name: "SmartSales CRM",
      href: withLocale(locale, "/smartsales-crm"),
    },
    {
      icon: <EventAvailableIcon />,
      name: "EventXP",
      href: withLocale(locale, "/eventxp"),
    },
    {
      icon: <RateReviewIcon />,
      name: zh ? "服務後 Feedback" : "Service feedback",
      href: withLocale(locale, "/ai-feedback-questionnaire"),
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
    <ThemeProvider theme={innovateXpM3Theme}>
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
          sx: { width: 56, height: 56 },
        }}
      >
        {actions.map((action) => (
          <SpeedDialAction
            key={action.name}
            icon={action.icon}
            tooltipTitle={action.name}
            tooltipOpen
            onClick={() => go(action.href, action.external)}
          />
        ))}
      </SpeedDial>
    </ThemeProvider>
  );
}
