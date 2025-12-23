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
      <section
          className="mb-12 text-center rounded-lg shadow-lg overflow-hidden" 
          style={{ backgroundImage: 'url(/4307506.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} >
            <div className="bg-black bg-opacity-60 text-white p-8 flex flex-col items-center"> 
              <div className="md:w-3/4 lg:w-1/2"> 
                <h2 className="text-4xl font-bold mb-4">{t('hero.title')}</h2>
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
        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-4">{t('services.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* System Development Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">{t('services.system.title')}</h3>
            <p className="text-violet-200">{t('services.system.description')}</p>
          </div>

          {/* AI Integration & Training Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">{t('services.ai.title')}</h3>
            <p className="text-violet-200">{t('services.ai.description')}</p>
          </div>

          {/* Data Analytics Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">{t('services.data.title')}</h3>
            <p className="text-violet-200">{t('services.data.description')}</p>
          </div>

          {/* Agile/DevOps Consulting Card */}
          <div className="bg-[#301934] rounded-lg shadow-sm hover:shadow-md transition-all duration-200 p-6 hover:-translate-y-1">
            <h3 className="text-xl font-semibold text-white mb-3">{t('services.agile.title')}</h3>
            <p className="text-violet-200">{t('services.agile.description')}</p>
          </div>
        </div>
        </section>

        <section className="mb-12">
          <h2 className="text-3xl font-semibold text-white mb-6">{t('about.title')}</h2>
          
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
                <strong className="text-white text-lg">{t('about.tags.strategic.title')}:</strong>
                <br />
                {t('about.tags.strategic.description')}
              </li>
              <li className="text-violet-200 leading-relaxed">
                <strong className="text-white text-lg">{t('about.tags.enabler.title')}:</strong>
                <br />
                {t('about.tags.enabler.description')}
              </li>
              <li className="text-violet-200 leading-relaxed">
                <strong className="text-white text-lg">{t('about.tags.solutionist.title')}:</strong>
                <br />
                {t('about.tags.solutionist.description')}
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

        <section>
          <h2 className="text-3xl font-semibold text-white mb-4">{t('contact.title')}</h2>
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
