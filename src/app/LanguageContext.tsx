"use client"
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'zh';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const translations = {
  en: {
    // Header
    'header.title': 'InnovateXP Limited',
    'header.subtitle': 'Cutting-edge software solutions and expert IT consulting services.',
    
    // Hero Section
    'hero.title': 'Transform Your Business with InnovateXP',
    'hero.description': "Leverage our expertise in software development and IT consulting to achieve your goals. Let's build the future together.",
    'hero.cta': 'Contact Us',
    
    // Services Section
    'services.title': 'Our Services',
    'services.web.title': 'Web Development',
    'services.web.description': 'Custom web applications tailored to your business needs.',
    'services.mobile.title': 'Mobile App Development',
    'services.mobile.description': 'Native and cross-platform mobile apps for iOS and Android.',
    'services.cloud.title': 'Cloud Computing',
    'services.cloud.description': 'Scalable and secure cloud solutions for your infrastructure.',
    'services.data.title': 'Data Analytics',
    'services.data.description': 'Data-driven insights to improve your business performance.',
    
    // About Section
    'about.title': 'About Us',
    'about.intro.title': 'Introduction',
    'about.intro.p1': "Hello, I'm Larry Lo, a SAFe-certified Agile Coach and IT leader with over 13 years of experience in digital transformation.",
    'about.intro.p2': 'I specialize in leveraging AI, cloud platforms, and Agile/DevOps frameworks to deliver secure, scalable solutions for high-risk environments, particularly in Hong Kong SAR Government projects. I have a proven track record of boosting user engagement by 100% and leading teams to achieve strategic business outcomes, such as pioneering data analytics solutions for the Hong Kong Government.',
    'about.intro.p3': 'I am passionate about driving innovation and efficiency. Which industry would you like to transform or recommend today?',
    
    'about.tags.title': 'Core Brand Tags',
    'about.tags.strategic.title': 'Strategic Agile Leader',
    'about.tags.strategic.description': 'Not just understanding Agile frameworks (full SAFe certification), but applying them in practice to lead teams through digital transformation. A strategist who adapts to business goals, not a dogmatic Agile executor.',
    'about.tags.enabler.title': 'End-to-End Tech Enabler',
    'about.tags.enabler.description': 'Possessing full lifecycle management capabilities from architectural design, development, DevOps to maintenance. Able to plan at the strategic level and ensure execution at the operational level, while empowering team members.',
    'about.tags.solutionist.title': 'Innovation-Driven Solutionist',
    'about.tags.solutionist.description': 'Proactively anticipating problems, designing solutions, and having founded companies (De Morgan Lab, InnovateXP). Able to translate complex business requirements into clear technical specifications and drive innovation.',
    'about.tags.community.title': 'Community Impact Builder',
    'about.tags.community.description': 'Actively involved in communities (Google Developer Group Hong Kong, JCI Peninsula), not only enhancing personal brand but also demonstrating passion and leadership in giving back to society and nurturing talent. Has coached over 1,000 tech professionals.',
    
    'about.story.title': 'Brand Storyline',
    'about.story.content': 'Larry Lo is a Strategic Agile Leader with over 13 years of experience, skilled at leading teams to achieve digital transformation and efficient delivery in Hong Kong\'s rapidly changing IT environment through End-to-End Tech Enablement. He is not only a SAFe-certified Agile Coach but also an Innovation-Driven Solutionist who has successfully promoted multiple critical secure cloud platforms and government projects. As a Community Impact Builder (organizer of Google Developer Group Hong Kong), he is passionate about nurturing the next generation of tech talent and helping businesses and teams unleash their full potential through exceptional leadership.',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Please leave a message, we will get back to you as soon as possible.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email Address',
    'contact.form.content': 'Content',
    'contact.form.placeholder': 'Please fill in',
    'contact.form.submit': 'Send Email',
    'contact.form.success': 'Email Sent',
    
    // Footer
    'footer.copyright': '© 2025 InnovateXP Limited. All rights reserved.',
  },
  zh: {
    // Header
    'header.title': 'InnovateXP Limited',
    'header.subtitle': 'AI整合、企業培訓、致力捷供軟件解決方案和專業IT諮詢服務。',
    
    // Hero Section
    'hero.title': '與 InnovateXP 一起數碼轉型，您的業務更上一層樓',
    'hero.description': '運用我們在軟件開發和IT諮詢方面的專業知識來實現您的目標。讓我們一起構建未來。',
    'hero.cta': '聯絡我們',
    
    // Services Section
    'services.title': '我們的服務',
    'services.web.title': '網頁開發',
    'services.web.description': '為您的業務需求，度身訂造網頁應用程式。',
    'services.mobile.title': '移動應用程式開發',
    'services.mobile.description': '為 iOS 和 Android 提供原生和跨平台移動應用程式。',
    'services.cloud.title': '雲端運算',
    'services.cloud.description': '為您的基礎設施提供可擴展且安全的雲端解決方案。',
    'services.data.title': '數據分析',
    'services.data.description': '數據驅動的洞察力來提升您的業務績效。',
    
    // About Section
    'about.title': '關於我們',
    'about.intro.title': '自我介紹',
    'about.intro.p1': '你好，我係Larry Lo，一位SAFe認證嘅敏捷教練同IT領袖，擁有超過13年數碼轉型經驗。',
    'about.intro.p2': '我專注於利用AI、雲端平台同敏捷/DevOps框架，為高風險環境提供安全、可擴展嘅解決方案，特別係香港特區政府項目。我有成功提升用戶參與度達100%，並帶領團隊實現戰略業務成果嘅實績，例如為香港政府開創數據分析方案。',
    'about.intro.p3': '我熱衷於推動創新同效率。今日您希望轉型或推薦邊個行業呢？',
    
    'about.tags.title': '核心品牌標籤',
    'about.tags.strategic.title': '策略型敏捷領袖',
    'about.tags.strategic.description': '不僅懂敏捷框架（SAFe全套認證），更能將其應用於實戰，領導團隊進行數位轉型。不是教條式的敏捷執行者，而是能根據企業目標進行調整的策略家。',
    'about.tags.enabler.title': '端到端技術賦能者',
    'about.tags.enabler.description': '擁有從架構設計、開發、DevOps 到維護的全生命週期管理能力。能夠從戰略層面規劃，也能在執行層面確保落地，並能賦能團隊成員。',
    'about.tags.solutionist.title': '創新驅動的「Solutionist」',
    'about.tags.solutionist.description': '主動預見問題，設計解決方案，曾創辦公司（De Morgan Lab, InnovateXP）。能夠將複雜的業務需求轉化為清晰的技術規格，並推動創新。',
    'about.tags.community.title': '社群影響力構建者',
    'about.tags.community.description': '積極投入社群（Google Developer Group Hong Kong, JCI Peninsula），不僅提升了個人品牌，更展現了回饋社會、培養人才的熱情和領導力。曾指導超過1,000名技術專業人士。',
    
    'about.story.title': '品牌故事線',
    'about.story.content': 'Larry Lo 是一位擁有超過 13 年經驗的 策略型敏捷領袖，他擅長在香港快速變遷的 IT 環境中，透過 端到端的技術賦能，帶領團隊實現數位轉型與高效交付。他不僅是擁有 SAFe 全套認證的 敏捷教練，更是一位 創新驅動的「Solutionist」，曾成功推動多個關鍵安全雲平台與政府項目。作為 社群影響力構建者（Google Developer Group Hong Kong 的組織者），他熱衷於培育新一代技術人才，並透過卓越的領導力，幫助企業和團隊釋放最大潛能。',
    
    // Contact Section
    'contact.title': '聯絡我們',
    'contact.subtitle': '請留下訊息，我們會盡快回覆您。',
    'contact.form.name': '姓名',
    'contact.form.email': '電郵地址',
    'contact.form.content': '內容',
    'contact.form.placeholder': '請填寫',
    'contact.form.submit': '發送電郵',
    'contact.form.success': '電郵已發送',
    
    // Footer
    'footer.copyright': '© 2025 InnovateXP Limited. 版權所有。',
  },
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('en');

  useEffect(() => {
    // Load language from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('language') as Language;
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'zh')) {
        setLanguageState(savedLanguage);
      }
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    if (typeof window !== 'undefined') {
      localStorage.setItem('language', lang);
    }
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};


