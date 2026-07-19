import type { LegalDocumentContent } from "@/types/legal";
import type { AppLocale } from "@/lib/i18n-routing";

const dataDeletionEn: LegalDocumentContent = {
  slug: "zomate-system-data-deletion",
  metaTitle: "Zomate User Data Deletion | ZOMATE FITNESS",
  metaDescription:
    "How to request deletion of your zomate_system account and personal data, including legal name, phone number, and WhatsApp reminder settings.",
  breadcrumb: "User Data Deletion",
  title: "Zomate System — User Data Deletion",
  effectiveDate: "19 July 2026",
  lastUpdated: "19 July 2026",
  intro: [
    "This page explains how users of the zomate_system app and ZOMATE FITNESS services can request deletion of personal data we hold about them.",
    "This process supports Meta (Facebook) platform requirements and our Privacy Policy commitments under Hong Kong PDPO and, where applicable, GDPR.",
  ],
  sections: [
    {
      title: "1. What you can delete",
      paragraphs: ["When you submit a verified deletion request, we will delete or anonymise:"],
      bullets: [
        "Your zomate_system account profile, including legal name and mobile phone number",
        "WhatsApp reminder preferences and messaging history stored on our systems",
        "Membership, booking, and attendance records linked to your account (subject to legal retention limits)",
        "Support messages and correspondence tied to your account",
        "Meta/Facebook Login linkage stored on our side (you may also revoke app access in Facebook Settings)",
      ],
    },
    {
      title: "2. How to request deletion",
      paragraphs: [
        "Email tse_wai_hi@yahoo.com.hk with the subject line “Zomate data deletion request”.",
        "To verify your identity, include at least one of the following:",
      ],
      bullets: [
        "The email address used to register",
        "The mobile phone number used for WhatsApp reminders",
        "Your Facebook account name or user ID if you signed in with Facebook Login",
      ],
    },
    {
      title: "3. What happens next",
      paragraphs: [
        "We aim to acknowledge your request within 5 business days and complete verified deletions within 30 days.",
        "Some data may be retained in anonymised form, backup archives for a limited period, or where required by law (e.g. payment records, fraud prevention, or regulatory obligations).",
        "Deleting your account will stop WhatsApp service reminders. You may re-register later with a new account if the service remains available.",
      ],
    },
    {
      title: "4. Remove Facebook Login access",
      paragraphs: [
        "If you connected with Facebook Login, you can also remove zomate_system from your Facebook account: Facebook Settings → Apps and Websites → zomate_system → Remove.",
        "Removing Facebook access limits app functionality but may not delete all data we already stored. Use the email process above for full account deletion.",
      ],
    },
    {
      title: "5. Related policies",
      paragraphs: [
        "For full details on what we collect and why, see our Privacy Policy at /en/zomate-system/privacy-policy.",
        "For service terms, see our Terms of Service at /en/zomate-system/terms-of-service.",
      ],
    },
  ],
  contactTitle: "Data deletion contact",
  contactLines: [
    "Email: tse_wai_hi@yahoo.com.hk",
    "Subject: Zomate data deletion request",
    "Include: registered email, phone number, or Facebook account identifier",
  ],
};

