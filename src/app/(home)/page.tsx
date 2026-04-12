"use client"
import React from 'react';
import Image from 'next/image';
import { useEffect, useMemo, useState } from 'react';
import {
  Bot,
  Lightbulb,
  Rocket,
  Search,
  Sparkles,
  PenLine,
  CalendarClock,
  BarChart3,
  GraduationCap,
  LayoutDashboard,
  ScanSearch,
  Target,
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';
import Breadcrumb from '../components/Breadcrumb';
import Header from '../components/Header';
import { Hero } from '@/components/Hero';
import { PriceCard } from '@/components/PriceCard';
import { PremiumPriceCard } from '@/components/PremiumPriceCard';
import { ImplementationTimeline } from '@/components/ImplementationTimeline';
import { FaqAccordion } from '@/components/FaqAccordion';
import SmartSalesEnterpriseShowcase from '@/components/SmartSalesEnterpriseShowcase';
import { WhyInnovateXP } from '@/components/WhyInnovateXP';
import { ProductEntryGrid } from '@/components/ProductEntryGrid';
import { ProductMockupPlaceholder } from '@/components/ProductMockupPlaceholder';
import { AIConsultingPackageCard } from '@/components/AIConsultingPackageCard';
import { ImageCarouselModal } from '@/components/ImageCarouselModal';

function LandingPage() {
  const { t, language } = useLanguage();
  const [smartSalesCarouselOpen, setSmartSalesCarouselOpen] = useState(false);
  const [smartSalesCarouselIndex, setSmartSalesCarouselIndex] = useState(0);

  const smartSalesSlides = useMemo(
    () => [
      {
        src: '/smart-sales-crm-1.png',
        alt: t('mockup.pipeline_kanban'),
        caption: t('mockup.pipeline_kanban'),
      },
      {
        src: '/smart-sales-crm-2.png',
        alt: t('mockup.pipeline_inbox'),
        caption: t('mockup.pipeline_inbox'),
      },
    ],
    [t]
  );

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!href.startsWith('#')) return;
    e.preventDefault();
    const id = href.slice(1);
    if (id === '') window.scrollTo({ top: 0, behavior: 'smooth' });
    else {
      const el = document.getElementById(id);
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 180, behavior: 'smooth' });
    }
  };

  const navItems = [
    { label: t('nav.eventxp'), href: '#eventxp' },
    { label: t('nav.smartsales'), href: '#smartsales' },
    { label: t('nav.ai_consulting'), href: '#ai-consulting' },
    { label: t('nav.pricing'), href: '#pricing' },
    { label: t('nav.about'), href: '#about-us' },
    { label: t('nav.contact'), href: '/bookme#quotation-wizard' },
  ];

  const openSmartSalesCarouselAt = (index: number) => {
    setSmartSalesCarouselIndex(index);
    setSmartSalesCarouselOpen(true);
  };

  const closeSmartSalesCarousel = () => {
    setSmartSalesCarouselOpen(false);
  };

  const showPrevSmartSalesSlide = () => {
    setSmartSalesCarouselIndex((prev) => (prev === 0 ? smartSalesSlides.length - 1 : prev - 1));
  };

  const showNextSmartSalesSlide = () => {
    setSmartSalesCarouselIndex((prev) => (prev + 1) % smartSalesSlides.length);
  };

  useEffect(() => {
    async function fetchData() {

    }
    fetchData();
  }, []);


  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-200">
      <Header
        variant="main"
        title={t('header.title')}
        subtitle={t('header.subtitle')}
        navItems={navItems}
      />

      <main className="mx-auto max-w-7xl bg-bg px-6 py-12 pb-36 text-fg md:pb-28 md:leading-relaxed">
      
      {/* Breadcrumb Navigation */}
      <Breadcrumb 
        items={[
          { name: t('nav.home'), url: 'https://innovatexp.co' },
          { name: t('services.title'), url: 'https://innovatexp.co#services' }
        ]}
      />
      
      <Hero
        title={t('hero.title')}
        tagline={t('hero.tagline')}
        taglineEn={t('hero.tagline_en')}
        description={t('hero.description')}
        primaryHref="#product-pillars"
        primaryLabel={t('hero.explore_services')}
        onPrimaryClick={(e) => scrollToAnchor(e, '#product-pillars')}
        secondaryHref="/bookme"
        secondaryLabel={t('hero.book_meeting')}
        onSecondaryClick={undefined}
        imageAlt={t('hero.image_alt')}
      />

      <WhyInnovateXP
        title={t('why.title')}
        points={[
          { label: t('why.1.label'), sub: t('why.1.sub') },
          { label: t('why.2.label'), sub: t('why.2.sub') },
          { label: t('why.3.label'), sub: t('why.3.sub') },
          { label: t('why.4.label'), sub: t('why.4.sub') },
        ]}
      />

      <p className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
        {t('product.entry.section_label')}
      </p>
      <ProductEntryGrid
        id="product-pillars"
        items={[
          {
            href: '#eventxp',
            title: t('product.entry.eventxp.title'),
            blurb: t('product.entry.eventxp.blurb'),
            cta: t('product.entry.eventxp.cta'),
            icon: 'event',
          },
          {
            href: '#smartsales',
            title: t('product.entry.smartsales.title'),
            blurb: t('product.entry.smartsales.blurb'),
            cta: t('product.entry.smartsales.cta'),
            icon: 'crm',
          },
          {
            href: '#ai-consulting',
            title: t('product.entry.ai.title'),
            blurb: t('product.entry.ai.blurb'),
            cta: t('product.entry.ai.cta'),
            icon: 'ai',
          },
        ]}
      />

      {/* Vision Section */}
      <section id="vision" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('vision.title')}</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-1">{t('vision.brand')}</p>
          <p className="text-2xl text-brand-primary dark:text-teal-300 font-bold tracking-wider">{t('vision.tagline')}</p>
        </div>
        
        {/* Team Photo - aspect ratio prevents CLS; lazy load below fold */}
        <div className="max-w-3xl mx-auto mb-8 aspect-[3/2] w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-full">
            <Image
              src="/mypresent.jpg"
              alt="Larry Lo presenting at tech event - InnovateXP Founder and AI Consultant with 14 years experience"
              width={1200}
              height={800}
              className="w-full h-full object-cover"
              loading="lazy"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        </div>
        
        <div className="max-w-4xl mx-auto mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed text-center">
            {t('vision.description')}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-brand-primary/50 hover:bg-brand-primary/5 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
            <div className="mb-4 flex justify-center text-oxford dark:text-teal-300">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oxford/10 dark:bg-oxford-light/20">
                <Lightbulb className="h-7 w-7" strokeWidth={2} aria-hidden />
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{t('vision.innovate')}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('vision.innovate_desc')}</p>
          </div>

          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-green-400 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
            <div className="mb-4 flex justify-center text-oxford dark:text-teal-300">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oxford/10 dark:bg-oxford-light/20">
                <Rocket className="h-7 w-7" strokeWidth={2} aria-hidden />
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{t('vision.transform')}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('vision.transform_desc')}</p>
          </div>

          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-amber-400 hover:bg-amber-50/80 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
            <div className="mb-4 flex justify-center text-oxford dark:text-teal-300">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oxford/10 dark:bg-oxford-light/20">
                <Sparkles className="h-7 w-7" strokeWidth={2} aria-hidden />
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{t('vision.experience')}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('vision.experience_desc')}</p>
          </div>
        </div>
      </section>

      <section id="services" className="mb-16 scroll-mt-[var(--header-offset)]">
        <h2 className="mb-8 text-center text-4xl font-bold text-gray-900 dark:text-white">
          {t('services.title')}
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="flex flex-col rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{t('services.ai_crm.title')}</h3>
            <p className="mb-4 text-sm font-semibold italic text-brand-primary dark:text-teal-300 ">{t('services.ai_crm.subtitle')}</p>
            <ul className="mb-6 flex-grow space-y-2">
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.ai_crm.benefit1')}</span>
              </li>
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.ai_crm.benefit2')}</span>
              </li>
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.ai_crm.benefit3')}</span>
              </li>
            </ul>
            <div className="flex justify-center">
              <a
                href="/bookme"
                className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-full bg-brand-primary py-2 px-6 text-center text-sm font-bold text-white shadow-md transition duration-300 hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
              >
                {t('services.ai_crm.cta')}
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{t('services.checkin.title')}</h3>
            <p className="mb-4 text-sm font-semibold italic text-brand-primary dark:text-teal-300 ">{t('services.checkin.subtitle')}</p>
            <ul className="mb-6 flex-grow space-y-2">
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.checkin.benefit1')}</span>
              </li>
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.checkin.benefit2')}</span>
              </li>
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.checkin.benefit3')}</span>
              </li>
            </ul>
            <div className="flex justify-center">
              <a
                href="/bookme"
                className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-full bg-brand-primary py-2 px-6 text-center text-sm font-bold text-white shadow-md transition duration-300 hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
              >
                {t('services.checkin.cta')}
              </a>
            </div>
          </div>

          <div className="flex flex-col rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
            <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{t('services.courses.title')}</h3>
            <p className="mb-4 text-sm font-semibold italic text-brand-primary  dark:text-teal-300">{t('services.courses.subtitle')}</p>
            <ul className="mb-6 flex-grow space-y-2">
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.courses.benefit1')}</span>
              </li>
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.courses.benefit2')}</span>
              </li>
              <li className="flex items-start text-gray-700 dark:text-gray-300">
                <span className="mr-2 font-bold text-brand-primary dark:text-teal-300">✓</span>
                <span>{t('services.courses.benefit3')}</span>
              </li>
            </ul>
            <div className="flex justify-center">
              <a
                href="/bookme#quotation-wizard"
                className="w-full rounded-full bg-brand-primary py-2 px-6 text-center text-sm font-bold text-white shadow-md transition duration-300 hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
              >
                {t('services.courses.cta')}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* EventXP Section */}
      <article id="eventxp" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {t('eventxp.headline')}
            </h2>
            <p className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t('eventxp.main.answer')}
            </p>
            
            {/* What is EventXP? - Answer-first format */}
            <div className="max-w-4xl mx-auto mb-8 text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('eventxp.what.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('eventxp.what.answer')}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">{t('eventxp.how.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                {t('eventxp.how.title')} {language === 'zh' ? '的 4 個簡單步驟：' : 'works in 4 simple steps:'}
              </p>
              <ol className="list-decimal list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>{t('eventxp.how.step1')}</li>
                <li>{t('eventxp.how.step2')}</li>
                <li>{t('eventxp.how.step3')}</li>
                <li>{t('eventxp.how.step4')}</li>
              </ol>
            </div>
            
            <p className="text-xl text-brand-primary dark:text-teal-300  font-semibold mb-6">
              {t('pricing.insight.tagline')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t('pricing.insight.description')}
            </p>
            <p className="text-lg font-semibold text-brand-primary dark:text-teal-300">
              {t('pricing.insight.value')}
            </p>
          </div>

          <div className="mb-12 max-w-3xl mx-auto">
            <ProductMockupPlaceholder
              label={t('mockup.checkin')}
              imageSrc="/eventxp-admin.png"
              imageAlt={t('mockup.checkin.alt')}
            />
          </div>

          {/* EventXP Features */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-teal-300">
                <LayoutDashboard className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.insight.tier1.feature1')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.insight.tier1.feature2')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-teal-300">
                <ScanSearch className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('eventxp.grid.ai_insight.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('eventxp.grid.ai_insight.body')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-teal-300">
                <Target className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.insight.tier2.feature4')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.insight.tier2.feature4')}</p>
            </div>
          </div>

          <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-gray-700 dark:text-gray-300">
            {t('eventxp.communities_support')}
          </p>

          <div className="mb-12 rounded-2xl border-2 border-slate-200 bg-slate-50 p-8 dark:border-slate-600 dark:bg-slate-800/60">
            <h3 className="mb-4 text-center text-2xl font-bold text-brand-primary dark:text-white md:text-3xl">
              {t('referral.title')}
            </h3>
            <p className="mx-auto mb-8 max-w-3xl text-center text-gray-700 dark:text-gray-300">
              {t('referral.intro')}
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-brand-primary dark:text-teal-300">
                  {t('referral.feedback_loop.title')}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t('referral.feedback_loop.desc')}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-brand-primary dark:text-teal-300">
                  {t('referral.commission.title')}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t('referral.commission.desc')}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-brand-primary dark:text-teal-300">
                  {t('referral.welcome_gift.title')}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t('referral.welcome_gift.desc')}
                </p>
              </div>
            </div>
          </div>

          <div id="pricing" className="grid scroll-mt-[var(--header-offset)] grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            <PriceCard
              index={0}
              name={t('pricing.insight.tier1.name')}
              price={t('pricing.insight.tier1.price')}
              period={t('pricing.insight.tier1.period')}
              target={t('pricing.insight.tier1.target')}
              features={[
                t('pricing.insight.tier1.feature1'),
                t('pricing.insight.tier1.feature2'),
                t('pricing.insight.tier1.feature3'),
                t('pricing.insight.tier1.feature4'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
            <PremiumPriceCard
              badge={t('pricing.insight.tier2.badge')}
              name={t('pricing.insight.tier2.name')}
              price={t('pricing.insight.tier2.price')}
              period={t('pricing.insight.tier2.period')}
              subtitle={t('pricing.insight.tier2.subtitle')}
              target={t('pricing.insight.tier2.target')}
              featureLines={[
                t('pricing.insight.tier2.feature2'),
                t('pricing.insight.tier2.feature3'),
                t('pricing.insight.tier2.feature4'),
              ]}
              callout={t('pricing.insight.tier2.note')}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
            <PriceCard
              index={2}
              name={t('pricing.insight.tier3.name')}
              price={t('pricing.insight.tier3.price')}
              period={t('pricing.insight.tier3.period')}
              target={t('pricing.insight.tier3.target')}
              features={[
                t('pricing.insight.tier3.feature1'),
                t('pricing.insight.tier3.feature2'),
                t('pricing.insight.tier3.feature3'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
          </div>
          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            {t('pricing.insight.setup')}
            <a
              href="/bookme"
              className="font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-2 hover:text-brand-primary-hover dark:text-teal-300"
            >
              {t('pricing.insight.setup_cta')}
            </a>
            {language === 'zh' ? '。' : '.'}
          </p>
        </div>
      </article>

      {/* EventXP FAQ Section */}
      <FaqAccordion
        title={t('faq.eventxp.title')}
        id="eventxp-faq"
        faqs={[
          { question: t('faq.eventxp.q1'), answer: t('faq.eventxp.a1') },
          { question: t('faq.eventxp.q2'), answer: t('faq.eventxp.a2') },
          { question: t('faq.eventxp.q3'), answer: t('faq.eventxp.a3') },
          { question: t('faq.eventxp.q4'), answer: t('faq.eventxp.a4') },
        ]}
      />

      {/* SmartSales CRM Section */}
      <article id="smartsales" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-gray-50 p-10 shadow-lg dark:border-gray-600 dark:bg-gray-700 md:p-12">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {t('smartsales.headline')}
            </h2>
            <p className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t('smartsales.main.answer')}
            </p>
            
            {/* What is AI CRM? - Answer-first format */}
            <div className="max-w-4xl mx-auto mb-8 text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('aicrm.what.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('aicrm.what.answer')}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">{t('aicrm.benefits.title')}</h2>
              <ol className="list-decimal list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>{t('aicrm.benefits.1')}</li>
                <li>{t('aicrm.benefits.2')}</li>
                <li>{t('aicrm.benefits.3')}</li>
                <li>{t('aicrm.benefits.4')}</li>
                <li>{t('aicrm.benefits.5')}</li>
              </ol>
            </div>
            
            <p className="text-xl font-semibold text-brand-primary dark:text-teal-300 mb-6">
              {t('pricing.crm.tagline')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t('pricing.crm.description')}
            </p>
            <p className="text-lg font-semibold text-brand-primary dark:text-teal-300">
              {t('pricing.crm.value')}
            </p>
            <div className="mt-6 max-w-2xl mx-auto rounded-lg border border-brand-primary/30 bg-white p-4 dark:border-brand-primary/40 dark:bg-gray-800">
              <p className="font-bold text-brand-primary dark:text-teal-300">
                💰 {t('pricing.crm.tier3.name')}: {t('pricing.crm.tier3.price')}
              </p>
            </div>
          </div>

          {/* SmartSales CRM Features */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-oxford/40 dark:border-gray-500 dark:bg-gray-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford dark:bg-oxford-light/15 dark:text-teal-300">
                <PenLine className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.crm.feature1.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.crm.feature1.desc')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-oxford/40 dark:border-gray-500 dark:bg-gray-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford dark:bg-oxford-light/15 dark:text-teal-300">
                <CalendarClock className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.crm.feature2.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.crm.feature2.desc')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-oxford/40 dark:border-gray-500 dark:bg-gray-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford dark:bg-oxford-light/15 dark:text-teal-300">
                <BarChart3 className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.crm.feature3.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.crm.feature3.desc')}</p>
            </div>
          </div>

          <div className="-mx-6 mb-10 max-w-6xl mx-auto space-y-4 sm:-mx-12">
            <p className="text-center text-sm font-semibold text-brand-primary md:text-base dark:text-teal-300">
              {t('mockup.pipeline')}
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <ProductMockupPlaceholder
                label={t('mockup.pipeline_kanban')}
                imageSrc="/smart-sales-crm-1.png"
                imageAlt={t('mockup.pipeline_kanban')}
                onClick={() => openSmartSalesCarouselAt(0)}
              />
              <ProductMockupPlaceholder
                label={t('mockup.pipeline_inbox')}
                imageSrc="/smart-sales-crm-2.png"
                imageAlt={t('mockup.pipeline_inbox')}
                onClick={() => openSmartSalesCarouselAt(1)}
              />
            </div>
          </div>

          <div className="-mx-6 mb-12 overflow-hidden rounded-2xl sm:-mx-12">
            <SmartSalesEnterpriseShowcase onOpenGallery={() => openSmartSalesCarouselAt(0)} />
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            <PriceCard
              index={0}
              name={t('pricing.crm.tier1.name')}
              price={t('pricing.crm.tier1.price')}
              period={t('pricing.crm.tier1.period')}
              target={t('pricing.crm.tier1.target')}
              features={[
                t('pricing.crm.tier1.feature1'),
                t('pricing.crm.tier1.feature2'),
                t('pricing.crm.tier1.feature3'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
            <PremiumPriceCard
              badge={t('pricing.crm.tier2.badge')}
              name={t('pricing.crm.tier2.name')}
              price={t('pricing.crm.tier2.price')}
              period={t('pricing.crm.tier2.period')}
              target={t('pricing.crm.tier2.target')}
              featureLines={[t('pricing.crm.tier2.feature1'), t('pricing.crm.tier2.feature2')]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
            <PriceCard
              index={2}
              name={t('pricing.crm.tier3.name')}
              price={t('pricing.crm.tier3.price')}
              period={t('pricing.crm.tier3.period')}
              target={t('pricing.crm.tier3.target')}
              features={[
                t('pricing.crm.tier3.feature1'),
                t('pricing.crm.tier3.feature2'),
                t('pricing.crm.tier3.feature3'),
                t('pricing.crm.tier3.feature4'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.contact')}
            />
          </div>
        </div>
      </article>

      {/* SmartSales CRM FAQ Section */}
      <FaqAccordion
        title={t('faq.smartsales.title')}
        id="smartsales-faq"
        faqs={[
          { question: t('faq.smartsales.q1'), answer: t('faq.smartsales.a1') },
          { question: t('faq.smartsales.q2'), answer: t('faq.smartsales.a2') },
          { question: t('faq.smartsales.q3'), answer: t('faq.smartsales.a3') },
          { question: t('faq.smartsales.q4'), answer: t('faq.smartsales.a4') },
          { question: t('faq.smartsales.q5'), answer: t('faq.smartsales.a5') },
        ]}
      />

      {/* AI Consulting Section */}
      <article id="ai-consulting" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-12">
        <div className="mx-auto max-w-6xl">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('ai_consulting.title')}
          </h2>
          <p className="mx-auto mb-8 max-w-4xl text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {t('ai_consulting.subtitle')}
          </p>
          <figure className="mb-10 mx-auto max-w-5xl rounded-2xl border-2 border-slate-200 bg-white p-3 shadow-md dark:border-slate-600 dark:bg-slate-800">
            <div className="relative w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-600 dark:bg-slate-900">
              <Image
                src="/ai-consul.png"
                alt={t('mockup.ai')}
                width={1200}
                height={675}
                className="h-auto w-full object-cover object-top"
                sizes="(max-width: 768px) 100vw, min(1024px, 90vw)"
                priority={false}
              />
            </div>
            <figcaption className="mt-3 text-center text-sm font-medium text-slate-600 dark:text-slate-300">
              {t('mockup.ai')}
            </figcaption>
          </figure>
          <div className="mb-12 text-center">
            <p className="max-w-4xl mx-auto text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
              {t('aiconsulting.main.answer')}
            </p>
            
            {/* What AI Consulting Services - Answer-first format */}
            <div className="max-w-4xl mx-auto mb-8 text-left">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('aiconsulting.what.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                {t('aiconsulting.what.answer')}
              </p>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 mt-6">{t('aiconsulting.who.title')}</h2>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-2">
                {t('aiconsulting.who.intro')}
              </p>
              <details className="mt-3 rounded-xl border border-gray-200 bg-gray-50/80 p-4 text-left dark:border-gray-600 dark:bg-gray-800/50">
                <summary className="cursor-pointer text-base font-semibold text-gray-900 dark:text-white">
                  {t('aiconsulting.who.more')}
                </summary>
                <ul className="mt-3 list-disc list-inside space-y-2 pl-1 text-base text-gray-700 dark:text-gray-300">
                  <li>{t('aiconsulting.who.1')}</li>
                  <li>{t('aiconsulting.who.2')}</li>
                  <li>{t('aiconsulting.who.3')}</li>
                  <li>{t('aiconsulting.who.4')}</li>
                </ul>
              </details>
            </div>
          </div>

          {/* AI Consulting Packages */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <AIConsultingPackageCard
              icon={Search}
              title={t('ai_consulting.package1.name')}
              price={t('ai_consulting.package1.price')}
              description={t('ai_consulting.package1.desc')}
              features={[
                t('ai_consulting.package1.feature1'),
                t('ai_consulting.package1.feature2'),
                t('ai_consulting.package1.feature3'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
            <AIConsultingPackageCard
              icon={Bot}
              title={t('ai_consulting.package2.name')}
              price={t('ai_consulting.package2.price')}
              description={t('ai_consulting.package2.desc')}
              features={[
                t('ai_consulting.package2.feature1'),
                t('ai_consulting.package2.feature2'),
                t('ai_consulting.package2.feature3'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
            <AIConsultingPackageCard
              icon={GraduationCap}
              title={t('ai_consulting.package3.name')}
              price={t('ai_consulting.package3.price')}
              description={t('ai_consulting.package3.desc')}
              features={[
                t('ai_consulting.package3.feature1'),
                t('ai_consulting.package3.feature2'),
                t('ai_consulting.package3.feature3'),
              ]}
              ctaHref="/bookme"
              ctaLabel={t('pricing.cta')}
            />
          </div>
        </div>
      </article>

      {/* AI Consulting FAQ Section */}
      <FaqAccordion
        title={t('faq.aiconsulting.title')}
        id="ai-consulting-faq"
        faqs={[
          { question: t('faq.aiconsulting.q1'), answer: t('faq.aiconsulting.a1') },
          { question: t('faq.aiconsulting.q2'), answer: t('faq.aiconsulting.a2') },
          { question: t('faq.aiconsulting.q3'), answer: t('faq.aiconsulting.a3') },
          { question: t('faq.aiconsulting.q4'), answer: t('faq.aiconsulting.a4') },
        ]}
      />

      <ImplementationTimeline
        title={t('timeline.title')}
        intro={t('timeline.intro')}
        phases={[
          {
            title: t('timeline.phase1.title'),
            duration: t('timeline.phase1.duration'),
            description: t('timeline.phase1.desc'),
          },
          {
            title: t('timeline.phase2.title'),
            duration: t('timeline.phase2.duration'),
            description: t('timeline.phase2.desc'),
          },
          {
            title: t('timeline.phase3.title'),
            duration: t('timeline.phase3.duration'),
            description: t('timeline.phase3.desc'),
          },
          {
            title: t('timeline.phase4.title'),
            duration: t('timeline.phase4.duration'),
            description: t('timeline.phase4.desc'),
          },
        ]}
      />


      <section className="mb-16 rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">{t('roi.title')}</h2>
        <p className="mb-6 text-lg leading-[1.75] text-gray-700 dark:text-gray-300">
          {t('roi.intro')}
        </p>
        <ul className="mb-6 list-inside list-disc space-y-3 text-gray-700 dark:text-gray-300">
          <li>
            <span className="font-semibold text-gray-900 dark:text-white">{t('roi.point1.title')}: </span>
            {t('roi.point1.desc')}
          </li>
          <li>
            <span className="font-semibold text-gray-900 dark:text-white">{t('roi.point2.title')}: </span>
            {t('roi.point2.desc')}
          </li>
          <li>
            <span className="font-semibold text-gray-900 dark:text-white">{t('roi.point3.title')}: </span>
            {t('roi.point3.desc')}
          </li>
        </ul>
        <details className="rounded-xl border border-gray-200 bg-gray-50/80 p-4 dark:border-gray-600 dark:bg-gray-800/50">
          <summary className="cursor-pointer text-lg font-semibold text-gray-900 dark:text-white">
            {t('roi.show_more')}
          </summary>
          <h3 className="mb-3 mt-4 text-xl font-bold text-gray-900 dark:text-white">{t('roi.scenario.title')}</h3>
          <ol className="list-inside list-decimal space-y-2 text-gray-700 dark:text-gray-300">
            <li>{t('roi.scenario.1')}</li>
            <li>{t('roi.scenario.2')}</li>
          </ol>
        </details>
      </section>

        {/* About Section */}
        <section id="about-us" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-8 shadow-md dark:bg-gray-800">
          <h2 className="mb-6 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">{t('about.title')}</h2>
          
          {/* Author Byline */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('about.author.byline')}{' '}
              <a
                href="https://www.linkedin.com/in/larry-lo-804a50165/"
                rel="me author"
                className="font-semibold text-brand-primary hover:text-brand-primary-hover dark:text-teal-300 dark:hover:text-teal-200"
              >
                Larry Lo
              </a>
              , {t('about.author.title')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              {t('about.author.updated')} {new Date().toLocaleDateString(language === 'zh' ? 'zh-HK' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          {/* 25秒介紹 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.intro.title')}</h3>
            <p className="mb-4 leading-relaxed text-gray-600 dark:text-slate-300">
              {t('about.intro.p1')}
            </p>
            <p className="mb-4 leading-relaxed text-gray-600 dark:text-slate-300">
              {t('about.intro.p2')}
            </p>
            <p className="mb-4 leading-relaxed text-gray-600 dark:text-slate-300">
              {t('about.intro.p3')}
            </p>
          </div>

          {/* 核心品牌標籤 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.tags.title')}</h3>
            <ul className="space-y-4">
              <li className="leading-relaxed text-gray-600 dark:text-slate-300">
                <strong className="text-lg text-brand-primary dark:text-teal-300">{t('about.tags.red_ocean.title')}:</strong>
                <br />
                {t('about.tags.red_ocean.description')}
              </li>
              <li className="leading-relaxed text-gray-600 dark:text-slate-300">
                <strong className="text-lg text-green-600 dark:text-emerald-400">{t('about.tags.desert_oasis.title')}:</strong>
                <br />
                {t('about.tags.desert_oasis.description')}
              </li>
              <li className="leading-relaxed text-gray-600 dark:text-slate-300">
                <strong className="text-lg text-brand-primary dark:text-teal-300">{t('about.tags.community.title')}:</strong>
                <br />
                {t('about.tags.community.description')}
              </li>
            </ul>
          </div>

          {/* Story Section */}
        <section className="mb-16 bg-white dark:bg-gray-700 rounded-2xl p-8 shadow-md border-2 border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('story.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Step 1: Red Ocean */}
            <div className="relative flex flex-col items-center rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-brand-primary/50 dark:border-gray-700">
              <div className="mb-4 text-5xl font-bold text-brand-primary dark:text-teal-300">1</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step1.title')}</h3>
              <p className="text-gray-600">{t('story.step1.description')}</p>
              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 transform text-3xl text-brand-primary dark:text-teal-300 md:block">→</div>
            </div>

            {/* Step 2: Desert Oasis */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center relative border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 transition duration-300">
              <div className="text-5xl font-bold text-green-600 mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step2.title')}</h3>
              <p className="text-gray-600">{t('story.step2.description')}</p>
              <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-3xl">→</div>
            </div>

            {/* Step 3: Coca-Cola Theory */}
            <div className="flex flex-col items-center rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-brand-primary/50 dark:border-gray-700">
              <div className="mb-4 text-5xl font-bold text-brand-primary/80 dark:text-teal-300">3</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step3.title')}</h3>
              <p className="text-gray-600">{t('story.step3.description')}</p>
          </div>
        </div>
        </section>

          {/* 社交媒體連結 with rel="me" for verification */}
          <div className="mt-6 flex gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/larry-lo-804a50165/" 
              target="_blank" 
              rel="me noopener noreferrer"
              className="bg-[#0077B5] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#005885] transition duration-300 shadow-md"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/burkaslarry" 
              target="_blank" 
              rel="me noopener noreferrer"
              className="bg-gray-900 text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300 shadow-md"
            >
              GitHub
            </a>
          </div>
          
          {/* Trust Signals */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('about.credentials.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{language === 'zh' ? '14+ 年' : '14+ Years'}</p>
                <p className="text-xs text-gray-500">{t('about.credentials.experience')}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">2,000+</p>
                <p className="text-xs text-gray-500">{t('about.credentials.participants')}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">HKSTP</p>
                <p className="text-xs text-gray-500">{language === 'zh' ? '孵化校友' : 'Incubation Alumni'}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">GDG HK</p>
                <p className="text-xs text-gray-500">{language === 'zh' ? '前組織者' : 'Former Organizer'}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section id="partnership" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('partnership.title')}</h2>
            <p className="text-xl font-semibold text-brand-primary dark:text-teal-300">{t('partnership.subtitle')}</p>
          </div>
          
          <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
            {/* BNI Anchor */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-red-600 transition-all duration-300 shadow-md flex flex-col items-center text-center">
              <a href="https://www.bni-anchor.com/" target="_blank" rel="noopener noreferrer" className="w-full flex flex-col items-center group">
                <div className="mb-6 flex h-24 w-full items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/bni_anchor.png"
                    alt="BNI Anchor Chapter Hong Kong - Business Networking and Referral Partner with InnovateXP"
                    width={200}
                    height={96}
                    className="max-h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-red-600 transition-colors">{t('partnership.bni_anchor.title')}</h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.bni_anchor.desc')}</p>
            </div>

            {/* LinkedInLocal Asia */}
            <div className="flex flex-col items-center rounded-xl border-2 border-gray-100 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <a href="https://www.linkedin.com/company/linkedinlocal-asia/posts/?feedView=all" target="_blank" rel="noopener noreferrer" className="w-full flex flex-col items-center group">
                <div className="mb-6 flex h-24 w-full items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/linkedin_localasia.jpeg"
                    alt="LinkedInLocal Asia - Professional Networking Events Partner with InnovateXP across Asia Pacific"
                    width={280}
                    height={96}
                    className="max-h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-brand-primary dark:text-white dark:group-hover:text-teal-300">
                  {t('partnership.linkedinlocal.title')}
                </h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.linkedinlocal.desc')}</p>
            </div>

            {/* EX.IO */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-brand-primary/50 transition-all duration-300 shadow-md flex flex-col items-center text-center">
              <a
                href="https://www.ex.io"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center group"
              >
                <div className="mb-6 flex h-24 w-full items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/exio_hk_logo.png"
                    alt="EX.IO — digital asset and exchange ecosystem partner"
                    width={280}
                    height={96}
                    className="max-h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    unoptimized
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors dark:group-hover:text-teal-300">
                  {t('partnership.ex_io.title')}
                </h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.ex_io.desc')}</p>
            </div>

            {/* KiraPay */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-brand-primary/50 transition-all duration-300 shadow-md flex flex-col items-center text-center">
              <a
                href="https://kira-pay.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex flex-col items-center group"
              >
                <div className="mb-6 flex h-24 w-full items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/kirapay.png"
                    alt="KiraPay — cross-chain payments and fintech partner"
                    width={280}
                    height={96}
                    className="max-h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors dark:group-hover:text-teal-300">
                  {t('partnership.kirapay.title')}
                </h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.kirapay.desc')}</p>
            </div>

            {/* OL International Services Limited — https://www.olisl.com/ */}
            <div className="flex flex-col items-center rounded-xl border-2 border-gray-100 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <a
                href="https://www.olisl.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full flex-col items-center no-underline"
              >
                <div className="mb-6 flex h-24 w-full items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/ollsi.png"
                    alt="OL International Services Limited — corporate accounting, audit liaison, taxation, company services"
                    width={280}
                    height={96}
                    className="max-h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-brand-primary transition-colors dark:group-hover:text-teal-300">
                  {t('partnership.ol_international.title')}
                </h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.ol_international.desc')}</p>
            </div>
            {/* Agilizing Education Center */}
            <div className="flex flex-col items-center rounded-xl border-2 border-gray-100 bg-white p-6 text-center shadow-md transition-all duration-300 hover:border-brand-primary/40 dark:border-gray-600 dark:bg-gray-700">
              <a href="https://agilizing.com" target="_blank" rel="noopener noreferrer" className="w-full flex flex-col items-center group">
                <div className="mb-6 flex h-24 w-full items-center justify-center transition-transform group-hover:scale-105">
                  <Image
                    src="/agilizing-logo-transparent.png"
                    alt="Agilizing Education Center - InnovateXP Strategic Partner for Business Training and Agile Education in Hong Kong"
                    width={280}
                    height={96}
                    className="max-h-24 w-auto max-w-full object-contain"
                    loading="lazy"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-900 transition-colors group-hover:text-brand-primary dark:text-white dark:group-hover:text-teal-300">
                  {t('partnership.agilizing.title')}
                </h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.agilizing.desc')}</p>
            </div>
          </div>
        </section>

      </main>

      <ImageCarouselModal
        open={smartSalesCarouselOpen}
        slides={smartSalesSlides}
        currentIndex={smartSalesCarouselIndex}
        onClose={closeSmartSalesCarousel}
        onPrev={showPrevSmartSalesSlide}
        onNext={showNextSmartSalesSlide}
      />

        {/* Desktop sticky CTA → /bookme (mobile uses twin bar below; old “booking-form” submit was dead) */}
      <div
        className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-gray-200 bg-white/95 shadow-2xl backdrop-blur-md dark:border-gray-700 dark:bg-gray-800/95 md:block"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-4">
          <a
            href="/bookme"
            className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl border-2 border-gray-300 bg-white text-lg font-bold text-gray-900 no-underline shadow-lg transition hover:bg-gray-50 active:scale-[0.98] dark:border-transparent dark:bg-[#00B9B3] dark:!text-white dark:hover:bg-[#009e98] dark:hover:!text-white"
          >
            <CalendarClock className="h-6 w-6 shrink-0 text-gray-900 dark:!text-white" strokeWidth={2} aria-hidden />
            <span className="dark:!text-white">{t("hero.book_meeting")}</span>
          </a>
        </div>
      </div>
      <footer className="border-t-2 border-gray-300 bg-[#fffcf7] py-12 text-center dark:border-gray-700 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <a
              href="/bookme"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-primary px-8 py-3 text-base font-bold text-white no-underline shadow-md transition hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:!text-white dark:hover:bg-[#009e98] dark:hover:!text-white"
            >
              {t('hero.book_meeting')}
            </a>
          </div>

          <address className="not-italic border-t border-gray-200 pt-8 dark:border-gray-700">
            <strong>InnovateXP Limited</strong>
            <p className="text-gray-900 dark:text-gray-300">{t('footer.copyright')}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Email:{' '}
              <a href="mailto:info@innovatexp.com" className="text-[#00B9B3] hover:underline dark:text-teal-300">
                info@innovatexp.com
              </a>
            </p>
          </address>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex gap-2 border-t border-gray-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.08)] backdrop-blur-md dark:border-gray-700 dark:bg-gray-900/95 md:hidden">
        <a
          href="/bookme#quotation-wizard"
          className="flex min-h-[48px] flex-1 items-center justify-center rounded-full border-2 border-slate-300 bg-transparent text-sm font-bold text-slate-800 transition hover:border-[#00B9B3]/50 dark:border-slate-500 dark:text-slate-100"
        >
          {t('mobile.cta_contact')}
        </a>
        <a
          href="/bookme"
          className="flex min-h-[48px] flex-[1.15] touch-manipulation items-center justify-center rounded-full bg-brand-primary text-sm font-bold text-white no-underline shadow-md transition hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:!text-white dark:hover:bg-[#009e98] dark:hover:!text-white"
        >
          {t('hero.book_meeting')}
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
