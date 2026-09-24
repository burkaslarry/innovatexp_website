"use client";

import { useState } from "react";

type Props = { zh: boolean };

const inputClass =
  "w-full rounded-lg border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] px-3 py-2 text-sm text-[color:var(--heading-foreground)]";

export function CoffeeShopSubmitForm({ zh }: Props) {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  const t = zh
    ? {
        title: "新增餐廳",
        intro: "一定要有相。提交會寄去 info@innovatexp.co，人手批核後先上地圖，唔會即時出現。",
        name: "店名",
        area: "地區",
        address: "地址",
        type: "類型",
        coffee: "咖啡",
        tea: "茶飲",
        outlets: "電插",
        wifi: "Wi-Fi",
        yes: "有",
        few: "少",
        no: "冇",
        unknown: "未核",
        tables: "檯",
        t2: "有 2 人檯",
        t4: "有 4 人檯",
        music: "有音樂",
        time: "限時",
        none: "無限時",
        must: "必須消費",
        notes: "備註",
        yourName: "你的名字",
        email: "你的電郵",
        photo: "店舖相片（必須）",
        send: "提交待批核",
        sending: "送緊…",
        sent: "收到。我哋會睇相同資料，批核後先加入地圖。",
        fail: "送唔到，請再試或者直接電郵 info@innovatexp.co。",
      }
    : {
        title: "Add a shop",
        intro: "A photo is required. This emails info@innovatexp.co for manual approval and does not appear on the map immediately.",
        name: "Shop name",
        area: "Area",
        address: "Address",
        type: "Type",
        coffee: "Coffee",
        tea: "Tea",
        outlets: "Outlets",
        wifi: "Wi-Fi",
        yes: "Yes",
        few: "Few",
        no: "No",
        unknown: "Unsure",
        tables: "Tables",
        t2: "Has a 2-seat table",
        t4: "Has a 4-seat table",
        music: "Has music",
        time: "Time limit",
        none: "No limit",
        must: "Must order",
        notes: "Notes",
        yourName: "Your name",
        email: "Your email",
        photo: "Shop photo (required)",
        send: "Submit for review",
        sending: "Sending…",
        sent: "Received. We'll review the photo and details before adding it to the map.",
        fail: "Could not send. Try again or email info@innovatexp.co.",
      };

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const photo = data.get("photo");
    if (!(photo instanceof File) || photo.size === 0) {
      setStatus("error");
      setError(zh ? "請上傳店舖相片。" : "Please upload a shop photo.");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/creative-studio/coffee-shop", { method: "POST", body: data });
      const body = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !body.ok) {
        setStatus("error");
        setError(body.error || t.fail);
        return;
      }
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
      setError(t.fail);
    }
  }

  return (
    <form onSubmit={onSubmit} className="ixp-card space-y-4 p-4 md:p-6">
      <div>
        <h2 className="text-lg font-bold text-[color:var(--heading-foreground)]">{t.title}</h2>
        <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">{t.intro}</p>
      </div>
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.name}</span>
          <input name="name" required maxLength={120} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.area}</span>
          <input name="neighborhood" required maxLength={80} className={inputClass} />
        </label>
        <label className="block md:col-span-2">
          <span className="mb-1 block text-xs font-semibold">{t.address}</span>
          <input name="address" required maxLength={240} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.type}</span>
          <select name="type" className={inputClass} defaultValue="coffee">
            <option value="coffee">{t.coffee}</option>
            <option value="tea">{t.tea}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.outlets}</span>
          <select name="outlets" className={inputClass} defaultValue="few">
            <option value="yes">{t.yes}</option>
            <option value="few">{t.few}</option>
            <option value="no">{t.no}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.wifi}</span>
          <select name="wifi" className={inputClass} defaultValue="unknown">
            <option value="yes">{t.yes}</option>
            <option value="no">{t.no}</option>
            <option value="unknown">{t.unknown}</option>
          </select>
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.time}</span>
          <select name="timeLimit" className={inputClass} defaultValue="none">
            <option value="none">{t.none}</option>
            <option value="60">60</option>
            <option value="90">90</option>
            <option value="120">120</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-4 text-sm">
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="tableFor2" value="yes" /> {t.t2}
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="tableFor4" value="yes" /> {t.t4}
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="music" value="yes" /> {t.music}
        </label>
        <label className="inline-flex items-center gap-2">
          <input type="checkbox" name="mustOrder" value="yes" defaultChecked /> {t.must}
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold">{t.notes}</span>
        <textarea name="notes" maxLength={500} rows={3} className={inputClass} />
      </label>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.yourName}</span>
          <input name="submitterName" required maxLength={80} className={inputClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold">{t.email}</span>
          <input name="submitterEmail" type="email" required className={inputClass} />
        </label>
      </div>
      <label className="block">
        <span className="mb-1 block text-xs font-semibold">{t.photo}</span>
        <input name="photo" type="file" accept="image/jpeg,image/png,image/webp" required className="text-sm" />
      </label>
      <button
        type="submit"
        disabled={status === "sending"}
        className="min-h-[40px] rounded-full bg-brand-primary px-4 text-sm font-semibold text-white disabled:opacity-60"
      >
        {status === "sending" ? t.sending : t.send}
      </button>
      {status === "sent" ? <p className="text-sm text-brand-primary">{t.sent}</p> : null}
      {status === "error" ? <p className="text-sm text-red-600">{error}</p> : null}
    </form>
  );
}
