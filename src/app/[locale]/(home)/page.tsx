"use client"
/* F02: Homepage marketing - Landing sections: hero, products, pricing, FAQs, and modals. */
import React from 'react';
import Image from 'next/image';
import Script from 'next/script';
import dynamic from 'next/dynamic';
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
import { useLanguage } from '../../LanguageContext';
import Header from '../../components/Header';
import { useLocalizedHref } from '@/hooks/useLocalizedHref';
import type { AppLocale } from '@/lib/i18n-routing';
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
import { Button } from '@/components/ui/Button';
import { BusinessUpgradeHomepageFunnel } from '@/components/BusinessUpgradeHomepageFunnel';
import { getInnovatexpVision } from '@/content/service-pages';

const ImageCarouselModal = dynamic(
  () => import('@/components/ImageCarouselModal').then((mod) => mod.ImageCarouselModal),
  { ssr: false }
);

/** Homepage-only Service JSON-LD for Rich Results (SmartSales + EventXP sections). */
const LD_SERVICE_EVENTXP = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'EventXP',
  description:
    'Event check-in, attendance reporting, and ranked follow-up workflows for Hong Kong event teams.',
  provider: { '@type': 'Organization', name: 'InnovateXP Limited' },
  areaServed: 'Hong Kong',
  offers: [
    { '@type': 'Offer', name: 'Pilot', price: '4800', priceCurrency: 'HKD' },
    { '@type': 'Offer', name: 'Starter', price: '6800', priceCurrency: 'HKD' },
    { '@type': 'Offer', name: 'Growth', price: '8800', priceCurrency: 'HKD' },
    { '@type': 'Offer', name: 'Enterprise', price: '9800', priceCurrency: 'HKD' },
  ],
};

const LD_SERVICE_SMARTSALES = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'SmartSales CRM',
  description: 'WhatsApp AI CRM for Hong Kong SMEs with draft-first reply mode',
  provider: { '@type': 'Organization', name: 'InnovateXP Limited' },
  areaServed: 'Hong Kong',
  offers: [
    { '@type': 'Offer', name: 'Starter', price: '10800', priceCurrency: 'HKD' },
    { '@type': 'Offer', name: 'Growth', price: '18880', priceCurrency: 'HKD' },
    {
      '@type': 'Offer',
      name: 'Enterprise',
      priceCurrency: 'HKD',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: '30000',
        priceCurrency: 'HKD',
      },
    },
  ],
};

type HomePageLocaleCopy = {
  eventxp: {
    howIntro: string;
    demoCta: string;
    pilotTitle: string;
    pilotBody: string;
    audienceTitle: string;
    audienceBullets: [string, string, string, string];
  };
  smartsales: {
    demoCta: string;
    audienceTitle: string;
    audienceBullets: [string, string, string, string];
  };
  comparison: {
    title: string;
    headers: [string, string, string, string];
    rows: Array<{ service: string; setup: string; monthly: string; fit: string }>;
  };
  followUp: {
    title: string;
    steps: [string, string, string, string];
  };
  trust: {
    years: string;
    incubation: string;
    organizer: string;
  };
  cases: {
    title: string;
    quote1: string;
    footer1: string;
    quote2: string;
    footer2: string;
  };
  punctuation: string;
};

