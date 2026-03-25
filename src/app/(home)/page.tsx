"use client"
import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLanguage } from '../LanguageContext';
import Breadcrumb from '../components/Breadcrumb';
import Header from '../components/Header';
import { Hero } from '@/components/Hero';
import { SolutionShowcase } from '@/components/SolutionShowcase';
import { PricingComparisonTable } from '@/components/PricingComparisonTable';
import { PriceCard } from '@/components/PriceCard';
import { PremiumPriceCard } from '@/components/PremiumPriceCard';
import { ImplementationTimeline } from '@/components/ImplementationTimeline';
import { FaqAccordion } from '@/components/FaqAccordion';

const ContactUs = dynamic(() => import('../ContactUs'), {
  ssr: false,
  loading: () => <div className="min-h-[180px] flex items-center justify-center text-slate-400 text-sm">Loading contact form…</div>,
});


function LandingPage() {
  const { t, language } = useLanguage();

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
    { label: t('nav.home'), href: '#' },
    { label: t('nav.eventxp'), href: '#eventxp' },
    { label: t('nav.smartsales'), href: '#smartsales' },
    { label: t('nav.ai_consulting'), href: '#ai-consulting' },
    { label: t('nav.vision'), href: '#vision' },
    { label: t('nav.partnership'), href: '#partnership' },
  ];

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

      <main className="mx-auto py-12 px-6 pb-20 md:pb-12 max-w-7xl bg-bg">
      
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
        description={t('hero.description')}
        primaryHref="/bookme"
        primaryLabel={t('hero.book_meeting')}
        secondaryLabel={t('hero.cta')}
        secondaryHref="#contact-us"
        onSecondaryClick={(e) => scrollToAnchor(e, '#contact-us')}
      />
      {/* Vision Section - MOVED TO FIRST */}
      <section id="vision" className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-10 border-2 border-gray-200 dark:border-gray-700 shadow-md">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('vision.title')}</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-1">{t('vision.brand')}</p>
          <p className="text-2xl text-orange-600 dark:text-orange-400 font-bold tracking-wider">{t('vision.tagline')}</p>
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Innovate */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-orange-50 dark:hover:bg-gray-600 transition duration-300 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400">
            <div className="text-5xl mb-4">💡</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('vision.innovate')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{t('vision.innovate_desc')}</p>
          </div>

          {/* Transform */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-green-50 dark:hover:bg-gray-600 transition duration-300 border-2 border-gray-200 dark:border-gray-600 hover:border-green-400">
            <div className="text-5xl mb-4">🚀</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('vision.transform')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{t('vision.transform_desc')}</p>
          </div>

          {/* Experience */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 text-center hover:bg-yellow-50 dark:hover:bg-gray-600 transition duration-300 border-2 border-gray-200 dark:border-gray-600 hover:border-yellow-400">
            <div className="text-5xl mb-4">✨</div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('vision.experience')}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{t('vision.experience_desc')}</p>
          </div>
        </div>
      </section>

      

      {/* EventXP Section */}
      <article id="eventxp" className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-12 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('pricing.insight.name')} – {t('pricing.insight.subtitle')}
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
            
            <p className="text-xl text-orange-600 dark:text-orange-400 font-semibold mb-6">
              {t('pricing.insight.tagline')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t('pricing.insight.description')}
            </p>
            <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">
              {t('pricing.insight.value')}
            </p>
          </div>

          {/* EventXP Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400 transition-all">
              <div className="text-4xl mb-4 text-orange-600">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.insight.tier1.feature1')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier1.feature2')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400 transition-all">
              <div className="text-4xl mb-4 text-orange-600">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.insight.tier2.feature2')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier2.feature3')}</p>
            </div>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-orange-400 transition-all">
              <div className="text-4xl mb-4 text-orange-600">🎯</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.insight.tier2.feature4')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier2.feature4')}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
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
          <p className="mt-4 text-center text-sm text-slate-500 dark:text-slate-400">
            {t('pricing.insight.setup')}
          </p>
        </div>
      </article>

      <div>
        <article id="quick" className="mb-16 bg-gray-50 dark:bg-gray-700 rounded-2xl p-12 border-2 border-gray-200 dark:border-gray-600 shadow-lg">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('quick.product')}</h3>
        <a href="/eventxp" className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">EventXP</a>
        <a href="/smartsales-crm" className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">SmartSales CRM</a>
        <a href="/ai-consulting" className="px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium w-full text-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">AI Consulting</a>        
        </article>
      </div>

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
      <article id="smartsales" className="mb-16 bg-gray-50 dark:bg-gray-700 rounded-2xl p-12 border-2 border-gray-200 dark:border-gray-600 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('pricing.crm.name')} – {t('pricing.crm.subtitle')}
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
            
            <p className="text-xl text-orange-600 dark:text-orange-400 font-semibold mb-6">
              {t('pricing.crm.tagline')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t('pricing.crm.description')}
            </p>
            <p className="text-lg text-orange-600 dark:text-orange-400 font-semibold">
              {t('pricing.crm.value')}
            </p>
            <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg p-4 max-w-2xl mx-auto border border-orange-200 dark:border-orange-400">
              <p className="text-orange-600 dark:text-orange-400 font-bold">💰 {t('pricing.crm.tier3.name')}: {t('pricing.crm.tier3.price')}</p>
            </div>
          </div>

          {/* SmartSales CRM Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white dark:bg-gray-600 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-500 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4 text-purple-600">✍️</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.crm.feature1.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.feature1.desc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-600 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-500 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4 text-purple-600">📅</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.crm.feature2.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.feature2.desc')}</p>
            </div>
            <div className="bg-white dark:bg-gray-600 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-500 hover:border-purple-400 transition-all">
              <div className="text-4xl mb-4 text-purple-600">📊</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.crm.feature3.title')}</h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.feature3.desc')}</p>
            </div>
          </div>

          <PricingComparisonTable
            title={t('aicrm.pricing.title')}
            columns={{
              plan: t('aicrm.pricing.plan'),
              price: t('aicrm.pricing.price'),
              bestFor: t('aicrm.pricing.bestfor'),
              features: t('aicrm.pricing.features'),
            }}
            rows={[
              {
                plan: t('aicrm.pricing.starter'),
                price: t('aicrm.pricing.starter.price'),
                bestFor: t('aicrm.pricing.starter.for'),
                features: t('aicrm.pricing.starter.features'),
              },
              {
                plan: t('aicrm.pricing.pro'),
                price: t('aicrm.pricing.pro.price'),
                bestFor: t('aicrm.pricing.pro.for'),
                features: t('aicrm.pricing.pro.features'),
                highlighted: true,
              },
              {
                plan: t('aicrm.pricing.setup'),
                price: t('aicrm.pricing.setup.price'),
                bestFor: t('aicrm.pricing.setup.for'),
                features: t('aicrm.pricing.setup.features'),
              },
            ]}
          />

          <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            <PriceCard
              index={0}
              name={t('pricing.crm.tier1.name')}
              price={t('pricing.crm.tier1.price')}
              period={t('pricing.crm.tier1.period')}
              target={t('pricing.crm.tier1.target')}
              features={[t('pricing.crm.tier1.feature1'), t('pricing.crm.tier1.feature2')]}
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
              features={[t('pricing.crm.tier3.feature1'), t('pricing.crm.tier3.feature2')]}
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
      <article id="ai-consulting" className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-12 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {t('ai_consulting.title')}
            </h2>
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
              <ul className="list-disc list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>{t('aiconsulting.who.1')}</li>
                <li>{t('aiconsulting.who.2')}</li>
                <li>{t('aiconsulting.who.3')}</li>
                <li>{t('aiconsulting.who.4')}</li>
                <li>{t('aiconsulting.who.5')}</li>
              </ul>
            </div>
            
            <p className="text-xl text-orange-600 dark:text-orange-400 font-semibold mb-6">
              {t('ai_consulting.subtitle')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto">
              {t('ai_consulting.description')}
            </p>
          </div>

          {/* AI Consulting Packages */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* AI Readiness Audit */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-yellow-400 transition-all">
              <div className="text-4xl mb-4 text-yellow-600">🔍</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('ai_consulting.package1.name')}</h3>
              <p className="text-orange-600 dark:text-orange-400 font-bold mb-3">{t('ai_consulting.package1.price')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('ai_consulting.package1.desc')}</p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package1.feature1')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package1.feature2')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package1.feature3')}</span>
                </li>
              </ul>
              <a href="/bookme" className="block w-full bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-3 rounded-full transition duration-300 text-center mt-4">
                {t('pricing.cta')}
              </a>
            </div>

            {/* Custom Agent Build */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-yellow-400 transition-all">
              <div className="text-4xl mb-4 text-yellow-600">🤖</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('ai_consulting.package2.name')}</h3>
              <p className="text-orange-600 dark:text-orange-400 font-bold mb-3">{t('ai_consulting.package2.price')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('ai_consulting.package2.desc')}</p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package2.feature1')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package2.feature2')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package2.feature3')}</span>
                </li>
              </ul>
              <a href="/bookme" className="block w-full bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-3 rounded-full transition duration-300 text-center mt-4">
                {t('pricing.cta')}
              </a>
            </div>

            {/* Prompt Training Bootcamp */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-600 hover:border-yellow-400 transition-all">
              <div className="text-4xl mb-4 text-yellow-600">🎓</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('ai_consulting.package3.name')}</h3>
              <p className="text-orange-600 dark:text-orange-400 font-bold mb-3">{t('ai_consulting.package3.price')}</p>
              <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{t('ai_consulting.package3.desc')}</p>
              <ul className="space-y-2">
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package3.feature1')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package3.feature2')}</span>
                </li>
                <li className="flex items-start text-sm">
                  <span className="text-green-400 mr-2">✓</span>
                  <span className="text-gray-600 dark:text-gray-300">{t('ai_consulting.package3.feature3')}</span>
                </li>
              </ul>
              <a href="/bookme" className="block w-full bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-3 rounded-full transition duration-300 text-center mt-4">
                {t('pricing.cta')}
              </a>
            </div>
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

      <section className="mb-16 bg-gray-50 dark:bg-gray-700 rounded-2xl p-10 border-2 border-gray-200 dark:border-gray-600 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('pricing.models.title')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {t('pricing.models.intro')}
        </p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700">
                <th className="py-3 px-4 text-left text-gray-900 dark:text-white font-bold border-b-2 border-gray-300 dark:border-gray-600">{t('pricing.models.col1')}</th>
                <th className="py-3 px-4 text-left text-gray-900 dark:text-white font-bold border-b-2 border-gray-300 dark:border-gray-600">{t('pricing.models.col2')}</th>
                <th className="py-3 px-4 text-left text-gray-900 dark:text-white font-bold border-b-2 border-gray-300 dark:border-gray-600">{t('pricing.models.col3')}</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{t('pricing.models.discovery.title')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.discovery.price')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.discovery.desc')}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{t('pricing.models.pilot.title')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.pilot.price')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.pilot.desc')}</td>
              </tr>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{t('pricing.models.impl.title')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.impl.price')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.impl.desc')}</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-gray-900 dark:text-white">{t('pricing.models.retainer.title')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.retainer.price')}</td>
                <td className="py-3 px-4 text-gray-700 dark:text-gray-300">{t('pricing.models.retainer.desc')}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-10 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">{t('roi.title')}</h2>
        <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
          {t('roi.intro')}
        </p>
        <ul className="list-disc list-inside space-y-3 mb-6 text-gray-700 dark:text-gray-300">
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
        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">{t('roi.scenario.title')}</h3>
        <ol className="list-decimal list-inside space-y-2 text-gray-700 dark:text-gray-300">
          <li>{t('roi.scenario.1')}</li>
          <li>{t('roi.scenario.2')}</li>
        </ol>
      </section>

        {/* Core Services Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI × CRM Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:-translate-y-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('services.ai_crm.title')}</h3>
              <p className="text-orange-600 text-sm mb-4 italic font-semibold">{t('services.ai_crm.subtitle')}</p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-orange-500 mr-2 font-bold">✓</span>
                  <span>{t('services.ai_crm.benefit1')}</span>
                </li>
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-orange-500 mr-2 font-bold">✓</span>
                  <span>{t('services.ai_crm.benefit2')}</span>
                </li>
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-orange-500 mr-2 font-bold">✓</span>
                  <span>{t('services.ai_crm.benefit3')}</span>
                </li>
              </ul>
              <div className="flex justify-center">
                <a href="/bookme" className="min-h-[44px] flex items-center justify-center bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 text-sm shadow-md w-full text-center touch-manipulation">
                  {t('services.ai_crm.cta')}
                </a>
              </div>
            </div>

            {/* Check-in System Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:-translate-y-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('services.checkin.title')}</h3>
              <p className="text-green-600 text-sm mb-4 italic font-semibold">{t('services.checkin.subtitle')}</p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✓</span>
                  <span>{t('services.checkin.benefit1')}</span>
                </li>
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✓</span>
                  <span>{t('services.checkin.benefit2')}</span>
                </li>
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-green-500 mr-2 font-bold">✓</span>
                  <span>{t('services.checkin.benefit3')}</span>
                </li>
              </ul>
              <div className="flex justify-center">
                <a href="/bookme" className="min-h-[44px] flex items-center justify-center bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 text-sm shadow-md w-full text-center touch-manipulation">
                  {t('services.checkin.cta')}
                </a>
              </div>
            </div>

            {/* AI Courses Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:-translate-y-1 flex flex-col">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('services.courses.title')}</h3>
              <p className="text-orange-300 text-sm mb-4 italic font-semibold">{t('services.courses.subtitle')}</p>
              <ul className="space-y-2 mb-6 flex-grow">
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-orange-200 mr-2 font-bold">✓</span>
                  <span>{t('services.courses.benefit1')}</span>
                </li>
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-orange-200 mr-2 font-bold">✓</span>
                  <span>{t('services.courses.benefit2')}</span>
                </li>
                <li className="text-gray-700 dark:text-gray-300 flex items-start">
                  <span className="text-orange-200 mr-2 font-bold">✓</span>
                  <span>{t('services.courses.benefit3')}</span>
                </li>
              </ul>
              <div className="flex justify-center">
                <a href="#contact-us" className="bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-full transition duration-300 text-sm shadow-md w-full text-center" onClick={(e) => scrollToAnchor(e, '#contact-us')}>
                  {t('services.courses.cta')}
                </a>
              </div>
            </div>
          </div>
        </section>

      

        {/* About Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-2 border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('about.title')}</h2>
          
          {/* Author Byline */}
          <div className="text-center mb-6">
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              {t('about.author.byline')} <a href="https://www.linkedin.com/in/larry-lo-804a50165/" rel="me author" className="text-orange-600 hover:text-orange-700 font-semibold">Larry Lo</a>, {t('about.author.title')}
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              {t('about.author.updated')} {new Date().toLocaleDateString(language === 'zh' ? 'zh-HK' : 'en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
          
          {/* 25秒介紹 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.intro.title')}</h3>
            <p className="text-gray-600 dark:text-yellow-300 leading-relaxed mb-4">
              {t('about.intro.p1')}
            </p>
            <p className="text-gray-600 dark:text-yellow-300 leading-relaxed mb-4">
              {t('about.intro.p2')}
            </p>
            <p className="text-gray-600 dark:text-yellow-300 leading-relaxed mb-4">
              {t('about.intro.p3')}
            </p>
          </div>

          {/* 核心品牌標籤 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.tags.title')}</h3>
            <ul className="space-y-4">
              <li className="text-gray-600 dark:text-yellow-300 leading-relaxed">
                <strong className="text-orange-600 text-lg">{t('about.tags.red_ocean.title')}:</strong>
                <br />
                {t('about.tags.red_ocean.description')}
              </li>
              <li className="text-gray-600 dark:text-yellow-300 leading-relaxed">
                <strong className="text-green-600 text-lg">{t('about.tags.desert_oasis.title')}:</strong>
                <br />
                {t('about.tags.desert_oasis.description')}
              </li>
              <li className="text-gray-600 dark:text-yellow-300 leading-relaxed">
                <strong className="text-orange-300 text-lg">{t('about.tags.community.title')}:</strong>
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
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center relative border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 transition duration-300">
              <div className="text-5xl font-bold text-orange-600 mb-4">1</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step1.title')}</h3>
              <p className="text-gray-600">{t('story.step1.description')}</p>
              <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-orange-500 text-3xl">→</div>
            </div>

            {/* Step 2: Desert Oasis */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center relative border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 transition duration-300">
              <div className="text-5xl font-bold text-green-600 mb-4">2</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step2.title')}</h3>
              <p className="text-gray-600">{t('story.step2.description')}</p>
              <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-green-500 text-3xl">→</div>
            </div>

            {/* Step 3: Coca-Cola Theory */}
            <div className="bg-gray-50 rounded-xl p-6 flex flex-col items-center text-center border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 transition duration-300">
              <div className="text-5xl font-bold text-orange-300 mb-4">3</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step3.title')}</h3>
              <p className="text-gray-600">{t('story.step3.description')}</p>
          </div>
        </div>
        </section>
        
          {/* 品牌故事線 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.story.title')}</h3>
            <p className="text-gray-600 dark:text-yellow-300 leading-relaxed">
              {t('about.story.content')}
            </p>
          </div>

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



        {/* Achievements Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('achievements.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-xl p-6 border-2 border-orange-200 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('achievements.kmb')}</h3>
              <p className="text-gray-700">{t('achievements.government')}</p>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-green-50 rounded-xl p-6 border-2 border-green-200 shadow-md">
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('achievements.sme')}</h3>
              <p className="text-gray-700">{t('achievements.engagement')}</p>
            </div>
          </div>
        </section>

        {/* Partnership Section */}
        <section id="partnership" className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-10 border-2 border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('partnership.title')}</h2>
            <p className="text-xl text-orange-600 dark:text-orange-400 font-semibold">{t('partnership.subtitle')}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Agilizing Education Center */}
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-orange-400 transition-all duration-300 shadow-md flex flex-col items-center text-center">
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-orange-500 transition-colors">{t('partnership.agilizing.title')}</h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.agilizing.desc')}</p>
            </div>

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
            <div className="bg-white dark:bg-gray-700 rounded-xl p-6 border-2 border-gray-100 dark:border-gray-600 hover:border-blue-600 transition-all duration-300 shadow-md flex flex-col items-center text-center">
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
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">{t('partnership.linkedinlocal.title')}</h3>
              </a>
              <p className="text-gray-700 dark:text-gray-300 text-sm">{t('partnership.linkedinlocal.desc')}</p>
            </div>
          </div>
        </section>

        <SolutionShowcase
          title={t('showcase.title')}
          cards={[
            {
              title: t('showcase.checkin.title'),
              subtitle: t('showcase.checkin.subtitle'),
              problemLabel: t('showcase.problem_label'),
              problem: t('showcase.checkin.problem'),
              solutionLabel: t('showcase.solution_label'),
              solution: t('showcase.checkin.solution'),
              featuresLabel: t('showcase.features_label'),
              features: t('showcase.checkin.features').split(';').map((f) => f.trim()),
              screenshotNote: t('showcase.screenshot_coming'),
              ctaHref: '/bookme',
              ctaLabel: t('showcase.checkin.cta'),
            },
            {
              title: t('showcase.booking.title'),
              subtitle: t('showcase.booking.subtitle'),
              problemLabel: t('showcase.problem_label'),
              problem: t('showcase.booking.problem'),
              solutionLabel: t('showcase.solution_label'),
              solution: t('showcase.booking.solution'),
              featuresLabel: t('showcase.features_label'),
              features: t('showcase.booking.features').split(';').map((f) => f.trim()),
              screenshotNote: t('showcase.screenshot_coming'),
              ctaHref: '/bookme',
              ctaLabel: t('showcase.booking.cta'),
            },
            {
              title: t('showcase.ai_crm.title'),
              subtitle: t('showcase.ai_crm.subtitle'),
              problemLabel: t('showcase.problem_label'),
              problem: t('showcase.ai_crm.problem'),
              solutionLabel: t('showcase.solution_label'),
              solution: t('showcase.ai_crm.solution'),
              featuresLabel: t('showcase.features_label'),
              features: [
                t('showcase.ai_crm.feature1'),
                t('showcase.ai_crm.feature2'),
                t('showcase.ai_crm.feature3'),
                t('showcase.ai_crm.feature4'),
              ],
              screenshotNote: t('showcase.screenshot_coming'),
              ctaHref: '/bookme',
              ctaLabel: t('showcase.ai_crm.cta'),
            },
          ]}
        />

        

      
     

        <section>
          <ContactUs />
        </section>
      </main>
      <footer className="py-12 text-center border-t-2 border-gray-300 dark:border-gray-700 bg-[#fffcf7] dark:bg-gray-900">
        <div className="container mx-auto px-4">
          {/* Newsletter Section */}
          <section className="mb-12">
           
          </section>

          {/* Copyright and Contact */}
          <address className="pt-8 border-t border-gray-200 dark:border-gray-700 not-italic">
            <strong>InnovateXP Limited</strong>
            <p className="text-gray-900 dark:text-gray-300">{t('footer.copyright')}</p>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Email: <a href="mailto:info@innovatexp.com" className="text-orange-600 hover:text-orange-700">info@innovatexp.com</a>
            </p>
          </address>
        </div>
      </footer>

      {/* Sticky mobile CTA - thumb-friendly, only on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-40 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-200 dark:border-gray-700 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] md:hidden">
        <a
          href="/bookme"
          className="flex items-center justify-center w-full min-h-[48px] bg-orange-500 hover:bg-orange-600 dark:bg-purple-600 dark:hover:bg-purple-700 text-white font-bold rounded-full transition duration-300 shadow-lg touch-manipulation"
          aria-label="Book a free consultation"
        >
          {t('hero.book_meeting')}
        </a>
      </div>
    </div>
  );
};

export default LandingPage;
