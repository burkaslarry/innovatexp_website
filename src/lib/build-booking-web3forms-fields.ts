import { format, parseISO } from "date-fns";

export type BookingWeb3Input = {
  visitorName: string;
  visitorEmail: string;
  visitorPhone?: string;
  visitorCompany?: string;
  message?: string;
  slotStartIso: string;
  slotEndIso: string;
};

/** Plain fields for Web3Forms (no access_key). Shared by /api/calendar/book and client fallback. */
export function buildBookingConfirmationWeb3Fields(input: BookingWeb3Input): Record<string, string> {
  const startDateTime = parseISO(input.slotStartIso);
  const endDateTime = parseISO(input.slotEndIso);
  const visitorName = input.visitorName;
  const eventTitle = `業務拜訪 - ${visitorName}`;
  const visitorEmail = input.visitorEmail;
  const visitorPhone = input.visitorPhone?.trim();
  const visitorCompany = input.visitorCompany?.trim();
  const message = input.message?.trim() ?? "";

  const confirmationBody = `
業務拜訪預約確認

親愛的 ${visitorName}， 公司 ${visitorCompany}

感謝您的預約。您的業務拜訪已成功安排。

預約詳情：
- 主題: ${eventTitle}
- 日期: ${format(startDateTime, "yyyy年MM月dd日")}
- 時間: ${format(startDateTime, "HH:mm")} - ${format(endDateTime, "HH:mm")}
${visitorPhone ? `- 電話: ${visitorPhone}` : ""}
${visitorCompany ? `- 公司: ${visitorCompany}` : ""}
${message ? `- 留言: ${message}` : ""}


如有任何問題，請隨時聯繫我們。

期待與您會面！

此致，
InnovateXP Limited
AI整合、企業培訓、軟件解決方案專家
  `.trim();

  return {
    subject: `客戶查詢確認 - ${eventTitle}`,
    from_name: "Client Inquiry Confirmation",
    name: visitorName,
    email: visitorEmail,
    message: confirmationBody,
  };
}
