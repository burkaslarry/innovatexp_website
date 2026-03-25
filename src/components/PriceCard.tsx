"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

export interface PriceCardProps {
  name: string;
  price: string;
  period: string;
  target?: string;
  features: string[];
  ctaHref: string;
  ctaLabel: string;
  index?: number;
}

export function PriceCard({
  name,
  price,
  period,
  target,
  features,
  ctaHref,
  ctaLabel,
  index = 0,
}: PriceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card className="flex h-full flex-col border-slate-100 transition-shadow hover:shadow-card-hover dark:border-slate-700">
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{name}</h3>
        <div className="mt-2">
          <span className="text-3xl font-bold text-brand-primary">{price}</span>
          <span className="text-slate-500 dark:text-slate-400">{period}</span>
        </div>
        {target ? (
          <p className="mt-3 text-sm font-medium text-violet-600 dark:text-violet-300">
            {target}
          </p>
        ) : null}
        <ul className="mt-6 flex flex-1 flex-col gap-2">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-300">
              <Check
                className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500"
                strokeWidth={2.5}
                aria-hidden
              />
              {f}
            </li>
          ))}
        </ul>
        <Button href={ctaHref} variant="primary" className="mt-8 w-full touch-manipulation">
          {ctaLabel}
        </Button>
      </Card>
    </motion.div>
  );
}
