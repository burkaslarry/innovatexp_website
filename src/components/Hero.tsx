import type { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/Button";

export interface HeroProps {
  eyebrow?: string;
  title: string;
  tagline?: string;
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
  fitAudience?: string;
  imageSrc?: string;
  imageAlt?: string;
  visual?: ReactNode;
}

export function Hero({
  eyebrow,
  title,
  tagline,
  description,
  primaryHref,
  primaryLabel,
  onPrimaryClick,
  secondaryLabel,
  onSecondaryClick,
  secondaryHref = "#workflow-diagnosis",
  trustBadges = [],
  fitAudience,
  imageSrc,
  imageAlt,
  visual,
}: HeroProps) {
  return (
    <section role="banner" className="ixp-card mb-12 p-6 sm:p-8 md:mb-16 md:p-10 lg:p-12">
      <div className="mx-auto grid max-w-6xl items-center gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-14">
        <div className="min-w-0 text-center lg:text-left">
          {eyebrow ? (
            <p className="mb-4 text-sm font-semibold tracking-[0.06em] text-[color:var(--secondary-color)]">
              {eyebrow}
            </p>
          ) : null}
          <h1
            className="mx-auto max-w-[14ch] text-[clamp(2rem,7vw,3.75rem)] font-bold leading-[1.12] tracking-[-0.025em] text-[color:var(--heading-foreground)] lg:mx-0"
            style={{ textWrap: "balance" }}
          >
            {title}
          </h1>
          {tagline?.trim() ? (
            <p
              className="mx-auto mt-4 max-w-[36rem] text-lg font-semibold leading-snug text-[color:var(--secondary-color)] lg:mx-0"
              style={{ textWrap: "pretty" }}
            >
              {tagline}
            </p>
          ) : null}
          {description?.trim() ? (
            <p
              className="mx-auto mt-6 max-w-[42rem] text-base leading-8 text-[color:var(--text-secondary)] md:text-lg lg:mx-0"
              style={{ textWrap: "pretty" }}
            >
              {description}
            </p>
          ) : null}
          {fitAudience?.trim() ? (
            <p className="mx-auto mt-4 max-w-[42rem] text-sm font-semibold leading-7 text-[color:var(--heading-foreground)] lg:mx-0">
              {fitAudience}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            {onPrimaryClick && primaryHref.startsWith("#") ? (
              <a
                href={primaryHref}
                onClick={onPrimaryClick}
                className="btn-brand inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-base font-semibold shadow-card transition hover:-translate-y-px hover:shadow-card-hover"
              >
                {primaryLabel}
              </a>
            ) : (
              <Button href={primaryHref} variant="primary" className="px-6">
                {primaryLabel}
              </Button>
            )}
            <a
              href={secondaryHref}
              onClick={onSecondaryClick}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] px-1 py-3 text-base font-semibold text-[color:var(--secondary-color)] underline decoration-[color:var(--border-medium)] decoration-2 underline-offset-[10px] transition hover:text-[color:var(--brand-primary)]"
            >
              {secondaryLabel}
            </a>
          </div>
          {trustBadges.length > 0 ? (
            <ul className="mx-auto mt-6 grid max-w-[42rem] gap-3 text-sm font-medium text-[color:var(--text-primary)] sm:grid-cols-3 lg:mx-0">
              {trustBadges.map((badge) => (
                <li key={badge} className="rounded-[var(--radius-md)] border border-[color:var(--border-light)] bg-[color:var(--bg-elevated)] px-4 py-3">
                  {badge}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {imageSrc ? (
          <div className="mx-auto w-full max-w-md overflow-hidden rounded-[var(--radius-md)] border border-[color:var(--border-light)] shadow-card lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <Image
                src={imageSrc}
                alt={imageAlt ?? ""}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
            </div>
          </div>
        ) : visual ? (
          <div className="w-full">{visual}</div>
        ) : null}
      </div>
    </section>
  );
}