const HOME_PAGE_COPY: Record<AppLocale, HomePageLocaleCopy> = {
  en: {
    eventxp: {
      howIntro: "Here's how it works in 4 simple steps:",
      demoCta: "Book a 15-min demo",
      pilotTitle: "EventXP Pilot Offer (Limited Time)",
      pilotBody:
        'For low-risk onboarding, start with Pilot: HKD 4,800 (1 event + baseline reporting + setup). Pilot availability is confirmed during the workflow review; upgrade only after validation.',
      audienceTitle: 'Who is EventXP for?',
      audienceBullets: [
        'Networking groups: BNI chapters, JCI, alumni groups, membership communities',
        'Sales or training event organizers running 3+ events per quarter',
        'Teams tired of exporting Excel after every event',
        '200+ attendee events where manual follow-up is impossible',
      ],
    },
    smartsales: {
      demoCta: 'Book SmartSales demo',
      audienceTitle: 'Who is SmartSales CRM for?',
      audienceBullets: [
        '3–15 person sales teams using WhatsApp as the primary lead channel',
        'F&B, retail, education, consulting, and B2B service teams in Hong Kong',
        'Teams losing leads because replies are slow or inconsistent',
        'Owners who want SLA visibility without micromanaging every chat',
      ],
    },
    comparison: {
      title: 'Not sure where to start? Pick the shortest path',
      headers: ['Service', 'One-time setup', 'Monthly', 'Best for'],
      rows: [
        { service: 'EventXP Pilot', setup: 'HKD $4,800', monthly: '—', fit: 'Testing one event before committing' },
        { service: 'SmartSales trial', setup: 'Trial HKD $5,000', monthly: 'After trial', fit: 'One sales team starting to lose WhatsApp leads' },
        { service: 'AI Readiness Assessment', setup: 'HKD $3,000', monthly: '—', fit: 'Teams unsure which AI workflow to implement first' },
      ],
    },
    followUp: {
      title: 'What happens after the free 15-min chat?',
      steps: [
        '1. Free 15-min diagnosis',
        '2. Proposal and quote within 1 week',
        '3. First version live around 2 weeks after sign-off',
        '4. Track the first ROI signal within 30 days',
      ],
    },
    trust: {
      years: '14+ Years',
      incubation: 'Incubation Alumni',
      organizer: 'Former Organizer',
    },
    cases: {
      title: 'Relevant Experience & Delivery Capability',
      quote1:
        '“Since using SmartSales, we spend around 2 fewer hours a day on WhatsApp follow-up admin, and important inquiries no longer get buried.”',
      footer1: 'Hong Kong service SME owner (anonymous)',
      quote2:
        '“After an event, we no longer just have an Excel list. We can immediately see which attendees deserve priority follow-up.”',
      footer2: 'Event organizer team (anonymous)',
    },
    punctuation: '.',
  },
  'zh-hk': {
    eventxp: {
      howIntro: '以下 4 步就可以由簽到去到可跟進名單：',
      demoCta: '預約 15 分鐘 Demo',
      pilotTitle: 'EventXP 試點方案（限時）',
      pilotBody:
        '如你想先低風險試行，可選 Pilot：HKD 4,800（1 場活動 + 基本報告 + 上線設定）。試點名額會在流程診斷時確認；完成驗證後才考慮升級。',
      audienceTitle: 'EventXP 最啱邊類團隊？',
      audienceBullets: [
        'BNI chapter、JCI、校友會、會員制社群',
        '每季 3 場以上活動嘅培訓／銷售活動主辦',
        '活動後仍然靠 Excel 匯出同人手 follow-up',
        '200+ 人活動，手動逐個追已經追唔切',
      ],
    },
    smartsales: {
      demoCta: '預約 SmartSales Demo',
      audienceTitle: 'SmartSales CRM 最啱邊類團隊？',
      audienceBullets: [
        '3–15 人 sales team，以 WhatsApp 收 leads 為主',
        '餐飲、門市、教育、顧問、B2B 服務等香港服務業',
        '查詢多但無 SLA，靠記性分配同追單',
        '老闆想見到 pipeline，而唔係逐個 WhatsApp 問同事',
      ],
    },
    comparison: {
      title: '唔知揀邊個？先睇最短路徑',
      headers: ['服務', '一次性 setup', '月費', '最適合'],
      rows: [
        { service: 'EventXP Pilot', setup: 'HKD $4,800', monthly: '—', fit: '先試 1 場活動，睇簽到後跟進效果' },
        { service: 'SmartSales trial', setup: 'Trial HKD $5,000', monthly: 'After trial', fit: '1 個 sales team，WhatsApp leads 開始變亂' },
        { service: 'AI 準備度評估', setup: 'HKD $3,000', monthly: '—', fit: '想用 AI，但未知道第一條流程做邊度' },
      ],
    },
    followUp: {
      title: '免費傾完 15 分鐘之後會點？',
      steps: [
        '1. 免費 15 分鐘了解需求',
        '2. 1 週內送你方案 + 報價',
        '3. 簽約後約 2 週上線第一版',
        '4. 30 日內追蹤第一個 ROI 指標',
      ],
    },
    trust: {
      years: '14+ 年',
      incubation: '孵化校友',
      organizer: '前組織者',
    },
    cases: {
      title: '相關經驗與交付能力',
      quote1: '「自從用咗 SmartSales，我每日少咗約 2 個鐘 WhatsApp 行政跟進，重要客查詢唔再沉底。」',
      footer1: '香港服務業 SME 負責人（匿名）',
      quote2: '「活動後唔再只係得 Excel 名單，可以即刻知道邊批人最值得優先跟進。」',
      footer2: '活動主辦團隊（匿名）',
    },
    punctuation: '。',
  },
  'zh-tw': {
    eventxp: {
      howIntro: '以下 4 步就可以由簽到走到可跟進名單：',
      demoCta: '預約 15 分鐘 Demo',
      pilotTitle: 'EventXP 試點方案（限時）',
      pilotBody:
        '如果你想先低風險試行，可選 Pilot：HKD 4,800（1 場活動 + 基本報告 + 上線設定）。試點名額會在流程診斷時確認；完成驗證後才考慮升級。',
      audienceTitle: 'EventXP 最適合哪些團隊？',
      audienceBullets: [
        'BNI chapter、JCI、校友會、會員制社群',
        '每季 3 場以上活動的培訓／銷售活動主辦',
        '活動後仍然靠 Excel 匯出與人工 follow-up',
        '200+ 人活動，手動逐一追已經追不完',
      ],
    },
    smartsales: {
      demoCta: '預約 SmartSales Demo',
      audienceTitle: 'SmartSales CRM 最適合哪些團隊？',
      audienceBullets: [
        '3–15 人 sales team，以 WhatsApp 收 leads 為主',
        '餐飲、門市、教育、顧問、B2B 服務等香港服務業',
        '詢問多但沒有 SLA，靠記性分配與追單',
        '老闆想看到 pipeline，而不是逐個 WhatsApp 問同事',
      ],
    },
    comparison: {
      title: '不知道選哪個？先看最短路徑',
      headers: ['服務', '一次性 setup', '月費', '最適合'],
      rows: [
        { service: 'EventXP Pilot', setup: 'HKD $4,800', monthly: '—', fit: '先試 1 場活動，看看簽到後跟進效果' },
        { service: 'SmartSales trial', setup: 'Trial HKD $5,000', monthly: 'After trial', fit: '1 個 sales team，WhatsApp leads 開始變亂' },
        { service: 'AI 準備度評估', setup: 'HKD $3,000', monthly: '—', fit: '想用 AI，但還不知道第一條流程要從哪裡開始' },
      ],
    },
    followUp: {
      title: '免費聊完 15 分鐘之後會怎樣？',
      steps: [
        '1. 免費 15 分鐘了解需求',
        '2. 1 週內送你方案 + 報價',
        '3. 簽約後約 2 週上線第一版',
        '4. 30 日內追蹤第一個 ROI 指標',
      ],
    },
    trust: {
      years: '14+ 年',
      incubation: '孵化校友',
      organizer: '前組織者',
    },
    cases: {
      title: '相關經驗與交付能力',
      quote1: '「自從使用 SmartSales，我們每天少了約 2 小時的 WhatsApp 跟進行政，重要詢問也不再被埋沒。」',
      footer1: '香港服務業 SME 負責人（匿名）',
      quote2: '「活動後不再只是 Excel 名單，可以立刻知道哪一批人最值得優先跟進。」',
      footer2: '活動主辦團隊（匿名）',
    },
    punctuation: '。',
  },
  ja: {
    eventxp: {
      howIntro: '以下の4ステップで、チェックインからフォロー対象リストまでつながります。',
      demoCta: '15分デモを予約',
      pilotTitle: 'EventXP パイロットプラン（期間限定）',
      pilotBody:
        '低リスクで試したい場合は Pilot を選べます：HKD 4,800（1イベント + 基本レポート + 初期設定）。パイロット枠はワークフローレビュー時に確認し、検証後にのみアップグレードを検討します。',
      audienceTitle: 'EventXP はどんなチーム向け？',
      audienceBullets: [
        'BNI チャプター、JCI、同窓会、会員制コミュニティ',
        '四半期に 3 回以上イベントを行う研修／営業チーム',
        'イベント後も Excel 出力と手作業フォローに頼っているチーム',
        '200 名以上のイベントで、手動フォローが追いつかないチーム',
      ],
    },
    smartsales: {
      demoCta: 'SmartSales デモを予約',
      audienceTitle: 'SmartSales CRM はどんなチーム向け？',
      audienceBullets: [
        'WhatsApp を主要なリード経路にする 3〜15 人の営業チーム',
        '飲食、小売、教育、コンサル、B2B サービスの香港チーム',
        '返信が遅い・ばらつくことでリードを失っているチーム',
        'チャットごとの管理ではなく SLA の見える化が欲しい経営者',
      ],
    },
    comparison: {
      title: 'どれを選ぶべき？まずは最短ルートを確認',
      headers: ['サービス', '初期費用', '月額', '最適対象'],
      rows: [
        { service: 'EventXP Pilot', setup: 'HKD $4,800', monthly: '—', fit: 'まず1件のイベントで、チェックイン後のフォロー効果を確認したい' },
        { service: 'SmartSales trial', setup: 'Trial HKD $5,000', monthly: 'After trial', fit: '1つの営業チームで WhatsApp リード管理が乱れ始めた' },
        { service: 'AI 導入評価', setup: 'HKD 3,000〜', monthly: '—', fit: 'どの AI ワークフローから始めるべきか分からない' },
      ],
    },
    followUp: {
      title: '無料15分の後はどうなる？',
      steps: [
        '1. 無料15分で要件を整理',
        '2. 1週間以内に提案と見積もり',
        '3. 署名後およそ2週間で初版公開',
        '4. 30日以内に最初の ROI 指標を追跡',
      ],
    },
    trust: {
      years: '14年以上',
      incubation: 'インキュベーション卒業',
      organizer: '元オーガナイザー',
    },
    cases: {
      title: '導入事例とお客様の声',
      quote1:
        '「SmartSales を導入してから、WhatsApp のフォロー業務が 1 日あたり約 2 時間減り、重要な問い合わせが埋もれなくなりました。」',
      footer1: '香港サービス業 SME オーナー（匿名）',
      quote2:
        '「イベント後、Excel の一覧だけに頼らず、どの参加者を優先フォローすべきかすぐ分かるようになりました。」',
      footer2: 'イベント主催チーム（匿名）',
    },
    punctuation: '。',
  },
  de: {
    eventxp: {
      howIntro: 'So funktioniert es in 4 einfachen Schritten:',
      demoCta: '15-Minuten-Demo buchen',
      pilotTitle: 'EventXP Pilotangebot (zeitlich begrenzt)',
      pilotBody:
        'Für einen risikoarmen Einstieg: Pilot für HKD 4.800 (1 Event + Basis-Reporting + Setup). Pilotverfügbarkeit wird im Workflow Review bestätigt; Upgrade erst nach Validierung.',
      audienceTitle: 'Für wen ist EventXP gedacht?',
      audienceBullets: [
        'Networking-Gruppen: BNI-Chapters, JCI, Alumni-Gruppen, Mitglieder-Communities',
        'Vertriebs- oder Schulungs-Event-Teams',
        'Teams, die nach Events noch Excel-Exporte und manuelle Follow-ups nutzen',
        '200+ Teilnehmer-Events, bei denen manuelles Follow-up nicht mehr reicht',
      ],
    },
    smartsales: {
      demoCta: 'SmartSales-Demo buchen',
      audienceTitle: 'Für wen ist SmartSales CRM gedacht?',
      audienceBullets: [
        'Vertriebsteams mit 3–15 Personen, die WhatsApp als Hauptkanal für Leads nutzen',
        'F&B, Retail, Bildung, Beratung und B2B-Serviceteams in Hongkong',
        'Teams, die Leads wegen langsamer oder inkonsistenter Antworten verlieren',
        'Geschäftsführer, die SLA-Transparenz statt Micromanagement pro Chat wollen',
      ],
    },
    comparison: {
      title: 'Nicht sicher, womit anfangen? Nimm den kürzesten Weg',
      headers: ['Service', 'Einmalige Einrichtung', 'Monatlich', 'Am besten für'],
      rows: [
        { service: 'EventXP Pilot', setup: 'HKD $4,800', monthly: '—', fit: 'Ein Event testen, bevor du dich festlegst' },
        { service: 'SmartSales trial', setup: 'Trial HKD $5,000', monthly: 'After trial', fit: 'Ein Vertriebsteam, dessen WhatsApp-Leads unübersichtlich werden' },
        { service: 'KI-Bereitschaftsaudit', setup: 'HKD 3,000', monthly: '—', fit: 'Du weißt noch nicht, welcher KI-Workflow zuerst dran ist' },
      ],
    },
    followUp: {
      title: 'Was passiert nach dem kostenlosen 15-Minuten-Gespräch?',
      steps: [
        '1. Kostenloses 15-Minuten-Diagnosegespräch',
        '2. Angebot und Kostenvoranschlag innerhalb 1 Woche',
        '3. Die erste Version geht etwa 2 Wochen nach Beauftragung live',
        '4. Den ersten ROI-Indikator innerhalb von 30 Tagen verfolgen',
      ],
    },
    trust: {
      years: '14+ Jahre',
      incubation: 'Inkubations-Alumni',
      organizer: 'Ehem. Organisator',
    },
    cases: {
      title: 'Fallstudien und Kundenstimmen',
      quote1:
        '„Seit wir SmartSales nutzen, verbringen wir täglich rund 2 Stunden weniger mit WhatsApp-Follow-up-Admin, und wichtige Anfragen gehen nicht mehr unter.“',
      footer1: 'Hongkonger Service-KMU-Inhaber (anonym)',
      quote2:
        '„Nach einem Event haben wir nicht mehr nur eine Excel-Liste. Wir sehen sofort, welche Teilnehmenden Priorität für das Follow-up haben.“',
      footer2: 'Event-Organisator-Team (anonym)',
    },
    punctuation: '.',
  },
};

