"use client";

import { Award, Building2, Users, Cpu } from "lucide-react";

const ICONS = [Award, Users, Building2, Cpu] as const;

export interface WhyPoint {
  label: string;
  sub: string;
}

export function WhyInnovateXP({ title, points }: { title: string; points: WhyPoint[] }) {
  return (
    <section
      aria-label={title}
      className="mb-14 rounded-2xl border border-slate-200/90 bg-white/80 px-5 py-8 shadow-sm backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/60 md:px-10 md:py-10"
    >
      <h2 className="font-faq-title mb-8 text-center text-2xl font-bold tracking-tight text-oxford dark:text-white md:text-3xl">
        {title}
      </h2>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {points.map((p, i) => {
          const Icon = ICONS[i] ?? Cpu;
          return (
            <li
              key={i}
              className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/80 p-4 dark:border-slate-600 dark:bg-slate-800/50"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-oxford/10 text-oxford dark:bg-oxford-light/20 dark:text-teal-300">
                <Icon className="h-5 w-5" strokeWidth={2} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-oxford dark:text-white">{p.label}</p>
                <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{p.sub}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
