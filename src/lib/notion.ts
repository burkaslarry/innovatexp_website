// lib/notion.ts
import { Client } from '@notionhq/client';
import type { Client as NotionClient } from '@notionhq/client';

const NOTION_TOKEN = process.env.NOTION_TOKEN;
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

