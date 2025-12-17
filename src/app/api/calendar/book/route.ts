// app/api/calendar/book/route.ts
import { NextResponse } from 'next/server';
import { notion, CALENDAR_DB_ID } from '@/lib/notion';
import { createEvents, EventAttributes } from 'ics';
import { format, parseISO } from 'date-fns';

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

export async function POST(req: Request) {
  try {
    const { visitorName, visitorEmail, visitorPhone, visitorCompany, selectedDate, selectedTimeSlot, message } = await req.json();

    // 1. Server-side validation
    if (!visitorName || !visitorEmail || !selectedDate || !selectedTimeSlot) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)) {
      return NextResponse.json({ error: 'Invalid email format.' }, { status: 400 });
    }

    const timeSlot = selectedTimeSlot as TimeSlot;
    const startDateTime = parseISO(timeSlot.start);
    const endDateTime = parseISO(timeSlot.end);

    if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
      return NextResponse.json({ error: 'Invalid date/time slot format.' }, { status: 400 });
    }

    const eventTitle = `業務拜訪 - ${visitorName}`;

    // 2. Create Notion event (if configured)
    let notionPageId: string | null = null;
    let notionSuccess = false;
    
    console.log('🔍 Checking Notion configuration...');
    console.log('  - Notion client:', notion ? '✅ exists' : '❌ null');
    console.log('  - CALENDAR_DB_ID:', CALENDAR_DB_ID ? `✅ ${CALENDAR_DB_ID.substring(0, 8)}...` : '❌ not set');
    
    if (notion && CALENDAR_DB_ID && CALENDAR_DB_ID !== 'YOUR_NOTION_DATABASE_ID') {
      try {
        console.log('📝 Creating Notion event...');
        
        // Build properties object dynamically
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const properties: Record<string, any> = {
          'Name': {
            title: [{ text: { content: visitorName } }],
          },
          'Date': {
            date: {
              start: format(startDateTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
              end: format(endDateTime, "yyyy-MM-dd'T'HH:mm:ssXXX"),
            },
          },
          'Visitor Email': {
            email: visitorEmail,
          },
        };

        // Add phone if provided
        if (visitorPhone && visitorPhone.trim()) {
          properties['Phone'] = {
            rich_text: [{ text: { content: visitorPhone.trim() } }],
          };
        }

        // Add company if provided
        if (visitorCompany && visitorCompany.trim()) {
          properties['Company'] = {
            rich_text: [{ text: { content: visitorCompany.trim() } }],
          };
        }

        // Add message
        properties['Message'] = {
          rich_text: [{ text: { content: message || '無留言' } }],
        };

        console.log('📋 Properties to create:', JSON.stringify(Object.keys(properties), null, 2));
        console.log('🗄️ Database ID:', CALENDAR_DB_ID);
        console.log('📝 Full properties object:', JSON.stringify(properties, null, 2));

        // Retrieve the database to verify it exists
        try {
          const dbInfo = await notion.databases.retrieve({
            database_id: CALENDAR_DB_ID,
          });
          const dbTitle = dbInfo.title?.[0]?.plain_text || 'Untitled';
          console.log('✅ Database found:', dbTitle);
          const dbProperties = dbInfo.properties || {};
          console.log('📋 Available properties:', Object.keys(dbProperties).join(', '));
        } catch (dbError: any) {
          console.error('❌ Failed to retrieve database:', (dbError as any).message);
          throw dbError;
        }

        const notionResponse = await notion.pages.create({
          parent: { database_id: CALENDAR_DB_ID },
          properties,
        });
        
        notionPageId = notionResponse.id;
        notionSuccess = true;
        console.log('✅ Notion event created successfully!');
        console.log('   Page ID:', notionPageId);
        if (notionPageId) {
          console.log('   URL: https://notion.so/' + notionPageId.replace(/-/g, ''));
        }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (notionError: any) {
        notionSuccess = false;
        console.error('❌ Failed to create Notion event');
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const err = notionError as any;
        console.error('   Error type:', err?.constructor?.name);
        console.error('   Error message:', err?.message);
        console.error('   Error code:', err?.code);
        console.error('   Full error:', JSON.stringify(notionError, Object.getOwnPropertyNames(notionError), 2));
        // Continue without Notion - still send email confirmation
      }
    } else {
      console.warn('⚠️ Notion not configured - skipping calendar entry creation');
      if (!notion) console.warn('   Reason: Notion client is null');
      if (!CALENDAR_DB_ID || CALENDAR_DB_ID === 'YOUR_NOTION_DATABASE_ID') {
        console.warn('   Reason: CALENDAR_DB_ID not set or still placeholder');
      }
    }

    // 3. Generate .ics calendar event file
    const event: EventAttributes = {
      start: [
        startDateTime.getFullYear(),
        startDateTime.getMonth() + 1,
        startDateTime.getDate(),
        startDateTime.getHours(),
        startDateTime.getMinutes(),
      ],
      end: [
        endDateTime.getFullYear(),
        endDateTime.getMonth() + 1,
        endDateTime.getDate(),
        endDateTime.getHours(),
        endDateTime.getMinutes(),
      ],
      title: eventTitle,
      description: `訪客: ${visitorName}\n電子郵件: ${visitorEmail}\n留言: ${message || '無留言'}`,
      location: 'InnovateXP Limited Office / Online Meeting',
      url: 'https://innovatexp.com/bookme',
      organizer: {
        name: 'InnovateXP Limited',
        email: process.env.SENDER_EMAIL || 'noreply@innovatexp.com',
      },
      attendees: [
        { 
          name: visitorName, 
          email: visitorEmail, 
          rsvp: true, 
          partstat: 'NEEDS-ACTION' as const,
          role: 'REQ-PARTICIPANT' as const
        },
      ],
      status: 'CONFIRMED' as const,
      busyStatus: 'BUSY' as const,
      productId: 'innovatexp/calendar',
    };

    createEvents([event], (error, value) => {
      if (error) {
        console.error('Error creating ICS:', error);
        return;
      }
      const icsContent = value || '';
      console.log('✅ ICS calendar file generated successfully, length:', icsContent.length);
    });

    // 4. Send confirmation email using Web3Forms (like ContactForm)
    try {
      const emailFormData = new FormData();
      emailFormData.append('access_key', 'cb229ca6-07dc-41c8-a2b2-99e9e6e287f5');
      emailFormData.append('subject', `業務拜訪預約確認 - ${eventTitle}`);
      emailFormData.append('from_name', 'InnovateXP Limited');
      emailFormData.append('name', visitorName);
      emailFormData.append('email', visitorEmail);
      emailFormData.append('message', `
業務拜訪預約確認

親愛的 ${visitorName}，

感謝您的預約。您的業務拜訪已成功安排。

預約詳情：
- 主題: ${eventTitle}
- 日期: ${format(startDateTime, 'yyyy年MM月dd日')}
- 時間: ${format(startDateTime, 'HH:mm')} - ${format(endDateTime, 'HH:mm')}
${visitorPhone ? `- 電話: ${visitorPhone}` : ''}
${visitorCompany ? `- 公司: ${visitorCompany}` : ''}
${message ? `- 留言: ${message}` : ''}

詳細資訊已附加到此電子郵件中 (.ics 文件)，您可以將其添加到您的日曆。

如有任何問題，請隨時聯繫我們。

期待與您會面！

此致，
InnovateXP Limited
AI整合、企業培訓、軟件解決方案專家
      `.trim());

      const emailObject = Object.fromEntries(emailFormData);
      const emailJson = JSON.stringify(emailObject);

      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: emailJson,
      });

      if (emailResponse.ok) {
        console.log('✅ Confirmation email sent via Web3Forms');
      } else {
        console.warn('⚠️ Email sending failed, but booking was successful');
      }
    } catch (emailError) {
      console.error('❌ Error sending email:', emailError);
      // Don't fail the booking if email fails
    }

    // 5. Prepare WhatsApp message if Notion was successful
    const whatsappMessage = notionSuccess ? encodeURIComponent(
      `📅 新業務拜訪預約確認\n\n` +
      `訪客姓名: ${visitorName}\n` +
      `電子郵件: ${visitorEmail}\n` +
      `${visitorPhone ? `電話: ${visitorPhone}\n` : ''}` +
      `${visitorCompany ? `公司: ${visitorCompany}\n` : ''}` +
      `日期: ${format(startDateTime, 'yyyy年MM月dd日')}\n` +
      `時間: ${format(startDateTime, 'HH:mm')} - ${format(endDateTime, 'HH:mm')}\n` +
      `${message ? `留言: ${message}\n` : ''}` +
      `\n✅ 已成功添加到 Notion 日曆`
    ) : null;

    console.log('📤 Returning response:');
    console.log('   notionSuccess:', notionSuccess);
    console.log('   notionPageId:', notionPageId || 'none');
    console.log('   whatsappMessage:', whatsappMessage ? 'generated' : 'null');

    return NextResponse.json({ 
      message: '預約成功！', 
      notionPageId: notionPageId || null, // Don't expose internal status
      notionSuccess: notionSuccess,
      whatsappMessage: whatsappMessage
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating calendar event:', error);
    return NextResponse.json({ error: '預約失敗，請稍後再試。' }, { status: 500 });
  }
}

