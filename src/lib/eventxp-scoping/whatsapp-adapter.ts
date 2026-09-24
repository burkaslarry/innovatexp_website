/**
 * EventXP Solution Scoping — WhatsApp notification adapter.
 *
 * Two modes (selected by EVENTXP_WHATSAPP_MODE env):
 *   A. WHATSAPP_API  — send an internal notification to InnovateXP via WhatsApp
 *                      Cloud API / webhook. Server-only. Never sends to the lead.
 *   B. WHATSAPP_LINK — return a prefilled wa.me link the lead must press "Send" on.
 *                      Browser cannot silently send WhatsApp on the user's behalf.
 *
 * The WhatsApp message deliberately excludes unnecessary personal data
 * (no email, no full phone, no full address). Detail lives in the secured
 * lead record referenced by leadId.
 */

import type { EventXpScopingPayload } from "./types";

export type NotificationMode = "WHATSAPP_API" | "WHATSAPP_LINK";

export function resolveMode(): NotificationMode {
  const raw = (process.env.EVENTXP_WHATSAPP_MODE || "WHATSAPP_LINK").toUpperCase();
  return raw === "WHATSAPP_API" ? "WHATSAPP_API" : "WHATSAPP_LINK";
}

const LABELS_ZH: Record<string, Record<string, string>> = {
  orgType: {
    chamber: "商會", association: "協會", training: "培訓", community: "社區",
    corporate: "企業", bni: "BNI", other: "其他",
  },
  memberCount: { under100: "<100", "100to500": "100–500", "500to2000": "500–2000", over2000: ">2000" },
  eventsPerYear: { under12: "<12", "12to36": "12–36", "36to100": "36–100", over100: ">100" },
  attendance: { under50: "<50", "50to200": "50–200", "200to500": "200–500", over500: ">500" },
  recurring: { recurring: "定期", oneoff: "一次性", mixed: "混合" },
  locations: { "1": "1", "2to5": "2–5", over5: ">5" },
  registrationMethod: { paper: "紙表", googleform: "Google Form", excel: "Excel", whatsapp: "WhatsApp", crm: "CRM", other: "其他" },
  checkInMethod: { manual: "人手", qr: "QR", kiosk: "Kiosk", none: "冇" },
  currentTool: { excel: "Excel", googleform: "Google Form", whatsapp: "WhatsApp", crm: "CRM", membership: "會員系統", none: "冇" },
  adminHours: { under2: "<2h", "2to5": "2–5h", "5to10": "5–10h", over10: ">10h" },
  launchDate: { asap: "盡快", "1to3m": "1–3個月", "3to6m": "3–6個月", over6m: ">6個月", exploring: "了解中" },
  budgetRange: { under20k: "<2萬", "20kto50k": "2–5萬", "50kto150k": "5–15萬", over150k: ">15萬", open: "開放" },
  commercialPreference: { managed: "Managed", licence: "Licence", sourcecode: "源碼", undecided: "未定" },
  privacyHosting: { cloud: "雲端", private: "私有雲", onprem: "On-prem", undecided: "未定" },
  supportHours: { office: "辦公時間", extended: "延長", eventday: "活動日", none: "唔需要" },
  capability: {
    memberMgmt: "會員管理", guestMgmt: "嘉賓管理", kioskQrCheckIn: "QR/Kiosk check-in",
    attendanceReport: "出席報告", rosterImport: "Roster匯入", whatsappComms: "WhatsApp通知",
    membershipScoring: "會員評分", aiMatchingSeating: "AI配對/座位",
    customBranding: "自訂品牌", integrations: "系統整合", onsiteSupport: "現場支援",
  },
};

function label(group: string, key: string): string {
  return LABELS_ZH[group]?.[key] ?? key ?? "—";
}

