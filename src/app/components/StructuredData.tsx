"use client";
import { getOrganizationSchema, getPersonSchema, getSmartSalesProductSchema, serializeJsonLd } from "@/lib/schema";
import { getSiteUrl } from "@/lib/site-url";
import { AUTHOR } from "@/lib/author";
/* F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path. */
import { usePathname } from "next/navigation";
import type { AppLocale } from "@/lib/i18n-routing";
import { getLocaleFromPathname, localeToHtmlLang, localeUsesChineseCopy, stripLocaleFromPathname } from "@/lib/i18n-routing";
import { PRICING } from "@/content/pricing";
import { getHomepageContent } from "@/content/homepage";

/** Pick JSON-LD copy per URL locale — explicit `AppLocale` rows (no zh/en boolean). */
function pickSchema(locale: AppLocale, row: Record<AppLocale, string>): string {
  return row[locale];
}

type FaqMainEntity = Array<{
  "@type": "Question";
  name: string;
  acceptedAnswer: { "@type": "Answer"; text: string };
}>;

const SCHEMA_ORGANIZATION_DESCRIPTION: Record<AppLocale, string> = {
  en: "InnovateXP Limited is a Hong Kong AI business consultancy founded by Larry Lo. Signature method: Business Workflow Diagnosis — diagnose first; I will say so if you should not buy a system yet. We help SMEs of 3–30 fix one sales or operations workflow before choosing any system or AI support.",
  "zh-hk":
    "InnovateXP Limited 由 Larry Lo 創立，係香港 AI 商業顧問公司。定位「聽診先——唔使買系統我會直講」。幫 3–30 人中小企先聽清一條收入或營運流程，再決定需唔需要系統或 AI 支援。",
  "zh-tw":
    "InnovateXP Limited 由 Larry Lo 創立，是香港 AI 商業顧問公司。定位「聽診先——唔使買系統我會直講」。協助 3–30 人中小企業先釐清一條收入或營運流程，再決定 AI、CRM 或自動化。流程清楚後可選 SmartSales CRM、EventXP、FitnessXP。",
  ja: "InnovateXP Limited は Larry Lo が創業した香港の AI ビジネスコンサルティング会社です。中小企業が売上・業務の重要フローを先に整え、必要なら AI／CRM／自動化を導入します。料金は診断後に見積。業務が明確になった後、SmartSales CRM、EventXPを選べます。",
  de: "InnovateXP Limited ist eine von Larry Lo gegründete AI-Business-Beratung in Hongkong. KMUs reparieren zuerst einen Workflow und führen AI, CRM oder Automation erst danach ein. Honorar nach Diagnose. Nach Workflow-Klarheit optional SmartSales CRM, EventXP.",
};

const SCHEMA_PERSON_DESCRIPTION: Record<AppLocale, string> = {
  en: `I am AI Business Consultant Larry Lo / InnovateXP. Founder of InnovateXP Limited in Hong Kong with ${AUTHOR.yearsExperience} years of IT delivery experience. Helps SMEs of 3–30 fix WhatsApp/Excel-heavy operations via Business Workflow Diagnosis before adopting AI.`,
  "zh-hk": `我係 AI 商業顧問 Larry Lo／InnovateXP。InnovateXP Limited 創辦人，駐香港，${AUTHOR.yearsExperience} 年 IT 交付經驗。專幫 3–30 人中小企先執順 WhatsApp／Excel 流程，再落地 AI。`,
  "zh-tw":
    `Larry Lo 是 InnovateXP Limited 創辦人，香港 AI 商業顧問，具備 ${AUTHOR.yearsExperience} 年 IT 交付經驗。專協助 3–30 人中小企業先理順 WhatsApp／Excel 流程，再落地 AI。`,
  ja: `Larry Lo は香港の中小企業向け AI ビジネスコンサルティング InnovateXP Limited の創業者です。${AUTHOR.yearsExperience}年の IT デリバリー経験を持ち、3〜30人のチームが AI 導入前に WhatsApp／Excel を使う業務を整理できるよう、業務診断で支援します。2025年には GDG Hong Kong、PISM Sharing、DevFest Hong Kong で司会・登壇・プロジェクト紹介を行った7件の公開記録があります。`,
  de: `Larry Lo ist Gründer von InnovateXP Limited und AI Business Consultant in Hongkong mit ${AUTHOR.yearsExperience} Jahren IT-Delivery-Erfahrung. Er hilft Teams mit 3–30 Personen, WhatsApp-/Excel-Abläufe durch eine Geschäftsprozessdiagnose vor dem KI-Einsatz zu verbessern. Sieben datierte öffentliche Auftritte im Jahr 2025 dokumentieren seine Rollen als Gastgeber, Sprecher oder Projektpräsentator bei GDG Hong Kong, PISM Sharing und DevFest Hong Kong.`,
};

