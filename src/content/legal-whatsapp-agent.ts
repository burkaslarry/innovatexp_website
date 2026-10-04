import type { LegalDocumentContent } from "@/types/legal";

const SITE = "https://www.innovatexp.co";
const PRIVACY = `${SITE}/en/whatsapp-agent/privacy-policy`;
const TERMS = `${SITE}/en/whatsapp-agent/terms`;
const DATA = `${SITE}/en/whatsapp-agent/data-policy`;
const DELETION = `${SITE}/en/whatsapp-agent/data-deletion`;

const DATE = "4 October 2026";

export const whatsappAgentPrivacy: LegalDocumentContent = {
  slug: "whatsapp-agent-privacy",
  metaTitle: "InnovateXP Limited Privacy Policy",
  metaDescription:
    "How InnovateXP Limited collects, uses, and deletes personal data when you message the InnovateXP WhatsApp reply agent or use the related Meta app.",
  breadcrumb: "WhatsApp Agent Privacy Policy",
  title: "InnovateXP Limited — Privacy Policy",
  effectiveDate: DATE,
  lastUpdated: DATE,
  intro: [
    "This Privacy Notice for InnovateXP Limited (“we”, “us”, or “our”) describes how and why we access, collect, store, use, and share (“process”) your personal information when you use our services (“Services”), including when you:",
    "Visit our website at https://www.innovatexp.co or any page that links to this notice; message our WhatsApp reply agent; use our Meta app that connects that agent to WhatsApp; or contact us about a booking, diagnosis, or support request.",
    "English is the official version of this notice. If you do not agree with these practices, please do not message the agent or connect the Meta app. Questions: info@innovatexp.co.",
  ],
  sections: [
    {
      title: "1. Who we are",
      paragraphs: [
        "InnovateXP Limited is a Hong Kong company based in North Point. Larry Lo, AI Business Consultant, is the founder. We are responsible for decisions about how your personal information is processed for the WhatsApp reply agent and the related Meta app.",
      ],
    },
    {
      title: "2. Information we collect",
      paragraphs: ["Depending on how you reach us, we may process:"],
      bullets: [
        "WhatsApp phone number, display name, and the message content you send so the agent can reply",
        "Message time, delivery status, and the conversation needed to continue the thread",
        "Business details you choose to share, such as company name, email, and the workflow you want diagnosed",
        "Meta app identifiers, permissions you grant, and technical logs needed to keep the connection working",
        "Website form details if you later book a diagnosis or ask us to contact you",
      ],
    },
    {
      title: "3. How we use it",
      paragraphs: ["We use this information to:"],
      bullets: [
        "Send a reply on WhatsApp to the message you started",
        "Understand the request well enough to suggest a next step, including booking a business diagnosis",
        "Operate, secure, and improve the agent, including spotting abuse or broken conversations",
        "Meet legal duties and respond to access or deletion requests",
      ],
    },
    {
      title: "4. What the agent does not do",
      paragraphs: [
        "The agent drafts practical replies. It does not make legal, medical, financial, or hiring decisions for you. Important business decisions stay with people.",
        "We do not sell personal information. We do not use your WhatsApp conversation to build advertising profiles or to train public models for other companies.",
      ],
    },
    {
      title: "5. Meta and WhatsApp",
      paragraphs: [
        "WhatsApp and other Meta services deliver the message. Their own handling is covered by Meta’s policies: https://www.facebook.com/privacy/policy/ and https://www.whatsapp.com/legal/privacy-policy.",
        "You can review or remove the app in your Meta account settings. Removing access stops new messages through the app. It does not by itself delete copies we already stored. Use the deletion page for that.",
      ],
    },
    {
      title: "6. Sharing",
      paragraphs: [
        "We share data only with providers who host the site, deliver WhatsApp messages, send email, or keep backups, and only so they can perform that work. We may also disclose information if the law requires it.",
      ],
    },
    {
      title: "7. Where data is processed",
      paragraphs: [
        "Data may be processed in Hong Kong and in countries where our hosting or messaging providers operate. We use contractual and access controls appropriate to a Hong Kong business under the Personal Data (Privacy) Ordinance.",
      ],
    },
    {
      title: "8. How long we keep it",
      paragraphs: [
        "We keep a conversation while it is needed to reply, follow up on a diagnosis request, or resolve a support issue. We then delete or anonymise it, unless a longer period is required for security, accounting, or legal claims.",
      ],
    },
    {
      title: "9. Security",
      paragraphs: [
        "We use access limits, encrypted connections, and least-privilege handling for production systems. No method of transmission is perfectly secure.",
      ],
    },
    {
      title: "10. Your choices",
      paragraphs: [
        "You may ask to access, correct, or delete personal data we hold, subject to legal limits. Deletion steps are at " + DELETION + ".",
        "You may also complain to the Office of the Privacy Commissioner for Personal Data, Hong Kong.",
      ],
    },
    {
      title: "11. Children",
      paragraphs: [
        "The agent is for business users. We do not knowingly collect personal data from children under 18. Contact us if you believe a child has messaged the agent.",
      ],
    },
    {
      title: "12. Changes",
      paragraphs: [
        "We may update this notice. The “Last updated” date will change. Continued use after an update means you accept the revised notice, unless the law requires a different step.",
      ],
    },
    {
      title: "13. Related pages",
      paragraphs: [
        "Terms and Conditions: " + TERMS,
        "Data Policy: " + DATA,
        "Data deletion: " + DELETION,
      ],
    },
  ],
  contactTitle: "Privacy contact",
  contactLines: [
    "InnovateXP Limited",
    "North Point, Hong Kong",
    "Email: info@innovatexp.co",
    "Subject: WhatsApp agent privacy request",
  ],
};