/** Build the internal WhatsApp notification text (no sensitive personal data). */
export function buildInternalMessage(p: EventXpScopingPayload, leadId: string): string {
  const tools = (p.currentTools ?? []).map((t) => label("currentTool", t)).join("、") || "—";
  const caps = (p.capabilities ?? []).map((c) => label("capability", c)).join("、") || "—";
  return [
    "【EventXP 新查詢】",
    `Lead ID: ${leadId}`,
    `機構：${p.organisationName}`,
    `聯絡人：${p.contactName}${p.role ? ` / ${p.role}` : ""}`,
    `活動：${label("eventsPerYear", p.eventsPerYear)}；每場約 ${label("attendance", p.typicalAttendance)} 人`,
    `目前工具：${tools}`,
    `主要問題：${p.biggestProblem ? p.biggestProblem.slice(0, 120) : "—"}`,
    `需要：${caps}`,
    `預計上線：${label("launchDate", p.launchDate)}`,
    `預算：${label("budgetRange", p.budgetRange)}`,
    `服務模式：${label("commercialPreference", p.commercialPreference)}`,
    `下一步：查 secured lead 記錄（leadId）再聯絡`,
  ].join("\n");
}

export type AdapterResult =
  | { mode: "WHATSAPP_API"; delivered: boolean; detail?: string }
  | { mode: "WHATSAPP_LINK"; waMeLink: string };

/** Mode A: send internal notification via WhatsApp Cloud API / webhook. */
async function sendViaApi(p: EventXpScopingPayload, leadId: string): Promise<AdapterResult> {
  const token = process.env.WHATSAPP_CLOUD_API_TOKEN;
  const phoneId = process.env.WHATSAPP_CLOUD_PHONE_ID;
  const recipient = process.env.WHATSAPP_CLOUD_RECIPIENT;
  const webhook = process.env.EVENTXP_WEBHOOK_URL;

  const text = buildInternalMessage(p, leadId);

  // Option 1: external webhook (Make / n8n / custom) — preferred if set.
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ leadId, text, type: "eventxp-scoping" }),
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) throw new Error(`webhook ${res.status}`);
      return { mode: "WHATSAPP_API", delivered: true };
    } catch {
      return { mode: "WHATSAPP_API", delivered: false, detail: "webhook_failed" };
    }
  }

  // Option 2: WhatsApp Cloud API directly.
  if (token && phoneId && recipient) {
    try {
      const res = await fetch(
        `https://graph.facebook.com/v20.0/${phoneId}/messages`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${token}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            messaging_product: "whatsapp",
            to: recipient,
            type: "text",
            text: { body: text },
        }),
          signal: AbortSignal.timeout(8000),
        },
      );
      if (!res.ok) throw new Error(`cloudapi ${res.status}`);
      return { mode: "WHATSAPP_API", delivered: true };
    } catch {
      return { mode: "WHATSAPP_API", delivered: false, detail: "cloudapi_failed" };
    }
  }

  // Not configured.
  return { mode: "WHATSAPP_API", delivered: false, detail: "not_configured" };
}

/** Mode B: build a prefilled wa.me link the user must press Send on. */
function buildWaMeLink(p: EventXpScopingPayload, leadId: string): string {
  const digits = (process.env.WHATSAPP_NUMBER || process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "")
    .replace(/[^\d]/g, "");
  const text = buildInternalMessage(p, leadId);
  const base = digits ? `https://wa.me/${digits}` : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(text)}`;
}

export async function runAdapter(
  p: EventXpScopingPayload,
  leadId: string,
): Promise<AdapterResult> {
  const mode = resolveMode();
  if (mode === "WHATSAPP_API") {
    const r = await sendViaApi(p, leadId);
    // Fallback to LINK mode if API delivery failed, so the lead is never lost.
    if (r.mode === "WHATSAPP_API" && !r.delivered) {
      return { mode: "WHATSAPP_LINK", waMeLink: buildWaMeLink(p, leadId) };
    }
    return r;
  }
  return { mode: "WHATSAPP_LINK", waMeLink: buildWaMeLink(p, leadId) };
}
