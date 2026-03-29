"use client";

import { CalendarDays, LineChart, Bot } from "lucide-react";

export interface ProductEntryItem {
  href: string;
  title: string;
  blurb: string;
  cta: string;
  icon: "event" | "crm" | "ai";
}

const iconMap = {
  event: CalendarDays,
  crm: LineChart,
  ai: Bot,
} as const;

export function ProductEntryGrid({
  id,
  items,
}: {
  id?: string;
  items: ProductEntryItem[];
}) {
  return (
    <section
      id={id}
      className="mb-16 scroll-mt-[var(--header-offset,180px)]"
      aria-label="Products"
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((item) => {
          const Icon = iconMap[item.icon];
          return (
            <a
              key={item.href}
              href={item.href}
              className="group flex h-full flex-col rounded-2xl border-2 border-slate-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-oxford/40 hover:shadow-md dark:border-slate-600 dark:bg-slate-800/80 dark:hover:border-oxford-light/50"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford transition-colors group-hover:bg-oxford/20 dark:bg-oxford-light/15 dark:text-teal-300">
                <Icon className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="text-xl font-bold text-oxford dark:text-white">{item.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                {item.blurb}
              </p>
              <span className="mt-5 inline-flex items-center text-sm font-semibold text-oxford group-hover:underline dark:text-teal-300">
                {item.cta}
              </span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
