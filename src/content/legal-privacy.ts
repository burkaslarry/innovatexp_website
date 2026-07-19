import type { AppLocale } from "@/lib/i18n-routing";
import type { PrivacyPolicyContent } from "@/types/legal";

const innovatexpEn: PrivacyPolicyContent = {
  slug: "innovatexp",
  metaTitle: "InnovateXP Privacy Policy | Website, Booking & AI Tools",
  metaDescription:
    "Privacy Policy for InnovateXP Limited: website, booking, CRM, event tools, and AI-assisted workflows. PDPO (Hong Kong) and GDPR-aligned practices.",
  breadcrumb: "Privacy Policy",
  title: "InnovateXP Privacy Policy",
  effectiveDate: "19 July 2026",
  lastUpdated: "19 July 2026",
  intro: [
    "InnovateXP Limited (“InnovateXP”, “we”, “us”) operates innovatexp.co and related services, including booking, enquiry forms, AI-assisted consulting workflows, SmartSales CRM, EventXP, and other business tools we deliver to clients.",
    "This Privacy Policy explains how we collect, use, store, and protect personal data when you visit our website, contact us, book a consultation, or use InnovateXP-managed tools that connect to this site.",
    "We aim to comply with the Personal Data (Privacy) Ordinance (Cap. 496) of Hong Kong (“PDPO”) and, where applicable, the EU/UK General Data Protection Regulation (“GDPR”). This policy is provided for transparency and does not constitute legal advice.",
  ],
  sections: [
    {
      title: "1. Data controller",
      paragraphs: [
        "InnovateXP Limited is the data controller for personal data collected through innovatexp.co and the InnovateXP-managed tools described on this website, unless a separate written agreement states otherwise for a client deployment.",
      ],
      bullets: [
        "Legal name: InnovateXP Limited",
        "Website: https://www.innovatexp.co",
        "Privacy contact: privacy@innovatexp.co",
        "General enquiries: via the contact or booking pages on this website",
      ],
    },
    {
      title: "2. Personal data we may collect",
      paragraphs: ["Depending on how you interact with us, we may collect:"],
      bullets: [
        "Identity and contact data: name, email, phone/WhatsApp, company, job title",
        "Booking and enquiry data: preferred time slots, service interest, workflow health check answers, quotation wizard selections",
        "Technical data: IP address, browser type, device, pages viewed, referral source, cookies and similar identifiers",
        "Communications: messages you send through forms, email, WhatsApp, or meeting notes you choose to share",
        "AI workflow inputs: business process descriptions, anonymised workflow examples, and content you submit for consulting, training, or pilot scoping — not customer lists, payroll, or financial records unless explicitly agreed in a signed project scope",
        "Client project data: where we implement CRM, event, or automation systems under contract, processing is governed by the relevant service agreement and data processing terms",
      ],
    },
    {
      title: "3. How we use personal data",
      paragraphs: ["We use personal data to:"],
      bullets: [
        "Respond to enquiries, bookings, and support requests",
        "Deliver consulting, training, coaching, and implementation services",
        "Operate website features such as calendars, forms, analytics, and internal routing",
        "Improve site performance, security, and user experience",
        "Send service-related communications you request or reasonably expect",
        "Comply with law, resolve disputes, and enforce agreements",
      ],
    },
    {
      title: "4. Legal bases (GDPR, where applicable)",
      paragraphs: [
        "Where GDPR applies, we rely on one or more of the following legal bases:",
      ],
      bullets: [
        "Consent — for optional marketing, non-essential cookies, or where you explicitly opt in",
        "Contract — to respond to your request or perform services you ask us to deliver",
        "Legitimate interests — to operate, secure, and improve our website and services, balanced against your rights",
        "Legal obligation — where retention or disclosure is required by applicable law",
      ],
    },
    {
      title: "5. AI tools and third-party processors",
      paragraphs: [
        "InnovateXP may use third-party platforms to operate this website and deliver AI-assisted workflows. These may include hosting (e.g. Vercel), analytics, calendar/booking integrations, email or messaging tools, and AI model providers (e.g. Azure OpenAI, Google Cloud, Alibaba Cloud, AWS) configured per project scope.",
        "We configure tools to minimise unnecessary personal data, use encryption in transit where supported, and avoid using your confidential project data to train public models unless you explicitly agree in writing.",
      ],
      bullets: [
        "We do not sell personal data",
        "Sub-processors are selected for security and contractual safeguards",
        "Cross-border transfers, where they occur, are protected by appropriate safeguards such as contractual clauses or equivalent measures required by PDPO and GDPR",
      ],
    },
    {
      title: "6. Cookies and analytics",
      paragraphs: [
        "We use cookies and similar technologies for essential site operation, preferences (such as theme), and limited analytics to understand traffic and improve performance. Non-essential analytics may be deferred or limited on mobile where configured.",
        "You can control cookies through your browser settings. Blocking essential cookies may affect booking or form features.",
      ],
    },
    {
      title: "7. Retention",
      paragraphs: [
        "We retain personal data only for as long as needed for the purposes above, unless a longer period is required by law or legitimate business records.",
        "Enquiry and booking records are typically retained for up to 24 months unless an active client relationship continues. Client project data retention follows the relevant contract.",
      ],
    },
    {
      title: "8. Security",
      paragraphs: [
        "We apply reasonable technical and organisational measures including access controls, encrypted connections (HTTPS), scoped API credentials, and least-privilege handling for production systems.",
        "No method of transmission or storage is completely secure. Please do not submit highly sensitive personal data through public website forms.",
      ],
    },
    {
      title: "9. Your rights",
      paragraphs: ["Under PDPO and, where applicable, GDPR, you may have the right to:"],
      bullets: [
        "Request access to personal data we hold about you",
        "Request correction of inaccurate data",
        "Request deletion or restriction of processing, subject to legal and contractual limits",
        "Object to certain processing based on legitimate interests",
        "Withdraw consent where processing is consent-based",
        "Lodge a complaint with the Office of the Privacy Commissioner for Personal Data (Hong Kong) or your local EU/UK supervisory authority",
      ],
    },
    {
      title: "10. Children",
      paragraphs: [
        "Our services are intended for businesses and adults. We do not knowingly collect personal data from children under 16 through this website.",
      ],
    },
    {
      title: "11. Changes to this policy",
      paragraphs: [
        "We may update this Privacy Policy from time to time. The “Last updated” date at the top will change when we do. Material changes may also be highlighted on this page.",
      ],
    },
  ],
  contactTitle: "Contact us about privacy",
  contactLines: [
    "Email: privacy@innovatexp.co",
    "Subject line: Privacy request — InnovateXP website",
    "We aim to respond within 30 days, or sooner where required by law.",
  ],
};