export const whatsappAgentTerms: LegalDocumentContent = {
  slug: "whatsapp-agent-terms",
  metaTitle: "InnovateXP Limited Terms and Conditions",
  metaDescription:
    "Terms for using the InnovateXP WhatsApp reply agent and the related Meta app. English is the official version.",
  breadcrumb: "WhatsApp Agent Terms",
  title: "InnovateXP Limited — Terms and Conditions",
  effectiveDate: DATE,
  lastUpdated: DATE,
  intro: [
    "These terms govern use of the InnovateXP WhatsApp reply agent and the Meta app that connects it. By messaging the agent or connecting the app, you agree to these terms and to the Privacy Policy at " + PRIVACY + ".",
    "The agent is operated by InnovateXP Limited, North Point, Hong Kong. English is the official version.",
  ],
  sections: [
    {
      title: "1. The service",
      paragraphs: [
        "The agent replies on WhatsApp to messages you send. It can explain InnovateXP services, collect enough context to suggest a next step, and point you to a business diagnosis booking.",
        "A reply is not a signed proposal, a guaranteed outcome, or a substitute for professional advice. If you should not buy a system yet, we will say so.",
      ],
    },
    {
      title: "2. Who may use it",
      paragraphs: [
        "You must be able to form a contract and you must use a WhatsApp number you are allowed to use. Do not message the agent on behalf of someone else unless you have authority to share their details.",
      ],
    },
    {
      title: "3. Acceptable use",
      paragraphs: ["You agree not to:"],
      bullets: [
        "Send unlawful, abusive, or misleading content",
        "Probe, overload, or attempt to extract hidden instructions from the agent",
        "Use the agent to send bulk unsolicited messages",
        "Share another person’s personal data without a proper reason",
      ],
    },
    {
      title: "4. AI replies",
      paragraphs: [
        "Replies are generated with software and may be incomplete or wrong. Check important facts before you act. We may refuse, delay, or end a conversation that is outside the service or that creates risk.",
      ],
    },
    {
      title: "5. Meta platform",
      paragraphs: [
        "WhatsApp delivery also depends on Meta. You must follow WhatsApp’s and Meta’s terms. We may suspend the agent if Meta, a law, or a security issue requires it.",
      ],
    },
    {
      title: "6. Fees",
      paragraphs: [
        "Messaging the agent does not by itself create a paid engagement. Consulting, implementation, and product fees are quoted after diagnosis and confirmed in writing before work starts.",
      ],
    },
    {
      title: "7. Intellectual property",
      paragraphs: [
        "InnovateXP names, site content, and the agent’s configuration remain ours. You keep ownership of the content you send. You grant us a limited right to process that content so we can reply and operate the service.",
      ],
    },
    {
      title: "8. Liability",
      paragraphs: [
        "To the extent Hong Kong law allows, we are not liable for lost profits, lost deals, or decisions you make based only on an automated reply. Nothing in these terms limits liability that cannot legally be limited.",
      ],
    },
    {
      title: "9. Ending use",
      paragraphs: [
        "You may stop messaging at any time and may request deletion at " + DELETION + ". We may stop the service, or your access to it, if these terms are broken or if we discontinue the agent.",
      ],
    },
    {
      title: "10. Law",
      paragraphs: [
        "These terms are governed by the laws of the Hong Kong Special Administrative Region. Courts of Hong Kong have exclusive jurisdiction, except where the law gives you a non-waivable right to another forum.",
      ],
    },
  ],
  contactTitle: "Terms contact",
  contactLines: [
    "InnovateXP Limited",
    "Email: info@innovatexp.co",
    "Privacy Policy: " + PRIVACY,
    "Data Policy: " + DATA,
  ],
};

