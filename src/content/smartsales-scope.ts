import { PRICING, formatHkd } from "@/content/pricing";
import { localeUsesChineseCopy, type AppLocale } from "@/lib/i18n-routing";

export const SMARTSALES_LIMITS = {
  pilotUsers: 3, pilotRecords: 50, pilotDays: 14,
  starterUsers: 5, starterPipelines: 1, starterRecords: 500,
  growthUsers: 15, growthPipelines: 2, growthRecords: 2000,
  starterSupportHours: 1, growthSupportHours: 2, advancedSupportHours: 4,
} as const;

export function smartSalesScope(locale: AppLocale) {
  const zh = localeUsesChineseCopy(locale);
  const price = (n: number) => formatHkd(n, locale);
  const s = PRICING.tools.smartSales;
  return {
    title: zh ? "SmartSales CRM：先定流程，再報上線同維護。" : "SmartSales CRM: scope the workflow, then price setup and care.",
    lead: zh ? "客戶資料、負責人、銷售階段同下一步跟進，先整理一條有邊界嘅流程。Pilot、正式上線、月費維護分開計；會員制度同系統接駁先評估再另報。" : "Start with a bounded workflow for contacts, ownership, sales stages and next actions. Pilot, production setup and monthly care are separate. Membership rules and integrations need separate assessment and quotes.",
    boundary: zh ? "月費係已上線 SmartSales 嘅技術維護，唔包首次建置、客製開發或第三方授權。以下係新報價參考範圍，適配及書面確認後先開工；既有合約按原協議。" : "Monthly fees cover technical care for a deployed SmartSales instance, excluding initial setup, custom development and third-party licences. These are scopes for new quotes, subject to fit and written agreement. Existing contracts keep their agreed terms.",
    pilot: {
      name: zh ? "限定流程 Pilot" : "Bounded workflow pilot", amount: s.trial,
      summary: zh ? "最多 3 位參與者、1 條流程、50 筆匿名樣本，設定確認後試跑 14 日。" : "Up to 3 participants, 1 workflow and 50 anonymised sample records, with a 14-day trial after configuration approval.",
      items: zh ? ["確認階段、負責人及下一步欄位；用樣本試跑跟進。", "1 次 60 分鐘示範／覆核，交付適配及下一步清單。", "唔包正式資料搬遷、WhatsApp API、自動發訊或客製程式。", "Pilot 費獨立收取，唔會自動抵扣上線費。"] : ["Agree stages, owners and next-action fields; test follow-up with samples.", "One 60-minute walkthrough/review and a fit/next-step summary.", "Excludes production migration, WhatsApp APIs, automatic messaging and custom code.", "Pilot is separately charged; no automatic setup-fee credit."],
    },
    setup: [
      { name: "Starter", amount: s.setupStarter,
        summary: zh ? "最多 5 位使用者、1 條銷售流程。" : "Up to 5 users and 1 sales pipeline.",
        items: zh ? ["客戶／機會、負責人、銷售階段、跟進任務及基本 pipeline 報表。", "1 份已整理 CSV，最多 500 筆；重複、格式及缺漏先由客戶清理。", "基本管理員／銷售權限、1 次 60 分鐘培訓。", "5 個雙方確認驗收情境；2 輪原範圍設定修正。"] : ["Contacts/opportunities, owners, stages, follow-up tasks and a basic pipeline report.", "One cleaned CSV, up to 500 records. Customer resolves duplicates, formatting and missing fields first.", "Basic admin/sales permissions and one 60-minute training session.", "Five agreed acceptance scenarios and two in-scope configuration correction rounds."] },
      { name: "Growth", amount: s.setupGrowth,
        summary: zh ? "最多 15 位使用者、2 條流程。" : "Up to 15 users and 2 pipelines.",
        items: zh ? ["Starter 交付，加最多 3 條 CRM 內部提醒／任務分派規則。", "最多 2 份已整理 CSV、合共 2,000 筆；最多 3 種角色。", "最多 2 份管理報表、2 次各 60 分鐘培訓。", "8 個確認驗收情境；2 輪原範圍設定修正。"] : ["Starter deliverables plus up to 3 internal CRM reminder/task-assignment rules.", "Up to 2 cleaned CSVs totalling 2,000 records, with up to 3 roles.", "Up to 2 management reports and two 60-minute training sessions.", "Eight agreed acceptance scenarios and two in-scope correction rounds."] },
    ],
    care: [
      { name: "Starter Care", amount: s.maintenanceStarterMonthly, hours: 1 },
      { name: "Growth Care", amount: s.maintenanceGrowthMonthly, hours: 2 },
      { name: "Advanced Care", amount: s.maintenanceEnterpriseMonthly, hours: 4 },
    ],
    careTitle: zh ? "上線後月費：維護有邊界。" : "Monthly care after setup: a defined scope.",
    careBody: zh ? "每月例行應用健康檢查、備份設定覆核及一份狀態摘要，加下列遠程支援時數。支援喺香港工作日辦公時間處理；未用時數唔累積，唔係 24/7 或保證修復時限。" : "Monthly application health checks, backup-configuration review and a status summary, plus the remote support hours below. Support is handled during Hong Kong business hours; hours do not roll over. This is not 24/7 support or a guaranteed repair SLA.",
    careExcludes: zh ? "支援時數用於排查及既有設定調整。新功能、額外培訓、大量改資料、還原演練、外部系統問題另報；超額工作先報價再批准。託管、CRM 授權、WhatsApp／SMS／AI 用量另列。" : "Hours cover troubleshooting and existing configuration adjustments. New features, extra training, bulk data changes, restore exercises and external-system work are separately quoted. Hosting, CRM licences and WhatsApp/SMS/AI usage are separate line items; overages need prior approval.",
    casesTitle: zh ? "邊啲 case 可以做？以下係範圍示例。" : "Where it fits: illustrative scopes.",
    casesNote: zh ? "以下並非已驗證客戶案例或成效承諾；用嚟對照需求及驗收。" : "These are illustrative scopes, not verified client case studies or outcome promises.",
    cases: [
      { title: zh ? "B2B 查詢 → 報價 → 跟進" : "B2B enquiry → quote → follow-up", scope: zh ? "一隊 5 人內，1 條 pipeline，手動記錄查詢及報價狀態。" : "One team of up to 5, one pipeline, with manually recorded enquiries and quote status.", result: zh ? "驗收：建立查詢、指派負責人、更新階段、列出逾期任務、輸出 pipeline 報表。" : "Accept by creating an enquiry, assigning its owner, updating stages, listing overdue tasks and producing a pipeline report.", budget: `${price(s.setupStarter)} ${zh ? "起，另加維護及使用費" : "from, plus care and usage"}` },
      { title: zh ? "續約／回購跟進" : "Renewal / repeat-purchase follow-up", scope: zh ? "客戶提供到期日及購買紀錄，設定內部提醒及由人手聯絡。" : "Customer supplies renewal dates and purchase history; reminders prompt staff to contact customers.", result: zh ? "驗收：篩選將到期客戶、建立任務、記錄回覆及續約階段。唔包含積分、優惠券或自動扣款。" : "Accept by filtering upcoming renewals, generating tasks and recording replies and renewal stages. Points, coupons and automatic charging are excluded.", budget: `${price(s.setupGrowth)} ${zh ? "起，先確認欄位及規則" : "from, subject to agreed fields and rules"}` },
      { title: zh ? "會員積分／支付／外部接駁" : "Membership points / payments / integrations", scope: zh ? "涉及積分累積及退款扣分、等級、優惠券、會員 portal 或外部支付／會計接駁。" : "Points and refund reversals, tiers, coupons, a member portal or payment/accounting integrations.", result: zh ? "先出規則表、資料來源、API 權限及測試清單；按已確認範圍獨立報價。" : "First agree rules, data sources, API permissions and acceptance tests, then issue a separate scoped quote.", budget: `${price(s.customProjectFrom)} ${zh ? "起嘅預算級別；唔係標準月費功能" : "from as a project-budget guide, not a monthly-plan feature"}` },
    ],
    existingTitle: zh ? "已用 Salesforce、Odoo 或小程序？先睇可否沿用。" : "Already using Salesforce, Odoo or a mini app? Assess reuse first.",
    existingBody: zh ? "先了解現有版本、授權、設定同資料存取。分開報現有系統設定改善、額外自動化及接駁；唔會因為問 CRM 就先建議換系統。SmartSales 上線價唔等於 Salesforce／Odoo 客製報價，搬遷同供應商配合亦要計。" : "Review your edition, licences, configuration and data access first. Separate existing-system improvements, extra automation and integrations. SmartSales setup prices are not Salesforce/Odoo customisation quotes; migration and supplier coordination are also scoped.",
    acceptanceTitle: zh ? "正式報價會列明以下六項。" : "Six items in every final quote.",
    acceptance: zh ? ["使用者、角色、流程、欄位、資料筆數及來源。", "交付功能、驗收情境及客戶要提供嘅資料。", "一次性上線费、月費、第三方授權／用量費。", "材料及權限齊備後嘅排期，及客戶批核時限。", "兩輪原範圍修正；新增需求先批准追加報價。", "按驗收情境確認上線；新範圍同後續維護另列。"] : ["Users, roles, workflows, fields, record limits and sources.", "Deliverables, acceptance scenarios and customer inputs.", "Setup fees, monthly care and third-party licences/usage.", "Schedule after inputs/access are ready, and approval deadlines.", "Two in-scope correction rounds; new requirements need an approved change quote.", "Go-live against acceptance scenarios, with new scope and ongoing care separate."],
    faqTitle: zh ? "報價 FAQ" : "Pricing FAQ",
    faqs: [
      { question: zh ? "月費包唔包幫我整好成個 CRM？" : "Does the monthly fee include implementing the whole CRM?", answer: zh ? `唔包。Pilot ${price(s.trial)}、標準上線 ${price(s.setupStarter)} 起、維護 ${price(s.maintenanceStarterMonthly)}／月起係三個不同範圍。開發、授權及用量費另列。` : `No. The ${price(s.trial)} pilot, setup from ${price(s.setupStarter)} and care from ${price(s.maintenanceStarterMonthly)}/month are separate scopes. Development, licences and usage are separate.` },
      { question: zh ? "CRM 要幾萬，定十萬以上？" : "Does CRM cost tens of thousands or over HK$100,000?", answer: zh ? `一條標準流程可由 ${price(s.setupStarter)} 起；兩條流程及內部自動化可由 ${price(s.setupGrowth)} 起。完整會員制度、portal、支付或深度接駁屬 ${price(s.customProjectFrom)} 起嘅客製預算級別，正式價按書面範圍確認。` : `One standard workflow starts from ${price(s.setupStarter)}; two workflows with internal automation from ${price(s.setupGrowth)}. Full membership, portals, payments or deep integrations belong to a custom-project budget from ${price(s.customProjectFrom)}, subject to written scope.` },
      { question: zh ? "已有 Salesforce／Odoo，可以慳啲嗎？" : "Can existing Salesforce or Odoo reduce costs?", answer: zh ? "先評估標準功能、授權及現有設定可以重用幾多。可能減少重複開發，但資料清理、接駁限制及培訓仍會影響費用；唔會未檢查就保證平啲。" : "Assess standard features, licences and reusable configuration. Reuse may reduce development, but data cleanup, integration limits and training still affect cost." },
      { question: zh ? "WhatsApp 自動發訊、AI 同會員積分係咪包括？" : "Are WhatsApp automation, AI and loyalty points included?", answer: zh ? "標準範圍係 CRM 內部任務同提醒。WhatsApp Business API、訊息模板審批、自動發訊、AI 用量、積分及優惠規則先確認可行性，再報開發及平台費；唔保證讀取私人 WhatsApp 全部歷史。" : "The standard scope covers internal tasks and reminders. WhatsApp Business APIs, template approvals, automatic messaging, AI usage and loyalty rules require feasibility review and separate implementation/platform pricing. Full personal WhatsApp history access is not promised." },
      { question: zh ? "我唔識講需求，可以點開始？" : "What if I cannot describe my requirements?", answer: zh ? "帶最近一單生意，講查詢點入、邊個跟、點報價、邊步最慢或最易漏。先確認最重要一條流程，再定第一期同預算。" : "Bring a recent sale: where the enquiry arrived, who followed up, how the quote was made and where it stalled. Scope one priority workflow and its first-phase budget." },
      { question: zh ? "Pilot 同正式上線點驗收？" : "How are the pilot and production setup accepted?", answer: zh ? "Pilot 用匿名樣本核對適配；正式上線按報價列明嘅使用者、流程、資料筆數及驗收情境逐項確認。兩輪修正只涵蓋原範圍，新增流程或接駁另報。" : "The pilot tests fit with anonymised samples. Production acceptance follows quoted users, workflows, record limits and scenarios. Two correction rounds stay within scope; new workflows or integrations are separately quoted." },
    ],
    cta: zh ? "帶一單真實例子，確認 CRM 範圍" : "Bring a real sale and scope the CRM",
  };
}
