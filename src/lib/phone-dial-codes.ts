/** Value for "enter your own country calling code" (1–3 digits). */
export const PHONE_DIAL_CUSTOM = "__custom__";

export type PhoneDialOption = {
  code: string;
  labelEn: string;
  labelZh: string;
};

/** Common regions for InnovateXP visitors; order is UX-only. */
export const PHONE_DIAL_OPTIONS: PhoneDialOption[] = [
  { code: "852", labelEn: "Hong Kong SAR", labelZh: "香港" },
  { code: "86", labelEn: "China", labelZh: "中國" },
  { code: "853", labelEn: "Macau SAR", labelZh: "澳門" },
  { code: "886", labelEn: "Taiwan", labelZh: "台灣" },
  { code: "65", labelEn: "Singapore", labelZh: "新加坡" },
  { code: "60", labelEn: "Malaysia", labelZh: "馬來西亞" },
  { code: "66", labelEn: "Thailand", labelZh: "泰國" },
  { code: "84", labelEn: "Vietnam", labelZh: "越南" },
  { code: "63", labelEn: "Philippines", labelZh: "菲律賓" },
  { code: "62", labelEn: "Indonesia", labelZh: "印尼" },
  { code: "81", labelEn: "Japan", labelZh: "日本" },
  { code: "82", labelEn: "South Korea", labelZh: "南韓" },
  { code: "91", labelEn: "India", labelZh: "印度" },
  { code: "44", labelEn: "United Kingdom", labelZh: "英國" },
  { code: "1", labelEn: "USA / Canada", labelZh: "美國／加拿大" },
  { code: "61", labelEn: "Australia", labelZh: "澳洲" },
  { code: "64", labelEn: "New Zealand", labelZh: "紐西蘭" },
  { code: "49", labelEn: "Germany", labelZh: "德國" },
  { code: "33", labelEn: "France", labelZh: "法國" },
  { code: "39", labelEn: "Italy", labelZh: "意大利" },
  { code: "34", labelEn: "Spain", labelZh: "西班牙" },
  { code: "31", labelEn: "Netherlands", labelZh: "荷蘭" },
  { code: "41", labelEn: "Switzerland", labelZh: "瑞士" },
  { code: "971", labelEn: "United Arab Emirates", labelZh: "阿聯酋" },
  { code: "966", labelEn: "Saudi Arabia", labelZh: "沙地阿拉伯" },
];
