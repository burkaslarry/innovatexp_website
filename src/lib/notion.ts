// lib/notion.ts
import { Client } from '@notionhq/client';
import type { Client as NotionClient } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
// 業務拜訪 (business visit) database ID — use the ID from your Notion database URL
// e.g. https://notion.so/2c63ff8f6dd480aa86b5cbc9dab4f8d7 → 2c63ff8f-6dd4-80aa-86b5-cbc9dab4f8d7
const CALENDAR_DB_ID = process.env.NOTION_CALENDAR_DB_ID || undefined;

// Create Notion client if token is available
let notion: NotionClient | null = null;

if (NOTION_TOKEN) {
  try {
    notion = new Client({ auth: NOTION_TOKEN });
    console.log('✅ Notion client initialized');
  } catch (error) {
    console.error('❌ Failed to initialize Notion client:', error);
  }
} else {
  console.warn('⚠️ NOTION_TOKEN is not defined');
}

export { notion, CALENDAR_DB_ID };
export type { NotionClient };

