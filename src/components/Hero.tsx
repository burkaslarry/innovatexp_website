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
      className="hero-section mb-16 rounded-2xl border border-slate-100 bg-surface p-8 shadow-card dark:border-slate-700 md:p-12 lg:p-14"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1fr_minmax(0,420px)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          <h1
            className="hero-heading-gradient mx-auto max-w-[680px] text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-5xl lg:mx-0"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>
          {tagline?.trim() ? (
            <p
              className="mx-auto mt-4 max-w-[680px] text-base font-semibold leading-snug text-brand-primary dark:text-[color:var(--primary-hover)] sm:text-lg lg:mx-0"
              style={{ textWrap: "pretty" }}
              title={tagline}
            >
              {tagline}
            </p>
          ) : null}
          {description?.trim() ? (
            <p
              className="mx-auto mt-6 max-w-[680px] text-base leading-relaxed text-slate-600 dark:text-slate-300 sm:text-lg lg:mx-0"
              style={{ textWrap: "pretty" }}
              title={description}
            >
              {description}
            </p>
          ) : null}
          {trustBadges.length > 0 ? (
            <ul className="mx-auto mt-6 flex max-w-[680px] flex-wrap justify-center gap-2 text-sm font-semibold text-slate-700 dark:text-slate-200 lg:mx-0 lg:justify-start">
              {trustBadges.map((badge) => (
                <li key={badge} className="rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm dark:border-slate-600 dark:bg-slate-800">
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
          {bottomTagline?.trim() ? (
            <p className="mx-auto mt-5 max-w-[680px] text-lg font-semibold text-oxford dark:text-[color:var(--primary-hover)] lg:mx-0">
              {bottomTagline}
            </p>
          ) : null}
          <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center lg:justify-start">
            {onPrimaryClick && primaryHref.startsWith("#") ? (
              <a
                href={primaryHref}
                onClick={onPrimaryClick}
                className="btn group inline-flex min-h-[48px] touch-manipulation items-center justify-center gap-2 rounded-full px-3 py-2 text-base font-semibold shadow-card transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:brightness-105 active:scale-[0.98] active:translate-y-px sm:min-w-[200px]"
              >
                {primaryLabel}
              </a>
            ) : (
              <Button
                href={primaryHref}
                variant="primary"
                className="min-h-[48px] touch-manipulation px-8 sm:min-w-[200px]"
              >
                {primaryLabel}
              </Button>
            )}
            <a
              href={secondaryHref}
              onClick={onSecondaryClick}
              className="inline-flex min-h-[48px] items-center justify-center rounded-full border border-slate-300/90 bg-transparent px-8 py-2 text-sm font-semibold text-slate-800 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)] hover:border-brand-accent-teal/60 hover:bg-brand-accent-teal/5 active:scale-[0.98] active:translate-y-px dark:border-slate-500 dark:text-slate-100 dark:hover:border-brand-primary/50 dark:hover:bg-brand-accent-teal/10"
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
