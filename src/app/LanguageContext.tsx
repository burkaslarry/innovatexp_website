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
    'hero.book_meeting': 'Book Business Consultation',
    
    // Bookme Page
    'bookme.title': '📅 Book Business Consultation',
    'bookme.subtitle': 'One-on-One Business Consultation',
    'bookme.header.title': 'InnovateXP Limited',
    'bookme.header.subtitle': 'Book Business Consultation',
    'bookme.header.back': '← Back to Home',
    'bookme.success.title': 'Your business consultation booking has been successful! Added to Notion calendar.',
    'bookme.success.subtitle': 'Your business consultation booking was not successful! Please contact InnovateXP Limited ASAP: info@innovatexp.com',
    'bookme.whatsapp.title': '📱 Send WhatsApp Confirmation Message',
    'bookme.whatsapp.message': 'Your booking has been successfully added to Notion calendar! Click the button below to send confirmation message to WhatsApp.',
    'bookme.whatsapp.button': 'Open WhatsApp to Send',
    'bookme.whatsapp.later': 'Later',
    'bookme.error.title': 'Please fill in all required fields and select date and time.',
    'bookme.error.email': 'Please enter a valid email address.',
    'bookme.error.slots': 'Unable to fetch available time slots',
    'bookme.error.fetch': 'Failed to fetch time slots',
    'bookme.error.booking': 'Booking failed, please try again later.',
    'bookme.error.general': 'Booking failed',
    'bookme.info.title': '📋 Booking Information',
    'bookme.info.monday_friday': '• Booking time is Monday to Friday, 9:00 AM to 5:00 PM',
    'bookme.info.one_hour': '• Each session is 1 hour of one-on-one consultation',
    'bookme.info.confirmation': '• After successful booking, you will receive confirmation email and calendar invitation',
    'bookme.info.cancel': '• For cancellation or changes, please notify 24 hours in advance',
    'bookme.info.online': '• Consultation can choose online meeting or in-person visit',
    'bookme.date.label': '📅 Select Date',
    'bookme.date.required': '* Not available on weekends (Saturday and Sunday)',
    'bookme.time.label': '⏰ Select Time (1 hour)',
    'bookme.time.select': 'Please select a date first',
    'bookme.time.loading': 'Loading...',
    'bookme.time.no_slots': 'No available time slots for this date.<br />Please select another date.',
    'bookme.time.hour': '* Each session is 1 hour of one-on-one consultation',
    'bookme.selected.title': 'Selected:',
    'bookme.visitor.title': '👤 Visitor Information',
    'bookme.visitor.name': 'Your Name',
    'bookme.visitor.email': 'Email',
    'bookme.visitor.phone': 'Contact Phone',
    'bookme.visitor.company': 'Company Name',
    'bookme.visitor.message': 'Consultation Content / Message',
    'bookme.visitor.placeholder.name': 'Please enter your name',
    'bookme.visitor.placeholder.email': 'your@email.com',
    'bookme.visitor.placeholder.phone': '+852 1234 5678',
    'bookme.visitor.placeholder.company': 'Your company name',
    'bookme.visitor.placeholder.message': 'Please briefly describe what you want to consult about, such as: AI integration solutions, system development needs, corporate training, etc...',
    'bookme.submit.processing': 'Processing...',
    'bookme.submit.confirm': 'Confirm Booking',
    'bookme.modal.success.title': 'Booking Successful',
    'bookme.modal.error.title': 'Booking Failed',

    // Services Section
    'services.title': 'Our Services',
    'services.system.title': 'System Development',
    'services.system.description': 'Custom software solutions and professional IT consulting services tailored for high-risk environments, particularly for KMB, startups and the Hong Kong SAR Government.',
    'services.ai.title': 'AI Integration & Training',
    'services.ai.description': 'Comprehensive AI integration services and enterprise training programs to leverage artificial intelligence for digital transformation.',
    'services.data.title': 'Data Analytics',
    'services.data.description': 'Pioneering data analytics solutions with proven track record of boosting user engagement by 100% and achieving strategic business outcomes.',
    'services.agile.title': 'Agile/DevOps Consulting',
    'services.agile.description': 'Secure, scalable solutions using cloud platforms and Agile/DevOps frameworks, driving innovation and efficiency across industries.',
    
    // About Section
    'about.title': 'About Us',
    'about.intro.title': 'About InnovateXP Limited',
    'about.intro.p1': "InnovateXP Limited is a cutting-edge technology consultancy founded by SAFe-certified Agile Coach, specializing in digital transformation for enterprises and government sectors.",
    'about.intro.p2': 'We leverage AI, cloud platforms, and Agile/DevOps frameworks to deliver secure, scalable solutions. Our proven expertise includes boosting user engagement by 100% and pioneering data analytics solutions for the Hong Kong SAR Government.',
    'about.intro.p3': 'At InnovateXP, we are passionate about driving innovation and efficiency across industries. Which sector would you like to transform with us today?',
    
    'about.tags.title': 'Our Core Strengths',
    'about.tags.strategic.title': 'Strategic Digital Transformation',
    'about.tags.strategic.description': 'We apply proven Agile frameworks (SAFe certification) in practice to lead enterprise digital transformation. Our strategic approach adapts to business goals, delivering measurable outcomes.',
    'about.tags.enabler.title': 'End-to-End Technology Solutions',
    'about.tags.enabler.description': 'Full lifecycle management from architectural design, development, DevOps to maintenance. We plan strategically and execute operationally, empowering your teams throughout the process.',
    'about.tags.solutionist.title': 'Innovation-Driven Problem Solving',
    'about.tags.solutionist.description': 'We proactively identify challenges and design cutting-edge solutions. Our expertise translates complex business requirements into clear technical specifications that drive real innovation.',
    'about.tags.community.title': 'Industry Leadership & Mentorship',
    'about.tags.community.description': 'Active in tech communities (Google Developer Group Hong Kong), we give back by mentoring the next generation. Our founder has coached over 1,000 tech professionals.',
    
    'about.story.title': 'Our Mission',
    'about.story.content': 'InnovateXP Limited empowers organizations through strategic digital transformation. Founded with over 13 years of industry expertise, we specialize in delivering secure, scalable solutions for Hong Kong\'s rapidly evolving IT landscape. Our proven track record includes successful cloud platform implementations and government projects that drive real business value. We are committed to nurturing innovation, building lasting partnerships, and helping businesses unlock their full potential in the digital age.',
    
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
    'hero.book_meeting': '預約業務交流',
    
    // Bookme Page
    'bookme.title': '預約業務拜訪',
    'bookme.subtitle': '一對一業務諮詢',
    'bookme.header.title': 'InnovateXP Limited',
    'bookme.header.subtitle': '預約業務拜訪',
    'bookme.header.back': '← 返回首頁',
    'bookme.success.title': '您的業務拜訪預約已成功！已添加到  InnovateXP Limited 日曆。',
    'bookme.success.subtitle': '您的業務拜訪未能預約成功！盡快聯絡InnovateXP Limited : info@innovatexp.com',
    'bookme.whatsapp.title': '📱 發送 WhatsApp 確認訊息',
    'bookme.whatsapp.message': '您的預約已成功添加到 InnovateXP Limited 日曆！點擊下方按鈕發送確認訊息到 WhatsApp。',
    'bookme.whatsapp.button': '打開 WhatsApp 發送',
    'bookme.whatsapp.later': '稍後',
    'bookme.error.title': '請填寫所有必填欄位並選擇日期和時間。',
    'bookme.error.email': '請輸入有效的電子郵件地址。',
    'bookme.error.slots': '無法獲取可用時段',
    'bookme.error.fetch': '獲取時段失敗',
    'bookme.error.booking': '預約失敗，請稍後再試。',
    'bookme.error.general': '預約失敗',
    'bookme.info.title': '📋 預約須知',
    'bookme.info.monday_friday': '• 預約時間為週一至週五，上午 9:00 至下午 5:00',
    'bookme.info.one_hour': '• 每個時段為 1 小時的一對一諮詢',
    'bookme.info.confirmation': '• 預約成功後，您將收到確認郵件及日曆邀請',
    'bookme.info.cancel': '• 如需取消或更改預約，請提前 24 小時通知',
    'bookme.info.online': '• 諮詢可選擇線上會議或實體拜訪',
    'bookme.date.label': '📅 選擇日期',
    'bookme.date.required': '* 週六、週日不開放預約',
    'bookme.time.label': '⏰ 選擇時間 (1小時)',
    'bookme.time.select': '請先選擇日期',
    'bookme.time.loading': '載入中...',
    'bookme.time.no_slots': '此日期沒有可用的時間段。<br />請選擇其他日期。',
    'bookme.time.hour': '* 每個時段為 1 小時的一對一諮詢',
    'bookme.selected.title': '已選擇：',
    'bookme.visitor.title': '👤 訪客資訊',
    'bookme.visitor.name': '您的姓名',
    'bookme.visitor.email': '電子郵件',
    'bookme.visitor.phone': '聯絡電話',
    'bookme.visitor.company': '公司名稱',
    'bookme.visitor.message': '諮詢內容 / 留言',
    'bookme.visitor.placeholder.name': '請輸入您的姓名',
    'bookme.visitor.placeholder.email': 'your@email.com',
    'bookme.visitor.placeholder.phone': '+852 1234 5678',
    'bookme.visitor.placeholder.company': '您的公司名稱',
    'bookme.visitor.placeholder.message': '請簡述您想諮詢的內容，例如：AI 整合方案、系統開發需求、企業培訓等...',
    'bookme.submit.processing': '處理中...',
    'bookme.submit.confirm': '確認預約',
    'bookme.modal.success.title': '預約成功',
    'bookme.modal.error.title': '預約失敗',

    // Services Section
    'services.title': '我們的服務',
    'services.system.title': '系統開發',
    'services.system.description': '致力提供軟件解決方案和專業IT諮詢服務，專門為高風險環境設計，昔日客戶是九巴、中小企、以及特香港特區政府部門。',
    'services.ai.title': 'AI整合與培訓',
    'services.ai.description': '全面的AI整合服務和企業培訓計劃，利用人工智能推動數碼轉型。',
    'services.data.title': '數據分析',
    'services.data.description': '開創性數據分析解決方案，擁有成功提升用戶參與度達100%和實現戰略業務成果的實績。',
    'services.agile.title': '敏捷/DevOps諮詢',
    'services.agile.description': '利用雲端平台和敏捷/DevOps框架提供安全、可擴展的解決方案，推動各行業的創新和效率。',
    
    // About Section
    'about.title': '關於我們',
    'about.intro.title': '關於 InnovateXP Limited',
    'about.intro.p1': 'InnovateXP Limited 是一間尖端科技諮詢公司，由 SAFe 認證敏捷教練創立，專門為企業和政府部門提供數碼轉型服務。',
    'about.intro.p2': '我們運用 AI、雲端平台和敏捷/DevOps 框架，提供安全、可擴展的解決方案。我們的專業實力包括成功提升用戶參與度達 100%，並為香港特區政府開創數據分析解決方案。',
    'about.intro.p3': '在 InnovateXP，我們熱衷於推動各行業的創新和效率。今日您希望與我們一起轉型哪個領域呢？',
    
    'about.tags.title': '我們的核心優勢',
    'about.tags.strategic.title': '策略性數碼轉型',
    'about.tags.strategic.description': '我們在實踐中應用經過驗證的敏捷框架（SAFe 認證），領導企業數碼轉型。我們的策略方法適應業務目標，提供可衡量的成果。',
    'about.tags.enabler.title': '端到端技術解決方案',
    'about.tags.enabler.description': '從架構設計、開發、DevOps 到維護的全生命週期管理。我們進行戰略規劃並在操作層面執行，在整個過程中賦能您的團隊。',
    'about.tags.solutionist.title': '創新驅動的問題解決',
    'about.tags.solutionist.description': '我們主動識別挑戰並設計尖端解決方案。我們的專業知識將複雜的業務需求轉化為推動真正創新的清晰技術規格。',
    'about.tags.community.title': '行業領導力與指導',
    'about.tags.community.description': '活躍於科技社群（Google Developer Group Hong Kong），我們通過指導下一代來回饋社會。我們的創辦人已指導超過 1,000 名技術專業人士。',
    
    'about.story.title': '我們的使命',
    'about.story.content': 'InnovateXP Limited 透過策略性數碼轉型賦能組織。憑藉超過 13 年的行業專業知識，我們專門為香港快速發展的 IT 環境提供安全、可擴展的解決方案。我們的成功記錄包括雲平台實施和政府項目，為企業帶來真正的商業價值。我們致力於培育創新、建立持久的合作夥伴關係，並幫助企業在數碼時代釋放其全部潛力。',
    
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
