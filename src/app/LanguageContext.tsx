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
    'header.subtitle': 'Innovate • Transform • Experience',
    
    // Hero Section
    'hero.title': 'Your Strongest AI Architect',
    'hero.tagline': 'Elevate your business with AI and Blueprint',
    'hero.description': "Leave behind high competition and low margins - create unique value with our AI-driven solutions.",
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

    // Core Services Section (Three Main Services)
    'services.title': 'Our Core Services',
    'services.ai_crm.title': 'AI × CRM',
    'services.ai_crm.subtitle': 'Intelligent Customer Management System',
    'services.ai_crm.benefit1': 'Lightning-fast responses with AI Smart Draft',
    'services.ai_crm.benefit2': 'Automated booking handling',
    'services.ai_crm.benefit3': 'Eliminate missed orders with auto-tagging',
    'services.ai_crm.cta': 'Learn About AI CRM Solution',
    'services.checkin.title': 'Check-in System',
    'services.checkin.subtitle': 'BNI Anchor Check-in System',
    'services.checkin.benefit1': 'Real-time attendee list',
    'services.checkin.benefit2': 'QR code scanning',
    'services.checkin.benefit3': 'Automated statistics',
    'services.checkin.cta': 'Learn About Check-in System',
    'services.courses.title': 'AI Courses',
    'services.courses.subtitle': 'AI Training & Practical Courses',
    'services.courses.benefit1': '200+ developer training experience',
    'services.courses.benefit2': 'Practical AI × development teaching',
    'services.courses.benefit3': 'Enterprise customized courses',
    'services.courses.cta': 'Learn About AI Courses',
    
    // About Section
    'about.title': 'About Us',
    'about.intro.title': 'About InnovateXP Limited',
    'about.intro.p1': "InnovateXP Limited - Your AI Wingman. Founded by Larry Lo, Google Developer Group Hong Kong organizer with 2017-2025 startup journey including HKSTPC incubation.",
    'about.intro.p2': 'Our philosophy: "Connect with community by passion, perfection and excellence". We help businesses escape the Red Ocean dilemma through AI-driven solutions that create unique competitive advantages.',
    'about.intro.p3': 'With proven track record in community building and tech education, we combine enterprise stability with startup innovation mindset to deliver practical, implementable AI solutions.',
    
    'about.tags.title': 'Our Vision & Philosophy',
    'about.tags.red_ocean.title': 'Red Ocean Dilemma',
    'about.tags.red_ocean.description': 'High competition, low margins, everyone doing the same thing. The Coca-Cola Theory shows that the same product can have different value based on context and environment.',
    'about.tags.desert_oasis.title': 'Desert Oasis Strategy',
    'about.tags.desert_oasis.description': 'Use AI to create unique value and escape competition. Build your own blue ocean where you stand out from the crowd.',
    'about.tags.community.title': 'Community Leadership',
    'about.tags.community.description': 'Founder Larry Lo is a Google Developer Group Hong Kong organizer with experience organizing events for 2000+ attendees. We believe in connecting with community through passion, perfection and excellence.',
    
    'about.story.title': 'Our Mission & 2026 Roadmap',
    'about.story.content': 'InnovateXP Limited empowers organizations to elevate their business with AI and Blueprint. Our 2026 roadmap includes: January - Check-In System launch, February - AI Customer Management System, March - AI Practical Handbook release, April - SME AI Practical Course. We are committed to helping businesses escape the Red Ocean and build their Desert Oasis through practical, implementable AI solutions.',
    
    // Contact Section
    'contact.title': 'Contact Us',
    'contact.subtitle': 'Please leave a message, we will get back to you as soon as possible.',
    'contact.form.name': 'Name',
    'contact.form.email': 'Email Address',
    'contact.form.content': 'Content',
    'contact.form.placeholder': 'Please fill in',
    'contact.form.submit': 'Send Email',
    'contact.form.success': 'Email Sent',
    
    // Story Section (3-Step)
    'story.title': 'Our Strategy',
    'story.step1.title': 'Red Ocean Dilemma',
    'story.step1.description': 'High competition, low margins, everyone doing the same thing',
    'story.step2.title': 'Desert Oasis',
    'story.step2.description': 'Create unique value with AI to escape competition',
    'story.step3.title': 'Cola Theory',
    'story.step3.description': 'Same product, different value based on context and environment',
    
    // Ideal Client Section
    'ideal.title': 'Ideal Referral / Ideal Client Profile',
    'ideal.subtitle': 'Problems We Solve for SMEs',
    'ideal.problem1': 'Too many WhatsApp queries',
    'ideal.problem2': 'Missed orders',
    'ideal.problem3': 'Excel chaos',
    'ideal.problem4': 'Lack of CRM automation',
    'ideal.value': 'Clear value proposition for SMEs',
    
    // Founder Section
    'founder.title': 'Founder & Credentials',
    'founder.name': 'Larry Lo',
    'founder.credential1': 'SAFe Certified',
    'founder.credential2': 'Google Developer Group Speaker',
    'founder.credential3': '200+ Developer Training Experience',
    'founder.credential4': 'HKSTP Incubation',
    'founder.credential5': 'JCI/BNI Leadership',
    
    // Achievements Section
    'achievements.title': 'Track Record & Impact',
    'achievements.kmb': 'KMB / Government Projects',
    'achievements.government': 'High-risk environment systems',
    'achievements.sme': 'SME Projects',
    'achievements.engagement': 'Boosted user engagement by 100%',
    'achievements.case': 'AI × CRM success story',
    
    // Credibility Badges
    'credibility.title': 'Partners & Recognition',
    'credibility.gdg': 'GDG Hong Kong',
    'credibility.hku': 'HKU',
    'credibility.hkstp': 'HKSTP',
    'credibility.jci': 'JCI',
    'credibility.bni': 'BNI',
    
    // Product Showcases
    'showcase.title': 'Solution Showcases',
    'showcase.problem_label': 'Problem:',
    'showcase.solution_label': 'Solution:',
    'showcase.features_label': 'Key Features:',
    'showcase.screenshot_coming': 'Product screenshot coming soon',
    'showcase.checkin.title': 'Anchor Check-in System',
    'showcase.checkin.subtitle': 'QR Code + Real-time Sync',
    'showcase.checkin.problem': 'Manual check-in prone to errors and missing data, time-consuming post-event statistics',
    'showcase.checkin.solution': 'QR Code scanning check-in, instantly syncs to database, chapter leaders can view attendance rates and reports anytime',
    'showcase.checkin.features': 'QR Code fast check-in; Real-time Notion sync; Auto statistics reports; Live participant list; Multi-event support',
    'showcase.checkin.cta': 'Book Demo for Check-in System',
    'showcase.booking.title': 'Booking / Reservation System',
    'showcase.booking.subtitle': 'Notion Calendar + Email + WhatsApp Notifications',
    'showcase.booking.problem': 'Back-and-forth WhatsApp time confirmations, scattered calendars, easy to double-book or miss appointments',
    'showcase.booking.solution': 'Clients self-select time slots, system auto-checks availability, instantly adds to Notion Calendar upon confirmation with .ics calendar attachment and WhatsApp confirmation',
    'showcase.booking.features': 'Visual calendar selection; Real-time availability check; Notion Calendar sync; Auto-send .ics email attachment; WhatsApp confirmation message',
    'showcase.booking.cta': 'Book Demo for Booking System',
    'showcase.ai_crm.title': 'AI × CRM',
    'showcase.ai_crm.subtitle': 'Intelligent Customer Relationship Management System',
    'showcase.ai_crm.problem': 'WhatsApp messages scattered everywhere, manual recording prone to errors, no systematic way to track customer status and sales progress',
    'showcase.ai_crm.solution': 'Integrated AI for auto-tagging, draft replies, follow-up reminders, centralized customer information management with sales funnel at a glance',
    'showcase.ai_crm.feature1': 'AI Smart Draft - Quickly generate professional replies',
    'showcase.ai_crm.feature2': 'Auto-tagging - Automatic customer status categorization',
    'showcase.ai_crm.feature3': 'Follow-up reminders - Eliminate missed orders',
    'showcase.ai_crm.feature4': 'Sales funnel - Visualize customer journey management',
    'showcase.ai_crm.cta': 'Book Demo for AI CRM',
    'ideal.cta': 'Book Consultation Now',
    
    // Roadmap Section
    'roadmap.title': '2026 Roadmap',
    'roadmap.jan': 'January - Check-in System Launch',
    'roadmap.feb': 'February - AI Customer Management System',
    'roadmap.mar': 'March - AI Practical Handbook',
    'roadmap.apr': 'April - SME AI Practical Course',
    
    // Footer
    'footer.copyright': '© 2025 InnovateXP Limited. All rights reserved.',
  },
  zh: {
    // Header
    'header.title': 'InnovateXP Limited',
    'header.subtitle': 'AI整合、企業培訓、致力捷供軟件解決方案和專業IT諮詢服務。',
    
    // Hero Section
    'hero.title': '與你伴行的最強AI建築師',
    'hero.tagline': '攞抱 AI 新藍圖，成就營商新高度',
    'hero.description': '擺脫高競爭與低利潤的困境，利用我們的AI驅動解決方案創造獨特價值。',
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
    'bookme.time.no_slots': '此日期沒有可用的時間段。請選擇其他日期。',
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

    // Core Services Section (Three Main Services)
    'services.title': '我們的核心服務',
    'services.ai_crm.title': 'AI × CRM',
    'services.ai_crm.subtitle': '智能客戶管理系統',
    'services.ai_crm.benefit1': 'AI智能草稿提供專業快速回覆',
    'services.ai_crm.benefit2': '自動化預訂處理',
    'services.ai_crm.benefit3': '自動標記和跟進提醒消除遺漏訂單',
    'services.ai_crm.cta': '了解AI CRM解決方案',
    'services.checkin.title': '簽到系統',
    'services.checkin.subtitle': 'BNI Anchor 簽到系統',
    'services.checkin.benefit1': '實時參與者列表',
    'services.checkin.benefit2': 'QR碼掃描',
    'services.checkin.benefit3': '自動統計',
    'services.checkin.cta': '了解簽到系統',
    'services.courses.title': 'AI課程',
    'services.courses.subtitle': 'AI培訓與實用課程',
    'services.courses.benefit1': '200+開發者培訓經驗',
    'services.courses.benefit2': '實用AI×開發教學',
    'services.courses.benefit3': '企業定制課程',
    'services.courses.cta': '了解AI課程',
    
    // About Section
    'about.title': '關於我們',
    'about.intro.title': '關於 InnovateXP Limited',
    'about.intro.p1': 'InnovateXP Limited - 您的AI得力助手。由Larry Lo創立，Google Developer Group Hong Kong組織者，擁有2017-2025創業歷程包括HKSTPC孵化。',
    'about.intro.p2': '我們的理念：「通過熱情、完美和卓越與社區連接」。我們幫助企業通過AI驅動的解決方案逃離紅海困境，創造獨特的競爭優勢。',
    'about.intro.p3': '憑藉在社區建設和技術教育方面的良好記錄，我們將企業穩定性與創業創新思維相結合，提供實用、可實施的AI解決方案。',
    
    'about.tags.title': '我們的願景與理念',
    'about.tags.red_ocean.title': '紅海困境',
    'about.tags.red_ocean.description': '高競爭、低利潤、人人做同樣的事。可口可樂理論表明，相同的產品在不同的環境中可以有不同的價值。',
    'about.tags.desert_oasis.title': '沙漠綠洲戰略',
    'about.tags.desert_oasis.description': '利用AI創造獨特價值，逃離競爭。建立自己的藍海，讓您脫穎而出。',
    'about.tags.community.title': '社區領導力',
    'about.tags.community.description': '創始人Larry Lo是Google Developer Group Hong Kong組織者，擁有組織2000+參與者活動的經驗。我們相信通過熱情、完美和卓越與社區連接。',
    
    'about.story.title': '我們的使命與2026路線圖',
    'about.story.content': 'InnovateXP Limited賦能組織，通過AI和藍圖提升業務。我們的2026路線圖包括：1月-簽到系統發布，2月-AI客戶管理系統，3月-AI實用手冊發布，4月-中小企AI實用課程。我們致力於幫助企業逃離紅海，通過實用、可實施的AI解決方案建立沙漠綠洲。',
    
    // Contact Section
    'contact.title': '聯絡我們',
    'contact.subtitle': '請留下訊息，我們會盡快回覆您。',
    'contact.form.name': '姓名',
    'contact.form.email': '電郵地址',
    'contact.form.content': '內容',
    'contact.form.placeholder': '請填寫',
    'contact.form.submit': '發送電郵',
    'contact.form.success': '電郵已發送',
    
    // Story Section (3-Step)
    'story.title': '我們的策略',
    'story.step1.title': '紅海困境',
    'story.step1.description': '高競爭、低利潤、人人做同樣的事',
    'story.step2.title': '沙漠綠洲',
    'story.step2.description': '利用AI創造獨特價值，逃離競爭',
    'story.step3.title': '可樂理論',
    'story.step3.description': '相同產品，在不同環境中呈現不同價值',
    
    // Ideal Client Section
    'ideal.title': '理想引薦 / 理想客戶輪廓',
    'ideal.subtitle': '我們為中小企業解決的問題',
    'ideal.problem1': '太多WhatsApp查詢',
    'ideal.problem2': '漏單',
    'ideal.problem3': 'Excel混亂',
    'ideal.problem4': '缺乏CRM自動化',
    'ideal.value': '為中小企業明確的價值主張',
    
    // Founder Section
    'founder.title': '創辦人與資歷',
    'founder.name': 'Larry Lo',
    'founder.credential1': 'SAFe認證',
    'founder.credential2': 'Google Developer Group 講者',
    'founder.credential3': '200+開發者培訓經驗',
    'founder.credential4': 'HKSTP孵化',
    'founder.credential5': 'JCI/BNI領導',
    
    // Achievements Section
    'achievements.title': '實績與影響',
    'achievements.kmb': 'KMB / 政府專案',
    'achievements.government': '高風險環境系統',
    'achievements.sme': '中小企業專案',
    'achievements.engagement': '提升用戶參與度達100%',
    'achievements.case': 'AI × CRM成功案例',
    
    // Credibility Badges
    'credibility.title': '合作夥伴與認可',
    'credibility.gdg': 'GDG Hong Kong',
    'credibility.hku': 'HKU',
    'credibility.hkstp': 'HKSTP',
    'credibility.jci': 'JCI',
    'credibility.bni': 'BNI',
    
    // Product Showcases
    'showcase.title': '解決方案展示',
    'showcase.problem_label': '遇到的問題：',
    'showcase.solution_label': '我們的解決方案：',
    'showcase.features_label': '核心功能：',
    'showcase.screenshot_coming': '產品截圖即將推出',
    'showcase.checkin.title': 'BNI Anchor 簽到系統',
    'showcase.checkin.subtitle': 'QR Code + 即時同步',
    'showcase.checkin.problem': '手動簽到容易出錯、遺漏數據，會後統計費時費力',
    'showcase.checkin.solution': 'QR Code 掃描簽到，即時同步到 Notion 資料庫，會長隨時查閱出席率與統計報表',
    'showcase.checkin.features': 'QR Code 快速簽到; Notion 即時同步; 自動統計報表; 實時參與者名單; 支援多場次活動',
    'showcase.checkin.cta': '預約了解簽到系統',
    'showcase.booking.title': '預約 / 預訂系統',
    'showcase.booking.subtitle': 'Notion Calendar + Email + WhatsApp 通知',
    'showcase.booking.problem': 'WhatsApp 反覆確認時間，日曆散亂，容易撞期或遺漏',
    'showcase.booking.solution': '客戶自選時段，系統自動檢查空檔，確認後即刻加入 Notion Calendar，並發送 .ics 行事曆附件與 WhatsApp 確認',
    'showcase.booking.features': '可視化日曆選擇; 即時空檔檢查; Notion Calendar 同步; Email 自動寄送 .ics 附件; WhatsApp 確認訊息',
    'showcase.booking.cta': '預約了解預訂系統',
    'showcase.ai_crm.title': 'AI × CRM',
    'showcase.ai_crm.subtitle': '智能客戶關係管理系統',
    'showcase.ai_crm.problem': 'WhatsApp 訊息散落，靠人工記錄容易錯漏，無法系統化追蹤客戶狀態與銷售進度',
    'showcase.ai_crm.solution': '整合 AI 自動標記、草擬回覆、提醒跟進，將客戶資訊集中管理，銷售漏斗一目了然',
    'showcase.ai_crm.feature1': 'AI 智能草稿 - 快速生成專業回覆',
    'showcase.ai_crm.feature2': '自動標記 - 客戶狀態自動分類',
    'showcase.ai_crm.feature3': '跟進提醒 - 消除遺漏訂單',
    'showcase.ai_crm.feature4': '銷售漏斗 - 可視化管理客戶旅程',
    'showcase.ai_crm.cta': '預約了解AI CRM',
    'ideal.cta': '立即預約諮詢',
    
    // Roadmap Section
    'roadmap.title': '2026路線圖',
    'roadmap.jan': '1月 - 簽到系統發布',
    'roadmap.feb': '2月 - AI客戶管理系統',
    'roadmap.mar': '3月 - AI實用手冊',
    'roadmap.apr': '4月 - 中小企AI實用課程',
    
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
