import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";

export const FITNESSXP_PAGE_PATH = "/fitnessxp";

export type FitnessXpPageCopy = {
  eyebrow: string;
  h1: string;
  lead: string;
  roleTitle: string;
  roleBody: string;
  exampleTitle: string;
  exampleItems: string[];
  smartTitle: string;
  smartItems: { label: string; body: string }[];
  referTitle: string;
  referIntro: string;
  referItems: string[];
  howTitle: string;
  howSteps: { name: string; text: string }[];
  faqTitle: string;
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaBody: string;
  bookCta: string;
  consultingCta: string;
  homeCta: string;
};

const zh: FitnessXpPageCopy = {
  eyebrow: "FitnessXP · 培訓／課堂管理",
  h1: "FitnessXP：業務聽診師 × 培訓／課堂管理 solution",
  lead:
    "Larry Lo／InnovateXP 定位為業務聽診師——專幫培訓機構、補習社、Fitness Center 聽清楚業務流程問題，再配合適當工具，設計合適嘅培訓／課堂管理 solution。唔係一開始硬塞系統，而係先搞清楚排堂、教練、出席同續堂邊度漏。",
  roleTitle: "我係業務聽診師",
  roleBody:
    "專幫培訓機構、補習社、Fitness Center 聽清楚業務流程問題，再配合適當工具（例如 FitnessXP），設計合適嘅培訓／課堂管理 solution。目標係減少 WhatsApp、Excel、人手跟進，令課堂營運、銷售同客戶體驗一齊改善。",
  exampleTitle: "例如 Fitness Center",
  exampleItems: [
    "管理課堂時間表",
    "管理教練安排",
    "管理學生出席同續堂",
    "減少 WhatsApp、Excel、人手跟進",
  ],
  smartTitle: "SMART Goal 效果",
  smartItems: [
    {
      label: "Specific",
      body: "清楚知道每班、每位教練、每個學生狀況",
    },
    {
      label: "Measurable",
      body: "可量度出席率、續堂率、課堂使用率",
    },
    {
      label: "Achievable",
      body: "用簡單工具開始，唔需要一次過大改",
    },
    {
      label: "Relevant",
      body: "直接改善營運、銷售同客戶體驗",
    },
    {
      label: "Time-bound",
      body: "目標 30–60 日內建立基本管理流程",
    },
  ],
  referTitle: "我想引薦",
  referIntro: "如果你認識以下負責人，歡迎轉介俾 Larry Lo／InnovateXP：",
  referItems: [
    "培訓機構負責人",
    "補習社負責人",
    "Fitness Center／Yoga／Pilates／興趣班中心負責人",
    "仍然主要用 WhatsApp、Excel 管理課堂嘅團隊",
  ],
  howTitle: "點樣開始",
  howSteps: [
    {
      name: "30 分鐘業務聽診",
      text: "對齊你而家點排堂、點記出席、點跟續堂，找出最痛嘅一條流程。",
    },
    {
      name: "定 SMART 目標",
      text: "例如 30–60 日內睇到出席率／續堂率／課堂使用率。",
    },
    {
      name: "用 FitnessXP 落地",
      text: "由簡單工具開始：時間表、教練安排、出席同續堂；月費由 HK$499 起。",
    },
  ],
  faqTitle: "常見問題",
  faqs: [
    {
      question: "FitnessXP 係咪一定要一次過換晒系統？",
      answer:
        "唔係。業務聽診師方法係用簡單工具開始，先執一條最痛流程（例如出席同續堂），30–60 日內建立基本管理，唔需要一次過大改。",
    },
    {
      question: "邊類中心最啱？",
      answer:
        "培訓機構、補習社、Fitness Center、Yoga／Pilates／興趣班中心——尤其仍然主要用 WhatsApp、Excel 管理課堂嘅團隊。",
    },
    {
      question: "同 EventXP／SmartSales 有咩分別？",
      answer:
        "FitnessXP 聚焦課堂／studio 營運（時間表、教練、出席、續堂）。EventXP 係活動簽到同跟進；SmartSales 係 WhatsApp 銷售 pipeline。可以先聽診再決定邊個工具。",
    },
    {
      question: "點樣引薦？",
      answer:
        "轉介培訓／補習／Fitness／Yoga／Pilates／興趣班負責人，或叫對方預約 30 分鐘業務聽診：https://www.innovatexp.co/zh-hk/bookme",
    },
  ],
  ctaTitle: "下一步",
  ctaBody: "預約 30 分鐘業務聽診，釐清你中心最痛嘅課堂流程，再決定 FitnessXP 定其他工具。",
  bookCta: "預約業務聽診",
  consultingCta: "AI／流程顧問",
  homeCta: "返回首頁",
};

