"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CalendarClock } from "lucide-react";
import { usePathname } from "next/navigation";
import { getLocaleFromPathname, withLocale } from "@/lib/i18n-routing";
import { uiStrings } from "@/content/ui-strings";

export function DesktopScrollCta() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = uiStrings(locale);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="pointer-events-none fixed bottom-6 left-0 right-0 z-30 hidden justify-center px-4 md:flex"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <Link
        href={withLocale(locale, "/bookme")}
        className="pointer-events-auto inline-flex min-h-[52px] items-center gap-2 btn-brand px-8 py-3 text-base font-bold shadow-none transition hover:brightness-105 active:scale-[0.98]"
      >
        <CalendarClock className="h-5 w-5" aria-hidden />
        {ui.desktopCta.book}
      </Link>
    </div>
  );
}