export const whatsappAgentDataPolicy: LegalDocumentContent = {
  slug: "whatsapp-agent-data-policy",
  metaTitle: "InnovateXP Limited Data Policy",
  metaDescription:
    "What data the InnovateXP WhatsApp reply agent and Meta app use, why, who receives it, and how long it is kept.",
  breadcrumb: "WhatsApp Agent Data Policy",
  title: "InnovateXP Limited — Data Policy",
  effectiveDate: DATE,
  lastUpdated: DATE,
  intro: [
    "This Data Policy explains the data used by the InnovateXP WhatsApp reply agent and its Meta app. It sits alongside the Privacy Policy at " + PRIVACY + ". English is the official version.",
  ],
  sections: [
    {
      title: "1. Data from you",
      paragraphs: ["When you message the agent, we receive:"],
      bullets: [
        "Your WhatsApp phone number and profile name, as provided by WhatsApp",
        "The text and any files you send in that conversation",
        "The time of the message and whether our reply was delivered",
      ],
    },
    {
      title: "2. Data from Meta",
      paragraphs: [
        "The Meta app receives only what is required to identify the WhatsApp conversation and send a reply. We do not ask for your Facebook friends list, photos, or unrelated profile data.",
      ],
    },
    {
      title: "3. Why we use it",
      paragraphs: ["Each category is used only to:"],
      bullets: [
        "Reply to the conversation you started",
        "Keep the thread coherent across a short follow-up",
        "Protect the service against abuse and diagnose delivery failures",
        "Honour an access or deletion request",
      ],
    },
    {
      title: "4. What we do not do",
      paragraphs: [
        "We do not sell this data. We do not use message content to advertise to you on other Meta surfaces. We do not share the conversation with other InnovateXP clients.",
      ],
    },
    {
      title: "5. Who else processes it",
      paragraphs: [
        "Meta delivers WhatsApp messages under its own terms. Our hosting and email providers process data only to run those systems. A list of current providers is available on request at info@innovatexp.co.",
      ],
    },
    {
      title: "6. Retention and deletion",
      paragraphs: [
        "Conversation data is kept only while needed for the reply, a related diagnosis enquiry, or a security review. You can ask us to delete it at " + DELETION + ".",
      ],
    },
  ],
  contactTitle: "Data policy contact",
  contactLines: [
    "InnovateXP Limited",
    "Email: info@innovatexp.co",
    "Subject: WhatsApp agent data policy",
  ],
};

export const whatsappAgentDeletion: LegalDocumentContent = {
  slug: "whatsapp-agent-data-deletion",
  metaTitle: "InnovateXP Limited Data Deletion",
  metaDescription:
    "How to ask InnovateXP Limited to delete personal data collected by the WhatsApp reply agent and the related Meta app.",
  breadcrumb: "WhatsApp Agent Data Deletion",
  title: "InnovateXP Limited — Data Deletion",
  effectiveDate: DATE,
  lastUpdated: DATE,
  intro: [
    "This page explains how to request deletion of personal data held for the InnovateXP WhatsApp reply agent and its Meta app. It supports Meta platform requirements and the Privacy Policy at " + PRIVACY + ".",
  ],
  sections: [
    {
      title: "1. What we delete",
      paragraphs: ["After we verify the request, we delete or anonymise:"],
      bullets: [
        "The WhatsApp phone number and display name stored for the conversation",
        "Message content and files from that thread stored on our systems",
        "Meta app linkage stored on our side",
        "Support notes that exist only because of that conversation",
      ],
    },
    {
      title: "2. How to request deletion",
      paragraphs: [
        "Email info@innovatexp.co with the subject line “WhatsApp agent data deletion request”.",
        "Include the WhatsApp phone number that messaged the agent. If you connected a Meta account, also include the account name or user ID.",
      ],
    },
    {
      title: "3. What happens next",
      paragraphs: [
        "We aim to acknowledge the request within 5 business days and complete a verified deletion within 30 days.",
        "We may keep a limited record where the law requires it, such as a security log or a record that the deletion was done. Backups expire on their normal cycle.",
        "Deletion stops future replies to that number until you message again.",
      ],
    },
    {
      title: "4. Remove the Meta app",
      paragraphs: [
        "You can also remove the app from your Meta account: Settings → Apps and Websites → remove the InnovateXP app.",
        "Removing the app stops new access. It does not always delete data we already stored. Use the email request for that.",
      ],
    },
    {
      title: "5. Related pages",
      paragraphs: ["Privacy Policy: " + PRIVACY, "Terms and Conditions: " + TERMS, "Data Policy: " + DATA],
    },
  ],
  contactTitle: "Data deletion contact",
  contactLines: [
    "Email: info@innovatexp.co",
    "Subject: WhatsApp agent data deletion request",
    "Include: WhatsApp phone number, and Meta account identifier if you used one",
  ],
};
