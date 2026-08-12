'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';
import type { HeaderProps } from './Header';
import { useLocalizedHref } from '@/hooks/useLocalizedHref';
import { HeaderCartButton } from '@/components/inquiry-cart/HeaderCartButton';

const LOGO_ALT = 'InnovateXP Limited - AI CRM and Event Management Solutions Hong Kong';

export default function HeaderClient({
  variant,
  title,
  subtitle,
  navItems = [],
  ctaLabel,
  ctaHref,
}: HeaderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const loc = useLocalizedHref();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const isMain = variant === 'main';
  const isHomepageRoot = Boolean(pathname && /^\/(en|zh-hk|zh-tw|ja|de)$/.test(pathname));
  const showNav = isMain && navItems.length > 0;

  const anchorIds = useMemo(
    () => navItems.filter((item) => item.href.startsWith('#')).map((item) => item.href.slice(1)),
    [navItems],
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const header = document.getElementById('main-header');
    if (!header) return;
    const setOffset = () => {
      document.documentElement.style.setProperty('--header-offset', `${header.offsetHeight + 8}px`);
    };
    setOffset();
    const ro = new ResizeObserver(setOffset);
    ro.observe(header);
    return () => ro.disconnect();
  }, [showNav, mobileMenuOpen]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileMenuOpen(false);
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    const firstFocusable = mobileMenuRef.current?.querySelector<HTMLElement>('a,button');
    firstFocusable?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  useEffect(() => {
    if (!showNav || anchorIds.length === 0) return;
    const observers: IntersectionObserver[] = [];
    const visible = new Map<string, number>();

    anchorIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visible.set(id, entry.intersectionRatio);
            else visible.delete(id);
          });
          let best: string | null = null;
          let bestRatio = 0;
          visible.forEach((ratio, sectionId) => {
            if (ratio > bestRatio) {
              bestRatio = ratio;
              best = sectionId;
            }
          });
          if (best) setActiveHash(`#${best}`);
        },
        { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] },
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [anchorIds, showNav]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.slice(1);
    const offset =
      parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-offset'), 10) || 180;
    if (targetId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  const navLinkClass = (href: string, base = '') => {
    const active = href.startsWith('#') && activeHash === href;
    return `${base} ${active ? 'bg-surface text-brand-primary font-semibold' : ''}`.trim();
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[color:var(--border-light)] bg-surface/95 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      id={isMain ? 'main-header' : undefined}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {variant === 'booking' && (
            <button
              onClick={() => router.push(loc('/'))}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[color:var(--border-light)] bg-surface-secondary transition-colors hover:bg-surface active:scale-95"
              aria-label="Back to home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[color:var(--text-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className={`flex min-w-0 flex-1 items-center gap-3 ${variant === 'booking' ? 'mx-4' : ''}`}>
            {isMain ? (
              <Link href={loc('/')} className="shrink-0 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary">
                <Image
                  src="/innovatexp_black.svg"
                  alt={LOGO_ALT}
                  width={40}
                  height={40}
                  className="dark:invert"
                />
              </Link>
            ) : (
              <Image
                src="/innovatexp_black.svg"
                alt={LOGO_ALT}
                width={40}
                height={40}
                className="shrink-0 dark:invert"
              />
            )}
            {subtitle !== undefined ? (
              <>
                <div className="hidden min-w-0 sm:block">
                  <p className="truncate text-lg font-bold text-[color:var(--heading-foreground)]">{title}</p>
                  <p className="truncate text-sm text-[color:var(--text-secondary)]">{subtitle}</p>
                </div>
                <div className="sm:hidden">
                  <p className="text-lg font-bold text-[color:var(--heading-foreground)]">{title}</p>
                </div>
              </>
            ) : (
              <div className="hidden sm:block">
                <p className="text-lg font-bold text-[color:var(--heading-foreground)]">{title}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {!isHomepageRoot ? <HeaderCartButton /> : null}
          <ThemeToggle />
          {variant === 'booking' && <LanguageSwitcher />}
          {isMain && (
            <>
              {ctaLabel && ctaHref ? (
                <a
                  href={ctaHref}
                  className="hidden min-h-[44px] items-center rounded-[var(--btn-radius)] bg-[color:var(--brand-primary)] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[color:var(--brand-primary-hover)] md:inline-flex"
                >
                  {ctaLabel}
                </a>
              ) : null}
              <button
                className="rounded-lg border border-[color:var(--border-light)] bg-surface-secondary p-2 transition-colors hover:bg-surface md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-site-nav"
              >
                <span className="sr-only">Toggle menu</span>
                <div className="space-y-1">
                  <span className={`block h-0.5 w-6 bg-[color:var(--text-primary)] transition-all ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                  <span className={`block h-0.5 w-6 bg-[color:var(--text-primary)] transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-6 bg-[color:var(--text-primary)] transition-all ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
              </button>
              <LanguageSwitcher />
            </>
          )}
        </div>
      </div>

      {showNav && mobileMenuOpen && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-slate-950/20 md:hidden"
            aria-label="Close navigation menu"
            onClick={() => setMobileMenuOpen(false)}
          />
          <nav
            id="mobile-site-nav"
            ref={mobileMenuRef}
            className="animate-in slide-in-from-top-2 relative z-50 border-t border-[color:var(--border-light)] bg-surface-secondary md:hidden"
          >
            <div className="mx-auto max-w-[1280px] px-6 py-4">
              <div className="flex flex-col items-stretch gap-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(
                    item.href,
                    'w-full rounded-[var(--radius-md)] px-4 py-4 text-left text-base font-medium text-[color:var(--text-primary)] transition-colors hover:bg-surface hover:text-brand-primary',
                  )}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
              {ctaLabel && ctaHref ? (
                <a
                  href={ctaHref}
                  className="btn-brand mt-2 inline-flex min-h-[48px] items-center justify-center px-4 py-3 text-base font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {ctaLabel}
                </a>
              ) : null}
              </div>
            </div>
          </nav>
        </>
      )}

      {showNav && (
        <nav className="hidden border-t border-[color:var(--border-light)] bg-surface-secondary md:block">
          <div className="mx-auto max-w-[1280px] px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(
                    item.href,
                    'rounded-[var(--radius-md)] px-3 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-surface hover:text-brand-primary sm:px-4 sm:text-[15px]',
                  )}
                  onClick={(e) => handleNavClick(e, item.href)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