const innovatexpZh: PrivacyPolicyContent = {
  ...innovatexpEn,
  metaTitle: "InnovateXP 私隱政策｜網站、預約與 AI 工具",
  metaDescription:
    "InnovateXP Limited 私隱政策：涵蓋網站、預約、CRM、活動工具及 AI 輔助工作流程，符合香港《個人資料（私隱）條例》（PDPO）及 GDPR 相關做法。",
  breadcrumb: "私隱政策",
  title: "InnovateXP 私隱政策",
  effectiveDate: "2026年7月19日",
  lastUpdated: "2026年7月19日",
  intro: [
    "InnovateXP Limited（「InnovateXP」、「我們」）營運 innovatexp.co 及相關服務，包括預約、查詢表格、AI 輔助顧問流程、SmartSales CRM、EventXP，以及我們為客戶交付的其他商業工具。",
    "本私隱政策說明當你瀏覽網站、聯絡我們、預約諮詢，或使用與本網站連接的 InnovateXP 管理工具時，我們如何收集、使用、保存及保護個人資料。",
    "我們致力遵守香港《個人資料（私隱）條例》（Cap. 496）（「PDPO」），並在適用情況下参照歐盟/英國《一般資料保護規例》（「GDPR」）。本政策只作透明度用途，並不構成法律意見。",
  ],
  sections: [
    {
      title: "1. 資料使用者（Data controller）",
      paragraphs: [
        "就 innovatexp.co 及本網站所述 InnovateXP 管理工具所收集的個人資料，InnovateXP Limited 為資料使用者，除非客戶部署項目另有書面協議訂明。",
      ],
      bullets: [
        "法定名稱：InnovateXP Limited",
        "網站：https://www.innovatexp.co",
        "私隱聯絡：privacy@innovatexp.co",
        "一般查詢：透過本網站聯絡或預約頁面",
      ],
    },
    {
      title: "2. 我們可能收集的個人資料",
      paragraphs: ["視乎你與我們的互動方式，我們可能收集："],
      bullets: [
        "身份及聯絡資料：姓名、電郵、電話/WhatsApp、公司、職位",
        "預約及查詢資料：偏好時段、服務意向、流程健康檢查答案、報價精靈選項",
        "技術資料：IP 位址、瀏覽器、裝置、瀏覽頁面、來源、Cookies 及類似識別碼",
        "通訊內容：你透過表格、電郵、WhatsApp 或會議中選擇提供的訊息",
        "AI 工作流程輸入：業務流程描述、去識別化示例等——除非已簽署項目範圍，否則請勿在公開表格提交客戶名單、薪酬或財務明細",
        "客戶項目資料：如按合約實施 CRM、活動或自動化系統，處理方式以相關服務協議及資料處理條款為準",
      ],
    },
    {
      title: "3. 使用目的",
      paragraphs: ["我們使用個人資料以："],
      bullets: [
        "回覆查詢、預約及支援請求",
        "提供顧問、培訓、陪跑及實施服務",
        "運作網站功能（行事曆、表格、分析、內部分派）",
        "改善網站效能、保安及使用體驗",
        "發送與服務相關、且你合理預期會收到的通訊",
        "遵守法律、處理爭議及執行協議",
      ],
    },
    {
      title: "4. 法律依據（如 GDPR 適用）",
      paragraphs: ["在 GDPR 適用的情況下，我們可能依賴以下一項或多項法律依據："],
      bullets: [
        "同意 — 非必要 Cookies、選擇性推廣或你明確 opt-in 的情況",
        "合約 — 回應你的要求或履行你委託的服務",
        "合法利益 — 在平衡你的權利前提下，營運、保安及改善網站與服務",
        "法律義務 — 法律要求保留或披露的情況",
      ],
    },
    {
      title: "5. AI 工具及第三方處理者",
      paragraphs: [
        "InnovateXP 可能使用第三方平台營運本網站及 AI 輔助工作流程，包括託管（如 Vercel）、分析、行事曆/預約、電郵或通訊工具，以及按項目範圍配置的 AI 模型供應商（如 Azure OpenAI、Google Cloud、Alibaba Cloud、AWS）。",
        "我們會盡量減少不必要的個人資料、在支援情況下使用傳輸加密，並除非你書面同意，否則不會用你的機密項目資料訓練公開模型。",
      ],
      bullets: [
        "我們不出售個人資料",
        "次處理者按保安及合約保障選用",
        "如有跨境轉移，會按 PDPO 及 GDPR 要求採取合約條款或同等保障",
      ],
    },
    {
      title: "6. Cookies 及分析",
      paragraphs: [
        "我們使用 Cookies 及類似技術作必要網站運作、偏好設定（如主題）及有限度分析。非必要分析在部分設定下可能延遲或限制。",
        "你可透過瀏覽器設定管理 Cookies；封鎖必要 Cookies 可能影響預約或表格功能。",
      ],
    },
    {
      title: "7. 保存期限",
      paragraphs: [
        "我們只在上述目的所需期間內保存個人資料，或法律/合理業務紀錄要求的更長期限。",
        "查詢及預約紀錄一般保存最多 24 個月，除非仍有進行中的客戶關係。客戶項目資料按相關合約處理。",
      ],
    },
    {
      title: "8. 保安",
      paragraphs: [
        "我們採取合理技術及組織措施，包括存取控制、HTTPS 加密、範圍化 API 憑證及 production 系統最小權限原則。",
        "任何傳輸或儲存方式都不能保證百分百安全。請勿在公開網站表格提交高度敏感個人資料。",
      ],
    },
    {
      title: "9. 你的權利",
      paragraphs: ["在 PDPO 及（如適用）GDPR 下，你可能享有以下權利："],
      bullets: [
        "查閱我們持有關於你的個人資料",
        "要求更正不準確資料",
        "在法律及合約限制下要求刪除或限制處理",
        "就基於合法利益的部分處理提出反對",
        "在基於同意的處理中撤回同意",
        "向香港個人資料私隱專員公署或你所在地的 EU/UK 監管機構投訴",
      ],
    },
    {
      title: "10. 兒童",
      paragraphs: ["我們的服務面向企業及成年人。我們不會 knowingly 透過本網站收集 16 歲以下兒童的個人資料。"],
    },
    {
      title: "11. 政策更新",
      paragraphs: [
        "我們可能不時更新本私隱政策。頁首「最後更新」日期會隨之更改；重大變更亦可能在本頁註明。",
      ],
    },
  ],
  contactTitle: "私隱查詢聯絡方式",
  contactLines: [
    "電郵：privacy@innovatexp.co",
    "主旨：Privacy request — InnovateXP website",
    "我們目標在 30 日內回覆，或按法律要求的更短期限。",
  ],
};