function LandingPage() {
  const { t, locale } = useLanguage();
  const loc = useLocalizedHref();
  const copy = HOME_PAGE_COPY[locale];
  const visionCopy = getInnovatexpVision(locale);
  const isChineseLocale = locale === 'zh-hk' || locale === 'zh-tw';
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

  const navItems = useMemo(
    () => {
      const labels = isChineseLocale
        ? {
            upgrade: 'AI 商業升級',
            sprint: '30 日 Sprint',
            programs: '加速計劃',
            advisory: '顧問',
            useCases: '示範場景',
            about: '關於創辦人',
            contact: '聯絡',
          }
        : {
            upgrade: 'AI Business Upgrade',
            sprint: '30-day Sprint',
            programs: 'Accelerator Programs',
            advisory: 'Advisory',
            useCases: 'Use Cases',
            about: 'About Founder',
            contact: 'Contact',
          };

      return [
        { label: labels.upgrade, href: '#ai-business-upgrade' },
        { label: labels.sprint, href: '#discovery-sprint' },
        { label: labels.programs, href: '#programs' },
        { label: labels.advisory, href: '#capability-proof' },
        { label: labels.useCases, href: '#use-cases' },
        { label: labels.about, href: '#about-founder' },
        { label: labels.contact, href: loc('/bookme') },
      ];
    },
    [isChineseLocale, loc]
  );

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

  const showLegacyIntroSections = false;
  const showProductSalesSections = false;

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-200">
      <Header
        variant="main"
        title={t('header.title')}
        subtitle={t('header.subtitle')}
        navItems={navItems}
      />

      <main className="mx-auto max-w-7xl bg-bg px-6 py-12 pb-36 text-fg md:pb-28 md:leading-relaxed">
      
      <Hero
        title={t('hero.title')}
        tagline={t('hero.tagline')}
        description={t('hero.description')}
        primaryHref="#ai-coaching-pricing"
        primaryLabel={t('hero.book_meeting')}
        onPrimaryClick={(e) => scrollToAnchor(e, '#ai-coaching-pricing')}
        secondaryHref={loc("/bookme")}
        secondaryLabel={t('hero.case_studies')}
        onSecondaryClick={undefined}
        trustBadges={[t('hero.badge.experience'), t('hero.badge.language')]}
        bottomTagline={t('hero.bottom_tagline')}
        imageAlt={t('hero.image_alt')}
      />

      <BusinessUpgradeHomepageFunnel locale={locale} bookingHref={loc('/bookme')} />

      {showLegacyIntroSections ? (
        <>
      <section id="about-innovatexp" className="mx-auto max-w-4xl px-6 py-12">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">{t('home.about.title')}</h2>
        <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">{t('home.about.body')}</p>
      </section>

      <section className="mb-16 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-gray-900 md:p-10">
        <div className="mx-auto max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
            {t('home.problem.eyebrow')}
          </p>
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
            {t('home.problem.title')}
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {t('home.problem.intro')}
          </p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            'home.problem.point1',
            'home.problem.point2',
            'home.problem.point3',
            'home.problem.point4',
            'home.problem.point5',
            'home.problem.point6',
          ].map((key) => (
            <div key={key} className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-700 dark:bg-gray-800 dark:text-slate-300">
              {t(key)}
            </div>
          ))}
        </div>
      </section>

      <section className="mb-16 rounded-2xl border border-brand-primary/25 bg-gradient-to-br from-cyan-50 via-white to-amber-50 p-6 shadow-sm dark:border-teal-500/30 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
              {t('home.solution.eyebrow')}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {t('home.solution.title')}
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              {t('home.solution.intro')}
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: Search, key: 'home.solution.step1' },
              { icon: PenLine, key: 'home.solution.step2' },
              { icon: LayoutDashboard, key: 'home.solution.step3' },
              { icon: CalendarClock, key: 'home.solution.step4' },
              { icon: GraduationCap, key: 'home.solution.step5' },
              { icon: Bot, key: 'home.solution.step6' },
            ].map(({ icon: Icon, key }) => (
              <div key={key} className="rounded-xl border border-white/80 bg-white/80 p-5 shadow-sm dark:border-slate-700 dark:bg-gray-800/80">
                <Icon className="mb-3 h-6 w-6 text-brand-primary dark:text-[color:var(--primary-hover)]" strokeWidth={2} aria-hidden />
                <p className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-200">
                  {t(key)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WhyInnovateXP
        title={t('why.title')}
        points={[
          { label: t('why.1.label'), sub: t('why.1.sub') },
          { label: t('why.2.label'), sub: t('why.2.sub') },
          { label: t('why.3.label'), sub: t('why.3.sub') },
          { label: t('why.4.label'), sub: t('why.4.sub') },
        ]}
      />

      <section className="mb-12 rounded-2xl border border-brand-primary/25 bg-gradient-to-r from-cyan-50 via-white to-amber-50 p-5 text-center shadow-sm dark:border-teal-500/30 dark:from-slate-900 dark:via-slate-900 dark:to-gray-900">
        <p className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-200 md:text-base">
          {t('home.reliability.banner')}{' '}
          <a
            href={loc("/reliability")}
            className="ml-1 inline-flex items-center rounded-full border-2 border-slate-900/20 bg-white px-4 py-2 text-sm font-bold text-slate-900 no-underline shadow-sm transition-all duration-300 hover:border-black hover:bg-black hover:text-white dark:border-slate-500 dark:bg-white dark:text-slate-950 dark:hover:border-black dark:hover:bg-black dark:hover:text-white md:ml-2 md:px-5 md:text-base"
          >
            {t('home.reliability.cta')}
          </a>
        </p>
      </section>

      <p className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white md:text-xl">
        {t('product.entry.section_label')}
      </p>
      <ProductEntryGrid
        id="product-pillars"
        items={[
          {
            href: loc('/eventxp'),
            title: t('product.entry.eventxp.title'),
            blurb: t('product.entry.eventxp.blurb'),
            cta: t('product.entry.eventxp.cta'),
            icon: 'event',
          },
          {
            href: loc('/smartsales-crm'),
            title: t('product.entry.smartsales.title'),
            blurb: t('product.entry.smartsales.blurb'),
            cta: t('product.entry.smartsales.cta'),
            icon: 'crm',
          },
          {
            href: loc('/ai-consulting'),
            title: t('product.entry.ai.title'),
            blurb: t('product.entry.ai.blurb'),
            cta: t('product.entry.ai.cta'),
            icon: 'ai',
          },
        ]}
      />

      <section className="mb-16 rounded-2xl border border-brand-primary/25 bg-white p-6 shadow-sm dark:border-teal-500/30 dark:bg-gray-900 md:p-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
              AI training, advisory, and implementation
            </p>
            <h2 className="mb-3 text-3xl font-bold text-gray-900 dark:text-white">
              {visionCopy.statement}
            </h2>
            <p className="mb-4 leading-relaxed text-gray-700 dark:text-gray-300">
              {visionCopy.reason}
            </p>
            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
              {visionCopy.helps}
            </p>
          </div>
          <div className="rounded-2xl bg-slate-50 p-5 dark:bg-gray-800">
            <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">Quick referral copy</h3>
            <p className="mb-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {visionCopy.referralEnglish}
            </p>
            <p className="text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {visionCopy.referralTraditionalChinese}
            </p>
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          {[
            { href: '/ai-training', label: 'AI Training / AI 教班' },
            { href: '/ai-coaching', label: 'AI Coaching / AI 陪跑課程' },
            { href: '/sme-ai-workflow', label: 'SME AI Workflow' },
            { href: '/proposal-to-cash-ai', label: 'Proposal-to-Cash AI' },
            { href: '/case-studies', label: 'Delivery Capability' },
          ].map((item) => (
            <a
              key={item.href}
              href={loc(item.href)}
              className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition-colors hover:border-brand-primary hover:text-brand-primary dark:border-slate-600 dark:text-slate-200 dark:hover:border-teal-300 dark:hover:text-teal-300"
            >
              {item.label}
            </a>
          ))}
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-md dark:border-gray-700 dark:bg-gray-800">
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{t('vision.title')}</h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 font-semibold mb-1">{t('vision.brand')}</p>
          <p className="text-2xl text-brand-primary dark:text-[color:var(--primary-hover)] font-bold tracking-wider">{t('vision.tagline')}</p>
        </div>
        
        {/* Team Photo - aspect ratio prevents CLS; lazy load below fold */}
        <div className="max-w-3xl mx-auto mb-8 aspect-[3/2] w-full">
          <div className="relative rounded-2xl overflow-hidden shadow-xl w-full h-full">
            <Image
              src="/mypresent.jpg"
              alt="InnovateXP founder presenting at tech event - InnovateXP Founder and AI Consultant with 14 years experience"
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
            <div className="mb-4 flex justify-center text-oxford dark:text-[color:var(--primary-hover)]">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oxford/10 dark:bg-oxford-light/20">
                <Lightbulb className="h-7 w-7" strokeWidth={2} aria-hidden />
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{t('vision.innovate')}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('vision.innovate_desc')}</p>
          </div>

          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-green-400 hover:bg-green-50 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
            <div className="mb-4 flex justify-center text-oxford dark:text-[color:var(--primary-hover)]">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-oxford/10 dark:bg-oxford-light/20">
                <Rocket className="h-7 w-7" strokeWidth={2} aria-hidden />
              </span>
            </div>
            <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">{t('vision.transform')}</h3>
            <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">{t('vision.transform_desc')}</p>
          </div>

          <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 text-center transition duration-300 hover:border-amber-400 hover:bg-amber-50/80 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600">
            <div className="mb-4 flex justify-center text-oxford dark:text-[color:var(--primary-hover)]">
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
        <p className="mx-auto mb-8 max-w-3xl text-center text-lg leading-relaxed text-gray-700 dark:text-gray-300">
          {t('services.intro')}
        </p>
        <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            { prefix: 'services.advisory', icon: Target },
            { prefix: 'services.workflow', icon: LayoutDashboard },
            { prefix: 'services.training', icon: GraduationCap },
            { prefix: 'services.tools', icon: Bot },
          ].map(({ prefix, icon: Icon }) => (
            <div key={prefix} className="flex h-full min-h-0 flex-col rounded-xl border-2 border-gray-200 bg-white p-6 shadow-md transition-all duration-200 hover:-translate-y-1 hover:border-brand-primary/40 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
              <Icon className="mb-4 h-8 w-8 text-brand-primary dark:text-[color:var(--primary-hover)]" strokeWidth={2} aria-hidden />
              <h3 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">{t(`${prefix}.title`)}</h3>
              <p className="mb-4 text-sm font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">{t(`${prefix}.subtitle`)}</p>
              <p className="mb-4 text-sm leading-relaxed text-gray-700 dark:text-gray-300">{t(`${prefix}.body`)}</p>
              <ul className="flex min-h-0 flex-1 flex-col space-y-2">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start text-sm text-gray-700 dark:text-gray-300">
                    <span className="mr-2 font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">✓</span>
                    <span>{t(`${prefix}.benefit${item}`)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto flex w-full shrink-0 justify-center pt-6">
                <a
                  href={loc("/bookme")}
                  className="flex min-h-[44px] w-full touch-manipulation items-center justify-center rounded-full bg-brand-primary px-6 py-2 text-center text-sm font-bold text-white shadow-md transition duration-300 hover:bg-brand-primary-hover "
                >
                  {t('services.cta')}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="founder-note" className="mb-16 scroll-mt-[var(--header-offset)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-gray-900">
        <div className="grid gap-0 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="relative min-h-[260px]">
            <Image
              src="/mypresent.jpg"
              alt={t('founder_note.image_alt')}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 420px"
              loading="lazy"
            />
          </div>
          <div className="p-6 md:p-10">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-brand-primary dark:text-[color:var(--primary-hover)]">
              {t('founder_note.eyebrow')}
            </p>
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
              {t('founder_note.title')}
            </h2>
            <div className="space-y-4 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              <p>{t('founder_note.p1')}</p>
              <p>{t('founder_note.p2')}</p>
              <p className="font-semibold text-gray-900 dark:text-white">{t('founder_note.p3')}</p>
            </div>
          </div>
        </div>
      </section>
        </>
      ) : null}

      {showProductSalesSections ? (
        <>
      {/* EventXP Section */}
      <article id="eventxp" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800 md:p-12">
        <Script
          id="ld-svc-eventxp"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LD_SERVICE_EVENTXP).replace(/</g, '\\u003c'),
          }}
        />
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
                {copy.eventxp.howIntro}
              </p>
              <ol className="list-decimal list-inside text-lg text-gray-700 dark:text-gray-300 space-y-2 ml-4">
                <li>{t('eventxp.how.step1')}</li>
                <li>{t('eventxp.how.step2')}</li>
                <li>{t('eventxp.how.step3')}</li>
                <li>{t('eventxp.how.step4')}</li>
              </ol>
            </div>
            
            <p className="text-xl text-brand-primary dark:text-[color:var(--primary-hover)]  font-semibold mb-6">
              {t('pricing.insight.tagline')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t('pricing.insight.description')}
            </p>
            <p className="text-lg font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
              {t('pricing.insight.value')}
            </p>
          </div>

          <div className="mb-12 max-w-3xl mx-auto">
            <ProductMockupPlaceholder
              label={t('mockup.checkin')}
              imageSrc="/eventxp-admin.png"
              imageAlt={t('mockup.checkin.alt')}
            />
            <div className="mt-4 text-center">
              <a
                href={loc("/bookme")}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-primary px-6 py-2 text-sm font-bold text-white shadow-md transition hover:bg-brand-primary-hover "
              >
                {copy.eventxp.demoCta}
              </a>
            </div>
          </div>

          {/* EventXP Features */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-[color:var(--primary-hover)]">
                <LayoutDashboard className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('eventxp.grid.checkin.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('eventxp.grid.checkin.body')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-[color:var(--primary-hover)]">
                <ScanSearch className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('eventxp.grid.ai_insight.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('eventxp.grid.ai_insight.body')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-gray-50 p-6 transition-all hover:border-brand-primary/50 dark:border-gray-600 dark:bg-gray-700">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary/15 text-brand-primary dark:text-[color:var(--primary-hover)]">
                <Target className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('eventxp.grid.retention.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('eventxp.grid.retention.body')}</p>
            </div>
          </div>

          <section aria-labelledby="eventxp-golive-heading" className="mb-12">
            <h3
              id="eventxp-golive-heading"
              className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-white md:text-xl"
            >
              {t('eventxp.golive.heading')}
            </h3>
            <div className="grid grid-cols-1 items-stretch gap-6 md:grid-cols-3">
              {/* Starter — 熱門之選 */}
              <div className="relative flex h-full flex-col rounded-2xl border-2 border-gray-200 bg-gray-50 px-5 pb-6 pt-10 text-left shadow-sm dark:border-gray-600 dark:bg-gray-800/80">
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow-md sm:text-sm">
                  {t('pricing.insight.tier1.badge')}
                </div>
                <p className="text-lg font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">{t('eventxp.golive.tier1.name')}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
                  {t('eventxp.golive.tier1.desc')}
                </p>
              </div>

              {/* Growth — 常見選擇 + gradient frame (matches monthly Growth card) */}
              <div
                className="h-full rounded-2xl p-[2px] shadow-xl"
                style={{
                  background: 'var(--primary-color)',
                }}
              >
                <div className="relative flex h-full min-h-0 flex-col rounded-[14px] bg-gradient-to-br from-cyan-50 via-white to-amber-50 px-5 pb-6 pt-10 dark:from-slate-900 dark:via-slate-950 dark:to-slate-950">
                  <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-amber-400 px-3 py-1 text-xs font-bold text-slate-900 shadow-md sm:text-sm">
                    {t('pricing.insight.tier2.badge')}
                  </div>
                  <p className="text-lg font-bold text-brand-primary dark:text-white">{t('eventxp.golive.tier2.name')}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{t('eventxp.golive.tier2.desc')}</p>
                </div>
              </div>

              {/* Enterprise — teal accent highlight */}
              <div className="relative flex h-full flex-col rounded-2xl border-2 border-brand-primary/45 bg-gradient-to-b from-gray-50 via-white to-teal-50/40 px-5 pb-6 pt-10 text-left shadow-md dark:border-teal-500/45 dark:from-gray-800 dark:via-slate-900 dark:to-teal-950/30">
                <div className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 rounded-full bg-brand-primary px-3 py-1 text-xs font-bold text-white shadow-md sm:text-sm">
                  {t('eventxp.golive.tier3.badge')}
                </div>
                <p className="text-lg font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">{t('eventxp.golive.tier3.name')}</p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-gray-700 dark:text-slate-300">
                  {t('eventxp.golive.tier3.desc')}
                </p>
              </div>
            </div>
            <p className="mt-6 text-center text-sm font-medium text-gray-600 dark:text-gray-400">
              {t('eventxp.golive.note')}
            </p>
          </section>

          <section className="mb-12 rounded-2xl border border-amber-300 bg-amber-50 p-6 dark:border-amber-500/40 dark:bg-amber-900/20">
            <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200">
              {copy.eventxp.pilotTitle}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-amber-900/90 dark:text-amber-100">
              {copy.eventxp.pilotBody}
            </p>
          </section>

          <section className="mb-12 rounded-2xl border border-brand-primary/25 bg-white p-6 shadow-sm dark:border-teal-500/30 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {copy.eventxp.audienceTitle}
            </h3>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:grid-cols-2">
              {copy.eventxp.audienceBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <div className="mb-12 rounded-2xl border-2 border-slate-200 bg-slate-50 p-8 dark:border-slate-600 dark:bg-slate-800/60">
            <h3 className="mb-4 text-center text-2xl font-bold text-brand-primary dark:text-white md:text-3xl">
              {t('referral.title')}
            </h3>
            <p className="mx-auto mb-8 max-w-3xl text-center text-gray-700 dark:text-gray-300">
              {t('referral.intro')}
            </p>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div>
                <h4 className="mb-2 text-sm font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
                  {t('referral.feedback_loop.title')}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t('referral.feedback_loop.desc')}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
                  {t('referral.commission.title')}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t('referral.commission.desc')}
                </p>
              </div>
              <div>
                <h4 className="mb-2 text-sm font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
                  {t('referral.welcome_gift.title')}
                </h4>
                <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                  {t('referral.welcome_gift.desc')}
                </p>
              </div>
            </div>
          </div>

          <p className="mb-6 text-center text-lg font-semibold text-gray-900 dark:text-white">
            {t('pricing.insight.plans_heading')}
          </p>
          <div id="pricing" className="grid scroll-mt-[var(--header-offset)] grid-cols-1 items-stretch gap-6 md:grid-cols-3">
            <PriceCard
              index={0}
              badge={t('pricing.insight.tier1.badge')}
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
              ctaHref={loc("/bookme")}
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
                t('pricing.insight.tier2.feature1'),
                t('pricing.insight.tier2.feature2'),
                t('pricing.insight.tier2.feature3'),
                t('pricing.insight.tier2.feature4'),
              ]}
              callout={t('pricing.insight.tier2.note')}
              ctaHref={loc("/bookme")}
              ctaLabel={t('pricing.cta')}
            />
            <PriceCard
              index={2}
              badge={t('pricing.insight.tier3.badge')}
              name={t('pricing.insight.tier3.name')}
              price={t('pricing.insight.tier3.price')}
              period={t('pricing.insight.tier3.period')}
              target={t('pricing.insight.tier3.target')}
              features={[
                t('pricing.insight.tier3.feature1'),
                t('pricing.insight.tier3.feature2'),
                t('pricing.insight.tier3.feature3'),
                t('pricing.insight.tier3.feature4'),
              ]}
              ctaHref={loc("/bookme")}
              ctaLabel={t('pricing.cta')}
            />
          </div>
          <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-400">
            {t('pricing.insight.setup')}
            <a
              href={loc("/bookme")}
              className="font-semibold text-brand-primary underline decoration-brand-primary/40 underline-offset-2 hover:text-brand-primary-hover dark:text-[color:var(--primary-hover)]"
            >
              {t('pricing.insight.setup_cta')}
            </a>
          {copy.punctuation}
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
        <Script
          id="ld-svc-smartsales"
          type="application/ld+json"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(LD_SERVICE_SMARTSALES).replace(/</g, '\\u003c'),
          }}
        />
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
            
            <p className="text-xl font-semibold text-brand-primary dark:text-[color:var(--primary-hover)] mb-6">
              {t('pricing.crm.tagline')}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-4xl mx-auto mb-8">
              {t('pricing.crm.description')}
            </p>
            <p className="text-lg font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
              {t('pricing.crm.value')}
            </p>
            <div className="mt-6 max-w-2xl mx-auto rounded-lg border border-brand-primary/30 bg-white p-4 dark:border-brand-primary/40 dark:bg-gray-800">
              <p className="font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">
                💰 {t('pricing.crm.tier3.name')}: {t('pricing.crm.tier3.price')}
              </p>
            </div>
          </div>

          {/* SmartSales CRM Features */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-oxford/40 dark:border-gray-500 dark:bg-gray-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford dark:bg-oxford-light/15 dark:text-[color:var(--primary-hover)]">
                <PenLine className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.crm.feature1.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.crm.feature1.desc')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-oxford/40 dark:border-gray-500 dark:bg-gray-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford dark:bg-oxford-light/15 dark:text-[color:var(--primary-hover)]">
                <CalendarClock className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.crm.feature2.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.crm.feature2.desc')}</p>
            </div>
            <div className="rounded-xl border-2 border-gray-200 bg-white p-6 transition-all hover:border-oxford/40 dark:border-gray-500 dark:bg-gray-600">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-oxford/10 text-oxford dark:bg-oxford-light/15 dark:text-[color:var(--primary-hover)]">
                <BarChart3 className="h-6 w-6" strokeWidth={2} aria-hidden />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 dark:text-white">{t('pricing.crm.feature3.title')}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">{t('pricing.crm.feature3.desc')}</p>
            </div>
          </div>

          <div className="-mx-6 mb-10 max-w-6xl mx-auto space-y-4 sm:-mx-12">
            <p className="text-center text-sm font-semibold text-brand-primary md:text-base dark:text-[color:var(--primary-hover)]">
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
            <div className="text-center">
              <a
                href={loc("/bookme")}
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-brand-primary px-6 py-2 text-sm font-bold text-white shadow-md transition hover:bg-brand-primary-hover "
              >
                {copy.smartsales.demoCta}
              </a>
            </div>
          </div>

          <div className="-mx-6 mb-12 overflow-hidden rounded-2xl sm:-mx-12">
            <SmartSalesEnterpriseShowcase onOpenGallery={() => openSmartSalesCarouselAt(0)} />
          </div>

          <section className="mb-12 rounded-2xl border border-brand-primary/25 bg-white p-6 shadow-sm dark:border-teal-500/30 dark:bg-gray-800">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              {copy.smartsales.audienceTitle}
            </h3>
            <ul className="mt-4 grid gap-3 text-sm leading-relaxed text-gray-700 dark:text-gray-300 md:grid-cols-2">
              {copy.smartsales.audienceBullets.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

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
              ctaHref={loc("/bookme")}
              ctaLabel={t('pricing.cta')}
            />
            <PremiumPriceCard
              badge={t('pricing.crm.tier2.badge')}
              name={t('pricing.crm.tier2.name')}
              price={t('pricing.crm.tier2.price')}
              period={t('pricing.crm.tier2.period')}
              target={t('pricing.crm.tier2.target')}
              featureLines={[
                t('pricing.crm.tier2.feature1'),
                t('pricing.crm.tier2.feature2'),
                t('pricing.crm.tier2.feature3'),
              ]}
              ctaHref={loc("/bookme")}
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
              ctaHref={loc("/bookme")}
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
              ctaHref={loc("/bookme")}
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
              ctaHref={loc("/bookme")}
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
              ctaHref={loc("/bookme")}
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

      <section className="mb-16 rounded-2xl border-2 border-brand-primary/20 bg-gradient-to-br from-white via-cyan-50/40 to-amber-50/50 p-8 shadow-md dark:border-teal-500/30 dark:from-gray-800 dark:via-slate-900 dark:to-slate-900">
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          {copy.comparison.title}
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-separate border-spacing-y-3 text-left text-sm">
            <thead className="text-slate-700 dark:text-slate-300">
              <tr>
                <th className="px-4 py-2">{copy.comparison.headers[0]}</th>
                <th className="px-4 py-2">{copy.comparison.headers[1]}</th>
                <th className="px-4 py-2">{copy.comparison.headers[2]}</th>
                <th className="px-4 py-2">{copy.comparison.headers[3]}</th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.rows.map((row) => (
                <tr key={row.service} className="rounded-xl bg-white shadow-sm dark:bg-gray-800">
                  <td className="rounded-l-xl px-4 py-4 font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">{row.service}</td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{row.setup}</td>
                  <td className="px-4 py-4 text-gray-700 dark:text-gray-300">{row.monthly}</td>
                  <td className="rounded-r-xl px-4 py-4 text-gray-700 dark:text-gray-300">{row.fit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-16 rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-md dark:border-slate-700 dark:bg-gray-800">
        <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white md:text-4xl">
          {copy.followUp.title}
        </h2>
        <div className="grid gap-4 md:grid-cols-4">
          {copy.followUp.steps.map((step) => (
            <div key={step} className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm font-semibold leading-relaxed text-slate-800 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-200">
              {step}
            </div>
          ))}
        </div>
      </section>

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
                href="https://www.linkedin.com/company/innovatexp"
                rel="author"
                className="font-semibold text-brand-primary hover:text-brand-primary-hover dark:text-[color:var(--primary-hover)] dark:hover:text-teal-200"
              >
                InnovateXP
              </a>
              , {t('about.author.title')}
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
                <strong className="text-lg text-brand-primary dark:text-[color:var(--primary-hover)]">{t('about.tags.red_ocean.title')}:</strong>
                <br />
                {t('about.tags.red_ocean.description')}
              </li>
              <li className="leading-relaxed text-gray-600 dark:text-slate-300">
                <strong className="text-lg text-green-600 dark:text-emerald-400">{t('about.tags.desert_oasis.title')}:</strong>
                <br />
                {t('about.tags.desert_oasis.description')}
              </li>
              <li className="leading-relaxed text-gray-600 dark:text-slate-300">
                <strong className="text-lg text-brand-primary dark:text-[color:var(--primary-hover)]">{t('about.tags.community.title')}:</strong>
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
              <div className="mb-4 text-5xl font-bold text-brand-primary dark:text-[color:var(--primary-hover)]">1</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step1.title')}</h3>
              <p className="text-gray-600">{t('story.step1.description')}</p>
              <div className="absolute -right-3 top-1/2 hidden -translate-y-1/2 transform text-3xl text-brand-primary dark:text-[color:var(--primary-hover)] md:block">→</div>
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
              <div className="mb-4 text-5xl font-bold text-brand-primary/80 dark:text-[color:var(--primary-hover)]">3</div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-black mb-3">{t('story.step3.title')}</h3>
              <p className="text-gray-600">{t('story.step3.description')}</p>
          </div>
        </div>
        </section>

          {/* 社交媒體連結 with rel="me" for verification */}
          <div className="mt-6 flex gap-4 justify-center">
            <a 
              href="https://www.linkedin.com/company/innovatexp" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-[#0077B5] text-white font-semibold py-2 px-6 rounded-full hover:bg-[#005885] transition duration-300 shadow-md"
            >
              LinkedIn
            </a>
            <a 
              href="https://www.innovatexp.co" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gray-900 text-white font-semibold py-2 px-6 rounded-full hover:bg-gray-700 transition duration-300 shadow-md"
            >
              Website
            </a>
          </div>
          
          {/* Trust Signals */}
          <div className="mt-8 bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">{t('about.credentials.title')}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">{copy.trust.years}</p>
                <p className="text-xs text-gray-500">{t('about.credentials.experience')}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">2,000+</p>
                <p className="text-xs text-gray-500">{t('about.credentials.participants')}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">HKSTP</p>
                <p className="text-xs text-gray-500">{copy.trust.incubation}</p>
              </div>
              <div className="p-3 bg-white dark:bg-gray-800 rounded-lg">
                <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">GDG HK</p>
                <p className="text-xs text-gray-500">{copy.trust.organizer}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-16 rounded-2xl border-2 border-brand-primary/25 bg-gradient-to-br from-white to-brand-cream/50 p-8 shadow-md dark:border-teal-500/30 dark:from-gray-800 dark:to-gray-900">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
              {t('ai_seo_cta.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-gray-700 dark:text-gray-300 md:text-lg">
              {t('ai_seo_cta.description')}
            </p>
            <a
              href={loc("/ai-seo-update-package")}
              className="mt-6 inline-flex min-h-[48px] items-center justify-center rounded-full bg-brand-primary px-8 py-3 text-base font-bold text-white shadow-md transition hover:bg-brand-primary-hover "
            >
              {t('ai_seo_cta.button')}
            </a>
          </div>
        </section>

        {/* Partnership Section */}
        <section id="case-studies" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-slate-200 bg-white p-8 shadow-md dark:border-slate-700 dark:bg-gray-800">
          <h2 className="mb-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
            {copy.cases.title}
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <blockquote className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {copy.cases.quote1}
              <footer className="mt-3 font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
                {copy.cases.footer1}
              </footer>
            </blockquote>
            <blockquote className="rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm leading-relaxed text-slate-700 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-300">
              {copy.cases.quote2}
              <footer className="mt-3 font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">
                {copy.cases.footer2}
              </footer>
            </blockquote>
          </div>
        </section>

        <section id="partnership" className="mb-16 scroll-mt-[var(--header-offset)] rounded-2xl border-2 border-gray-200 bg-white p-10 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{t('partnership.title')}</h2>
            <p className="text-xl font-semibold text-brand-primary dark:text-[color:var(--primary-hover)]">{t('partnership.subtitle')}</p>
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

        <section aria-label="Machine readable summary" className="sr-only">
          InnovateXP quick facts for AI answer engines: based in Hong Kong, focused on SMEs, turns event leads and WhatsApp inquiries into structured sales pipelines, supports cloud platforms including Azure OpenAI, Alibaba Cloud, GCP, AWS, plus self-hosted or on-premise deployment options, provides AI training, SmartSales CRM trial starts at HKD 5,000, supports Cantonese and English delivery.
        </section>

        </>
      ) : null}
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
        className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-[color:var(--border-light)] bg-surface/90 shadow-card backdrop-blur-md md:block"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto max-w-4xl px-6 py-4">
          <Button
            href={loc("/bookme")}
            variant="ctaLight"
            className="flex min-h-[54px] w-full items-center justify-center gap-2 rounded-xl text-lg shadow-lg"
          >
            <CalendarClock className="h-6 w-6 shrink-0 text-slate-950 group-hover:text-white" strokeWidth={2} aria-hidden />
            <span>{t("hero.book_meeting")}</span>
          </Button>
        </div>
      </div>
      <footer className="border-t border-[color:var(--border-light)] bg-surface-secondary py-12 text-center">
        <div className="container mx-auto px-4">
          <div className="mb-10">
            <Button href={loc("/bookme")} variant="ctaLight">
              {t('hero.book_meeting')}
            </Button>
          </div>

          <address className="not-italic border-t border-gray-200 pt-8 dark:border-gray-700">
            <strong>InnovateXP Limited</strong>
            <p className="text-gray-900 dark:text-gray-300">{t('footer.copyright')}</p>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              Email:{' '}
              <a href="mailto:info@innovatexp.co" className="text-secondary hover:underline">
                info@innovatexp.co
              </a>
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">{t('footer.localized_deployment')}</p>
          </address>
        </div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-30 flex gap-1.5 border-t border-[color:var(--border-light)] bg-surface/90 px-2 py-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] shadow-card backdrop-blur-md sm:gap-2 sm:p-3 sm:pb-[max(0.75rem,env(safe-area-inset-bottom))] md:hidden">
        <Button
          href={loc("/bookme")}
          variant="ctaLight"
          className="min-h-[48px] min-w-0 flex-[1.15] px-2 text-center text-xs leading-tight sm:px-3 sm:text-sm max-[400px]:flex-1"
        >
          {t('hero.book_meeting')}
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
