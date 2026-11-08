import type { AppLocale } from "@/lib/i18n-routing";

export const CART_PENDING_KEY = "ixp-pending-checkout-v1";
export const CART_RETRY_KEY = "ixp-checkout-retry-v1";

const en = {
  title: "Shopping cart", close: "Close shopping cart", intro: "Pay for eligible, agreed services. Other items remain an inquiry.", add: "Add to cart", approvedAdd: "Add agreed service to cart",
  payment: "Pay with Stripe", unavailable: "Online payment is not available yet. You can still request a quote below.", loading: "Checking payment availability…",
  noEligible: "These items need an agreed scope or payment setup before purchase. Request a quote, or reopen your agreed-service invitation.",
  oneTime: "One-time services", monthly: "Monthly subscription", separate: "One-time services and subscriptions are paid separately. Only one subscription can be purchased per checkout.",
  quantity: "Each agreed service is purchased once per checkout. Set its quantity to 1 to include it.", duplicate: "The same service appears more than once. Remove the duplicate before payment.",
  includes: "This payment includes", remaining: "Other items stay in your cart and are not charged.", monthlySuffix: "/ month", email: "Receipt and agreed-service email", terms: "I accept the purchase, cancellation and refund terms and privacy policy.",
  termsLink: "Purchase terms", privacyLink: "Privacy policy", pay: "Continue to Stripe", busy: "Opening secure checkout…", error: "Could not start payment. Check your invitation and email, then retry or contact us.",
  quote: "Request a quote instead", quoteNote: "This sends an inquiry, not a payment.", ready: "Eligible for payment", needsScope: "Scope confirmation required", pending: "Verifying payment", paid: "Payment verified", failed: "Payment incomplete", refunded: "Refunded or needs review", intake: "Continue to service intake", retry: "Check payment again", statusError: "Payment status is unavailable. Retry or contact us; do not pay again just because this page has not updated.",
};
export type CartCopy = typeof en;
export const CART_COPY: Record<AppLocale, CartCopy> = {
  en,
  "zh-hk": {
    title: "購物車", close: "關閉購物車", intro: "可支付符合條件、已確認範圍嘅服務；其他項目保留為查詢。", add: "加入購物車", approvedAdd: "將已確認服務加入購物車",
    payment: "以 Stripe 付款", unavailable: "網上付款尚未開放，你仍可在下方提交報價查詢。", loading: "正在檢查付款是否可用…",
    noEligible: "呢啲項目需要先確認服務範圍或完成付款設定。請提交查詢，或重新開啟已確認服務嘅邀請連結。",
    oneTime: "一次性服務", monthly: "月費訂閱", separate: "一次性服務同訂閱分開付款；每次只可購買一個訂閱。",
    quantity: "每項已確認服務每次只可購買一份，請將數量設為 1。", duplicate: "同一服務重複出現，請先移除重複項目。",
    includes: "今次付款包括", remaining: "其餘項目保留在購物車，唔會扣款。", monthlySuffix: "／月", email: "收據及已確認服務聯絡電郵", terms: "我接受購買、取消及退款條款，以及私隱政策。",
    termsLink: "購買條款", privacyLink: "私隱政策", pay: "前往 Stripe 付款", busy: "正在開啟安全付款…", error: "未能開始付款，請核對邀請及電郵後重試，或聯絡我們。",
    quote: "改為查詢報價", quoteNote: "只提交業務查詢，不會扣款。", ready: "可進行付款", needsScope: "須先確認服務範圍", pending: "付款核對中", paid: "付款已核對", failed: "付款未完成", refunded: "已退款或需人工跟進", intake: "填寫服務問卷", retry: "重新核對付款", statusError: "暫時未能取得付款狀態，請重試或聯絡我們；唔好因為呢頁未更新而重複付款。",
  },
  "zh-tw": {
    title: "購物車", close: "關閉購物車", intro: "可支付符合條件且已確認範圍的服務；其他項目保留為詢價。", add: "加入購物車", approvedAdd: "將已確認服務加入購物車",
    payment: "使用 Stripe 付款", unavailable: "線上付款尚未開放，你仍可在下方提交報價詢問。", loading: "正在檢查付款是否可用…",
    noEligible: "這些項目需要先確認服務範圍或完成付款設定。請提交詢問，或重新開啟已確認服務的邀請連結。",
    oneTime: "一次性服務", monthly: "月費訂閱", separate: "一次性服務與訂閱分開付款；每次只可購買一個訂閱。",
    quantity: "每項已確認服務每次只可購買一份，請將數量設為 1。", duplicate: "同一服務重複出現，請先移除重複項目。",
    includes: "本次付款包括", remaining: "其餘項目保留在購物車，不會扣款。", monthlySuffix: "／月", email: "收據及已確認服務聯絡電子郵件", terms: "我接受購買、取消及退款條款，以及隱私政策。",
    termsLink: "購買條款", privacyLink: "隱私政策", pay: "前往 Stripe 付款", busy: "正在開啟安全付款…", error: "無法開始付款，請核對邀請及電子郵件後重試，或聯絡我們。",
    quote: "改為詢問報價", quoteNote: "只提交業務詢問，不會扣款。", ready: "可進行付款", needsScope: "須先確認服務範圍", pending: "付款核對中", paid: "付款已核對", failed: "付款未完成", refunded: "已退款或需人工處理", intake: "填寫服務問卷", retry: "重新核對付款", statusError: "暫時無法取得付款狀態，請重試或聯絡我們；不要因為此頁尚未更新而重複付款。",
  },
  ja: {
    title: "カート", close: "カートを閉じる", intro: "条件と範囲を確認済みのサービスを購入できます。他の項目は見積もり依頼として残ります。", add: "カートに追加", approvedAdd: "合意済みサービスをカートに追加",
    payment: "Stripe で支払う", unavailable: "オンライン決済はまだ利用できません。下から見積もりを依頼できます。", loading: "決済の利用状況を確認中…",
    noEligible: "購入には範囲の合意または決済設定が必要です。見積もりを依頼するか、合意済みサービスの招待リンクを開き直してください。",
    oneTime: "単発サービス", monthly: "月額契約", separate: "単発サービスと月額契約は別々に決済します。月額契約は一度に1件のみ購入できます。",
    quantity: "合意済みサービスは1回の決済につき各1件です。数量を1にしてください。", duplicate: "同じサービスが重複しています。重複分を削除してください。",
    includes: "今回の支払い対象", remaining: "他の項目はカートに残り、請求されません。", monthlySuffix: "／月", email: "領収書・合意済みサービスのメールアドレス", terms: "購入・キャンセル・返金条件とプライバシーポリシーに同意します。",
    termsLink: "購入条件", privacyLink: "プライバシー", pay: "Stripe の決済に進む", busy: "安全な決済を準備中…", error: "決済を開始できません。招待とメールアドレスを確認して再試行するか、お問い合わせください。",
    quote: "見積もりを依頼する", quoteNote: "問い合わせのみ送信します。課金されません。", ready: "支払い可能", needsScope: "範囲の確認が必要", pending: "支払いを確認中", paid: "支払い確認済み", failed: "支払い未完了", refunded: "返金済み・要確認", intake: "サービスの質問票に進む", retry: "支払いを再確認", statusError: "支払い状況を取得できません。再試行するか、お問い合わせください。画面が更新されない場合も重複して支払わないでください。",
  },
  de: {
    title: "Warenkorb", close: "Warenkorb schließen", intro: "Bestätigte, freigegebene Leistungen bezahlen. Andere Positionen bleiben eine Anfrage.", add: "In den Warenkorb", approvedAdd: "Bestätigte Leistung hinzufügen",
    payment: "Mit Stripe bezahlen", unavailable: "Online-Zahlungen sind noch nicht verfügbar. Sie können unten ein Angebot anfragen.", loading: "Zahlungsverfügbarkeit wird geprüft…",
    noEligible: "Diese Positionen benötigen eine Leistungsvereinbarung oder Zahlungseinrichtung. Fragen Sie ein Angebot an oder öffnen Sie Ihre Einladung erneut.",
    oneTime: "Einmalige Leistungen", monthly: "Monatliches Abonnement", separate: "Einmalige Leistungen und Abonnements werden getrennt bezahlt. Pro Zahlung ist nur ein Abonnement möglich.",
    quantity: "Jede bestätigte Leistung kann pro Zahlung einmal gekauft werden. Setzen Sie die Menge auf 1.", duplicate: "Dieselbe Leistung ist mehrfach enthalten. Entfernen Sie das Duplikat.",
    includes: "Diese Zahlung umfasst", remaining: "Andere Positionen bleiben im Warenkorb und werden nicht berechnet.", monthlySuffix: "/ Monat", email: "E-Mail für Beleg und Leistungsvereinbarung", terms: "Ich akzeptiere die Kauf-, Storno- und Erstattungsbedingungen sowie die Datenschutzerklärung.",
    termsLink: "Kaufbedingungen", privacyLink: "Datenschutz", pay: "Weiter zu Stripe", busy: "Sichere Zahlung wird geöffnet…", error: "Zahlung konnte nicht gestartet werden. Prüfen Sie Einladung und E-Mail oder kontaktieren Sie uns.",
    quote: "Stattdessen Angebot anfragen", quoteNote: "Sendet eine Anfrage, keine Zahlung.", ready: "Zahlung möglich", needsScope: "Leistungsumfang bestätigen", pending: "Zahlung wird geprüft", paid: "Zahlung bestätigt", failed: "Zahlung nicht abgeschlossen", refunded: "Erstattet oder zu prüfen", intake: "Zum Leistungsfragebogen", retry: "Zahlung erneut prüfen", statusError: "Zahlungsstatus nicht verfügbar. Erneut prüfen oder uns kontaktieren; nicht allein wegen einer unveränderten Anzeige nochmals zahlen.",
  },
};