const SCHEMA_SMARTSALES_DESCRIPTION: Record<AppLocale, string> = {
  en: "Scoped sales workflow pilot, production setup and monthly technical care for SMEs. WhatsApp APIs, AI usage, membership rules and custom integrations quoted separately.",
  "zh-hk": "中小企銷售流程 pilot、正式上線及月費維護分開報價。WhatsApp API、AI 用量、會員制度及客製接駁另報。",
  "zh-tw":
    "中小企業銷售流程試行、正式上線與每月技術維護分開報價。WhatsApp API、AI 用量、會員制度與客製整合另行報價。",
  ja: "中小企業向けの範囲を限定した営業フロー試行、本番導入、月次技術保守はそれぞれ別料金です。WhatsApp API、AI 利用量、会員制度、カスタム連携は別途見積もります。",
  de: "Begrenzter Vertriebsworkflow-Pilot, Produktiveinrichtung und monatliche technische Wartung für KMU werden separat berechnet. WhatsApp-APIs, KI-Nutzung, Mitgliedschaftsregeln und individuelle Integrationen werden gesondert angeboten.",
};

const SCHEMA_EVENTXP_DESCRIPTION: Record<AppLocale, string> = {
  en: "Configurable event and membership operations for Hong Kong organisations — registration, QR/kiosk check-in, member and guest records, live attendance reporting, and post-event follow-up. Configured around your workflow; not generic ticketing.",
  "zh-hk": "按機構流程配置嘅活動暨會員營運方案：報名、QR／kiosk check-in、會員及嘉賓記錄、即時出席報告同活動後跟進。唔係通用售票軟件。",
  "zh-tw":
    "依香港機構流程配置的活動暨會員營運方案：報名、QR／自助報到、會員與嘉賓記錄、即時出席報告與活動後跟進。並非通用售票軟體。",
  ja: "香港の組織向けに業務フローに合わせて設定するイベント・会員運営ソリューション。登録、QR／キオスク受付、会員・ゲスト記録、リアルタイム出席レポート、イベント後のフォローアップに対応。汎用チケット販売ソフトではありません。",
  de: "Für die Abläufe von Organisationen in Hongkong konfigurierter Event- und Mitgliederbetrieb: Anmeldung, QR-/Kiosk-Check-in, Mitglieder- und Gästedaten, Live-Anwesenheitsberichte und Nachbereitung. Keine generische Ticketing-Software.",
};

const SCHEMA_AI_SEO_NAME: Record<AppLocale, string> = {
  en: "AI SEO / AEO retainer",
  "zh-hk": "AI SEO／AEO 月費服務",
  "zh-tw": "AI SEO／AEO 月費服務",
  ja: "AI SEO／AEO 月額リテーナー",
  de: "AI-SEO/AEO-Retainer",
};

const SCHEMA_AI_SEO_DESCRIPTION: Record<AppLocale, string> = {
  en: "AI Visibility diagnosis followed by optional monthly content improvements and citation, brand-impression and enquiry reporting. Monthly plans of 3 months or more receive 20% off; six months allows a more meaningful comparison.",
  "zh-hk": "先做 AI Visibility 診斷，再按月改善網站內容同追蹤提及、引用、詢盤。月費訂 3 個月或以上享 20% 折扣；六個月較適合比較前後數字。",
  "zh-tw": "先做 AI Visibility 診斷，再按月改善網站內容並追蹤提及、引用、詢盤。月費訂 3 個月或以上享 20% 折扣；六個月較適合比較前後數字。",
  ja: "AI Visibility 診断後、必要に応じて月次でサイト内容と引用・ブランド露出・問い合わせを追跡。3か月以上の月額契約は20%割引。前後比較には6か月を推奨。",
  de: "Nach der AI-Visibility-Diagnose können monatliche Inhaltsverbesserungen und Berichte zu Erwähnungen, Zitaten und Anfragen folgen. Ab 3 Monaten gibt es 20% Rabatt; 6 Monate erlauben einen aussagekräftigeren Vergleich.",
};

