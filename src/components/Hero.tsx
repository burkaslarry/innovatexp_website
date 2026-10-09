import type { MouseEvent, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export interface HeroProps {
  eyebrow?: string;
  title: string;
  tagline?: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  /** Fired on primary CTA click (smooth-scroll and/or conversion tracking). */
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

function HeroTitle({ title }: { title: string }) {
  const marker = "AI 商業顧問";
  const at = title.indexOf(marker);
  if (at > 0) {
    return (
      <>
        {title.slice(0, at).trim()}
        <br />
        {marker}
      </>
    );
  }
  return title;
}

const primaryBtnClass =
  "btn-brand inline-flex min-h-[48px] items-center justify-center px-6 py-3 text-base font-semibold shadow-card transition hover:-translate-y-px hover:shadow-card-hover";

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
  const isExternalPrimary = /^https?:\/\//i.test(primaryHref);
  const isHashPrimary = primaryHref.startsWith("#");

  return (
    <section role="banner" className="hero-stage mb-14 md:mb-20">
      <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(260px,0.8fr)] lg:gap-16">
        <div className="hero-copy min-w-0 text-left">
          {eyebrow ? (
            <p className="mb-5 text-[0.78rem] font-medium uppercase tracking-[0.16em] text-[color:var(--secondary-color)]">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="max-w-[16em] font-[family-name:var(--font-heading)] text-[clamp(2.35rem,5.4vw,4.6rem)] font-semibold leading-[1.08] tracking-[-0.03em] text-[color:var(--heading-foreground)]">
            <HeroTitle title={title} />
          </h1>
          {tagline?.trim() ? (
            <p
              className="mt-4 max-w-[36rem] text-lg font-semibold leading-snug text-[color:var(--secondary-color)]"
              style={{ textWrap: "pretty" }}
            >
              {tagline}
            </p>
          ) : null}
          {description?.trim() ? (
            <p
              data-geo-answer=""
              className="mt-6 max-w-[38rem] text-base leading-8 text-[color:var(--text-secondary)] md:text-lg"
              style={{ textWrap: "pretty" }}
            >
              {description}
            </p>
          ) : null}
          {fitAudience?.trim() ? (
            <p className="mt-4 max-w-[38rem] text-sm font-semibold leading-7 text-[color:var(--heading-foreground)]">
              {fitAudience}
            </p>
          ) : null}
          <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-start">
            {isHashPrimary || isExternalPrimary ? (
              <a
                href={primaryHref}
                onClick={onPrimaryClick}
                className={primaryBtnClass}
                data-cta="book-diagnosis"
                data-cta-placement="hero"
              >
                {primaryLabel}
              </a>
            ) : (
              <Link
                href={primaryHref}
                onClick={onPrimaryClick}
                className={primaryBtnClass}
                data-cta="book-diagnosis"
                data-cta-placement="hero"
              >
                {primaryLabel}
              </Link>
            )}
            {secondaryLabel?.trim() ? (
              <a
                href={secondaryHref}
                onClick={onSecondaryClick}
                className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] px-1 py-3 text-base font-semibold text-[color:var(--secondary-color)] underline decoration-[color:var(--border-medium)] decoration-2 underline-offset-[10px] transition hover:text-[color:var(--brand-primary)]"
              >
                {secondaryLabel}
              </a>
            ) : null}
          </div>
          {trustBadges.length > 0 ? (
            <ul className="mt-8 flex max-w-[40rem] flex-col gap-2 border-t border-[color:var(--border-light)] pt-5 text-sm leading-6 text-[color:var(--text-primary)]">
              {trustBadges.map((badge) => (
                <li key={badge}>{badge}</li>
              ))}
            </ul>
          ) : null}
        </div>
        <div className="hero-portrait relative mx-auto w-full max-w-[440px] lg:mx-0 lg:justify-self-end">
          {visual ? (
            visual
          ) : imageSrc ? (
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2px]">
              <Image
                src={imageSrc}
                alt={imageAlt || ""}
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 420px"
                priority
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
