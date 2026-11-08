import { slotLabel, PROVIDER_TIMEZONE } from "@/lib/booking-slots";

export type BookingWeb3Input = {
  visitorName: string;
  visitorEmail: string;
  visitorPhone?: string;
  visitorCompany?: string;
  message?: string;
  slotStartIso: string;
  slotEndIso: string;
  locale?: string;
  timezone?: string;
};

/** Plain fields for Web3Forms (no access_key). Shared by /api/calendar/book and client fallback. */
export function buildBookingConfirmationWeb3Fields(input: BookingWeb3Input): Record<string, string> {
  const zh = !input.locale || input.locale.startsWith("zh");
  const visitorName = input.visitorName;
  const eventTitle = `${zh ? "業務聽診" : "Workflow diagnosis"} - ${visitorName}`;
  const visitorEmail = input.visitorEmail;
  const visitorPhone = input.visitorPhone?.trim();
  const visitorCompany = input.visitorCompany?.trim();
  const message = input.message?.trim() ?? "";

  const confirmationBody = zh ? `
業務拜訪預約確認

親愛的 ${visitorName}， 公司 ${visitorCompany}

感謝您的預約。您的業務拜訪已成功安排。

預約詳情：
- 主題: ${eventTitle}
- 時間: ${slotLabel(input.slotStartIso, input.slotEndIso, input.timezone || PROVIDER_TIMEZONE, "zh-HK")}
${visitorPhone ? `- 電話: ${visitorPhone}` : ""}
${visitorCompany ? `- 公司: ${visitorCompany}` : ""}
${message ? `- 留言: ${message}` : ""}


如有任何問題，請隨時聯繫我們。

期待與您會面！

此致，
InnovateXP Limited
AI整合、企業培訓、軟件解決方案專家
  `.trim() : `Workflow diagnosis confirmed\n\n${visitorName}\nCompany: ${visitorCompany || "—"}\nTime: ${slotLabel(input.slotStartIso, input.slotEndIso, input.timezone || PROVIDER_TIMEZONE)}\n${message}\n\nInnovateXP Limited`;

  return {
    subject: `${zh ? "預約確認" : "Booking confirmation"} - ${eventTitle}`,
    from_name: "Client Inquiry Confirmation",
    name: visitorName,
    email: visitorEmail,
    message: confirmationBody,
  };
}
