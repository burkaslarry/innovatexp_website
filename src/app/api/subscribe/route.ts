import { NextRequest, NextResponse } from "next/server";
import { insertNewsletterSubscriber } from "@/lib/site-records";
import { sendFormNotification } from "@/lib/form-notification";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, interests } = body as { name?: string; email?: string; interests?: string[] };

    if (!name || !email) {
      return NextResponse.json({ success: false, error: "Name and email are required" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ success: false, error: "Invalid email format" }, { status: 400 });
    }

    const interestList = Array.isArray(interests) ? interests.filter((item) => typeof item === "string") : [];
    const saved = await insertNewsletterSubscriber({ name, email, interests: interestList });

    const mailed = await sendFormNotification({
      name,
      email,
      subject: "Newsletter subscription",
      message: `Interests: ${interestList.join(", ") || "-"}`,
    }).catch(() => ({ success: false }));

    if (!saved.ok && !mailed.success) {
      return NextResponse.json({ success: false, error: "Failed to subscribe. Please try again." }, { status: 500 });
    }

    return NextResponse.json({ success: true, message: "Successfully subscribed to newsletter" });
  } catch (error) {
    console.error("Newsletter subscription error:", error);
    return NextResponse.json({ success: false, error: "Failed to subscribe. Please try again." }, { status: 500 });
  }
}