const SCHEMA_WEBSITE_DESCRIPTION: Record<AppLocale, string> = {
  en: "Hong Kong AI business consultancy for teams of 3–30: Business Workflow Diagnosis, practical implementation, and 0-to-1 co-running.",
  "zh-hk": "香港 AI 商業顧問：為 3–30 人團隊提供業務聽診、實際落地同 0 到 1 陪跑。",
  "zh-tw": "香港 AI 商業顧問：流程診斷、WhatsApp CRM（SmartSales）、EventXP，以及按需私有 AI。",
  ja: "香港の AI ビジネスコンサル：業務診断、WhatsApp CRM（SmartSales）、EventXP、必要に応じてプライベート AI。",
  de: "AI-Business-Beratung Hongkong: Workflow-Diagnose, WhatsApp-CRM (SmartSales), EventXP und optionale Private AI für KMUs.",
};

const SCHEMA_CONSULTING_SERVICE_DESCRIPTION: Record<AppLocale, string> = {
  en: "We provide AI Business Consultancy and advisory for Hong Kong SMEs: workflow health checks, SOP mapping, KPI baselines, practical AI trials, and optional automation or SaaS implementation after validation.",
  "zh-hk":
    "我們為香港中小企提供 AI 商業升級陪跑及顧問：流程健康檢查、SOP mapping、KPI baseline、AI 試行，並在驗證後按需要落地 automation 或 SaaS。",
  "zh-tw":
    "我們為香港中小企提供 AI 商業升級陪跑及顧問：流程健康檢查、SOP mapping、KPI baseline、AI 試行，並在驗證後按需要落地 automation 或 SaaS。",
  ja: "香港の中小企業向けに実用的な AI 拡張ワークフローを提供。Azure OpenAI、Alibaba Cloud、GCP、AWS またはオンプレミスへの展開に対応。",
  de: "Wir liefern praktische KI-erweiterte Workflows für KMUs in Hongkong — auf Azure OpenAI, Alibaba Cloud, GCP, AWS oder bei Bedarf Self-Hosted/On-Premise.",
};

const BREADCRUMB_HOME: Record<AppLocale, string> = {
  en: "Home",
  "zh-hk": "首頁",
  "zh-tw": "首頁",
  ja: "ホーム",
  de: "Start",
};

const BREADCRUMB_ARTICLE: Record<AppLocale, string> = {
  en: "Article",
  "zh-hk": "文章",
  "zh-tw": "文章",
  ja: "記事",
  de: "Artikel",
};

