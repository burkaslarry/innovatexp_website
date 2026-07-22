/**
 * Questionnaire → Notion CRM row.
 *
 * Env:
 *   NOTION_TOKEN (existing)
 *   NOTION_QUESTIONNAIRE_DB_ID — database ID from Notion URL
 *
 * Recommended database properties (English names; Chinese aliases also matched):
 *   Name (title)           — 姓名 / Name
 *   Company (rich_text)    — 企業 / Company
 *   Profession (rich_text) — 職位 / Profession / Role
 *   Email (email|rich_text)
 *   Phone (phone_number|rich_text) — WhatsApp / Contact
 *   Type (select)          — Consultation | Feedback | …
 *   Status (select)        — New (default)
 *   Industry (rich_text)
 *   Urgency (rich_text)
 *   Interest (rich_text)
 *   Answers (rich_text)    — short summary; full Q&A also stored as page body
 */
import type { Client as NotionClient } from "@notionhq/client";
import { notion } from "@/lib/notion";

export const QUESTIONNAIRE_DB_ID = process.env.NOTION_QUESTIONNAIRE_DB_ID?.trim() || undefined;

export type QuestionnaireNotionPayload = {
  questionnaireType: string;
  name: string;
  company: string;
  profession: string;
  email: string;
  phone: string;
  industry?: string;
  urgency?: string;
  interest?: string;
  formattedQa: string;
  pathId?: string;
};

type NotionProp = {
  id: string;
  name: string;
  type: string;
};

function normalizeKey(s: string) {
  return s.toLowerCase().replace(/[\s/_-]+/g, "");
}

const ALIASES: Record<string, string[]> = {
  name: ["name", "姓名", "title", "聯絡人", "contactname"],
  company: ["company", "企業", "公司", "organization", "機構"],
  profession: ["profession", "職位", "role", "jobtitle", "position", "職稱"],
  email: ["email", "電郵", "e-mail", "mail"],
  phone: ["phone", "whatsapp", "電話", "聯絡", "contact", "mobile", "tel"],
  type: ["type", "questionnaire", "問卷", "form", "來源", "source"],
  status: ["status", "狀態", "stage"],
  industry: ["industry", "行業", "sector"],
  urgency: ["urgency", "急切", "timeline"],
  interest: ["interest", "意向", "nextstep"],
  answers: ["answers", "questions", "問卷內容", "qa", "details", "備註", "notes", "message"],
};

function findProp(props: Record<string, NotionProp>, field: keyof typeof ALIASES): NotionProp | null {
  const aliases = ALIASES[field].map(normalizeKey);
  for (const [name, prop] of Object.entries(props)) {
    if (aliases.includes(normalizeKey(name))) return { ...prop, name };
  }
  return null;
}

function chunkText(text: string, size = 1800): string[] {
  if (!text) return [""];
  const chunks: string[] = [];
  for (let i = 0; i < text.length; i += size) {
    chunks.push(text.slice(i, i + size));
  }
  return chunks;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setProp(properties: Record<string, any>, prop: NotionProp | null, value: string) {
  if (!prop || !value?.trim()) return;
  const v = value.trim();
  switch (prop.type) {
    case "title":
      properties[prop.name] = { title: [{ text: { content: v.slice(0, 2000) } }] };
      break;
    case "rich_text":
      properties[prop.name] = { rich_text: [{ text: { content: v.slice(0, 2000) } }] };
      break;
    case "email":
      properties[prop.name] = { email: v.includes("@") ? v : null };
      break;
    case "phone_number":
      properties[prop.name] = { phone_number: v.slice(0, 64) };
      break;
    case "select":
      properties[prop.name] = { select: { name: v.slice(0, 100) } };
      break;
    case "multi_select":
      properties[prop.name] = { multi_select: [{ name: v.slice(0, 100) }] };
      break;
    case "url":
      properties[prop.name] = { url: v.startsWith("http") ? v : null };
      break;
    default:
      break;
  }
}

export async function createQuestionnaireNotionPage(
  payload: QuestionnaireNotionPayload,
): Promise<{ ok: boolean; pageId?: string; url?: string; error?: string; skipped?: boolean }> {
  const client = notion as NotionClient | null;
  const dbId = QUESTIONNAIRE_DB_ID;

  if (!client) {
    return { ok: false, skipped: true, error: "NOTION_TOKEN not configured" };
  }
  if (!dbId || dbId === "YOUR_NOTION_DATABASE_ID") {
    return { ok: false, skipped: true, error: "NOTION_QUESTIONNAIRE_DB_ID not configured" };
  }

  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dbInfo = (await client.databases.retrieve({ database_id: dbId })) as any;
    const rawProps = (dbInfo.properties || {}) as Record<string, { id: string; name: string; type: string }>;
    const props: Record<string, NotionProp> = {};
    for (const [name, p] of Object.entries(rawProps)) {
      props[name] = { id: p.id, name, type: p.type };
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const properties: Record<string, any> = {};

    const titleProp =
      findProp(props, "name") ||
      Object.values(props).find((p) => p.type === "title") ||
      null;

    setProp(properties, titleProp, payload.name || payload.company || "Questionnaire lead");
    setProp(properties, findProp(props, "company"), payload.company);
    setProp(properties, findProp(props, "profession"), payload.profession);
    setProp(properties, findProp(props, "email"), payload.email);
    setProp(properties, findProp(props, "phone"), payload.phone);
    setProp(properties, findProp(props, "type"), payload.questionnaireType);
    setProp(properties, findProp(props, "status"), "New");
    setProp(properties, findProp(props, "industry"), payload.industry || "");
    setProp(properties, findProp(props, "urgency"), payload.urgency || "");
    setProp(properties, findProp(props, "interest"), payload.interest || "");
    setProp(
      properties,
      findProp(props, "answers"),
      payload.formattedQa.slice(0, 1900) + (payload.formattedQa.length > 1900 ? "…" : ""),
    );

    const answerChunks = chunkText(payload.formattedQa);
    const children = [
      {
        object: "block" as const,
        type: "heading_2" as const,
        heading_2: {
          rich_text: [{ type: "text" as const, text: { content: "Questionnaire answers" } }],
        },
      },
      ...answerChunks.slice(0, 20).map((chunk) => ({
        object: "block" as const,
        type: "paragraph" as const,
        paragraph: {
          rich_text: [{ type: "text" as const, text: { content: chunk } }],
        },
      })),
    ];

    const page = await client.pages.create({
      parent: { database_id: dbId },
      properties,
      children,
    });

    const pageId = page.id;
    return {
      ok: true,
      pageId,
      url: `https://notion.so/${pageId.replace(/-/g, "")}`,
    };
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : "Notion create failed",
    };
  }
}
