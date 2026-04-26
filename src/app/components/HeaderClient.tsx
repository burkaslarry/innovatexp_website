'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import ThemeToggle from '../ThemeToggle';
import LanguageSwitcher from '../LanguageSwitcher';
import type { HeaderProps } from './Header';

const LOGO_ALT = 'InnovateXP Limited - AI CRM and Event Management Solutions Hong Kong';

const HEADER_SCROLL_OFFSET = 180;

export default function HeaderClient({ variant, title, subtitle, navItems = [] }: HeaderProps) {
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isMain = variant === 'main';
  const showNav = isMain && navItems.length > 0;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetId = href.slice(1);
    if (targetId === '') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.getElementById(targetId);
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - HEADER_SCROLL_OFFSET;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-[background-color,box-shadow,border-color] duration-300 dark:border-neutral-800 dark:backdrop-blur-md ${
        scrolled
          ? 'border-slate-200 bg-white shadow-md dark:border-neutral-900 dark:bg-black'
          : 'border-slate-200/90 bg-white shadow-sm dark:bg-black'
      }`}
      id={isMain ? 'main-header' : undefined}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {isMain && (
        <link rel="llms-txt" href="https://aeo.washinmura.jp/aeo/shops/innovatexp-co/llms.txt" />
      )}
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          {variant === 'booking' && (
            <button
              onClick={() => router.push('/')}
              className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors active:scale-95 shrink-0"
              aria-label="Back to home"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700 dark:text-slate-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}
          <div className={`flex items-center gap-3 flex-1 min-w-0 ${variant === 'booking' ? 'mx-4' : ''}`}>
            <Image
              src="/innovatexp_black.svg"
              alt={LOGO_ALT}
              width={40}
              height={40}
              className="shrink-0 dark:invert"
            />
            {subtitle !== undefined ? (
              <>
                <div className="min-w-0 hidden sm:block">
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
          <ThemeToggle />
          {variant === 'booking' && <LanguageSwitcher />}
          {isMain && (
            <>
              <button
                className="rounded-lg bg-gray-200 p-2 transition-colors hover:bg-gray-300 dark:bg-slate-800 dark:hover:bg-slate-700 md:hidden"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Toggle menu</span>
                <div className="space-y-1">
                  <span className={`block h-0.5 w-6 bg-gray-900 transition-all dark:bg-slate-200 ${mobileMenuOpen ? 'translate-y-2 rotate-45' : ''}`} />
                  <span className={`block h-0.5 w-6 bg-gray-900 transition-all dark:bg-slate-200 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block h-0.5 w-6 bg-gray-900 transition-all dark:bg-slate-200 ${mobileMenuOpen ? '-translate-y-2 -rotate-45' : ''}`} />
                </div>
              </button>
              <LanguageSwitcher />
            </>
          )}
        </div>
      </div>

      {showNav && mobileMenuOpen && (
        <nav className="animate-in slide-in-from-top-2 border-t border-slate-200 bg-slate-50 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
          <div className="mx-auto px-6 py-4 max-w-7xl">
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="w-full rounded-lg px-4 py-3 text-center font-medium text-slate-600 transition-colors hover:bg-white hover:text-brand-primary dark:text-slate-200 dark:hover:bg-neutral-900 dark:hover:text-teal-300"
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
        <nav
          className={`hidden border-t md:block dark:border-neutral-800 ${
            scrolled
              ? 'border-slate-200 bg-slate-50 dark:bg-neutral-950'
              : 'border-slate-200/90 bg-slate-50 dark:bg-neutral-950'
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 py-2 sm:px-6">
            <div className="flex flex-wrap items-center justify-center gap-1 sm:gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-white hover:text-brand-primary dark:text-slate-200 dark:hover:bg-neutral-900 dark:hover:text-teal-300 sm:px-4 sm:text-[15px]"
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