const en: FitnessXpPageCopy = {
  eyebrow: "FitnessXP · Training & class operations",
  h1: "FitnessXP: business diagnostician for training & studio ops",
  lead:
    "Larry Lo / InnovateXP works as a business diagnostician—listening first to how training centres, tutoring schools, and fitness studios run classes, then matching the right tools to design a fit-for-purpose training / class-management solution. No forced system swap on day one.",
  roleTitle: "Business diagnostician, not tool-first sales",
  roleBody:
    "We help training institutions, tutoring centres, and fitness studios hear the real workflow problems—then design a suitable class-management solution (often with FitnessXP) so teams rely less on WhatsApp, Excel, and manual chase-ups.",
  exampleTitle: "For a Fitness Center, that usually means",
  exampleItems: [
    "Class timetable management",
    "Coach / instructor scheduling",
    "Student attendance and package renewal",
    "Less WhatsApp, Excel, and manual follow-up",
  ],
  smartTitle: "SMART outcomes we aim for",
  smartItems: [
    {
      label: "Specific",
      body: "Clear status per class, coach, and student",
    },
    {
      label: "Measurable",
      body: "Track attendance rate, renewal rate, and class utilisation",
    },
    {
      label: "Achievable",
      body: "Start with a simple tool—no big-bang rewrite",
    },
    {
      label: "Relevant",
      body: "Improves operations, sales, and customer experience directly",
    },
    {
      label: "Time-bound",
      body: "Target a basic management flow within 30–60 days",
    },
  ],
  referTitle: "Ideal referrals",
  referIntro: "Please introduce Larry Lo / InnovateXP to:",
  referItems: [
    "Training institution owners / operators",
    "Tutoring centre owners / operators",
    "Fitness Center / Yoga / Pilates / hobby-class centre owners",
    "Teams still running classes mainly on WhatsApp and Excel",
  ],
  howTitle: "How we start",
  howSteps: [
    {
      name: "30-minute business diagnosis",
      text: "Map how you schedule classes, track attendance, and chase renewals—find the painful workflow.",
    },
    {
      name: "Set SMART goals",
      text: "e.g. see attendance, renewal, and utilisation metrics within 30–60 days.",
    },
    {
      name: "Land with FitnessXP",
      text: "Start simple: timetable, coaches, attendance, renewals. From HK$499 / month.",
    },
  ],
  faqTitle: "FAQ",
  faqs: [
    {
      question: "Do we have to replace our whole system at once?",
      answer:
        "No. The diagnostician approach starts with a simple tool and one painful workflow (often attendance and renewals), aiming for a basic management flow in 30–60 days.",
    },
    {
      question: "Who is FitnessXP for?",
      answer:
        "Training institutions, tutoring centres, fitness, yoga, pilates, and hobby-class centres—especially teams still running classes on WhatsApp and Excel.",
    },
    {
      question: "How is it different from EventXP or SmartSales?",
      answer:
        "FitnessXP focuses on class / studio operations. EventXP is event check-in and follow-up. SmartSales is WhatsApp sales pipeline. Diagnosis decides which tool fits.",
    },
    {
      question: "How do I refer someone?",
      answer:
        "Introduce training / tutoring / fitness / yoga / pilates / hobby-class operators, or have them book a 30-minute diagnosis at https://www.innovatexp.co/en/bookme",
    },
  ],
  ctaTitle: "Next step",
  ctaBody:
    "Book a 30-minute business diagnosis to clarify your most painful class workflow—then decide on FitnessXP or another tool.",
  bookCta: "Book a diagnosis",
  consultingCta: "AI / workflow consulting",
  homeCta: "Back to home",
};

export function getFitnessXpPageCopy(locale: AppLocale): FitnessXpPageCopy {
  return localeUsesChineseCopy(locale) ? zh : en;
}
