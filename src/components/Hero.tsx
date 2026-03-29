"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface HeroProps {
  title: string;
  tagline: string;
  /** English line under Chinese tagline for international visitors */
  taglineEn?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  /** Ghost CTA e.g. explore services */
  secondaryLabel: string;
  /** Use with #product-pillars or #contact-us */
  onSecondaryClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void;
  secondaryHref?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  title,
  tagline,
  taglineEn,
  description,
  primaryHref,
  primaryLabel,
  secondaryLabel,
  onSecondaryClick,
  secondaryHref = "#contact-us",
  imageSrc = "/mypresent.jpg",
  imageAlt = "",
}: HeroProps) {
  return (
    <motion.section
      role="banner"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="mb-16 rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-brand-cream/40 p-8 shadow-card dark:border-slate-700 dark:from-slate-900 dark:to-slate-900/90 md:p-12 lg:p-14"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight text-oxford dark:text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-xl font-bold text-brand-primary dark:text-[#00D4CF] sm:text-2xl">
            {tagline}
          </p>
          {taglineEn ? (
            <p className="mt-2 text-sm font-medium leading-snug text-slate-500 dark:text-slate-400 sm:text-base">
              {taglineEn}
            </p>
          ) : null}
          <p className="mx-auto mt-6 max-w-xl text-base leading-[1.7] text-slate-600 dark:text-slate-300 lg:mx-0 lg:max-w-lg lg:text-lg">
            {description}
          </p>
          <motion.div
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <Button
              href={primaryHref}
              variant="primary"
              className="min-h-[52px] touch-manipulation px-10 text-base shadow-md sm:min-w-[200px]"
            >
              {primaryLabel}
            </Button>
            <a
              href={secondaryHref}
              onClick={onSecondaryClick}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300/90 bg-transparent px-8 py-3 text-base font-semibold text-slate-800 transition-all hover:border-[#00B9B3]/60 hover:bg-[#00B9B3]/5 active:scale-[0.98] dark:border-slate-500 dark:text-slate-100 dark:hover:border-[#00B9B3]/50 dark:hover:bg-[#00B9B3]/10"
            >
              {secondaryLabel}
            </a>
          </motion.div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-slate-200/80 shadow-lg dark:border-slate-600">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
              priority
            />
          </div>
        </div>
      </div>
    </motion.section>
  );
}
