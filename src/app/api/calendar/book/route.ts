import { enforceFormSubmissionLimit } from "@/lib/form-submission-limit";
import { NextResponse } from "next/server";
import { createEvents, type EventAttributes } from "ics";
import { format, parseISO } from "date-fns";
import { sendFormNotification } from "@/lib/form-notification";
import { buildBookingConfirmationWeb3Fields } from "@/lib/build-booking-web3forms-fields";
import { insertCalendarBooking } from "@/lib/site-records";

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

export async function POST(req: Request) {
  try {
    const { visitorName, visitorEmail, visitorPhone, visitorCompany, selectedDate, selectedTimeSlot, message } =
      await req.json();

    if (!visitorName || !visitorEmail || !selectedDate || !selectedTimeSlot) {
      return NextResponse.json({ error: "Missing required fields." }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitorEmail)) {
      return NextResponse.json({ error: "Invalid email format." }, { status: 400 });
    }

    const timeSlot = selectedTimeSlot as TimeSlot;
    const startDateTime = parseISO(timeSlot.start);
    const endDateTime = parseISO(timeSlot.end);

    if (Number.isNaN(startDateTime.getTime()) || Number.isNaN(endDateTime.getTime())) {
      return NextResponse.json({ error: "Invalid date/time slot format." }, { status: 400 });
    }

    const blocked = await enforceFormSubmissionLimit(req);
    if (blocked) return blocked;

    const eventTitle = `業務拜訪 - ${visitorName}`;
    const saved = await insertCalendarBooking({
      name: String(visitorName),
      email: String(visitorEmail),
      phone: typeof visitorPhone === "string" ? visitorPhone.trim() : "",
      company: typeof visitorCompany === "string" ? visitorCompany.trim() : "",
      startsAt: startDateTime.toISOString(),
      endsAt: endDateTime.toISOString(),
      message: typeof message === "string" ? message : "",
    });
    if (!saved.ok) {
      console.error("Calendar booking could not be saved:", saved.error || "unknown error");
      return NextResponse.json({ error: "預約未能儲存，請稍後再試。" }, { status: 503 });
    }

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
      description: `訪客: ${visitorName}\n電子郵件: ${visitorEmail}\n留言: ${message || "無留言"}`,
      location: "InnovateXP Limited Office / Online Meeting",
      url: `${process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || "https://www.innovatexp.co"}/zh-hk/bookme`,
      organizer: {
        name: "InnovateXP Limited",
        email: process.env.SENDER_EMAIL || "noreply@innovatexp.com",
      },
      attendees: [
        {
          name: visitorName,
          email: visitorEmail,
          rsvp: true,
          partstat: "NEEDS-ACTION" as const,
          role: "REQ-PARTICIPANT" as const,
        },
      ],
      status: "CONFIRMED" as const,
      busyStatus: "BUSY" as const,
      productId: "innovatexp/calendar",
    };

    createEvents([event], (error) => {
      if (error) console.error("Error creating ICS:", error);
    });

    let emailSuccess = false;
    const web3Fields = buildBookingConfirmationWeb3Fields({
      visitorName,
      visitorEmail,
      visitorPhone: typeof visitorPhone === "string" ? visitorPhone : "",
      visitorCompany: typeof visitorCompany === "string" ? visitorCompany : "",
      message: typeof message === "string" ? message : "",
      slotStartIso: timeSlot.start,
      slotEndIso: timeSlot.end,
    });

    try {
      const emailResult = await sendFormNotification(web3Fields);
      emailSuccess = emailResult.success;
    } catch (emailError) {
      console.error("Error sending booking email:", emailError);
      emailSuccess = false;
    }

    const whatsappMessage = saved.ok
      ? encodeURIComponent(
          `📅 新業務拜訪預約確認\n\n` +
            `訪客姓名: ${visitorName}\n` +
            `電子郵件: ${visitorEmail}\n` +
            `${visitorPhone ? `電話: ${visitorPhone}\n` : ""}` +
            `${visitorCompany ? `公司: ${visitorCompany}\n` : ""}` +
            `日期: ${format(startDateTime, "yyyy年MM月dd日")}\n` +
            `時間: ${format(startDateTime, "HH:mm")} - ${format(endDateTime, "HH:mm")}\n` +
            `${message ? `留言: ${message}\n` : ""}` +
            `\n✅ 已記錄到 InnovateXP 預約`,
        )
      : null;

    return NextResponse.json(
      {
        message: "預約成功！",
        saved: saved.ok,
        emailSuccess,
        whatsappMessage,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Error creating calendar event:", error);
    return NextResponse.json({ error: "預約失敗，請稍後再試。" }, { status: 500 });
  }
}
