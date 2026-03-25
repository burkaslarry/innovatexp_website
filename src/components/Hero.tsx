"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";

export interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryLabel: string;
  /** Use with #contact-us in-page scroll */
  onSecondaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  secondaryHref?: string;
}

export function Hero({
  title,
  tagline,
  description,
  primaryHref,
  primaryLabel,
  secondaryLabel,
  onSecondaryClick,
  secondaryHref = "#contact-us",
}: HeroProps) {
  return (
    <motion.section
      role="banner"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-brand-cream/40 p-10 shadow-card dark:border-slate-700 dark:from-slate-900 dark:to-slate-900/90 md:p-14"
    >
      <div className="mx-auto max-w-4xl text-center">
        <h1 className="font-sans text-4xl font-bold leading-tight tracking-tight text-slate-900 dark:text-white md:text-5xl">
          {title}
        </h1>
        <p className="mt-5 text-2xl font-bold text-brand-primary dark:text-brand-primary">
          {tagline}
        </p>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-300">
          {description}
        </p>
        <motion.div
          className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <Button href={primaryHref} variant="primary" className="touch-manipulation">
            {primaryLabel}
          </Button>
          <a
            href={secondaryHref}
            onClick={onSecondaryClick}
            className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-3 text-base font-bold text-slate-900 shadow-sm transition-all duration-300 hover:border-brand-primary/50 hover:shadow-md active:scale-[0.98] dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:hover:bg-slate-800"
          >
            {secondaryLabel}
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}
