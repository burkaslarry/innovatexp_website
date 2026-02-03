"use client"
import { useLanguage } from '../LanguageContext';

export default function StructuredData() {
  const { language } = useLanguage();

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://innovatexp.co/#organization",
    "name": "InnovateXP Limited",
    "legalName": "InnovateXP Limited",
    "url": "https://innovatexp.co",
    "logo": "https://innovatexp.co/innovatexp_color_no_bg.svg",
    "description": language === 'en' 
      ? "AI-powered CRM and customer management solutions for Hong Kong SMEs. We specialize in SmartSales CRM, EventXP check-in system, and AI consulting services."
      : "為香港中小企業提供 AI 驅動的 CRM 和客戶管理解決方案。我們專注於 SmartSales CRM、EventXP 簽到系統和 AI 顧問服務。",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "North Point",
      "addressRegion": "Hong Kong",
      "addressCountry": "HK"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+852-xxxx-xxxx",
      "contactType": "Customer Service",
      "email": "info@innovatexp.com",
      "availableLanguage": ["English", "Chinese"]
    },
    "founder": {
      "@type": "Person",
      "@id": "https://innovatexp.co/#founder",
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
      "https://github.com/innovatexp"
    ]
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://innovatexp.co/#founder",
    "name": "Larry Lo",
    "jobTitle": "Founder & AI Architect",
    "description": language === 'en'
      ? "14-year tech veteran, AI Consultant for Agilizing Education Center, former GDG Hong Kong Organizer with experience managing 2,000+ participant events, and BNI Anchor chapter member."
      : "14年科技老兵，善敏教育中心 AI 顧問，前 GDG Hong Kong Organizer，曾管理 2,000+ 參與者活動，BNI Anchor 分會成員。",
    "url": "https://www.linkedin.com/in/larry-lo-804a50165/",
    "image": "https://innovatexp.co/mypresent.jpg",
    "sameAs": [
      "https://www.linkedin.com/in/larry-lo-804a50165/",
      "https://github.com/burkaslarry"
    ],
    "worksFor": {
      "@type": "Organization",
      "@id": "https://innovatexp.co/#organization"
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
    "@id": "https://innovatexp.co/#localbusiness",
    "name": "InnovateXP Limited",
    "image": "https://innovatexp.co/innovatexp_color_no_bg.svg",
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
    "url": "https://innovatexp.co",
    "telephone": "+852-xxxx-xxxx",
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
    "@type": "Service",
    "@id": "https://innovatexp.co/#smartsales-crm",
    "serviceType": "AI CRM Software",
    "name": "SmartSales CRM",
    "description": language === 'en'
      ? "AI-powered customer relationship management system with WhatsApp integration, automated follow-ups, and intelligent scheduling for Hong Kong SMEs."
      : "AI 驅動的客戶關係管理系統，整合 WhatsApp、自動跟進和智能排程，專為香港中小企業設計。",
    "provider": {
      "@type": "Organization",
      "@id": "https://innovatexp.co/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Hong Kong"
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
    }
  };

  const eventXPService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://innovatexp.co/#eventxp",
    "serviceType": "Event Management Software",
    "name": "EventXP",
    "description": language === 'en'
      ? "Intelligent event check-in system that transforms attendance data into business insights. QR code scanning, real-time reporting, and AI-powered attendee analysis."
      : "智能活動簽到系統，將出席數據轉化為商業洞察。QR 碼掃描、實時報告和 AI 驅動的參與者分析。",
    "provider": {
      "@type": "Organization",
      "@id": "https://innovatexp.co/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Hong Kong"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "EventXP Pricing",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EventXP - Professional"
          },
          "price": "2480",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2480",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "EventXP - AI Growth"
          },
          "price": "2880",
          "priceCurrency": "HKD",
          "priceSpecification": {
            "@type": "UnitPriceSpecification",
            "price": "2880",
            "priceCurrency": "HKD",
            "unitText": "per month"
          }
        }
      ]
    }
  };

  const aiConsultingService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": "https://innovatexp.co/#ai-consulting",
    "serviceType": "AI Consulting",
    "name": "AI Consulting Services",
    "description": language === 'en'
      ? "Expert AI implementation consulting for SMEs including AI readiness audits, custom agent development, and prompt engineering training."
      : "為中小企業提供專業的 AI 實施諮詢，包括 AI 準備度評估、定制代理開發和提示工程培訓。",
    "provider": {
      "@type": "Organization",
      "@id": "https://innovatexp.co/#organization"
    },
    "areaServed": {
      "@type": "Country",
      "name": "Hong Kong"
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
            "name": "Custom Agent Build"
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
    }
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://innovatexp.co"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Services",
        "item": "https://innovatexp.co#services"
      }
    ]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://innovatexp.co/#website",
    "url": "https://innovatexp.co",
    "name": "InnovateXP Limited",
    "description": language === 'en'
      ? "AI CRM Solutions and Event Management for Hong Kong SMEs"
      : "為香港中小企業提供 AI CRM 解決方案和活動管理",
    "publisher": {
      "@type": "Organization",
      "@id": "https://innovatexp.co/#organization"
    },
    "inLanguage": ["en", "zh-HK"]
  };

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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(smartSalesCRMService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(eventXPService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aiConsultingService) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
