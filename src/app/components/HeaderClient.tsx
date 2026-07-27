'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';
import type { HeaderProps } from './Header';
import { useLocalizedHref } from '@/hooks/useLocalizedHref';
import { HeaderCartButton } from '@/components/inquiry-cart/HeaderCartButton';

const LOGO_ALT = 'InnovateXP Limited - AI CRM and Event Management Solutions Hong Kong';

export default function HeaderClient({ variant, title, subtitle, navItems = [] }: HeaderProps) {
  const router = useRouter();
  const loc = useLocalizedHref();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHash, setActiveHash] = useState<string | null>(null);
  const isMain = variant === 'main';
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
    return `${base} ${active ? 'bg-surface text-brand-primary font-semibold dark:text-[color:var(--primary-hover)]' : ''}`.trim();
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[color:var(--border-light)] bg-surface/95 backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 ${
        scrolled ? 'shadow-md' : 'shadow-sm'
      }`}
      id={isMain ? 'main-header' : undefined}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
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
                  <p className="truncate text-lg font-bold text-oxford dark:text-white">{title}</p>
                  <p className="truncate text-sm text-slate-600 dark:text-slate-400">{subtitle}</p>
                </div>
                <div className="sm:hidden">
                  <p className="text-lg font-bold text-oxford dark:text-white">{title}</p>
                </div>
              </>
            ) : (
              <div className="hidden sm:block">
                <p className="text-lg font-bold text-oxford dark:text-white">{title}</p>
              </div>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <HeaderCartButton />
          <ThemeToggle />
          {variant === 'booking' && <LanguageSwitcher />}
          {isMain && (
            <>
              <button
                className="rounded-lg border border-[color:var(--border-light)] bg-surface-secondary p-2 transition-colors hover:bg-surface md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
                aria-expanded={mobileMenuOpen}
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
        <nav className="animate-in slide-in-from-top-2 border-t border-[color:var(--border-light)] bg-surface-secondary md:hidden">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(
                    item.href,
                    'w-full rounded-lg px-4 py-3 text-center font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-surface hover:text-brand-primary dark:hover:text-[color:var(--primary-hover)]',
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

      {showNav && (
        <nav className="hidden border-t border-[color:var(--border-light)] bg-surface-secondary md:block">
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className={navLinkClass(
                    item.href,
                    'rounded-lg px-3 py-2 text-sm font-medium text-[color:var(--text-secondary)] transition-colors hover:bg-surface hover:text-brand-primary dark:hover:text-[color:var(--primary-hover)] sm:px-4 sm:text-[15px]',
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
