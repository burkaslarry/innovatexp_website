"use client"
import React from 'react';
import ContactUs from './ContactUs';
import Image from 'next/image';
import { useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import LanguageSwitcher from './LanguageSwitcher';


function LandingPage() {
  const { t } = useLanguage();

  useEffect(() => {
    async function fetchData() {

    }
    fetchData();
  }, []);


  return (
    <div className="bg-black min-h-screen">
      <header className="bg-black shadow-md">
        <div className="container mx-auto py-6 px-4 flex items-center justify-between">
          <div className="flex items-center">
            <Image
              src="/innovatexp_color_no_bg.svg"
              alt="InnovateXP Limited Logo"
              width={50}
              height={50}
              className="mr-4"
            />
            <div>
              <h1 className="text-2xl font-bold text-white">{t('header.title')}</h1>
              <p className="text-1xl text-white">{t('header.subtitle')}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      <main className="container mx-auto py-12 px-4 bg-black">
      {/* Hero Section */}
      <section
          className="mb-12 text-center rounded-lg shadow-lg overflow-hidden" 
          style={{ backgroundImage: 'url(/4307506.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} >
            <div className="bg-black bg-opacity-60 text-white p-8 flex flex-col items-center"> 
              <div className="md:w-3/4 lg:w-1/2"> 
                <h2 className="text-4xl font-bold mb-4">{t('hero.title')}</h2>
                {/* New Tagline */}
                <p className="text-3xl font-bold text-purple-400 mb-6">
                  {t('hero.tagline')}
                </p>
                <p className="text-lg mb-6">
                  {t('hero.description')}
                </p>
                <div className="flex gap-4 justify-center">
                  <a href="#contact-us" className="bg-white text-blue-600 font-semibold py-2 px-6 rounded-full hover:bg-gray-100 transition duration-300 inline-block">{t('hero.cta')}</a>
                  <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-6 rounded-full hover:bg-purple-700 transition duration-300 inline-block">{t('hero.book_meeting')}</a>
                </div>
              </div>
            </div>
        </section>

        {/* Core Services Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* AI × CRM Card */}
            <div className="bg-[#301934] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-2">{t('services.ai_crm.title')}</h3>
              <p className="text-purple-300 text-sm mb-4 italic">{t('services.ai_crm.subtitle')}</p>
              <ul className="space-y-2 mb-4">
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.ai_crm.benefit1')}</span>
                </li>
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.ai_crm.benefit2')}</span>
                </li>
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.ai_crm.benefit3')}</span>
                </li>
              </ul>
              <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-sm">
                {t('services.ai_crm.cta')}
              </a>
            </div>

            {/* Check-in System Card */}
            <div className="bg-[#301934] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-2">{t('services.checkin.title')}</h3>
              <p className="text-purple-300 text-sm mb-4 italic">{t('services.checkin.subtitle')}</p>
              <ul className="space-y-2 mb-4">
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.checkin.benefit1')}</span>
                </li>
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.checkin.benefit2')}</span>
                </li>
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.checkin.benefit3')}</span>
                </li>
              </ul>
              <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-sm">
                {t('services.checkin.cta')}
              </a>
            </div>

            {/* AI Courses Card */}
            <div className="bg-[#301934] rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 p-6 hover:-translate-y-1">
              <h3 className="text-2xl font-bold text-white mb-2">{t('services.courses.title')}</h3>
              <p className="text-purple-300 text-sm mb-4 italic">{t('services.courses.subtitle')}</p>
              <ul className="space-y-2 mb-4">
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.courses.benefit1')}</span>
                </li>
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.courses.benefit2')}</span>
                </li>
                <li className="text-violet-200 flex items-start">
                  <span className="text-purple-400 mr-2">✓</span>
                  <span>{t('services.courses.benefit3')}</span>
                </li>
              </ul>
              <a href="#contact-us" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-sm">
                {t('services.courses.cta')}
              </a>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="mb-12 bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg p-8">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">{t('story.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {/* Step 1: Red Ocean */}
            <div className="bg-black bg-opacity-40 rounded-lg p-6 flex flex-col items-center text-center relative">
              <div className="text-5xl font-bold text-purple-400 mb-4">1</div>
              <h3 className="text-xl font-bold text-white mb-3">{t('story.step1.title')}</h3>
              <p className="text-violet-200">{t('story.step1.description')}</p>
              <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-purple-400 text-3xl">→</div>
            </div>

            {/* Step 2: Desert Oasis */}
            <div className="bg-black bg-opacity-40 rounded-lg p-6 flex flex-col items-center text-center relative">
              <div className="text-5xl font-bold text-purple-400 mb-4">2</div>
              <h3 className="text-xl font-bold text-white mb-3">{t('story.step2.title')}</h3>
              <p className="text-violet-200">{t('story.step2.description')}</p>
              <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 text-purple-400 text-3xl">→</div>
            </div>

            {/* Step 3: Coca-Cola Theory */}
            <div className="bg-black bg-opacity-40 rounded-lg p-6 flex flex-col items-center text-center">
              <div className="text-5xl font-bold text-purple-400 mb-4">3</div>
              <h3 className="text-xl font-bold text-white mb-3">{t('story.step3.title')}</h3>
              <p className="text-violet-200">{t('story.step3.description')}</p>
            </div>
          </div>
        </section>

      

        {/* About Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">{t('about.title')}</h2>
          
          {/* 25秒介紹 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">{t('about.intro.title')}</h3>
            <p className="text-violet-200 leading-relaxed mb-4">
              {t('about.intro.p1')}
            </p>
            <p className="text-violet-200 leading-relaxed mb-4">
              {t('about.intro.p2')}
            </p>
            <p className="text-violet-200 leading-relaxed mb-4">
              {t('about.intro.p3')}
            </p>
          </div>

          {/* 核心品牌標籤 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">{t('about.tags.title')}</h3>
            <ul className="space-y-4">
              <li className="text-violet-200 leading-relaxed">
                <strong className="text-white text-lg">{t('about.tags.red_ocean.title')}:</strong>
                <br />
                {t('about.tags.red_ocean.description')}
              </li>
              <li className="text-violet-200 leading-relaxed">
                <strong className="text-white text-lg">{t('about.tags.desert_oasis.title')}:</strong>
                <br />
                {t('about.tags.desert_oasis.description')}
              </li>
              <li className="text-violet-200 leading-relaxed">
                <strong className="text-white text-lg">{t('about.tags.community.title')}:</strong>
                <br />
                {t('about.tags.community.description')}
              </li>
            </ul>
          </div>

          {/* 品牌故事線 */}
          <div className="mb-8">
            <h3 className="text-2xl font-semibold text-white mb-4">{t('about.story.title')}</h3>
            <p className="text-violet-200 leading-relaxed">
              {t('about.story.content')}
            </p>
          </div>

          {/* 社交媒體連結 */}
          <div className="mt-6 flex gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/in/larry-lo-804a50165/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#0077B5] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#005885] transition duration-300"
            >
              LinkedIn
            </a>
            <a 
              href="https://github.com/burkaslarry" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#333] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#555] transition duration-300"
            >
              GitHub
            </a>
          </div>
        </section>



        {/* Achievements Section */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6 text-center">{t('achievements.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">{t('achievements.kmb')}</h3>
              <p className="text-violet-200">{t('achievements.government')}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-900 to-purple-800 rounded-lg p-6">
              <h3 className="text-xl font-bold text-white mb-3">{t('achievements.sme')}</h3>
              <p className="text-violet-200">{t('achievements.engagement')}</p>
            </div>
          </div>
          <div className="mt-6 bg-[#301934] rounded-lg p-6 text-center">
            <p className="text-lg text-white font-semibold mb-2">成功案例</p>
            <p className="text-violet-200">{t('achievements.case')}</p>
          </div>
        </section>

        {/* Product Showcase Sections */}
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-8 text-center">{t('showcase.title')}</h2>
          
          {/* Responsive Grid: Mobile 1 column × 3 rows, Desktop 1 row × 3 columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Check-in System Showcase */}
            <div className="bg-[#301934] rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-3">{t('showcase.checkin.title')}</h3>
              <p className="text-purple-300 text-sm mb-4 italic">{t('showcase.checkin.subtitle')}</p>
              <div className="mb-3 flex-grow">
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.problem_label')}</p>
                <p className="text-violet-200 text-sm mb-3">{t('showcase.checkin.problem')}</p>
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.solution_label')}</p>
                <p className="text-violet-200 text-sm mb-3">{t('showcase.checkin.solution')}</p>
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.features_label')}</p>
                <ul className="list-disc list-inside text-violet-200 text-sm space-y-1">
                  {t('showcase.checkin.features').split(';').map((feature, idx) => (
                    <li key={idx}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-400 italic mb-2">📸 {t('showcase.screenshot_coming')}</p>
                <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-sm w-full text-center">
                  {t('showcase.checkin.cta')}
                </a>
              </div>
            </div>

            {/* Booking System Showcase */}
            <div className="bg-[#301934] rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-3">{t('showcase.booking.title')}</h3>
              <p className="text-purple-300 text-sm mb-4 italic">{t('showcase.booking.subtitle')}</p>
              <div className="mb-3 flex-grow">
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.problem_label')}</p>
                <p className="text-violet-200 text-sm mb-3">{t('showcase.booking.problem')}</p>
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.solution_label')}</p>
                <p className="text-violet-200 text-sm mb-3">{t('showcase.booking.solution')}</p>
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.features_label')}</p>
                <ul className="list-disc list-inside text-violet-200 text-sm space-y-1">
                  {t('showcase.booking.features').split(';').map((feature, idx) => (
                    <li key={idx}>{feature.trim()}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-400 italic mb-2">📸 {t('showcase.screenshot_coming')}</p>
                <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-sm w-full text-center">
                  {t('showcase.booking.cta')}
                </a>
              </div>
            </div>

            {/* AI × CRM Showcase */}
            <div className="bg-[#301934] rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold text-white mb-3">{t('showcase.ai_crm.title')}</h3>
              <p className="text-purple-300 text-sm mb-4 italic">{t('showcase.ai_crm.subtitle')}</p>
              <div className="mb-3 flex-grow">
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.problem_label')}</p>
                <p className="text-violet-200 text-sm mb-3">{t('showcase.ai_crm.problem')}</p>
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.solution_label')}</p>
                <p className="text-violet-200 text-sm mb-3">{t('showcase.ai_crm.solution')}</p>
                <p className="text-purple-300 font-semibold text-sm mb-1">{t('showcase.features_label')}</p>
                <ul className="list-disc list-inside text-violet-200 text-sm space-y-1">
                  <li>{t('showcase.ai_crm.feature1')}</li>
                  <li>{t('showcase.ai_crm.feature2')}</li>
                  <li>{t('showcase.ai_crm.feature3')}</li>
                  <li>{t('showcase.ai_crm.feature4')}</li>
                </ul>
              </div>
              <div className="mt-4">
                <p className="text-xs text-gray-400 italic mb-2">📸 {t('showcase.screenshot_coming')}</p>
                <a href="/bookme" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-sm w-full text-center">
                  {t('showcase.ai_crm.cta')}
                </a>
              </div>
            </div>

          </div>
        </section>

      
     
    
        <section>
          <ContactUs />
        </section>
      </main>
      <footer id="contact-us" className="bg-black py-4 text-center">
        <p className="text-white">{t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default LandingPage;
