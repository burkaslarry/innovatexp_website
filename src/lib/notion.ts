// lib/notion.ts
import { Client } from '@notionhq/client';

// Validate environment variables (but don't throw - allow graceful degradation)
let notion: Client | null = null;

const NOTION_TOKEN = process.env.NOTION_TOKEN;
const CALENDAR_DB_ID = process.env.NOTION_CALENDAR_DB_ID;

// Log configuration status
if (NOTION_TOKEN) {
  console.log('✅ NOTION_TOKEN found:', NOTION_TOKEN.substring(0, 10) + '...');
  try {
    notion = new Client({
      auth: NOTION_TOKEN,
    });
    console.log('✅ Notion client initialized successfully');
  } catch (error) {
    console.error('❌ Failed to initialize Notion client:', error);
  }
} else {
  console.warn('⚠️ NOTION_TOKEN is not defined. Notion integration will be disabled.');
}

if (CALENDAR_DB_ID && CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID') {
  console.log('✅ NOTION_CALENDAR_DB_ID found:', CALENDAR_DB_ID.substring(0, 8) + '...');
} else {
  console.warn('⚠️ NOTION_CALENDAR_DB_ID not configured or still placeholder');
}

// Export the Notion client (may be null if not configured)
export { notion };

// Export the calendar database ID (may be undefined)
export { CALENDAR_DB_ID };

