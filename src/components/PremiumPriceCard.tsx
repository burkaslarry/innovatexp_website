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
      className="relative md:scale-[1.02]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div
        className="rounded-2xl p-[2px] shadow-xl"
        style={{
          background: "linear-gradient(135deg, #EAB308, #E87D3E, #6366f1)",
        }}
      >
        <div className="relative rounded-[14px] bg-gradient-to-b from-violet-900/95 via-indigo-950 to-slate-950 px-6 pb-8 pt-10 dark:from-violet-950 dark:via-indigo-950">
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
          {target ? <p className="mt-2 text-sm text-violet-100">{target}</p> : null}

          <ul className="mt-5 space-y-2">
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

          {callout ? (
            <div className="mt-5 rounded-xl border border-brand-primary/50 bg-brand-cream-warm/95 p-3 dark:bg-amber-50/10">
              <p className="flex gap-2 text-xs font-medium leading-relaxed text-amber-900 dark:text-amber-100">
                <Lightbulb className="h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                {callout}
              </p>
            </div>
          ) : null}

          <Button
            href={ctaHref}
            variant="primary"
            className="mt-6 w-full touch-manipulation"
          >
            {ctaLabel}
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
