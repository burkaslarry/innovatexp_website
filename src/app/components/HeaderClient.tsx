'use client';

import React, { useState } from 'react';
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
  const isMain = variant === 'main';
  const showNav = isMain && navItems.length > 0;

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
      className="sticky top-0 z-50 bg-white/80 dark:bg-[#000000] backdrop-blur-md shadow-sm border-b border-gray-200 dark:border-slate-700/50"
      id={isMain ? 'main-header' : undefined}
      style={{ paddingTop: 'env(safe-area-inset-top)' }}
    >
      {isMain && (
        <link rel="llms-txt" href="https://aeo.washinmura.jp/aeo/shops/innovatexp-co/llms.txt" />
      )}
      <div className="mx-auto py-4 px-6 flex items-center justify-between max-w-7xl">
        <div className="flex items-center gap-3 flex-1 min-w-0">
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
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white truncate">{title}</h1>
                  <p className="text-sm text-gray-600 dark:text-slate-400 truncate">{subtitle}</p>
                </div>
                <div className="sm:hidden">
                  <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
                </div>
              </>
            ) : (
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold text-gray-900 dark:text-white">{title}</h1>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          {variant === 'booking' && (
            <>
              <div className="hidden sm:block">
                <LanguageSwitcher />
              </div>
              <div className="sm:hidden">
                <LanguageSwitcher />
              </div>
            </>
          )}
          {isMain && (
            <>
              <LanguageSwitcher />
              <button
                className="md:hidden p-2 rounded-lg bg-gray-200 dark:bg-slate-700 hover:bg-gray-300 dark:hover:bg-slate-600 transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle navigation menu"
              >
                <span className="sr-only">Toggle menu</span>
                <div className="space-y-1">
                  <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-metal-silver transition-all ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                  <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-metal-silver transition-all ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                  <span className={`block w-6 h-0.5 bg-gray-900 dark:bg-metal-silver transition-all ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                </div>
              </button>
            </>
          )}
        </div>
      </div>

      {showNav && mobileMenuOpen && (
        <nav className="bg-gray-50 dark:bg-darkbg-surface border-t border-gray-200 dark:border-slate-700/50 md:hidden animate-in slide-in-from-top-2">
          <div className="mx-auto px-6 py-4 max-w-7xl">
            <div className="flex flex-col items-center gap-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-3 text-gray-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-slate-700/50"
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
        <nav className="bg-gray-50 dark:bg-darkbg-surface border-t border-gray-200 dark:border-slate-700/50 hidden md:block">
          <div className="mx-auto px-6 py-2 max-w-7xl">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="px-4 py-2 text-gray-700 dark:text-slate-200 hover:text-cyan-600 dark:hover:text-cyan-400 transition-colors font-medium"
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
