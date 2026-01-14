"use client"
import React from 'react';
import ContactUs from './ContactUs';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';


function LandingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchData() {

    }
    fetchData();
  }, []);


  return (
    <div className="min-h-screen bg-[#fffcf7] dark:bg-gray-900 transition-colors duration-200">
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b-2 border-gray-200 dark:border-gray-700">
        <div className="container mx-auto py-6 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/innovatexp_black.svg"
              alt="InnovateXP Limited Logo"
              width={50}
              height={50}
              className="mr-4 dark:invert"
            />
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{t('header.title')}</h1>
              <p className="text-1xl text-gray-600 dark:text-gray-300">{t('header.subtitle')}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 bg-[#fffcf7] dark:bg-gray-900">
      {/* Hero Section */}
      <section className="mb-16 text-center bg-white dark:bg-gray-800 rounded-2xl shadow-md p-12 border border-gray-200 dark:border-gray-700">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white">{t('hero.title')}</h2>
          {/* New Tagline */}
          <p className="text-2xl text-orange-600 mb-6 font-bold">
            {t('hero.tagline')}
          </p>
          <p className="text-lg mb-8 text-gray-600 dark:text-white leading-relaxed">
            {t('hero.description')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/bookme" className="bg-gradient-to-r from-orange-500 to-orange-600 dark:from-purple-700 dark:to-purple-800 text-white font-bold py-4 px-10 rounded-full hover:from-orange-600 hover:to-orange-700 dark:hover:from-purple-800 dark:hover:to-purple-900 transition duration-300 text-lg shadow-lg transform hover:scale-105">
              {t('hero.book_meeting')}
            </a>
            <a href="#contact-us" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-white font-bold py-4 px-10 rounded-full hover:bg-gray-50 dark:hover:bg-gray-800 transition duration-300 text-lg shadow-md border-2 border-gray-300 dark:border-gray-700 transform hover:scale-105">
              {t('hero.cta')}
            </a>
          </div>
        </div>
      </section>

        {/* Vision Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-10 border-2 border-gray-200 dark:border-gray-700 shadow-md">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('vision.title')}</h2>
            <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-1">{t('vision.brand')}</p>
            <p className="text-2xl text-orange-600 dark:text-orange-400 font-bold tracking-wider">{t('vision.tagline')}</p>
          </div>
          
          {/* Team Photo */}
          <div className="max-w-3xl mx-auto mb-8">
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/mypresent.jpg"
                alt="InnovateXP Team"
                width={1200}
                height={800}
                className="w-full h-auto object-cover"
                priority
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

        {/* Core Services Section */}
        <section className="mb-16">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI × CRM Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-orange-400 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('services.ai_crm.title')}</h3>
              <p className="text-orange-600 text-sm mb-4 italic font-semibold">{t('services.ai_crm.subtitle')}</p>
              <ul className="space-y-2 mb-4">
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
              <a href="/bookme" className="bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold py-2 px-4 rounded-full hover:from-orange-600 hover:to-orange-700 transition duration-300 inline-block text-sm shadow-md">
                {t('services.ai_crm.cta')}
              </a>
            </div>

            {/* Check-in System Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-green-400 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('services.checkin.title')}</h3>
              <p className="text-green-600 text-sm mb-4 italic font-semibold">{t('services.checkin.subtitle')}</p>
              <ul className="space-y-2 mb-4">
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
              <a href="/bookme" className="bg-gradient-to-r from-green-500 to-green-600 text-white font-bold py-2 px-4 rounded-full hover:from-green-600 hover:to-green-700 transition duration-300 inline-block text-sm shadow-md">
                {t('services.checkin.cta')}
              </a>
            </div>

            {/* AI Courses Card */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md hover:shadow-xl transition-all duration-200 p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-yellow-400 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('services.courses.title')}</h3>
              <p className="text-orange-300 text-sm mb-4 italic font-semibold">{t('services.courses.subtitle')}</p>
              <ul className="space-y-2 mb-4">
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
              <a href="#contact-us" className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-white font-bold py-2 px-4 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition duration-300 inline-block text-sm shadow-md">
                {t('services.courses.cta')}
              </a>
            </div>
          </div>
        </section>

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

      

        {/* About Section */}
        <section className="mb-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-md border-2 border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">{t('about.title')}</h2>
          
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

          {/* 品牌故事線 */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{t('about.story.title')}</h3>
            <p className="text-gray-600 dark:text-yellow-300 leading-relaxed">
              {t('about.story.content')}
            </p>
          </div>

          {/* 社交媒體連結 */}
          <div className="mt-6 flex gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/larry-lo-804a50165/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#0077B5] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#005885] transition duration-300 shadow-md"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/burkaslarry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300 shadow-md"
            >
              GitHub
            </a>
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

        {/* Product Showcase Sections */}
        <section className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">{t('showcase.title')}</h2>
          
          {/* Responsive Grid: Mobile 1 column × 3 rows, Desktop 1 row × 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
              {/* Check-in System Showcase */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('showcase.checkin.title')}</h3>
              <p className="text-orange-600 text-sm mb-4 italic">{t('showcase.checkin.subtitle')}</p>
              <div className="mb-3 flex-grow">
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.problem_label')}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{t('showcase.checkin.problem')}</p>
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.solution_label')}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{t('showcase.checkin.solution')}</p>
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.features_label')}</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  {t('showcase.checkin.features').split(';').map((feature, idx) => (
                    <li key={idx}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-400 italic mb-2">📸 {t('showcase.screenshot_coming')}</p>
                <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-100 transition duration-300 inline-block text-sm w-full text-center">
                  {t('showcase.checkin.cta')}
                </a>
              </div>
            </div>

              {/* Booking System Showcase */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('showcase.booking.title')}</h3>
              <p className="text-orange-600 text-sm mb-4 italic">{t('showcase.booking.subtitle')}</p>
              <div className="mb-3 flex-grow">
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.problem_label')}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{t('showcase.booking.problem')}</p>
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.solution_label')}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{t('showcase.booking.solution')}</p>
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.features_label')}</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  {t('showcase.booking.features').split(';').map((feature, idx) => (
                    <li key={idx}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-400 italic mb-2">📸 {t('showcase.screenshot_coming')}</p>
                <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-100 transition duration-300 inline-block text-sm w-full text-center">
                  {t('showcase.booking.cta')}
                </a>
              </div>
            </div>

              {/* AI × CRM Showcase */}
              <div className="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{t('showcase.ai_crm.title')}</h3>
              <p className="text-orange-600 text-sm mb-4 italic">{t('showcase.ai_crm.subtitle')}</p>
              <div className="mb-3 flex-grow">
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.problem_label')}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{t('showcase.ai_crm.problem')}</p>
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.solution_label')}</p>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{t('showcase.ai_crm.solution')}</p>
                <p className="text-orange-600 font-semibold text-sm mb-1">{t('showcase.features_label')}</p>
                <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm space-y-1">
                  <li>{t('showcase.ai_crm.feature1')}</li>
                  <li>{t('showcase.ai_crm.feature2')}</li>
                  <li>{t('showcase.ai_crm.feature3')}</li>
                  <li>{t('showcase.ai_crm.feature4')}</li>
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-400 italic mb-2">📸 {t('showcase.screenshot_coming')}</p>
                <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-orange-100 transition duration-300 inline-block text-sm w-full text-center">
                  {t('showcase.ai_crm.cta')}
                </a>
              </div>
            </div>

          </div>
        </section>

        {/* Pricing Section */}
          <section className="mb-12">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-3">{t('pricing.title')}</h2>
            <p className="text-xl text-orange-600 mb-4">{t('pricing.subtitle')}</p>
            <div className="bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-white font-bold text-lg">🎉 {t('pricing.promotion')}</p>
              <p className="text-white">{t('pricing.promotion_detail')}</p>
            </div>
          </div>

          {/* InsightEvent Pricing */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.insight.name')}</h3>
              <p className="text-2xl text-orange-600 font-semibold mb-2">{t('pricing.insight.tagline')}</p>
              <p className="text-lg text-orange-600 italic mb-3">{t('pricing.insight.subtitle')}</p>
              <p className="text-gray-600 max-w-3xl mx-auto mb-2">{t('pricing.insight.description')}</p>
              <p className="text-orange-600 font-semibold">{t('pricing.insight.value')}</p>
            </div>
            
            {/* Pricing Cards - Mobile: 1 col, Desktop: 3 cols */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              
              {/* Tier 1: Professional */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 transition duration-300">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.insight.tier1.name')}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600">{t('pricing.insight.tier1.price')}</span>
                  <span className="text-white text-lg">{t('pricing.insight.tier1.period')}</span>
                </div>
                <p className="text-sm text-violet-500 mb-4">{t('pricing.insight.tier1.target')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier1.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier1.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier1.feature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier1.feature4')}</span>
                  </li>
                </ul>
                <a href="/bookme" className="block w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-orange-100 transition duration-300 text-center">
                  {t('pricing.cta')}
                </a>
              </div>

              {/* Tier 2: AI Growth - Featured */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 border-4 border-yellow-400 relative transform md:scale-105 shadow-2xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white font-bold py-1 px-6 rounded-full text-sm">
                  {t('pricing.insight.tier2.badge')}
                </div>
                <h4 className="text-2xl font-bold text-white mb-1 mt-2">{t('pricing.insight.tier2.name')}</h4>
                <div className="mb-3">
                  <span className="text-3xl font-bold text-orange-100">{t('pricing.insight.tier2.price')}</span>
                  <span className="text-white text-lg">{t('pricing.insight.tier2.period')}</span>
                  <p className="text-orange-300 text-sm mt-1">{t('pricing.insight.tier2.subtitle')}</p>
                </div>
                <p className="text-sm text-orange-100 mb-3">{t('pricing.insight.tier2.target')}</p>
                <ul className="space-y-2 mb-3">
                  <li className="flex items-start">
                    <span className="text-orange-100 mr-2 flex-shrink-0">★</span>
                    <span className="text-white text-sm font-semibold">{t('pricing.insight.tier2.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-100 mr-2 flex-shrink-0">★</span>
                    <span className="text-white text-xs leading-relaxed">{t('pricing.insight.tier2.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-100 mr-2 flex-shrink-0">★</span>
                    <span className="text-white text-xs leading-relaxed">{t('pricing.insight.tier2.feature3')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-100 mr-2 flex-shrink-0">★</span>
                    <span className="text-white text-xs leading-relaxed">{t('pricing.insight.tier2.feature4')}</span>
                  </li>
                </ul>
                <div className="bg-orange-50 border-2 border-orange-200 rounded-lg p-3 mb-4">
                  <p className="text-orange-500 text-xs leading-relaxed">{t('pricing.insight.tier2.note')}</p>
                </div>
                <a href="/bookme" className="block w-full bg-yellow-500 text-white font-bold py-3 rounded-full hover:bg-yellow-400 transition duration-300 text-center">
                  {t('pricing.cta')}
                </a>
              </div>

              {/* Tier 3: Enterprise */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 transition duration-300">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.insight.tier3.name')}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600">{t('pricing.insight.tier3.price')}</span>
                  <span className="text-white text-sm block">{t('pricing.insight.tier3.period')}</span>
                </div>
                <p className="text-sm text-violet-500 mb-4">{t('pricing.insight.tier3.target')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier3.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier3.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.insight.tier3.feature3')}</span>
                  </li>
                </ul>
                <a href="/bookme" className="block w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-orange-100 transition duration-300 text-center">
                  {t('pricing.contact')}
                </a>
              </div>

            </div>
          </div>

          {/* SmartSales CRM Pricing */}
          <div className="mb-12">
            <div className="text-center mb-6">
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.crm.name')}</h3>
              <p className="text-2xl text-orange-600 font-semibold mb-2">{t('pricing.crm.tagline')}</p>
              <p className="text-lg text-orange-600 italic mb-3">{t('pricing.crm.subtitle')}</p>
              <p className="text-gray-600 max-w-3xl mx-auto mb-2">{t('pricing.crm.description')}</p>
              <p className="text-orange-600 font-semibold mb-6">{t('pricing.crm.value')}</p>
            </div>

            {/* AI Feature Deep Dive */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 max-w-5xl mx-auto">
              <div className="bg-gray-50 dark:bg-purple-900 rounded-lg p-4">
                <h5 className="text-black dark:text-white font-bold mb-2">✍️ {t('pricing.crm.feature1.title')}</h5>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.feature1.desc')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-purple-900 rounded-lg p-4">
                <h5 className="text-black dark:text-white font-bold mb-2">📅 {t('pricing.crm.feature2.title')}</h5>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.feature2.desc')}</p>
              </div>
              <div className="bg-gray-50 dark:bg-purple-900 rounded-lg p-4">
                <h5 className="text-black dark:text-white font-bold mb-2">📊 {t('pricing.crm.feature3.title')}</h5>
                <p className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.feature3.desc')}</p>
              </div>
            </div>
            
            {/* Pricing Cards - Mobile: 1 col, Desktop: 3 cols */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Starter */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 transition duration-300">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.crm.tier1.name')}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-600">{t('pricing.crm.tier1.price')}</span>
                  <span className="text-white text-lg">{t('pricing.crm.tier1.period')}</span>
                </div>
                <p className="text-sm text-violet-500 mb-4">{t('pricing.crm.tier1.target')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.tier1.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.tier1.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.tier1.feature3')}</span>
                  </li>
                </ul>
                <a href="/bookme" className="block w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-orange-100 transition duration-300 text-center">
                  {t('pricing.cta')}
                </a>
              </div>

              {/* Pro - Featured */}
              <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 border-4 border-yellow-400 relative transform md:scale-105 shadow-2xl">
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-yellow-500 text-white font-bold py-1 px-6 rounded-full text-sm">
                  {t('pricing.crm.tier2.badge')}
                </div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 mt-2">{t('pricing.crm.tier2.name')}</h4>
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-200">{t('pricing.crm.tier2.price')}</span>
                  <span className="text-white text-lg">{t('pricing.crm.tier2.period')}</span>
                </div>
                <p className="text-sm text-orange-200 mb-4">{t('pricing.crm.tier2.target')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-orange-200 mr-2">★</span>
                    <span className="text-white text-sm">{t('pricing.crm.tier2.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-300 mr-2">★</span>
                    <span className="text-white text-sm">{t('pricing.crm.tier2.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-300 mr-2">★</span>
                    <span className="text-white text-sm">{t('pricing.crm.tier2.feature3')}</span>
                  </li>
                </ul>
                <a href="/bookme" className="block w-full bg-yellow-500 text-white font-bold py-3 rounded-full hover:bg-yellow-400 transition duration-300 text-center">
                  {t('pricing.cta')}
                </a>
              </div>

              {/* Setup Fee */}
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-600 transition duration-300">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{t('pricing.crm.tier3.name')}</h4>
                <div className="mb-4">
                  <span className="text-2xl font-bold text-orange-600">{t('pricing.crm.tier3.price')}</span>
                  <span className="text-white text-sm block">{t('pricing.crm.tier3.period')}</span>
                </div>
                <p className="text-sm text-violet-500 mb-4">{t('pricing.crm.tier3.target')}</p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.tier3.feature1')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.tier3.feature2')}</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <span className="text-gray-600 dark:text-gray-300 text-sm">{t('pricing.crm.tier3.feature3')}</span>
                  </li>
                </ul>
                <a href="/bookme" className="block w-full bg-purple-600 text-white font-semibold py-3 rounded-full hover:bg-orange-100 transition duration-300 text-center">
                  {t('pricing.contact')}
                </a>
              </div>

            </div>
          </div>

        </section>

      
     

        <section>
          <ContactUs />
        </section>
      </main>
      <footer id="contact-us" className="py-6 text-center border-t-2 border-gray-300 dark:border-gray-700 bg-[#fffcf7] dark:bg-gray-900">
        <p className="text-gray-900 dark:text-gray-300">{t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default LandingPage;