const dataDeletionZh: LegalDocumentContent = {
  ...dataDeletionEn,
  metaTitle: "Zomate 用戶資料刪除｜ZOMATE FITNESS",
  metaDescription:
    "如何要求刪除 zomate_system 帳戶及個人資料，包括法定姓名、電話號碼及 WhatsApp 提醒設定。",
  breadcrumb: "用戶資料刪除",
  title: "Zomate System — 用戶資料刪除",
  effectiveDate: "2026年7月19日",
  lastUpdated: "2026年7月19日",
  intro: [
    "本頁說明 zomate_system 應用程式及 ZOMATE FITNESS 服務用戶如何要求刪除我們持有的個人資料。",
    "此流程符合 Meta（Facebook）平台要求，以及我們在香港 PDPO 及（如適用）GDPR 下的私隱政策承諾。",
  ],
  sections: [
    {
      title: "1. 可刪除的資料",
      paragraphs: ["當你提交並通過核實的刪除請求後，我們會刪除或匿名化："],
      bullets: [
        "zomate_system 帳戶資料，包括法定姓名及流動電話號碼",
        "WhatsApp 提醒偏好及我們系統內的相關訊息紀錄",
        "與帳戶連結的會籍、預約及出席紀錄（受法律保留限制）",
        "與帳戶相關的支援訊息及往來紀錄",
        "我們端儲存的 Meta/Facebook Login 連結（你亦可於 Facebook 設定撤銷 App 權限）",
      ],
    },
    {
      title: "2. 如何提出刪除請求",
      paragraphs: [
        "請電郵 tse_wai_hi@yahoo.com.hk，主旨注明「Zomate data deletion request」。",
        "為核實身份，請提供以下至少一項：",
      ],
      bullets: [
        "註冊使用的電郵地址",
        "用於 WhatsApp 提醒的流動電話號碼",
        "如使用 Facebook Login 登入，你的 Facebook 帳戶名稱或用戶 ID",
      ],
    },
    {
      title: "3. 後續流程",
      paragraphs: [
        "我們目標在 5 個工作天內確認收到請求，並在 30 日內完成已核實的刪除。",
        "部分資料可能以匿名形式保留、在備份中短期留存，或按法律要求保留（例如付款紀錄、防詐或監管義務）。",
        "刪除帳戶後將停止 WhatsApp 服務提醒。如服務仍提供，你可稍後重新註冊新帳戶。",
      ],
    },
    {
      title: "4. 移除 Facebook Login 權限",
      paragraphs: [
        "如你使用 Facebook Login，可於 Facebook 設定 → Apps and Websites → zomate_system → Remove 移除權限。",
        "移除 Facebook 權限可能限制 App 功能，但未必刪除我們已儲存的所有資料。如需完整刪除帳戶，請使用上述電郵流程。",
      ],
    },
    {
      title: "5. 相關政策",
      paragraphs: [
        "有關我們收集哪些資料及用途，請參閱私隱政策：/zh-hk/zomate-system/privacy-policy。",
        "有關服務條款，請參閱：/zh-hk/zomate-system/terms-of-service。",
      ],
    },
  ],
  contactTitle: "資料刪除聯絡",
  contactLines: [
    "電郵：tse_wai_hi@yahoo.com.hk",
    "主旨：Zomate data deletion request",
    "請提供：註冊電郵、電話號碼或 Facebook 帳戶識別",
  ],
};

