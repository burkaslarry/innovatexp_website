import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { localeUsesChineseCopy, withLocale, type AppLocale } from "@/lib/i18n-routing";

type Offering = { name: string; description: string; href: string };

export function ProductsAndServicesIntro({ locale }: { locale: AppLocale }) {
  const zh = localeUsesChineseCopy(locale);
  const products: Offering[] = zh
    ? [
        { name: "EventXP", description: "活動報名、現場簽到、出席紀錄同會後跟進，串成一條流程。", href: "/eventxp" },
        { name: "AccountXP", description: "由收據上載、分類到定期報告，減少重複入數。", href: "/products#product-packages" },
        { name: "FitnessXP", description: "幫課堂團隊管理時間表、教練、出席同續堂。", href: "/fitnessxp" },
        { name: "SmartSales CRM", description: "集中銷售查詢、分配跟進責任，掌握每個機會嘅下一步。", href: "/smartsales-crm" },
      ]
    : [
        { name: "EventXP", description: "Connect registration, check-in, attendance records and post-event follow-up.", href: "/eventxp" },
        { name: "AccountXP", description: "Turn receipt capture and classification into regular reports with less manual entry.", href: "/products#product-packages" },
        { name: "FitnessXP", description: "Manage class schedules, instructors, attendance and renewals.", href: "/fitnessxp" },
        { name: "SmartSales CRM", description: "Bring enquiries into one pipeline with clear ownership and next steps.", href: "/smartsales-crm" },
      ];
  const services: Offering[] = zh
    ? [
        { name: "流程診斷與自動化", description: "先搵出樽頸，再設計活動流程、銷售跟進同日常營運嘅自動化。", href: "/services" },
        { name: "AI Visibility", description: "檢查品牌喺 AI 搜尋答案中嘅能見度，再改善網站內容同引用資訊。", href: "/ai-seo-update-package" },
      ]
    : [
        { name: "Workflow diagnosis & automation", description: "Find bottlenecks, then design event, sales and operations workflows that your team can use.", href: "/services" },
        { name: "AI Visibility", description: "Check how your brand appears in AI answers, then improve citable website content.", href: "/ai-seo-update-package" },
      ];

  return (
    <section id="products-services" className="mb-16 scroll-mt-[var(--header-offset)]">
      <SectionHeader
        title={zh ? "產品與服務，一眼睇清" : "Products and services at a glance"}
        subtitle={zh
          ? "由活動、財務、課堂到銷售，我哋幫你執順流程，再按需要配置工具同自動化。"
          : "From events and receipts to classes and sales, we clarify the workflow before choosing the right tools and automation."}
        eyebrow={<p className="mb-3 text-sm font-semibold tracking-[0.08em] text-[color:var(--secondary-color)]">InnovateXP</p>}
      />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...products, ...services].map((item) => (
          <Link key={item.name} href={withLocale(locale, item.href)} className="ixp-card group flex h-full flex-col p-5 md:p-6">
            <h3 className="text-xl font-semibold text-[color:var(--heading-foreground)]">{item.name}</h3>
            <p className="mt-3 flex-1 text-sm leading-7 text-[color:var(--text-secondary)]">{item.description}</p>
            <span className="mt-4 text-sm font-semibold text-[color:var(--brand-primary)] group-hover:underline">
              {zh ? "了解更多 →" : "Learn more →"}
            </span>
          </Link>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-4 rounded-[var(--card-radius)] border border-[color:var(--brand-primary)]/35 bg-[color:var(--bg-secondary)] p-5 sm:flex-row sm:items-center sm:justify-between md:p-6">
        <div>
          <h3 className="text-lg font-semibold text-[color:var(--heading-foreground)]">
            {zh ? "免費 AI Visibility 迷你檢查 · 首輪 6 個名額" : "Free AI Visibility Mini Check · first 6 places"}
          </h3>
          <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]">
            {zh
              ? "17/10 活動即場登記；之後用 3 條買家問題做檢查，3 個工作天內交一頁摘要。"
              : "Register at the 17 October event; we check 3 buyer questions afterwards and deliver a one-page summary within 3 working days."}
          </p>
        </div>
        <Link href={withLocale(locale, "/ai-visibility-mini-check")} className="inline-flex shrink-0 items-center justify-center rounded-[var(--btn-radius)] bg-[color:var(--brand-primary)] px-5 py-3 text-sm font-semibold text-white">
          {zh ? "睇登記頁" : "View registration page"}
        </Link>
      </div>
    </section>
  );
}
