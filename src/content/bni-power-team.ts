import type { AppLocale } from "@/lib/i18n-routing";
import { localeUsesChineseCopy } from "@/lib/i18n-routing";

export type PowerTeamExample = {
  name: string;
  explanation: string;
  collaborate: boolean;
  collaborateNote?: string;
};

export type PowerTeamSuggestion = {
  targetMarket: string;
  members: string[];
  explanation: string;
  collaborate: boolean;
  collaborateNote?: string;
};

export type PowerTeamResult = {
  professionSummary: string;
  upstream: PowerTeamExample[];
  parallel: PowerTeamExample[];
  downstream: PowerTeamExample[];
  powerTeams: PowerTeamSuggestion[];
};

export type BniPowerTeamCopy = {
  eyebrow: string;
  title: string;
  intro: string;
  why: string;
  professionLabel: string;
  professionPlaceholder: string;
  offeringLabel: string;
  offeringPlaceholder: string;
  submit: string;
  submitting: string;
  reset: string;
  requiredError: string;
  failError: string;
  resultEyebrow: string;
  upstreamTitle: string;
  upstreamHint: string;
  parallelTitle: string;
  parallelHint: string;
  downstreamTitle: string;
  downstreamHint: string;
  powerTeamTitle: string;
  powerTeamHint: string;
  collaborateBadge: string;
  collaborateDefaultNote: string;
  bookCta: string;
  whatsappCta: string;
  cardEyebrow: string;
  cardTitle: string;
  cardBody: string;
  cardCta: string;
  fabLabel: string;
  metaTitle: string;
  metaDescription: string;
};

const zh: BniPowerTeamCopy = {
  eyebrow: "BNI Power Team 工具",
  title: "幫你搵上下游，組建有效轉介團隊",
  intro:
    "作為一位老闆，有效尋找上下游行業來組建團隊非常重要。填寫你的專業同產品／服務，即刻產生 Channel、Referral Partner、供應商例子，同埋 5 個 Power Team 建議。",
  why: "作為一位老闆，有效尋找我的上下游行業來組建團隊是非常重要的。",
  professionLabel: "行業／專業領域",
  professionPlaceholder: "例如：AI 商業顧問、會計、室內設計",
  offeringLabel: "產品／服務",
  offeringPlaceholder: "用幾句講清楚你賣咩、幫邊類客戶解決咩問題……",
  submit: "產生 Power Team 建議",
  submitting: "分析緊……",
  reset: "重新填寫",
  requiredError: "請填寫行業／專業領域同產品／服務。",
  failError: "暫時未能產生建議，請稍後再試。",
  resultEyebrow: "你的轉介地圖",
  upstreamTitle: "1. 上游行業（Channel）",
  upstreamHint: "邊個行業可以俾生意你？",
  parallelTitle: "2. 平行行業（Referral Partner）",
  parallelHint: "邊個行業同你有共同客戶群，可以互相介紹？",
  downstreamTitle: "3. 下游行業（供應商位）",
  downstreamHint: "邊個行業係你能夠俾生意佢哋？",
  powerTeamTitle: "4. Power Team 建議",
  powerTeamHint: "按唔同目標市場，建議 5 個可組建嘅團隊例子。",
  collaborateBadge: "可與 InnovateXP 合作",
  collaborateDefaultNote: "呢個方向同 InnovateXP 嘅 AI／流程落地服務有關，可以一齊服務共同客戶。",
  bookCta: "預約 30 分鐘診斷",
  whatsappCta: "WhatsApp 傾合作",
  cardEyebrow: "BNI 閃卡工具",
  cardTitle: "引薦我的業務：一鍵搵上下游 Power Team",
  cardBody:
    "輸入你的行業同產品／服務，即刻產生上游 Channel、平行 Referral Partner、下游供應商各 10 個例子，再建議 5 個目標市場 Power Team。同 AI／流程相關嘅位會標示可合作。",
  cardCta: "開始填寫",
  fabLabel: "Biz Match",
  metaTitle: "BNI Power Team｜轉介閃卡｜InnovateXP",
  metaDescription:
    "BNI Power Team 工具：輸入行業與產品／服務，產生上下游與平行轉介例子加 5 個 Power Team 建議，並標示可與 Larry Lo／InnovateXP 合作。",
};