const termsEn: LegalDocumentContent = {
  slug: "zomate-system-terms",
  metaTitle: "Zomate Terms of Service | ZOMATE FITNESS",
  metaDescription:
    "Terms of Service for zomate_system and ZOMATE FITNESS digital fitness, membership, booking, and WhatsApp reminder services.",
  breadcrumb: "Terms of Service",
  title: "Zomate System Terms of Service",
  effectiveDate: "19 July 2026",
  lastUpdated: "19 July 2026",
  intro: [
    "These Terms of Service (“Terms”) govern your use of the zomate_system application, ZOMATE FITNESS digital services, and related features including WhatsApp message reminders.",
    "By creating an account or using the service, you agree to these Terms and our Privacy Policy. If you do not agree, do not use the service.",
  ],
  sections: [
    {
      title: "1. Service provider",
      paragraphs: [
        "The zomate_system service is operated for ZOMATE FITNESS. Support and legal enquiries: tse_wai_hi@yahoo.com.hk.",
      ],
      bullets: [
        "App name: zomate_system",
        "Brand: ZOMATE FITNESS",
        "Privacy Policy: /en/zomate-system/privacy-policy",
        "Data deletion: /en/zomate-system/data-deletion",
      ],
    },
    {
      title: "2. Eligibility and accounts",
      paragraphs: [
        "You must provide accurate information, including your legal name and mobile phone number where required for account setup and WhatsApp reminders.",
        "You are responsible for keeping login credentials secure and for activity under your account.",
        "You must be at least 16 years old, or the minimum age required in your jurisdiction, to use the service.",
      ],
    },
    {
      title: "3. WhatsApp reminders",
      paragraphs: [
        "By providing your phone number, you consent to receive WhatsApp message reminders about classes, bookings, membership notices, and related service updates.",
        "Message frequency depends on your activity. You may opt out by replying STOP where supported, updating preferences in the app, or contacting us to remove your number from reminders.",
        "Standard carrier messaging or data charges may apply.",
      ],
    },
    {
      title: "4. Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Misuse the service, attempt unauthorised access, or interfere with other users",
        "Provide false identity or contact information",
        "Use the service for unlawful, abusive, or fraudulent purposes",
        "Reverse engineer or scrape the service except where permitted by law",
      ],
    },
    {
      title: "5. Membership, bookings, and payments",
      paragraphs: [
        "Class schedules, membership benefits, pricing, and availability may change. Specific fees and refund rules may be shown at purchase or in separate venue policies.",
        "Where payment processors are used, their terms also apply. We do not store full payment card numbers on our servers when a certified processor handles payments.",
      ],
    },
    {
      title: "6. Meta (Facebook) Login",
      paragraphs: [
        "If you use Facebook Login, Meta’s terms and privacy policy apply to Meta’s processing. We use approved profile data only to authenticate you and operate app features.",
        "You may revoke Facebook Login access at any time in your Facebook account settings.",
      ],
    },
    {
      title: "7. Intellectual property",
      paragraphs: [
        "The service, branding, software, and content are owned by ZOMATE FITNESS or its licensors. You receive a limited, non-exclusive licence to use the service for personal, non-commercial purposes in accordance with these Terms.",
      ],
    },
    {
      title: "8. Disclaimers and limitation of liability",
      paragraphs: [
        "Fitness activities involve inherent risks. Consult a qualified professional before starting any exercise programme. The service is provided “as is” to the fullest extent permitted by law.",
        "To the maximum extent permitted by applicable law, we are not liable for indirect, incidental, or consequential damages arising from use of the service. Nothing in these Terms limits liability that cannot be excluded under Hong Kong law.",
      ],
    },
    {
      title: "9. Suspension and termination",
      paragraphs: [
        "We may suspend or terminate access if you breach these Terms, pose a security risk, or where required by law.",
        "You may stop using the service at any time and request account deletion as described in our data deletion instructions.",
      ],
    },
    {
      title: "10. Governing law",
      paragraphs: [
        "These Terms are governed by the laws of the Hong Kong Special Administrative Region. Disputes shall be subject to the exclusive jurisdiction of the courts of Hong Kong, unless mandatory consumer protection laws in your country require otherwise.",
      ],
    },
    {
      title: "11. Changes",
      paragraphs: [
        "We may update these Terms from time to time. The “Last updated” date will change accordingly. Continued use after updates constitutes acceptance unless otherwise required by law.",
      ],
    },
  ],
  contactTitle: "Support contact",
  contactLines: [
    "Email: tse_wai_hi@yahoo.com.hk",
    "Subject: Zomate System support / Terms enquiry",
  ],
};

