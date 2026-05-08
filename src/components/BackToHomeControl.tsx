"use client";

import Link from "next/link";
import { useLanguage } from "@/app/LanguageContext";
import { useLocalizedHref } from "@/hooks/useLocalizedHref";

/** Top-of-page affordance linking to locale home (aligned with booking header UX). */
export function BackToHomeControl() {
  const { t } = useLanguage();
  const loc = useLocalizedHref();
  return (
    <div className="mb-6">
      <Link
        href={loc("/")}
        className="inline-flex min-h-[44px] items-center rounded-full bg-slate-200 px-4 py-2 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-300 active:scale-[0.98] dark:bg-slate-700 dark:text-slate-100 dark:hover:bg-slate-600"
      >
        {t("bookme.header.back")}
      </Link>
    </div>
  );
}