const en: BniPowerTeamCopy = {
  eyebrow: "BNI Power Team tool",
  title: "Map upstream, parallel, and downstream partners",
  intro:
    "As an entrepreneur, finding complementary industries is essential. Enter your profession and offerings to generate Channel, Referral Partner, and supplier examples — plus 5 Power Team suggestions.",
  why: "As an entrepreneur, finding upstream and downstream industries to build an effective team is very important.",
  professionLabel: "Industry / profession",
  professionPlaceholder: "e.g. AI business consultant, accountant, interior designer",
  offeringLabel: "Products / services",
  offeringPlaceholder: "Describe what you sell and which problems you solve for which clients…",
  submit: "Generate Power Team ideas",
  submitting: "Analysing…",
  reset: "Start over",
  requiredError: "Please fill in industry/profession and products/services.",
  failError: "Could not generate suggestions right now. Please try again.",
  resultEyebrow: "Your referral map",
  upstreamTitle: "1. Upstream (Channel)",
  upstreamHint: "Which industries can send you business?",
  parallelTitle: "2. Parallel (Referral Partner)",
  parallelHint: "Which industries share your clients and can exchange referrals?",
  downstreamTitle: "3. Downstream (you as supplier)",
  downstreamHint: "Which industries can you send business to?",
  powerTeamTitle: "4. Power Team suggestions",
  powerTeamHint: "Five team examples segmented by target market.",
  collaborateBadge: "Collaborate with InnovateXP",
  collaborateDefaultNote:
    "This direction overlaps InnovateXP’s AI / workflow delivery services — a natural collaboration for shared clients.",
  bookCta: "Book a 30-min diagnosis",
  whatsappCta: "WhatsApp about partnership",
  cardEyebrow: "BNI flash-card tool",
  cardTitle: "Refer my business: map your Power Team in one step",
  cardBody:
    "Enter your industry and offerings to get 10 upstream, 10 parallel, and 10 downstream examples plus 5 Power Team ideas. AI / workflow-related items are marked for InnovateXP collaboration.",
  cardCta: "Start now",
  fabLabel: "Biz Match",
  metaTitle: "BNI Power Team | Referral Map | InnovateXP",
  metaDescription:
    "BNI Power Team: enter industry and offerings for upstream, parallel, and downstream referral ideas plus 5 Power Team suggestions—with InnovateXP collab flags.",
};

export function getBniPowerTeamCopy(locale: AppLocale): BniPowerTeamCopy {
  return localeUsesChineseCopy(locale) ? zh : en;
}

/** InnovateXP collaboration lens injected into the model prompt. */
export const INNOVATEXP_COLLAB_CONTEXT_ZH = `
InnovateXP Limited（創辦人 Larry Lo）定位為香港 AI 商業顧問，核心服務包括：
- 流程診斷、SOP、KPI、Workflow Sprint
- WhatsApp-first CRM／SmartSales、跟進紀律
- EventXP／活動後跟進、轉介網絡工具
- AI 陪跑、AI 培訓、chatbot／automation、私有 AI 方案
- 幫 3–30 人中小企把 AI 落地到真實營運流程

當例子與以上服務有關（例如：科技顧問、數碼轉型、CRM、自動化、活動管理、培訓、IT、軟件、AI、流程顧問、客戶體驗），請設 collaborate=true，並用一兩句說明如何與 InnovateXP 合作服務共同客戶。
`.trim();

export const INNOVATEXP_COLLAB_CONTEXT_EN = `
InnovateXP Limited (founder Larry Lo) is a Hong Kong AI business consultancy focused on:
- workflow diagnosis, SOP, KPI, Workflow Sprint
- WhatsApp-first CRM / SmartSales and follow-up discipline
- EventXP / post-event follow-up and referral networking tools
- AI coaching, AI training, chatbot/automation, private AI solutions
- helping 3–30 person SMEs land AI in real operating workflows

When an example relates to these services (tech advisory, digital transformation, CRM, automation, event management, training, IT, software, AI, process consulting, CX), set collaborate=true and briefly explain how to co-serve shared clients with InnovateXP.
`.trim();