const termsZh: LegalDocumentContent = {
  ...termsEn,
  metaTitle: "Zomate 服務條款｜ZOMATE FITNESS",
  metaDescription:
    "zomate_system 及 ZOMATE FITNESS 數碼健身、會籍、預約及 WhatsApp 提醒服務的服務條款。",
  breadcrumb: "服務條款",
  title: "Zomate System 服務條款",
  effectiveDate: "2026年7月19日",
  lastUpdated: "2026年7月19日",
  intro: [
    "本服務條款（「條款」）規管你使用 zomate_system 應用程式、ZOMATE FITNESS 數碼服務及相關功能（包括 WhatsApp 訊息提醒）。",
    "建立帳戶或使用服務即表示你同意本條款及我們的私隱政策。如不同意，請勿使用本服務。",
  ],
  sections: [
    {
      title: "1. 服務提供者",
      paragraphs: ["zomate_system 服務由 ZOMATE FITNESS 相關營運方提供。支援及法律查詢：tse_wai_hi@yahoo.com.hk。"],
      bullets: [
        "應用程式名稱：zomate_system",
        "品牌：ZOMATE FITNESS",
        "私隱政策：/zh-hk/zomate-system/privacy-policy",
        "資料刪除：/zh-hk/zomate-system/data-deletion",
      ],
    },
    {
      title: "2. 資格及帳戶",
      paragraphs: [
        "你必須提供準確資料，包括在帳戶設定及 WhatsApp 提醒所需的法定姓名及流動電話號碼。",
        "你須妥善保管登入憑證，並對帳戶下的活動負責。",
        "你必須年滿 16 歲，或達到你所在司法管轄區的最低年齡要求，方可使用本服務。",
      ],
    },
    {
      title: "3. WhatsApp 提醒",
      paragraphs: [
        "提供電話號碼即表示你同意接收 WhatsApp 訊息提醒，包括課堂、預約、會籍通知及相關服務更新。",
        "訊息頻率視乎你的活動而定。你可回覆 STOP（如支援）、在 App 內更新偏好，或聯絡我們要求停止提醒。",
        "流動網絡供應商可能收取標準短訊/數據費用。",
      ],
    },
    {
      title: "4. 可接受使用",
      paragraphs: ["你同意不會："],
      bullets: [
        "濫用服務、嘗試未授權存取或干擾其他用戶",
        "提供虛假身份或聯絡資料",
        "將服務用於違法、濫用或欺詐目的",
        "逆向工程或爬取服務（法律允許除外）",
      ],
    },
    {
      title: "5. 會籍、預約及付款",
      paragraphs: [
        "課堂時間表、會籍福利、價格及名額可能變更。具體費用及退款規則可能在購買時或場地政策中列明。",
        "如使用付款處理商，其條款亦適用。當認證處理商處理付款時，我們不在伺服器保存完整卡號。",
      ],
    },
    {
      title: "6. Meta（Facebook）Login",
      paragraphs: [
        "如使用 Facebook Login，Meta 的條款及私隱政策適用於 Meta 的處理。我們只使用你批准的個人資料作身份驗證及 App 功能。",
        "你可隨時於 Facebook 帳戶設定撤銷 Facebook Login 權限。",
      ],
    },
    {
      title: "7. 知識產權",
      paragraphs: [
        "服務、品牌、軟件及內容由 ZOMATE FITNESS 或其授權方擁有。你獲有限、非獨家許可，按本條款作個人、非商業用途使用服務。",
      ],
    },
    {
      title: "8. 免責及責任限制",
      paragraphs: [
        "健身活動存在固有風險。開始任何運動計劃前請諮詢合資格專業人士。服務在法律允許範圍內按「現狀」提供。",
        "在適用法律允許的最大範圍內，我們不對因使用服務而產生的間接、附帶或後果性損害負責。本條款不限制香港法律下不可排除的責任。",
      ],
    },
    {
      title: "9. 暫停及終止",
      paragraphs: [
        "如你違反本條款、構成保安風險或法律要求，我們可暫停或終止存取。",
        "你可隨時停止使用服務，並按資料刪除指引要求刪除帳戶。",
      ],
    },
    {
      title: "10. 適用法律",
      paragraphs: [
        "本條款受香港特別行政區法律管轄。爭議由香港法院專屬管轄，除非你所屬國家的強制消費者保護法律另有要求。",
      ],
    },
    {
      title: "11. 條款更新",
      paragraphs: [
        "我們可能不時更新本條款；「最後更新」日期會隨之更改。除法律另有要求外，更新後繼續使用即表示接受修訂版本。",
      ],
    },
  ],
  contactTitle: "支援聯絡",
  contactLines: ["電郵：tse_wai_hi@yahoo.com.hk", "主旨：Zomate System support / Terms enquiry"],
};

export function getZomateDataDeletion(locale: AppLocale): LegalDocumentContent {
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return dataDeletionZh;
    default:
      return dataDeletionEn;
  }
}

export function getZomateTermsOfService(locale: AppLocale): LegalDocumentContent {
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return termsZh;
    default:
      return termsEn;
  }
}