const zomateEn: PrivacyPolicyContent = {
  slug: "zomate-system",
  metaTitle: "Zomate System Privacy Policy | ZOMATE FITNESS",
  metaDescription:
    "Privacy Policy for zomate_system and ZOMATE FITNESS: legal name, phone number, and WhatsApp service reminders. PDPO (Hong Kong) and GDPR-aligned practices.",
  breadcrumb: "Zomate System Privacy Policy",
  title: "Zomate System Privacy Policy",
  effectiveDate: "19 July 2026",
  lastUpdated: "19 July 2026",
  intro: [
    "This Privacy Policy applies to the zomate_system application, the ZOMATE FITNESS digital services, and related features that may connect through Meta (Facebook) platforms or other sign-in providers.",
    "It explains what personal data we collect, why we use it, how long we keep it, and the choices available to you. We aim to comply with Hong Kong’s Personal Data (Privacy) Ordinance (Cap. 496) (“PDPO”) and, where applicable, the EU/UK General Data Protection Regulation (“GDPR”).",
    "This policy is provided for transparency and does not constitute legal advice.",
  ],
  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        "The zomate_system service is operated for ZOMATE FITNESS. For privacy enquiries relating to this app, contact the details in Section 12 below.",
      ],
      bullets: [
        "App name: zomate_system",
        "Brand: ZOMATE FITNESS",
        "Privacy contact email: tse_wai_hi@yahoo.com.hk",
        "Policy URL: published on innovatexp.co for Meta app verification purposes",
      ],
    },
    {
      title: "2. Scope",
      paragraphs: [
        "This policy covers personal data processed when you use zomate_system, create or manage an account, interact with fitness or membership features, or sign in through Meta/Facebook where enabled.",
        "It does not replace separate policies of Meta, payment providers, or other third-party services you choose to connect.",
      ],
    },
    {
      title: "3. Personal data we collect",
      paragraphs: [
        "To operate zomate_system and send WhatsApp service reminders, we collect the following core contact fields:",
      ],
      bullets: [
        "Legal name — your registered full name, used to identify your account and personalise reminders",
        "Mobile phone number — used to deliver WhatsApp message reminders about classes, bookings, and membership-related notices",
        "Account data: email, profile photo (if provided), and membership identifiers",
        "Meta/Facebook data: user ID, public profile fields, and permissions you approve when using Facebook Login — we do not receive your Facebook password",
        "Fitness and service data: membership status, class or session bookings, attendance, preferences, and support messages you submit",
        "Payment-related metadata: transaction references from payment processors (we do not store full card numbers on our servers where a certified processor is used)",
        "Technical data: device type, app/browser version, IP address, logs, and security events",
      ],
    },
    {
      title: "4. How we use personal data",
      paragraphs: [
        "We use personal data to operate zomate_system. Your legal name and phone number are used specifically to send WhatsApp message reminders for service appointments, class schedules, booking confirmations, and related membership notices you sign up for.",
        "We do not use your phone number for unrelated marketing unless you separately opt in.",
      ],
      bullets: [
        "Create and manage your account",
        "Send WhatsApp reminders using the phone number and legal name you provide",
        "Provide fitness, membership, booking, and customer support features",
        "Authenticate you, including via Meta/Facebook Login where enabled",
        "Improve reliability, security, and product performance",
        "Comply with law and respond to valid requests from authorities",
      ],
    },
    {
      title: "5. WhatsApp reminders",
      paragraphs: [
        "When you register or update your profile, you provide your legal name and mobile phone number so we can send WhatsApp message reminders about your ZOMATE FITNESS bookings and service schedule.",
        "Message frequency depends on your bookings and membership activity. Standard messaging/data rates from your mobile carrier may apply.",
        "You can stop WhatsApp reminders by replying STOP where supported, updating your contact preferences in the app, or emailing tse_wai_hi@yahoo.com.hk to request removal of your phone number from reminder messaging.",
      ],
    },
    {
      title: "6. Legal bases (GDPR, where applicable)",
      paragraphs: ["Where GDPR applies, processing may rely on:"],
      bullets: [
        "Consent — e.g. providing your phone number for WhatsApp reminders, optional marketing, or permissions you grant through Meta Login",
        "Contract — to provide the service, bookings, and reminders you sign up for",
        "Legitimate interests — security, fraud prevention, and service improvement",
        "Legal obligation — where retention or disclosure is required",
      ],
    },
    {
      title: "7. Meta (Facebook) platform",
      paragraphs: [
        "If you connect with Facebook Login, Meta may share certain profile information according to the permissions you approve. We use that information only to authenticate you and operate zomate_system features.",
        "You can review or revoke app permissions in your Facebook Settings → Apps and Websites. Revoking access may limit app functionality.",
        "Meta’s own privacy policy governs Meta’s processing: https://www.facebook.com/privacy/policy/",
      ],
    },
    {
      title: "8. Sharing and processors",
      paragraphs: [
        "We may share personal data with service providers that help us host, secure, analyse, message, or operate the platform (e.g. cloud hosting, WhatsApp messaging infrastructure, email, payment, analytics). WhatsApp reminder delivery may involve Meta/WhatsApp messaging services as a processor. These providers act under contractual confidentiality and security obligations.",
        "We do not sell personal data.",
      ],
    },
    {
      title: "9. International transfers",
      paragraphs: [
        "Your data may be processed in Hong Kong and other countries where our providers operate. Where required, we use appropriate safeguards such as contractual clauses or equivalent measures under PDPO and GDPR.",
      ],
    },
    {
      title: "10. Retention",
      paragraphs: [
        "We retain legal name and phone number for as long as your account is active and reminders are required for your bookings or membership, then delete or anonymise them within a reasonable period unless law requires longer retention.",
      ],
    },
    {
      title: "11. Security",
      paragraphs: [
        "We apply reasonable technical and organisational measures, including access controls, encrypted connections, and logging. No system is completely secure — please use a strong password and protect your login credentials.",
      ],
    },
    {
      title: "12. Your rights and data deletion",
      paragraphs: [
        "You may request access, correction, deletion, or restriction of your personal data, including your legal name and phone number used for WhatsApp reminders, subject to legal and contractual limits.",
        "To delete your zomate_system account or personal data, email tse_wai_hi@yahoo.com.hk with the subject “Zomate data deletion request” and include the email, phone number, or Facebook account used to register. We aim to complete verified requests within 30 days.",
        "You may also remove Facebook Login access via your Facebook account settings. Under PDPO and GDPR you may lodge a complaint with the Hong Kong Privacy Commissioner or your local EU/UK authority.",
      ],
    },
    {
      title: "13. Changes",
      paragraphs: [
        "We may update this policy from time to time. The “Last updated” date will change accordingly. Continued use after updates means you accept the revised policy, unless otherwise required by law.",
      ],
    },
  ],
  contactTitle: "Privacy & data deletion contact",
  contactLines: [
    "Email: tse_wai_hi@yahoo.com.hk",
    "Subject: Zomate System privacy request / data deletion",
    "Include: registered email, phone number, or Facebook account identifier",
  ],
};

