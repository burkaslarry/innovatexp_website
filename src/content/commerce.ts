import { PRICING, formatHkd } from "@/content/pricing";
import type { AppLocale } from "@/lib/i18n-routing";

export const PURCHASE_POLICY_VERSION = "2026-10-13";
export const OFFERS = {
  snapshot: { name: "AI Readiness Snapshot", amount: PRICING.quickCash.aiReadinessAssessment * 100, mode: "payment", qualification: false },
  discovery: { name: "30-day Discovery (≤10 people)", amount: PRICING.consultancy.discoverySprint30Day * 100, mode: "payment", qualification: true },
  discovery11To30: { name: "Discovery (11–30 people)", amount: PRICING.consultancy.discoveryWorkshop11To30 * 100, mode: "payment", qualification: true },
  accountXp: { name: "AccountXP pilot + first month", amount: PRICING.quickCash.accountXpExperience * 100, mode: "payment", qualification: true },
  eventXp: { name: "EventXP pilot", amount: PRICING.quickCash.eventXpTrial * 100, mode: "payment", qualification: true },
  systemCareEssential: { name: "System Care Essential", amount: PRICING.systemCare.essentialMonthly * 100, mode: "subscription", qualification: true },
  systemCareGrowth: { name: "System Care Growth", amount: PRICING.systemCare.growthMonthly * 100, mode: "subscription", qualification: true },
  systemCarePriority: { name: "System Care Priority", amount: PRICING.systemCare.priorityMonthly * 100, mode: "subscription", qualification: true },
} as const;
export type OfferId = keyof typeof OFFERS;
export function isOfferId(id: unknown): id is OfferId {
  return typeof id === "string" && Object.prototype.hasOwnProperty.call(OFFERS, id);
}

export function commerceCopy(locale: AppLocale) {
  const zh = locale.startsWith("zh");
  const snapshot = formatHkd(PRICING.quickCash.aiReadinessAssessment, locale);
  return zh ? {
    snapshot: "AI Readiness Snapshot", detail: `了解 Snapshot：${snapshot}`, buy: `購買 Snapshot · ${snapshot}`, continue: "前往安全付款", booking: "先預約免費業務聽診", price: "固定範圍 · 一次收費", fit: "適合想先看清一條銷售或營運流程，再決定是否投入改善的團隊。服務香港、東南亞及歐洲 3–60 人中小企。",
    intro: "先看清問題，再决定下一步。Snapshot 是書面診斷，不包括系統實施。",
    includes: "包含", deliverables: ["聚焦一條流程的 60–90 分鐘訪談", "一頁準備度評分及三個主要阻力", "是否進入 Discovery 的建議及下一步"],
    excludes: "不包括 SOP 製作、原型、軟件開發、系統實施、培訓或持續支援。", schedule: "付款後確認訪談時間；訪談前確認書面評分的交付日期。請準備一個匿名流程例子及目前使用的工具，不要提交客戶名單或財務明細。",
    corrections: "書面交付後可提出事實修正；增加流程或實施工作須另行確認範圍及報價。", upgrade: "14 日內符合升級條件，可補 HK$3,000 升級至 HK$6,880 Discovery（≤10 人）。11–30 人 HK$13,600；31–60 人另行確認範圍。",
    terms: "購買、取消及退款條款", agree: "我已閱讀服務範圍、私隱及購買／退款條款。", email: "收據及交付聯絡電郵", policy: "私隱政策", error: "未能開始付款，請稍後再試或預約聽診。", pending: "付款核對中", paid: "已核對付款", failed: "付款未完成", refunded: "訂單已退款或需人工跟進", next: "填寫付費服務問卷", success: "付款後的下一步", successBody: "我們會核對付款後安排交付。回到這頁並不代表已確認付款；如狀態未更新，請稍後重試或聯絡我們。", cancel: "尚未完成付款", cancelBody: "你可以重新查看服務範圍，或先預約免費業務聽診。", intake: "付費服务問卷", workflow: "公司及一條最想改善的流程", send: "提交問卷", received: "收到問卷，我們會聯絡你確認安排。", invalid: "此連結無效、已到期，或訂單尚未完成付款。請使用收據電郵中的最新連結或聯絡我們。", portal: "管理訂閱及付款資料",
  } : {
    snapshot: "AI Readiness Snapshot", detail: `Explore Snapshot · ${snapshot}`, buy: `Buy Snapshot · ${snapshot}`, continue: "Continue to secure payment", booking: "Start with a free diagnosis", price: "Fixed scope · one-time payment", fit: "For teams that want clarity on one sales or operations workflow before investing in change. Serving SMEs of 3–60 people in Hong Kong, Southeast Asia and Europe.",
    intro: "Understand the problem and choose the next step. Snapshot provides a written diagnosis; implementation is separate.",
    includes: "Included", deliverables: ["A 60–90-minute interview about one workflow", "A one-page readiness scorecard and three main blockers", "A recommendation on whether to proceed to Discovery and the next step"],
    excludes: "Excludes SOP production, prototypes, software development, system implementation, training and ongoing support.", schedule: "Agree the interview time after payment and the written scorecard delivery date before the interview. Bring an anonymised workflow example and your current tools; do not submit customer lists or financial records.",
    corrections: "Request factual corrections after delivery. Additional workflows or implementation require a separately agreed scope and quote.", upgrade: "An eligible upgrade within 14 days adds HK$3,000 to reach HK$6,880 Discovery (≤10 people). 11–30 people: HK$13,600. 31–60 people: separately scoped.",
    terms: "Purchase, cancellation and refund terms", agree: "I have read the service scope, privacy and purchase/refund terms.", email: "Email for receipts and delivery", policy: "Privacy policy", error: "Could not start payment. Please retry later or book a diagnosis.", pending: "Payment verification pending", paid: "Payment verified", failed: "Payment incomplete", refunded: "Refunded or requires review", next: "Complete paid-service intake", success: "Next steps after payment", successBody: "We verify payment before arranging delivery. Returning here does not confirm payment. If the status has not updated, retry later or contact us.", cancel: "Payment has not been completed", cancelBody: "Review the service scope again, or start with a free diagnosis.", intake: "Paid-service intake", workflow: "Company and the workflow you want to improve", send: "Submit intake", received: "Intake received. We will contact you to confirm arrangements.", invalid: "This link is invalid, expired, or its order is not paid. Use the latest link from your receipt email or contact us.", portal: "Manage subscription and billing",
  };
}
