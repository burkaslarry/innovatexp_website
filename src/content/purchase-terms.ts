import type { AppLocale } from "@/lib/i18n-routing";
import type { LegalDocumentContent } from "@/types/legal";
import { PURCHASE_POLICY_VERSION, OFFERS } from "@/content/commerce";

export function purchaseTerms(locale: AppLocale): LegalDocumentContent {
  const zh = locale.startsWith("zh");
  const title = zh ? "購買、取消及退款條款" : "Purchase, cancellation and refund terms";
  return {
    slug: "purchase-terms", title, breadcrumb: title, metaTitle: `${title} | InnovateXP`,
    metaDescription: zh ? "InnovateXP 固定範圍服務、付款、交付、取消及退款安排。" : "Scope, payment, delivery, cancellation and refunds for InnovateXP services.",
    effectiveDate: PURCHASE_POLICY_VERSION, lastUpdated: PURCHASE_POLICY_VERSION,
    intro: [zh ? "InnovateXP Limited 提供業務流程顧問及相關工具。購買前請閱讀產品頁及已同意的服務範圍。未經審核的客製或訂閱服務不能直接購買。" : "InnovateXP Limited provides workflow consulting and related tools. Read the product page and agreed scope before paying. Custom work and subscriptions require qualification before purchase."],
    sections: zh ? [
      { title: "1. 服務範圍及價格", paragraphs: [`Snapshot 固定範圍 HK$${OFFERS.snapshot.amount / 100}：一條流程、60–90 分鐘訪談、一頁評分、三個阻力及下一步建議。不包括 SOP、原型或實施。Discovery ≤10 人 HK$${OFFERS.discovery.amount / 100}；11–30 人 HK$${OFFERS.discovery11To30.amount / 100}，須先確認範圍；31–60 人另行報價。`, "其他服務的交付、排除項目、時程、修訂及客戶責任，以付款前雙方同意的範圍為準。額外工作須另行報價。"] },
      { title: "2. 付款及安排", paragraphs: ["款項以 HKD 收取。適用稅項或其他費用如有，須在付款前清楚顯示。Stripe 處理付款；InnovateXP 不收集或儲存完整卡資料。付款成功不代表承諾無限支援或保證業務成果。", "付款核對後安排訪談；訪談前確認書面交付日期。客戶須提供已同意的資料及存取權限；資料延遲可能影響交付。若工作開始前無法同意安排，可申請取消及退款。"] },
      { title: "3. 取消、退款及改期", paragraphs: ["工作尚未開始可聯絡我們取消及申請退款。工作開始後按已完成及已同意工作的範圍評估未交付部分；若交付不符合已同意的範圍，請聯絡我們修正或討論適當退款。法定權利不受本條款限制。", "需要改期請盡早聯絡。我們會確認可用時間；額外費用如有，必須先得到同意。退款經原付款方式處理，完成時間視付款服務商及銀行而定。"] },
      { title: "4. 驗收及修正", paragraphs: ["Snapshot 可提出事實修正，增加流程或實施工作不屬原範圍。Pilot 以已同意的樣本、欄位、輸出及流程驗收；AI 分類仍需人工核對，不取代專業判斷。Discovery 不等於同意任何後續實施項目。"] },
      { title: "5. 訂閱及 System Care", paragraphs: ["須先通過 Technical Audit 或產品適配審核，並書面同意月費、用量、支援範圍、續費及取消安排。回應時間指確認及分流，不是保證修復時間；不包括無限修改或第三方故障保證。", "訂閱按已同意周期自動續費；可透過私人帳單入口管理付款及申請期末取消。立即取消、部分退款、付款失敗時的寬限及停用安排，以已同意的服務範圍為準。"] },
      { title: "6. 私隱及保密", paragraphs: ["只提交服務所需的最少資料；不要提交客戶名單、財務明細或敏感個人資料。營運細節不會未經書面同意用作公開案例。詳見私隱政策。"] },
    ] : [
      { title: "1. Scope and prices", paragraphs: [`Snapshot is a fixed-scope HK$${OFFERS.snapshot.amount / 100} service: one workflow, a 60–90-minute interview, one-page scorecard, three blockers and next-step recommendation. It excludes SOP production, prototypes and implementation. Discovery for ≤10 people is HK$${OFFERS.discovery.amount / 100}; 11–30 people is HK$${OFFERS.discovery11To30.amount / 100}, subject to scope confirmation. 31–60 people are quoted separately.`, "Other deliverables, exclusions, timetable, revisions and customer responsibilities follow the scope agreed before payment. Additional work requires a separate quote."] },
      { title: "2. Payment and scheduling", paragraphs: ["Prices are in HKD. Any applicable tax or additional fee must be shown before payment. Stripe processes payments; InnovateXP does not collect or store complete card details. Payment does not promise unlimited support or a particular business outcome.", "Arrange the interview after payment verification and agree the written delivery date before the interview. Customers provide agreed inputs and access; delays can affect delivery. If arrangements cannot be agreed before work starts, request cancellation and a refund."] },
      { title: "3. Cancellation, refunds and rescheduling", paragraphs: ["Contact us to cancel and request a refund before work starts. After work starts, the undelivered portion is assessed against completed and agreed work. If delivery does not meet the agreed scope, contact us for correction or an appropriate refund. Statutory rights are unaffected.", "Contact us early to reschedule. We confirm availability and obtain agreement before any additional fee. Refunds use the original payment method; processing time depends on the payment provider and bank."] },
      { title: "4. Acceptance and corrections", paragraphs: ["Request factual corrections to a Snapshot; additional workflows or implementation are outside its scope. Pilot acceptance uses agreed samples, fields, outputs and workflow. AI classification needs human review and does not replace professional judgement. Discovery does not commit either party to further implementation."] },
      { title: "5. Subscriptions and System Care", paragraphs: ["An accepted Technical Audit or product-fit review and written agreement on monthly fees, usage, support, renewal and cancellation are required. Response time means acknowledgement and triage, not a guaranteed fix. Unlimited modifications and third-party outage guarantees are excluded.", "Subscriptions renew on the agreed billing cycle. Use the private billing portal to manage payments and request cancellation at period end. Immediate cancellation, partial refunds, failed-payment grace and service suspension follow the agreed service scope."] },
      { title: "6. Privacy and confidentiality", paragraphs: ["Submit only necessary service inputs, not customer lists, financial details or sensitive personal data. Operational details are not used as public case studies without written permission. See the privacy policy."] },
    ],
    contactTitle: zh ? "購買及退款查詢" : "Purchase and refund enquiries", contactLines: ["InnovateXP Limited", "info@innovatexp.co", zh ? "請提供訂單編號；不要提供卡資料。" : "Include your order reference; do not provide card details."],
  };
}
