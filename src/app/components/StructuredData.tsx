"use client"
/* F03: Route-scoped JSON-LD - Injects Organization, Service, FAQ, and page-specific structured data by path. */
import { usePathname } from "next/navigation";
import { useLanguage } from '../LanguageContext';

function buildBreadcrumbJsonLd(
  pathname: string,
  baseUrl: string,
  language: "en" | "zh"
) {
  const normalized = (pathname || "/").split("?")[0]?.replace(/\/$/, "") || "/";
  if (normalized === "/") return null;

  const segments = normalized.slice(1).split("/").filter(Boolean);
  const homeLabel = language === "en" ? "Home" : "首頁";
  const items: { name: string; item: string }[] = [{ name: homeLabel, item: baseUrl }];

  const labels: Record<string, { en: string; zh: string }> = {
    bookme: { en: "Book a visit", zh: "預約洽詢" },
    blog: { en: "Blog", zh: "網誌" },
    "pitch-decks": { en: "Pitch decks", zh: "簡報下載" },
    reliability: { en: "Reliability manifesto", zh: "可靠 AI 立場" },
    "smartsales-crm": { en: "SmartSales CRM", zh: "SmartSales CRM" },
    eventxp: { en: "EventXP", zh: "EventXP" },
    "ai-consulting": { en: "AI Consulting", zh: "AI 顧問服務" },
    "ai-seo-update-package": { en: "AI SEO update package", zh: "AI SEO 更新套餐" },
  };

  let acc = "";
  for (let i = 0; i < segments.length; i++) {
    acc += `/${segments[i]}`;
    const seg = segments[i];
    const known = labels[seg];
    let name: string;
    if (known) {
      name = language === "en" ? known.en : known.zh;
    } else if (segments[0] === "blog") {
      name = language === "en" ? "Article" : "文章";
    } else {
      name = seg.replace(/-/g, " ");
    }
    items.push({ name, item: `${baseUrl}${acc}` });
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

export default function StructuredData({ type = "auto" }: { type?: StructuredDataScope }) {
  const { language } = useLanguage();
  const pathname = usePathname();
  const baseUrl = "https://www.innovatexp.co";
  const normalizedPath = (pathname?.toLowerCase() || "/").replace(/\/$/, "") || "/";

  const resolvedScope: StructuredDataScope =
    type !== "auto"
      ? type
      : normalizedPath === "/" || normalizedPath === ""
      ? "home"
      : normalizedPath.startsWith("/smartsales-crm")
      ? "smartsales"
      : normalizedPath.startsWith("/eventxp")
      ? "eventxp"
      : normalizedPath.startsWith("/ai-consulting")
      ? "ai-consulting"
      : normalizedPath.startsWith("/ai-seo-update-package")
      ? "ai-seo-package"
      : "minimal";

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${baseUrl}/#organization`,
    "name": "InnovateXP Limited",
    "alternateName": "IXP",
    "legalName": "InnovateXP Limited",
    "url": baseUrl,
    "logo": `${baseUrl}/innovatexp_color_no_bg.svg`,
    "description": language === 'en' 
      ? "We help Hong Kong SMEs turn event leads and WhatsApp inquiries into structured sales pipelines with AI-augmented workflows. System deployment can support cloud platforms including Azure OpenAI, Alibaba Cloud, GCP, AWS, or self-hosted / on-premise environments, plus practical AI training."
      : "我們協助香港中小企將活動名單同 WhatsApp 查詢變成結構化 sales pipeline，透過 AI 輔助分類、下一步建議與回覆草稿。系統上架可支援 Cloud Platform（Azure OpenAI、Alibaba Cloud、GCP、AWS）或自家主機／On-Premise 部署，並提供實戰 AI training。",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Point",
      "addressRegion": "Hong Kong",
      "addressCountry": "HK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "email": "info@innovatexp.co",
      "availableLanguage": ["English", "Chinese"]
    },
    "founder": {
      "@type": "Person",
      "@id": `${baseUrl}/#founder`,
      "name": "Larry Lo",
      "jobTitle": "Founder & AI Architect",
      "url": "https://www.linkedin.com/in/larry-lo-804a50165/",
      "sameAs": [
        "https://www.linkedin.com/in/larry-lo-804a50165/",
        "https://github.com/burkaslarry"
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/innovatexp",
      "https://www.linkedin.com/in/larry-lo-804a50165/"
    ],
    "knowsAbout": [
      "AI CRM",
      "SME AI Automation",
      "Business Process Automation",
      "AI Implementation Consulting",
      "Next.js",
      "Ollama",
      "Prompt Engineering",
      "Event Check-in Intelligence",
      "Business Intelligence Dashboards",
      "Lead Qualification Automation",
      "Azure OpenAI Implementation",
      "Alibaba Cloud AI Deployment",
      "GCP AI Deployment",
      "AWS AI Deployment",
      "AI-augmented Workflow Deployment",
      "On-Premise AI Deployment",
      "AI Training for SMEs",
      "Compliant Regional Cloud Architecture",
      "香港 WhatsApp CRM",
      "香港中小企 AI 自動化",
      "BNI 跟進系統",
      "Google Gemini API",
      "WhatsApp CRM Integration"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${baseUrl}/#founder`,
    "name": "Larry Lo",
    "jobTitle": "Founder & AI Architect",
    "description": language === 'en'
      ? "Built by a practitioner, not a consultant. Larry Lo has 14 years of hands-on system architecture experience, including high-availability projects for government and public transport in Hong Kong. He is the person who builds and supports your system — not a project manager who subcontracts. Former Google Developer Group HK Organizer · HKSTP Incubation Alumni · Systems handling 2,000+ concurrent active users"
      : "14年科技老兵，善敏教育中心 AI 顧問，前 GDG Hong Kong Organizer，曾管理 2,000+ 參與者活動，BNI Anchor 分會成員。",
    "url": "https://www.linkedin.com/in/larry-lo-804a50165/",
    "image": `${baseUrl}/mypresent.jpg`,
    "sameAs": [
      "https://www.linkedin.com/in/larry-lo-804a50165/",
      "https://github.com/burkaslarry"
    ],
    "worksFor": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "alumniOf": [
      {
        "@type": "Organization",
        "name": "Hong Kong Science and Technology Parks Corporation",
        "sameAs": "https://www.hkstp.org"
      }
    ],
    "affiliation": [
      {
        "@type": "Organization",
        "name": "Agilizing Education Center",
        "sameAs": "https://agilizing.com"
      },
      {
        "@type": "Organization",
        "name": "BNI Anchor",
        "sameAs": "https://www.bni-anchor.com/"
      }
    ]
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${baseUrl}/#localbusiness`,
    "name": "InnovateXP Limited",
    "image": `${baseUrl}/innovatexp_color_no_bg.svg`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Point",
      "addressRegion": "Hong Kong",
      "addressCountry": "HK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 22.2908,
      "longitude": 114.1950
    },
    "url": baseUrl,
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      }
    ]
  };

  const smartSalesCRMService = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    "@id": `${baseUrl}/#smartsales-crm`,
    "serviceType": "AI CRM Software",
    "name": "SmartSales CRM",
    "description": language === 'en'
      ? "AI-powered customer relationship management system with WhatsApp integration, automated follow-ups, and intelligent scheduling for Hong Kong SMEs."
      : "AI 驅動的客戶關係管理系統，整合 WhatsApp、自動跟進和智能排程，專為香港中小企業設計。",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Hong Kong and Greater Bay Area"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "SmartSales CRM Pricing",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SmartSales CRM - Starter"
          },
          "price": "2800",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2800",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "SmartSales CRM - Pro"
          },
          "price": "4800",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "4800",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        }
      ]
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "HKD",
      "lowPrice": "10800",
      "highPrice": "18880",
      "offerCount": 3
    }
  };

  const eventXPService = {
    "@context": "https://schema.org",
    "@type": ["Service", "Product"],
    "@id": `${baseUrl}/#eventxp`,
    "serviceType": "Event Management Software",
    "name": "EventXP",
    "description": language === 'en'
      ? "Intelligent event check-in system that transforms attendance data into business insights. QR code scanning, real-time reporting, and AI-powered attendee analysis."
      : "智能活動簽到系統，將出席數據轉化為商業洞察。QR 碼掃描、實時報告和 AI 驅動的參與者分析。",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Hong Kong and Greater Bay Area"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "EventXP Pricing",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EventXP - Starter (maintenance)"
          },
          "price": "880",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "880",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EventXP - Growth (maintenance)"
          },
          "price": "1280",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1280",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EventXP - Enterprise (maintenance)"
          },
          "price": "1480",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "1480",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        }
      ]
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "HKD",
      "lowPrice": "6800",
      "highPrice": "9800",
      "offerCount": 3
    }
  };

  const aiConsultingService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-consulting`,
    "serviceType": "AI Consulting",
    "name": "AI Consulting Services",
    "description": language === 'en'
      ? "Practical AI implementation consulting for Hong Kong SMEs, including cloud platform deployment (Azure OpenAI, Alibaba Cloud, GCP, AWS), on-premise options, AI training, and deterministic workflow automation design."
      : "為香港中小企提供可落地的 AI 實作顧問，包括 Cloud Platform（Azure OpenAI、Alibaba Cloud、GCP、AWS）、On-Premise 部署選項、AI training 與可控流程自動化設計。",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": {
      "@type": "AdministrativeArea",
      "name": "Hong Kong and Greater Bay Area"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Consulting Packages",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Readiness Audit"
          },
          "price": "8000",
          "priceCurrency": "HKD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Custom AI Workflow Build"
          },
          "price": "25000",
          "priceCurrency": "HKD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Prompt Training Bootcamp"
          },
          "price": "12000",
          "priceCurrency": "HKD"
        }
      ]
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "HKD",
      "lowPrice": "8000",
      "highPrice": "25000",
      "offerCount": 3
    }
  };

  const aiSeoUpdateService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${baseUrl}/#ai-seo-update-package`,
    "serviceType": "AI SEO Content Update Service",
    "name": language === "en" ? "AI SEO Update Package" : "AI SEO 更新套餐",
    "description":
      language === "en"
        ? "Done-for-you AI SEO content and schema update package for SMEs, with fixed revision rounds and follow-up sessions."
        : "為中小企提供 AI SEO 內容與結構化資料更新服務，包含固定修改輪次與跟進會議。",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "HKD",
      "lowPrice": "2000",
      "highPrice": "6000",
      "offerCount": 2,
      "offers": [
        {
          "@type": "Offer",
          "name": "AI SEO 更新套餐 - Starter",
          "price": "2000",
          "priceCurrency": "HKD",
          "description": "3 次改動、1 星期完成、1 次 follow-up"
        },
        {
          "@type": "Offer",
          "name": "AI SEO 更新套餐 - Growth",
          "price": "6000",
          "priceCurrency": "HKD",
          "description": "10 次改動、1 個月完成、2 次 follow-up"
        }
      ]
    },
    "url": `${baseUrl}/ai-seo-update-package`
  };

  const homeFaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": language === 'en'
      ? [
          {
            "@type": "Question",
            "name": "What is AI CRM and how is it different from traditional CRM?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI CRM combines customer records with AI-generated drafts, workflow automation, and priority scoring. Unlike traditional CRM that mainly stores data, it helps teams respond faster and reduce repetitive follow-up work."
            }
          },
          {
            "@type": "Question",
            "name": "How does EventXP QR check-in work?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Guests receive a unique QR code by email or WhatsApp. Staff scan codes on-site, attendance is recorded in real time, and EventXP can trigger post-event follow-up workflows based on participation signals."
            }
          },
          {
            "@type": "Question",
            "name": "Where can InnovateXP deploy AI-assisted workflows?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "InnovateXP supports deployment on major cloud platforms (including Azure OpenAI, Alibaba Cloud, GCP, and AWS) and self-hosted or on-premise environments when your risk or compliance posture requires it, with practical AI training for your team."
            }
          }
        ]
      : [
          {
            "@type": "Question",
            "name": "什麼是 AI CRM？它與傳統 CRM 有何不同？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "AI CRM 把客戶資料管理結合 AI 草稿、自動化流程與優先排序。相比只儲存資料的傳統 CRM，AI CRM 可協助團隊更快回覆並減少重複跟進工作。"
            }
          },
          {
            "@type": "Question",
            "name": "QR 碼簽到如何運作？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "賓客透過電郵或 WhatsApp 收到獨特 QR 碼，工作人員現場掃描後系統即時記錄出席，並可根據活動行為訊號自動觸發後續跟進流程。"
            }
          },
          {
            "@type": "Question",
            "name": "InnovateXP 可將 AI 輔助流程部署喺邊？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "我們可配合主要 Cloud Platform（Azure OpenAI、Alibaba Cloud、GCP、AWS）上架，亦可在需要時採用自家主機／On-Premise 部署以符合風險或合規要求，並提供實戰 AI training。"
            }
          }
        ]
  };

  const aiSeoUpdateFaqPageSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": language === "en"
      ? [
          {
            "@type": "Question",
            "name": "How many revisions are included in the AI SEO Update Package?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "The Starter package includes 3 revisions in one week with 1 follow-up. The Growth package includes 10 revisions in one month with 2 follow-ups."
            }
          }
        ]
      : [
          {
            "@type": "Question",
            "name": "AI SEO 更新套餐包含幾多次修改？",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Starter 套餐一星期內提供 3 次修改與 1 次 follow-up。Growth 套餐一個月內提供 10 次修改與 2 次 follow-up。"
            }
          }
        ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    "url": baseUrl,
    "name": "InnovateXP Limited",
    "description": language === 'en'
      ? "WhatsApp CRM, EventXP, AI training, cloud platform and on-premise deployment support for Hong Kong SMEs"
      : "為香港中小企提供 WhatsApp CRM、EventXP、AI training、Cloud Platform 及 On-Premise 部署支援",
    "publisher": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "inLanguage": ["en", "zh-HK"]
  };

  const consultingServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${baseUrl}/#consulting-service`,
    "name": "InnovateXP Limited",
    "description": language === 'en'
      ? "We deliver practical AI-augmented workflow systems for Hong Kong SMEs, deployed on cloud platforms (Azure OpenAI, Alibaba Cloud, GCP, AWS) or self-hosted / on-premise environments where appropriate."
      : "我們為香港中小企交付可落地的 AI-augmented workflow，系統上架可按需要支援 Cloud Platform（Azure OpenAI、Alibaba Cloud、GCP、AWS）或自家主機／On-Premise 部署。",
    "url": baseUrl,
    "serviceType": "AI Consulting",
    "provider": {
      "@type": "Organization",
      "@id": `${baseUrl}/#organization`
    },
    "areaServed": [
      { "@type": "Country", "name": "Hong Kong" },
      { "@type": "Country", "name": "United States" },
      { "@type": "Place", "name": "Global" }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "AI Consulting & Solutions",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "AI Consulting" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "SmartSales CRM" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "EventXP" } }
      ]
    }
  };

  const scopedServiceSchemas =
    resolvedScope === "home"
      ? [smartSalesCRMService, eventXPService, aiConsultingService]
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
  const scopedFaqSchemas =
    resolvedScope === "home"
      ? [homeFaqPageSchema]
      : resolvedScope === "ai-seo-package"
      ? [aiSeoUpdateFaqPageSchema]
      : [];

  const breadcrumbSchema = buildBreadcrumbJsonLd(pathname || "/", baseUrl, language);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      {scopedServiceSchemas.map((schema, idx) => (
        <script
          key={`service-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      {breadcrumbSchema ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      ) : null}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(consultingServiceSchema) }}
      />
      {scopedFaqSchemas.map((schema, idx) => (
        <script
          key={`faq-schema-${idx}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
