/* F15: Hero section - Animated hero with primary/secondary CTAs and optional trust badges. */
import Image from "next/image";
import type { MouseEvent } from "react";
import { Button } from "@/components/ui/Button";

export interface HeroProps {
  title: string;
  tagline: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  /** When primary targets an in-page anchor, use for smooth scroll with header offset */
  onPrimaryClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  /** Ghost CTA e.g. explore services */
  secondaryLabel: string;
  /** Use with #product-pillars or /bookme#quotation-wizard */
  onSecondaryClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
  secondaryHref?: string;
  trustBadges?: string[];
  bottomTagline?: string;
  imageSrc?: string;
  imageAlt?: string;
}

export function Hero({
  title,
  tagline,
  description,
  primaryHref,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  secondaryHref = "/bookme#quotation-wizard",
  trustBadges = [],
  bottomTagline = "",
  imageSrc = "/mypresent.jpg",
  imageAlt = "",
}: HeroProps) {
  return (
    <section
      role="banner"
      className="mb-16 rounded-3xl border border-slate-100 bg-gradient-to-b from-white to-brand-cream/40 p-8 shadow-card dark:border-slate-700 dark:from-slate-900 dark:to-slate-900/90 md:p-12 lg:p-14"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <h1 className="font-sans text-3xl font-bold leading-tight tracking-tight text-oxford dark:text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {tagline?.trim() ? (
            <p
              className="mt-4 line-clamp-2 text-base font-bold leading-snug text-brand-primary dark:text-teal-300 sm:line-clamp-none sm:text-2xl"
              title={tagline}
            >
              {tagline}
            </p>
          ) : null}
          {description?.trim() ? (
            <p
              className="mx-auto mt-6 line-clamp-3 max-w-xl text-base leading-[1.7] text-slate-600 dark:text-slate-300 sm:line-clamp-none lg:mx-0 lg:max-w-lg lg:text-lg"
              title={description}
            >
              {description}
            </p>
          ) : null}
          {trustBadges.length > 0 ? (
            <ul className="mx-auto mt-6 flex max-w-xl flex-wrap justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 lg:mx-0 lg:justify-start">
              {trustBadges.map((badge) => (
                <li key={badge} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-600 dark:bg-slate-800">
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
          {bottomTagline?.trim() ? (
            <p className="mt-5 text-lg font-bold text-oxford dark:text-teal-300">{bottomTagline}</p>
          ) : null}
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            {onPrimaryClick && primaryHref.startsWith("#") ? (
              <a
                href={primaryHref}
                onClick={onPrimaryClick}
                className="group inline-flex min-h-[52px] touch-manipulation items-center justify-center gap-2 rounded-full border-2 border-slate-900/20 bg-white px-10 text-base font-bold text-slate-900 shadow-md transition-all duration-300 hover:border-black hover:bg-black hover:text-white active:scale-[0.98] dark:border-slate-500 dark:bg-white dark:text-slate-950 dark:hover:border-black dark:hover:bg-black dark:hover:text-white sm:min-w-[200px]"
              >
                {primaryLabel}
              </a>
            ) : (
              <Button
                href={primaryHref}
                variant="ctaLight"
                className="min-h-[52px] touch-manipulation px-10 text-base sm:min-w-[200px]"
              >
                {primaryLabel}
              </Button>
            )}
            <a
              href={secondaryHref}
              onClick={onSecondaryClick}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300/90 bg-transparent px-8 py-3 text-base font-semibold text-slate-800 transition-all hover:border-[#00B9B3]/60 hover:bg-[#00B9B3]/5 active:scale-[0.98] dark:border-slate-500 dark:text-slate-100 dark:hover:border-[#00B9B3]/50 dark:hover:bg-[#00B9B3]/10"
            >
              {secondaryLabel}
            </a>
          </div>
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
    </section>
  );
}