/** Segment labels indexed by URL locale — every `AppLocale` must be present per key. */
const BREADCRUMB_SEGMENTS: Record<string, Record<AppLocale, string>> = {
  bookme: {
    en: "Book a visit",
    "zh-hk": "預約洽詢",
    "zh-tw": "預約諮詢",
    ja: "予約・相談",
    de: "Termin buchen",
  },
  blog: {
    en: "Blog",
    "zh-hk": "網誌",
    "zh-tw": "部落格",
    ja: "ブログ",
    de: "Blog",
  },
  "pitch-decks": {
    en: "Pitch decks",
    "zh-hk": "簡報下載",
    "zh-tw": "簡報下載",
    ja: "ピッチ資料",
    de: "Pitch-Decks",
  },
  reliability: {
    en: "Reliability manifesto",
    "zh-hk": "可靠 AI 立場",
    "zh-tw": "可靠 AI 立場",
    ja: "信頼性の原則",
    de: "Zuverlässigkeits-Manifest",
  },
  "ai-era-quality": {
    en: "AI-era quality engineering",
    "zh-hk": "AI 時代品質工程",
    "zh-tw": "AI 時代品質工程",
    ja: "AI時代の品質工学",
    de: "Qualitätstechnik im KI-Zeitalter",
  },
  "premium-ai-consulting": {
    en: "Premium AI consulting",
    "zh-hk": "高票價 AI 顧問",
    "zh-tw": "高價值 AI 顧問",
    ja: "プレミアム AI コンサル",
    de: "Premium-KI-Beratung",
  },
  "smartsales-crm": {
    en: "SmartSales CRM",
    "zh-hk": "SmartSales CRM",
    "zh-tw": "SmartSales CRM",
    ja: "SmartSales CRM",
    de: "SmartSales CRM",
  },
  eventxp: {
    en: "EventXP",
    "zh-hk": "EventXP",
    "zh-tw": "EventXP",
    ja: "EventXP",
    de: "EventXP",
  },
  "ai-consulting": {
    en: "AI Consulting",
    "zh-hk": "AI 顧問服務",
    "zh-tw": "AI 顧問服務",
    ja: "AI コンサルティング",
    de: "KI-Beratung",
  },
  "ai-training": {
    en: "AI Training",
    "zh-hk": "AI 教班",
    "zh-tw": "AI 教班",
    ja: "AI トレーニング",
    de: "AI-Training",
  },
  "ai-coaching": {
    en: "AI Coaching",
    "zh-hk": "AI 陪跑課程",
    "zh-tw": "AI 陪跑課程",
    ja: "AI コーチング",
    de: "AI-Coaching",
  },
  "sme-ai-workflow": {
    en: "SME AI Workflow",
    "zh-hk": "中小企 AI 工作流",
    "zh-tw": "中小企 AI 工作流",
    ja: "SME AI ワークフロー",
    de: "KMU AI-Workflow",
  },
  "proposal-to-cash-ai": {
    en: "Proposal-to-Cash AI",
    "zh-hk": "Proposal-to-Cash AI",
    "zh-tw": "Proposal-to-Cash AI",
    ja: "Proposal-to-Cash AI",
    de: "Proposal-to-Cash AI",
  },
  "case-studies": {
    en: "Relevant Experience & Delivery Capability",
    "zh-hk": "相關經驗與交付能力",
    "zh-tw": "相關經驗與交付能力",
    ja: "ケーススタディ",
    de: "Fallstudien",
  },
  "ai-seo-update-package": {
    en: "AI SEO / AEO retainer",
    "zh-hk": "AI SEO／AEO 月費",
    "zh-tw": "AI SEO／AEO 月費",
    ja: "AI SEO／AEO リテーナー",
    de: "AI-SEO/AEO-Retainer",
  },
  compare: {
    en: "Compare",
    "zh-hk": "產品比較",
    "zh-tw": "產品比較",
    ja: "製品比較",
    de: "Vergleich",
  },
  "smartsales-vs-salesforce": {
    en: "SmartSales vs Salesforce",
    "zh-hk": "SmartSales vs Salesforce",
    "zh-tw": "SmartSales vs Salesforce",
    ja: "SmartSales と Salesforce の比較",
    de: "SmartSales vs. Salesforce",
  },
  "eventxp-vs-eventbrite": {
    en: "EventXP vs Eventbrite",
    "zh-hk": "EventXP vs Eventbrite",
    "zh-tw": "EventXP vs Eventbrite",
    ja: "EventXP と Eventbrite の比較",
    de: "EventXP vs. Eventbrite",
  },
};

function homeFaqMainEntity(locale: AppLocale): FaqMainEntity {
  return getHomepageContent(locale).faq.items.map((item) => ({
    "@type": "Question" as const,
    name: item.question,
    acceptedAnswer: { "@type": "Answer" as const, text: item.answer },
  }));
}

function buildBreadcrumbJsonLd(pathname: string, baseUrl: string, labelLocale: AppLocale) {
  const clean = ((pathname || "/").split("?")[0] || "/").replace(/\/$/, "") || "/";
  const lower = clean.toLowerCase();
  const urlLocale = getLocaleFromPathname(lower);
  const withoutLocale = stripLocaleFromPathname(lower);
  if (withoutLocale === "/") return null;

  const segments = withoutLocale.slice(1).split("/").filter(Boolean);
  const homeLabel = BREADCRUMB_HOME[labelLocale];
  const items: { name: string; item: string }[] = [{ name: homeLabel, item: `${baseUrl}/${urlLocale}` }];

  let acc = "";
  for (let i = 0; i < segments.length; i++) {
    acc += `/${segments[i]}`;
    const seg = segments[i];
    const known = seg ? BREADCRUMB_SEGMENTS[seg] : undefined;
    let name: string;
    if (known) {
      name = known[labelLocale];
    } else if (segments[0] === "blog") {
      name = BREADCRUMB_ARTICLE[labelLocale];
    } else {
      name = seg.replace(/-/g, " ");
    }
    items.push({ name, item: `${baseUrl}/${urlLocale}${acc}` });
  }

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, idx) => ({
      "@type": "ListItem",
      position: idx + 1,
      name: it.name,
      item: it.item,
    })),
  };
}

