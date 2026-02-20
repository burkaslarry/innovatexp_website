"use client";

import { useLanguage } from "../LanguageContext";

interface ChineseOverlayProps {
  section: string;
}

const zhContent: Record<string, string> = {
  "smartsales-crm-hero":
    "中文補充：SmartSales CRM 針對香港 B2B 與中小企團隊，把跟進、客戶資料與日常銷售節奏整合成可執行流程。",
  "eventxp-hero":
    "中文補充：EventXP 針對香港活動營運情境，重點改善簽到效率、即時出席可視化與活動後跟進流程。",
  "ai-consulting-hero":
    "中文補充：AI 顧問服務重點在落地執行，協助團隊以分階段方式導入 AI，降低試錯成本並保留營運穩定性。",
};

export default function ChineseOverlay({ section }: ChineseOverlayProps) {
  const { language } = useLanguage();

  if (language !== "zh") return null;

  const text = zhContent[section];
  if (!text) return null;

  return (
    <aside className="mt-4 rounded-lg border border-orange-200 bg-orange-50 px-4 py-3 text-sm leading-relaxed text-gray-700 dark:border-orange-400 dark:bg-gray-800 dark:text-gray-200">
      {text}
    </aside>
  );
}