const zomateZh: PrivacyPolicyContent = {
  ...zomateEn,
  metaTitle: "Zomate System 私隱政策｜ZOMATE FITNESS",
  metaDescription:
    "zomate_system 及 ZOMATE FITNESS 私隱政策：收集法定姓名、電話號碼，用於 WhatsApp 服務提醒。符合香港 PDPO 及 GDPR 相關做法。",
  breadcrumb: "Zomate System 私隱政策",
  title: "Zomate System 私隱政策",
  effectiveDate: "2026年7月19日",
  lastUpdated: "2026年7月19日",
  intro: [
    "本私隱政策適用於 zomate_system 應用程式、ZOMATE FITNESS 數碼服務，以及可能透過 Meta（Facebook）平台或其他登入方式連接的功能。",
    "政策說明我們收集哪些個人資料、使用目的、保存期限及你的選擇。我們致力遵守香港《個人資料（私隱）條例》（Cap. 496）（「PDPO」），並在適用情況下参照 GDPR。",
    "本政策只作透明度用途，並不構成法律意見。",
  ],
  sections: [
    {
      title: "1. 我們是誰",
      paragraphs: ["zomate_system 服務由 ZOMATE FITNESS 相關營運方提供。如有私隱查詢，請使用第 12 節聯絡方式。"],
      bullets: [
        "應用程式名稱：zomate_system",
        "品牌：ZOMATE FITNESS",
        "私隱聯絡電郵：tse_wai_hi@yahoo.com.hk",
        "政策網址：刊登於 innovatexp.co 供 Meta 應用程式驗證使用",
      ],
    },
    {
      title: "2. 適用範圍",
      paragraphs: [
        "本政策涵蓋你使用 zomate_system、建立或管理帳戶、使用健身/會籍功能，或（如啟用）透過 Meta/Facebook 登入時所處理的個人資料。",
        "並不取代 Meta、付款服務商或其他你選擇連接的第三方服務各自的政策。",
      ],
    },
    {
      title: "3. 我們收集的個人資料",
      paragraphs: [
        "為營運 zomate_system 及發送 WhatsApp 服務提醒，我們會收集以下核心聯絡資料：",
      ],
      bullets: [
        "法定姓名 — 你註冊的全名，用於識別帳戶及個人化提醒",
        "流動電話號碼 — 用於發送 WhatsApp 訊息提醒，包括課堂、預約及會籍相關通知",
        "帳戶資料：電郵、個人照片（如你提供）及會籍識別",
        "Meta/Facebook 資料：用戶 ID、你批准權限下的公開個人資料——我們不會收到你的 Facebook 密碼",
        "健身及服務資料：會籍狀態、課堂/預約、出席紀錄、偏好設定及你提交的支援訊息",
        "付款相關 metadata：付款處理商的交易參考（如使用認證處理商，我們不在伺服器保存完整卡號）",
        "技術資料：裝置、App/瀏覽器版本、IP、日誌及保安事件",
      ],
    },
    {
      title: "4. 使用目的",
      paragraphs: [
        "我們使用個人資料以營運 zomate_system。你的法定姓名及電話號碼專門用於發送 WhatsApp 服務提醒，包括課堂安排、預約確認及你註冊的會籍相關通知。",
        "除非你另行同意，我們不會將你的電話號碼用於無關的推廣用途。",
      ],
      bullets: [
        "建立及管理你的帳戶",
        "使用你提供的電話號碼及法定姓名發送 WhatsApp 提醒",
        "提供健身、會籍、預約及客戶支援功能",
        "作身份驗證（包括 Meta/Facebook Login）",
        "提升可靠性、保安及產品表現",
        "遵守法律及回應合法機關要求",
      ],
    },
    {
      title: "5. WhatsApp 提醒",
      paragraphs: [
        "當你註冊或更新個人資料時，你會提供法定姓名及流動電話號碼，以便我們透過 WhatsApp 發送 ZOMATE FITNESS 預約及服務安排提醒。",
        "訊息頻率視乎你的預約及會籍活動而定。流動網絡供應商可能收取標準短訊/數據費用。",
        "你可回覆 STOP（如支援）、在 App 內更新聯絡偏好，或電郵 tse_wai_hi@yahoo.com.hk 要求停止 WhatsApp 提醒及移除你的電話號碼。",
      ],
    },
    {
      title: "6. 法律依據（如 GDPR 適用）",
      paragraphs: ["在 GDPR 適用時，處理可能基於："],
      bullets: [
        "同意 — 例如提供電話號碼作 WhatsApp 提醒、選擇性推廣或 Meta Login 所批權限",
        "合約 — 提供你註冊的服務、預約及提醒",
        "合法利益 — 保安、防詐及改善服務",
        "法律義務 — 法律要求的保留或披露",
      ],
    },
    {
      title: "7. Meta（Facebook）平台",
      paragraphs: [
        "如你使用 Facebook Login，Meta 可能按你批准的權限分享部分個人資料。我們只用於驗證身份及運作 zomate_system 功能。",
        "你可在 Facebook 設定 → Apps and Websites 查閱或撤銷權限；撤銷可能限制部分功能。",
        "Meta 自身處理受 Meta 私隱政策約束：https://www.facebook.com/privacy/policy/",
      ],
    },
    {
      title: "8. 分享及處理者",
      paragraphs: [
        "我們可能與協助託管、保安、分析、通訊或營運平台的服務供應商分享資料（例如雲端託管、WhatsApp 訊息基礎設施、電郵、付款、分析）。WhatsApp 提醒可能涉及 Meta/WhatsApp 訊息服務作為處理者；彼等須遵守保密及保安合約義務。",
        "我們不出售個人資料。",
      ],
    },
    {
      title: "9. 跨境轉移",
      paragraphs: [
        "資料可能在香港及我們供應商所在的其他國家/地區處理；在需要時會採用合約條款或 PDPO/GDPR 要求的同等保障。",
      ],
    },
    {
      title: "10. 保存期限",
      paragraphs: [
        "我們會在你的帳戶有效且仍需為預約或會籍發送提醒期間，保留法定姓名及電話號碼；之後會在合理期間內刪除或匿名化，除非法律要求更長保留。",
      ],
    },
    {
      title: "11. 保安",
      paragraphs: [
        "我們採取合理技術及組織措施，包括存取控制、加密連線及日誌。任何系統都不能保證百分百安全——請使用強密碼並妥善保管登入資料。",
      ],
    },
    {
      title: "12. 你的權利及資料刪除",
      paragraphs: [
        "你可要求查閱、更正、刪除或限制處理你的個人資料，包括用於 WhatsApp 提醒的法定姓名及電話號碼，但須受法律及合約限制。",
        "如要刪除 zomate_system 帳戶或個人資料，請電郵 tse_wai_hi@yahoo.com.hk，主旨注明「Zomate data deletion request」，並提供註冊電郵、電話號碼或 Facebook 帳戶。我們目標在 30 日內完成已核實請求。",
        "你亦可於 Facebook 帳戶設定移除 App 權限。在 PDPO 及 GDPR 下，你亦可向香港私隱專員公署或 EU/UK 監管機構投訴。",
      ],
    },
    {
      title: "13. 政策更新",
      paragraphs: [
        "我們可能不時更新本政策；「最後更新」日期會隨之更改。除法律另有要求外，更新後繼續使用即表示接受修訂版本。",
      ],
    },
  ],
  contactTitle: "私隱及資料刪除聯絡",
  contactLines: [
    "電郵：tse_wai_hi@yahoo.com.hk",
    "主旨：Zomate System privacy request / data deletion",
    "請提供：註冊電郵、電話號碼或 Facebook 帳戶識別",
  ],
};

export function getInnovatexpPrivacyPolicy(locale: AppLocale): PrivacyPolicyContent {
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return innovatexpZh;
    default:
      return innovatexpEn;
  }
}

export function getZomateSystemPrivacyPolicy(locale: AppLocale): PrivacyPolicyContent {
  switch (locale) {
    case "zh-hk":
    case "zh-tw":
      return zomateZh;
    default:
      return zomateEn;
  }
}