export function buildPowerTeamPrompt({
  profession,
  offering,
  locale,
}: {
  profession: string;
  offering: string;
  locale: AppLocale;
}): { system: string; user: string } {
  const zh = localeUsesChineseCopy(locale);
  const collab = zh ? INNOVATEXP_COLLAB_CONTEXT_ZH : INNOVATEXP_COLLAB_CONTEXT_EN;

  if (zh) {
    return {
      system: `你是 BNI 轉介與 Power Team 策略顧問。只用繁體中文（香港用語優先）回答。必須回傳合法 JSON，不要 markdown 圍欄。
${collab}

JSON schema:
{
  "professionSummary": "一句話總結對方專業",
  "upstream": [{"name":"行業","explanation":"一兩句","collaborate":false,"collaborateNote":""}],
  "parallel": [{"name":"行業","explanation":"一兩句","collaborate":false,"collaborateNote":""}],
  "downstream": [{"name":"行業","explanation":"一兩句","collaborate":false,"collaborateNote":""}],
  "powerTeams": [{"targetMarket":"目標市場","members":["角色1","角色2","角色3"],"explanation":"一兩句","collaborate":false,"collaborateNote":""}]
}

規則：
- upstream / parallel / downstream 各剛好 10 項
- powerTeams 剛好 5 項，按不同目標市場劃分
- collaborateNote 只在 collaborate=true 時填寫
- 解釋要具體、可行動，避免空泛口號`,
      user: `作為一個BNI會員，有效尋找我的上下游行業來組建團隊是非常重要的

我的專業是：${profession} , ${offering}

請提供以下每樣各10個例子，並附上一兩句解釋：
1.我的上遊行業(那個行業能給我生意? Channel)
2.我的平行行業（那個行業與我是有共同客戶群，能夠互相介紹生意？Referral Partner)
3.我的下游行業(那個行業是我能給它生意的? 供應商)

最後請你建議我能組建的Power Team團隊? 以不同目標市場做劃分，給予我5個例子

若例子與 InnovateXP 可協作，請標註 collaborate=true 並說明合作切入點。`,
    };
  }

  return {
    system: `You are a BNI referral and Power Team strategist. Reply in clear English. Return valid JSON only — no markdown fences.
${collab}

JSON schema:
{
  "professionSummary": "one-line summary of their profession",
  "upstream": [{"name":"industry","explanation":"1-2 sentences","collaborate":false,"collaborateNote":""}],
  "parallel": [{"name":"industry","explanation":"1-2 sentences","collaborate":false,"collaborateNote":""}],
  "downstream": [{"name":"industry","explanation":"1-2 sentences","collaborate":false,"collaborateNote":""}],
  "powerTeams": [{"targetMarket":"target market","members":["role1","role2","role3"],"explanation":"1-2 sentences","collaborate":false,"collaborateNote":""}]
}

Rules:
- upstream / parallel / downstream: exactly 10 items each
- powerTeams: exactly 5 items, segmented by different target markets
- collaborateNote only when collaborate=true
- explanations must be concrete and actionable`,
    user: `As a BNI member, finding my upstream and downstream industries to build an effective team is very important.

My profession is: ${profession}, ${offering}

Please provide 10 examples each, with 1–2 sentence explanations:
1. Upstream industries (who can send me business? Channel)
2. Parallel industries (shared client base — Referral Partners)
3. Downstream industries (who I can send business to / supply)

Then suggest 5 Power Teams segmented by different target markets.

If an example relates to InnovateXP collaboration, set collaborate=true and explain the partnership angle.`,
  };
}

function asExamples(raw: unknown): PowerTeamExample[] {
  if (!Array.isArray(raw)) return [];
  const out: PowerTeamExample[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const name = typeof row.name === "string" ? row.name.trim() : "";
    const explanation = typeof row.explanation === "string" ? row.explanation.trim() : "";
    if (!name || !explanation) continue;
    const collaborate = Boolean(row.collaborate);
    const collaborateNote =
      typeof row.collaborateNote === "string" && row.collaborateNote.trim()
        ? row.collaborateNote.trim()
        : undefined;
    out.push({ name, explanation, collaborate, collaborateNote });
  }
  return out;
}

function asPowerTeams(raw: unknown): PowerTeamSuggestion[] {
  if (!Array.isArray(raw)) return [];
  const out: PowerTeamSuggestion[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const row = item as Record<string, unknown>;
    const targetMarket = typeof row.targetMarket === "string" ? row.targetMarket.trim() : "";
    const explanation = typeof row.explanation === "string" ? row.explanation.trim() : "";
    const members = Array.isArray(row.members)
      ? row.members.filter((m): m is string => typeof m === "string" && m.trim().length > 0).map((m) => m.trim())
      : [];
    if (!targetMarket || !explanation || members.length === 0) continue;
    const collaborate = Boolean(row.collaborate);
    const collaborateNote =
      typeof row.collaborateNote === "string" && row.collaborateNote.trim()
        ? row.collaborateNote.trim()
        : undefined;
    out.push({ targetMarket, members, explanation, collaborate, collaborateNote });
  }
  return out;
}

export function parsePowerTeamResult(raw: string): PowerTeamResult {
  const cleaned = raw.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/i, "").trim();
  const data = JSON.parse(cleaned) as Record<string, unknown>;
  return {
    professionSummary:
      typeof data.professionSummary === "string" && data.professionSummary.trim()
        ? data.professionSummary.trim()
        : "",
    upstream: asExamples(data.upstream),
    parallel: asExamples(data.parallel),
    downstream: asExamples(data.downstream),
    powerTeams: asPowerTeams(data.powerTeams),
  };
}