type StructuredDataScope =
  | "auto"
  | "home"
  | "smartsales"
  | "eventxp"
  | "ai-consulting"
  | "ai-seo-package"
  /** Org + WebSite only; no product/FAQ (bookme, blog, reliability, etc.) */
  | "minimal";

/** Build the route graph separately so entity identity and scope can be checked without rendering. */
export function buildStructuredData(pathname: string, type: StructuredDataScope = "auto") {
  const baseUrl = getSiteUrl();
  const lower = ((pathname || "/").split("?")[0] || "/").toLowerCase();
  const routeLocale = getLocaleFromPathname(lower);
  const pathWithoutLocale = stripLocaleFromPathname(lower);

  const resolvedScope: StructuredDataScope =
    type !== "auto"
      ? type
      : pathWithoutLocale === "/"
        ? "home"
        : pathWithoutLocale.startsWith("/smartsales-crm")
          ? "smartsales"
          : pathWithoutLocale.startsWith("/eventxp")
            ? "eventxp"
            : pathWithoutLocale.startsWith("/ai-consulting")
              ? "ai-consulting"
              : pathWithoutLocale.startsWith("/ai-seo-update-package")
                ? "ai-seo-package"
                : "minimal";

  const organizationSchema = {
    ...getOrganizationSchema(),
    description: pickSchema(routeLocale, SCHEMA_ORGANIZATION_DESCRIPTION),
    knowsAbout: [
      "AI Business Consultancy Hong Kong",
      "Hong Kong AI consultant",
      "SME AI workflow",
      "WhatsApp CRM",
      "SmartSales CRM",
      "EventXP",
      "Discovery Sprint",
      "SOP optimization",
      "Generative Engine Optimization",
      "AI SEO",
      "GEO",
      "Private AI on-premise",
      "AI CRM",
      "SME AI Automation",
      "AI-augmented Workflow",
      "Business Process Automation",
      "Prompt Engineering",
      "Event Check-in Intelligence",
      "Lead Qualification Automation",
      "Azure OpenAI Implementation",
      "Alibaba Cloud AI Deployment",
      "GCP AI Deployment",
      "AWS AI Deployment",
      "On-Premise AI Deployment",
      "AI adoption for SMEs",
      "SOP 流程優化",
      "AI 商業升級",
      "AI 商業顧問",
      "業務聽診",
      "Business Workflow Diagnosis",
      "聽診先唔使買系統我會直講",
      
      "AI Readiness Snapshot",
      "AI 陪跑課程",
      "中小企 AI 升級",
      "AI 工作流",
      "香港中小企 AI 顧問",
      "Larry Lo",
    ],
  };

  const personSchema = {
    ...getPersonSchema(),
    description: pickSchema(routeLocale, SCHEMA_PERSON_DESCRIPTION),
    alumniOf: [
      {
        "@type": "Organization",
        name: "Hong Kong Science and Technology Parks Corporation",
        sameAs: "https://www.hkstp.org",
      },
    ],
    affiliation: [
      {
        "@type": "Organization",
        name: "Agilizing Education Center",
        sameAs: "https://agilizing.com",
      },
      {
        "@type": "Organization",
        name: "BNI Anchor",
        sameAs: "https://www.bni-anchor.com/",
      },
      {
        "@type": "Organization",
        name: "Flower Nice Day",
        alternateName: "販賣美好",
        url: "https://www.flowerniceday.com",
        sameAs: "https://www.flowerniceday.com",
      },
      {
        "@type": "Organization",
        name: "Dr Steven Cheung Dental Surgery",
        sameAs: "https://www.drstevenchungdentalsurgery.com",
      },
      {
        "@type": "Organization",
        name: "Mentalok",
        sameAs: "https://mentalok.io/zh-TW",
      },
      {
        "@type": "Organization",
        name: "digidumpling",
        sameAs: "https://digidumpling.com",
      },
    ],
  };

  const smartSalesCRMService = {
    ...getSmartSalesProductSchema(),
    description: pickSchema(routeLocale, SCHEMA_SMARTSALES_DESCRIPTION),
    url: `${baseUrl}/${routeLocale}/smartsales-crm`,
  };

  const eventXPService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#eventxp`,
    serviceType: "Event Management Software",
    name: "EventXP",
    description: pickSchema(routeLocale, SCHEMA_EVENTXP_DESCRIPTION),
    url: `${baseUrl}/${routeLocale}/eventxp`,
    serviceOutput: { "@id": `${baseUrl}/#eventxp-software` },
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Hong Kong and Greater Bay Area",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "EventXP Pricing",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - one-event workflow trial",
          },
          price: String(PRICING.quickCash.eventXpTrial),
          priceCurrency: "HKD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Starter (maintenance)",
          },
          price: String(PRICING.tools.eventXp.maintenanceStarterMonthly),
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(PRICING.tools.eventXp.maintenanceStarterMonthly),
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Growth (maintenance)",
          },
          price: String(PRICING.tools.eventXp.maintenanceGrowthMonthly),
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(PRICING.tools.eventXp.maintenanceGrowthMonthly),
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "EventXP - Enterprise (maintenance)",
          },
          price: String(PRICING.tools.eventXp.maintenanceEnterpriseMonthly),
          priceCurrency: "HKD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: String(PRICING.tools.eventXp.maintenanceEnterpriseMonthly),
            priceCurrency: "HKD",
            unitText: "per month",
          },
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.tools.eventXp.maintenanceStarterMonthly),
      highPrice: String(PRICING.quickCash.eventXpTrial),
      offerCount: 4,
    },
  };

  const aiConsultingService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-consulting`,
    serviceType: "AI Business Consultancy and Advisory",
    name: localeUsesChineseCopy(routeLocale)
      ? "業務聽診 → Discovery → 陪跑（InnovateXP）"
      : "Business Workflow Diagnosis → Discovery → co-run (InnovateXP)",
    description: pickSchema(routeLocale, SCHEMA_CONSULTING_SERVICE_DESCRIPTION),
    url: `${baseUrl}/${routeLocale}/ai-consulting`,
    isRelatedTo: [
      { "@type": "Service", "@id": `${baseUrl}/#smartsales-crm`, name: "SmartSales CRM" },
      { "@type": "Service", "@id": `${baseUrl}/#eventxp`, name: "EventXP" },
    ],
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Hong Kong and Greater Bay Area" },
      { "@type": "Country", name: "United States" },
      { "@type": "Place", name: "Global" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: localeUsesChineseCopy(routeLocale)
        ? "主線方案（聽診後報價）"
        : "Mainline programmes (quoted after diagnosis)",
      itemListElement: [
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-snapshot`,
          name: "AI Readiness Snapshot",
          price: String(PRICING.quickCash.aiReadinessAssessment),
          priceCurrency: "HKD",
          url: `${baseUrl}/${routeLocale}/#service-plans`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "AI Readiness Snapshot",
            description: localeUsesChineseCopy(routeLocale)
              ? "較細成本先做證據型決定；可升級 Discovery。"
              : "Smaller evidence-based decision before Discovery.",
          },
        },
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-discovery-10`,
          name: "30-day Discovery (up to 10 people)",
          price: String(PRICING.quickCash.aiDiscoverySprint),
          priceCurrency: "HKD",
          url: `${baseUrl}/${routeLocale}/bookme`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "30-day Discovery validation pack",
            description: localeUsesChineseCopy(routeLocale)
              ? "30 日驗證一條卡住收入／營運嘅流程；10 人或以下公開價 HK$6,880。"
              : "Validate one revenue- or operations-blocking workflow in 30 days; HK$6,880 for teams up to 10.",
          },
        },
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-discovery-30`,
          name: "Discovery workshop (11–30 people)",
          price: String(PRICING.consultancy.discoveryWorkshop11To30),
          priceCurrency: "HKD",
          url: `${baseUrl}/${routeLocale}/bookme`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "Discovery workshop (11–30 people)",
            description: localeUsesChineseCopy(routeLocale)
              ? "11–30 人團隊 Discovery 工作坊，公開價 HK$13,600。"
              : "Discovery workshop for teams of 11–30, HK$13,600.",
          },
        },
        {
          "@type": "Offer",
          "@id": `${baseUrl}/#offer-automation-trial`,
          name: "14-day automation / workflow trial",
          url: `${baseUrl}/${routeLocale}/automation-packages`,
          availability: "https://schema.org/InStock",
          itemOffered: {
            "@type": "Service",
            name: "14-day automation starter trial",
            description: localeUsesChineseCopy(routeLocale)
              ? "聽診後 14 日流程試用；轉正式可扣部分費用。"
              : "14-day workflow trial after diagnosis; credit toward a formal starter pack.",
          },
        },
      ],
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.quickCash.aiReadinessAssessment),
      highPrice: String(PRICING.consultancy.discoveryWorkshop11To30),
      description: "Published diagnosis entry prices; deeper implementation is scoped after diagnosis",
      offerCount: 4,
    },
  };

  const aiSeoUpdateService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-seo-update-package`,
    serviceType: "AI SEO and AEO retainer",
    name: pickSchema(routeLocale, SCHEMA_AI_SEO_NAME),
    description: pickSchema(routeLocale, SCHEMA_AI_SEO_DESCRIPTION),
    provider: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "HKD",
      lowPrice: String(PRICING.aiVisibility.monitorMonthly),
      highPrice: String(PRICING.aiVisibility.fullSiteRebuildFrom),
      offerCount: 4,
      offers: [
        {
          "@type": "Offer",
          name: "AI Visibility diagnosis",
          price: String(PRICING.aiVisibility.diagnosis),
          priceCurrency: "HKD",
          description: "Citation report, 3 quick wins and a 90-day priority plan. Credited to month 1 on a 6-month retainer.",
        },
        {
          "@type": "Offer",
          name: "Lite AEO retainer",
          price: String(PRICING.aiVisibility.monitorMonthly),
          priceCurrency: "HKD",
          description: "1–2 core pages and monthly metrics report. Plans of 3 months or more receive 20% off.",
        },
        {
          "@type": "Offer",
          name: "Growth AEO retainer",
          price: String(PRICING.aiVisibility.growthMonthly),
          priceCurrency: "HKD",
          description: "4–6 monthly improvements, AI citation tracking, competitor comparison and review call. Plans of 3 months or more receive 20% off.",
        },
        {
          "@type": "Offer",
          name: "Full-site AEO project",
          price: String(PRICING.aiVisibility.fullSiteRebuildFrom),
          priceCurrency: "HKD",
          description: `One-off full-site AEO rebuild. From HKD ${PRICING.aiVisibility.fullSiteRebuildFrom.toLocaleString("en-HK")}.`,
        },
      ],
    },
    url: `${baseUrl}/${routeLocale}/ai-seo-update-package`,
  };

  const homeFaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: homeFaqMainEntity(routeLocale),
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    url: baseUrl,
    name: "InnovateXP Limited",
    description: pickSchema(routeLocale, SCHEMA_WEBSITE_DESCRIPTION),
    publisher: {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`,
    },
    inLanguage: ["en-HK", "zh-HK", "zh-TW", "ja-JP", "de-DE"],
  };

  const scopedServiceSchemas =
    resolvedScope === "home"
      ? [aiConsultingService]
      : resolvedScope === "smartsales"
        ? [smartSalesCRMService]
        : resolvedScope === "eventxp"
          ? [eventXPService]
          : resolvedScope === "ai-consulting"
              ? [aiConsultingService]
              : resolvedScope === "ai-seo-package"
                ? [aiSeoUpdateService]
                : [];

  /** Product/detail pages expose richer FAQPage JSON-LD locally — avoid duplicate/conflicting FAQ here. */
  const scopedFaqSchemas = resolvedScope === "home" ? [homeFaqPageSchema] : [];

  const pageUrl = `${baseUrl}/${routeLocale}${pathWithoutLocale === "/" ? "" : pathWithoutLocale}`;
  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    inLanguage: localeToHtmlLang(routeLocale),
    isPartOf: { "@id": `${baseUrl}/#website` },
    about:
      resolvedScope === "eventxp"
        ? { "@id": `${baseUrl}/#eventxp` }
        : resolvedScope === "smartsales"
          ? { "@id": `${baseUrl}/#smartsales-crm` }
          : { "@id": `${baseUrl}/#organization` },
  };

  const breadcrumbSchema = buildBreadcrumbJsonLd(pathname || "/", baseUrl, routeLocale);
  return [
    organizationSchema,
    personSchema,
    ...scopedServiceSchemas,
    ...(breadcrumbSchema ? [breadcrumbSchema] : []),
    websiteSchema,
    webPageSchema,
    ...scopedFaqSchemas,
  ];
}

export default function StructuredData({ type = "auto" }: { type?: StructuredDataScope }) {
  const pathname = usePathname();
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(buildStructuredData(pathname || "/", type)) }}
    />
  );
}
