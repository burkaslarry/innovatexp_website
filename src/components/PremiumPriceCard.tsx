"use client";

import { motion } from "framer-motion";
import { Lightbulb, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface PremiumPriceCardProps {
  badge: string;
  name: string;
  price: string;
  period: string;
  subtitle?: string;
  target?: string;
  featureLines: string[];
  callout?: string;
  ctaHref: string;
  ctaLabel: string;
}

/**
 * Highlighted tier: gradient panel, gold border, badge, optional "why choose" callout.
 */
export function PremiumPriceCard({
  badge,
  name,
  price,
  period,
  subtitle,
  target,
  featureLines,
  callout,
  ctaHref,
  ctaLabel,
}: PremiumPriceCardProps) {
  return (
    <motion.div
      className="h-full w-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div
        className="flex h-full flex-col rounded-2xl p-[2px] shadow-xl"
        style={{
          background: "linear-gradient(135deg, #00B9B3, #1242de, #0f766e)",
        }}
      >
        <div className="relative flex min-h-0 flex-1 flex-col rounded-[14px] bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 px-6 pb-8 pt-10 dark:from-slate-900 dark:via-slate-950">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-amber-400 px-4 py-1 text-sm font-bold text-slate-900 shadow-md">
            {badge}
          </div>
          <h3 className="mt-2 text-2xl font-bold text-white">{name}</h3>
          <div className="mt-2">
            <span className="text-3xl font-bold text-white">{price}</span>
            <span className="text-white/90">{period}</span>
          </div>
          {subtitle ? (
            <p className="mt-1 text-sm text-amber-200/90">{subtitle}</p>
          ) : null}
          {target ? <p className="mt-2 text-sm text-slate-300">{target}</p> : null}

          <ul className="mt-5 flex flex-1 flex-col gap-2">
            {featureLines.map((line, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-white/95"
              >
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-amber-300" aria-hidden />
                <span>{line}</span>
              </li>
            ))}
          </ul>

          <div className="mt-auto shrink-0 space-y-5 pt-6">
            {callout ? (
              <div className="rounded-xl border border-brand-primary/50 bg-brand-cream-warm/95 p-3 dark:bg-amber-50/10">
                <p className="flex gap-2 text-xs font-medium leading-relaxed text-amber-900 dark:text-amber-100">
                  <Lightbulb className="h-4 w-4 shrink-0 text-brand-primary dark:text-teal-300" aria-hidden />
                  {callout}
                </p>
              </div>
            ) : null}

            <div className="flex w-full justify-center">
              <Button href={ctaHref} variant="primary" className="w-full max-w-full touch-manipulation">
                {ctaLabel}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
