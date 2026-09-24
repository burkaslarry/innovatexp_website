/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useMemo, useState, FormEvent } from "react";
import { CheckCircle2, Loader2, ChevronLeft, ChevronRight, Send, ExternalLink, AlertCircle } from "lucide-react";
import {
  CONSENT_VERSION,
  type EventXpScopingPayload,
} from "@/lib/eventxp-scoping/types";

const STORAGE_KEY = "eventxp-scoping-progress-v1";
const ESTIMATED_MINUTES = 6;

type Props = { zh: boolean; locale: string };

const EMPTY: EventXpScopingPayload = {
  organisationName: "", contactName: "", role: "", email: "", phone: "",
  orgType: "", memberCount: "",
  eventsPerYear: "", typicalAttendance: "", maxAttendance: "", recurring: "", locations: "",
  registrationMethod: "", checkInMethod: "", currentTools: [], biggestProblem: "", adminHoursPerEvent: "",
  capabilities: [],
  launchDate: "", budgetRange: "", commercialPreference: "", privacyHosting: "", supportHours: "", decisionMaker: "",
  privacyAccepted: false, contactPermission: false, marketingConsent: false,
  locale: "zh-hk", consentVersion: CONSENT_VERSION, website: "",
};

export function EventXpScopingForm({ zh, locale }: Props) {
  const [stage, setStage] = useState(1);
  const [data, setData] = useState<EventXpScopingPayload>(() => {
    if (typeof window === "undefined") return EMPTY;
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) return { ...EMPTY, ...JSON.parse(saved), locale, consentVersion: CONSENT_VERSION };
    } catch {}
    return { ...EMPTY, locale };
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<null | {
    leadId: string; mode: string; waMeLink?: string; delivered?: boolean; expectedResponseHours: number;
  }>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  const set = <K extends keyof EventXpScopingPayload>(k: K, v: EventXpScopingPayload[K]) => {
    setData((p) => ({ ...p, [k]: v }));
    setErrors((e) => { if (!e[k as string]) return e; const n = { ...e }; delete n[k as string]; return n; });
  };
  const toggleArr = <K extends "currentTools" | "capabilities">(k: K, v: string) => {
    setData((p) => {
      const arr = p[k] as string[];
      const next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
      return { ...p, [k]: next };
    });
  };

  const stageValid = useMemo(() => {
    if (stage === 1) return Boolean(data.organisationName && data.contactName && data.email && data.phone && data.orgType && data.memberCount);
    if (stage === 2) return Boolean(data.eventsPerYear && data.typicalAttendance && data.recurring && data.locations);
    if (stage === 3) return Boolean(data.registrationMethod && data.checkInMethod && data.adminHoursPerEvent);
    if (stage === 4) return true;
    if (stage === 5) return Boolean(data.launchDate && data.budgetRange && data.commercialPreference && data.privacyHosting && data.supportHours);
    if (stage === 6) return Boolean(data.privacyAccepted && data.contactPermission);
    return true;
  }, [stage, data]);

  function next() {
    if (!stageValid) {
      const e: Record<string, string> = {};
      if (stage === 1) {
        if (!data.organisationName) e.organisationName = "required";
        if (!data.contactName) e.contactName = "required";
        if (!data.email) e.email = "required";
        if (!data.phone) e.phone = "required";
        if (!data.orgType) e.orgType = "required";
        if (!data.memberCount) e.memberCount = "required";
      }
      setErrors(e);
      return;
    }
    setStage((s) => Math.min(6, s + 1));
  }
  function back() { setStage((s) => Math.max(1, s - 1)); }

  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!data.privacyAccepted || !data.contactPermission) {
      setErrors({ privacyAccepted: "required", contactPermission: "required" });
      return;
    }
    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/eventxp-scoping", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setSubmitError(zh ? "提交失敗，請檢查資料再試。" : "Submission failed. Please check your data and retry.");
        if (json.errors) setErrors(json.errors);
        return;
      }
      setResult({
        leadId: json.leadId, mode: json.mode, waMeLink: json.waMeLink,
        delivered: json.delivered, expectedResponseHours: json.expectedResponseHours,
      });
      try { window.localStorage.removeItem(STORAGE_KEY); } catch {}
    } catch {
      setSubmitError(zh ? "網絡錯誤，請再試。" : "Network error. Please retry.");
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div className="ixp-card mx-auto max-w-2xl p-6 md:p-8">
        <CheckCircle2 className="mx-auto h-14 w-14 text-brand-primary" aria-hidden />
        <h2 className="mt-4 text-center text-2xl font-bold text-[color:var(--heading-foreground)]">
          {zh ? "已收到你嘅查詢" : "We've received your enquiry"}
        </h2>
        <p className="mt-2 text-center text-sm leading-6 text-[color:var(--text-secondary)]">
          {zh
            ? `Lead ID：${result.leadId.slice(0, 8)}。我哋預計喺 ${result.expectedResponseHours} 小時內聯絡你。`
            : `Lead ID: ${result.leadId.slice(0, 8)}. We expect to contact you within ${result.expectedResponseHours} hours.`}
        </p>
        {result.mode === "WHATSAPP_LINK" && result.waMeLink ? (
          <div className="mt-6 rounded-lg border border-[color:var(--border-light)] bg-[color:var(--canvas)] p-4">
            <p className="text-sm font-semibold text-[color:var(--heading-foreground)]">
              {zh ? "你想即刻通知我哋？" : "Want to notify us right now?"}
            </p>
            <p className="mt-1 text-xs leading-5 text-[color:var(--text-secondary)]">
              {zh
                ? "按下麵個連結會打開 WhatsApp 並預填好訊息。請你自行按「送出」——瀏覽器唔可以代你發送。"
                : "The link opens WhatsApp with a pre-filled message. You must press Send yourself — a browser cannot send WhatsApp on your behalf."}
            </p>
            <a href={result.waMeLink} target="_blank" rel="noopener noreferrer"
              className="mt-3 inline-flex min-h-[44px] items-center justify-center gap-2 rounded-[var(--btn-radius)] bg-[#25D366] px-5 py-2.5 text-sm font-bold text-white">
              <Send className="h-4 w-4" aria-hidden />
              {zh ? "開啟 WhatsApp 並送出" : "Open WhatsApp & send"}
              <ExternalLink className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        ) : (
          <p className="mt-4 text-center text-xs text-[color:var(--text-tertiary)]">
            {zh ? "通知已自動發送畀 InnovateXP。" : "Notification sent automatically to InnovateXP."}
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="ixp-card mx-auto max-w-2xl p-6 md:p-8" noValidate>
      <div className="mb-6">
        <div className="flex items-center justify-between text-xs text-[color:var(--text-secondary)]">
          <span>{zh ? `步驟 ${stage} / 6` : `Step ${stage} / 6`}</span>
          <span>{zh ? `預計約 ${ESTIMATED_MINUTES} 分鐘` : `~${ESTIMATED_MINUTES} min`}</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-[color:var(--border-light)]">
          <div className="h-full bg-brand-primary transition-all" style={{ width: `${(stage / 6) * 100}%` }} />
        </div>
      </div>

      <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden
        value={data.website} onChange={(e) => set("website", e.target.value)}
        className="absolute -left-[9999px] h-0 w-0 opacity-0" />

      {stage === 1 && <Stage1 data={data} errors={errors} set={set} zh={zh} />}
      {stage === 2 && <Stage2 data={data} errors={errors} set={set} zh={zh} />}
      {stage === 3 && <Stage3 data={data} errors={errors} set={set} toggleArr={toggleArr} zh={zh} />}
      {stage === 4 && <Stage4 data={data} toggleArr={toggleArr} zh={zh} />}
      {stage === 5 && <Stage5 data={data} errors={errors} set={set} zh={zh} />}
      {stage === 6 && <Stage6 data={data} errors={errors} set={set} zh={zh} />}

      {submitError ? (
        <p className="mt-4 flex items-center gap-2 text-sm font-medium text-red-600" role="alert">
          <AlertCircle className="h-4 w-4" aria-hidden />{submitError}
        </p>
      ) : null}

      <div className="mt-8 flex items-center justify-between gap-3">
        <button type="button" onClick={back} disabled={stage === 1}
          className="inline-flex min-h-[44px] items-center gap-1 rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-4 py-2 text-sm font-semibold text-[color:var(--heading-foreground)] disabled:opacity-40">
          <ChevronLeft className="h-4 w-4" aria-hidden />{zh ? "上一步" : "Back"}
        </button>
        {stage < 6 ? (
          <button type="button" onClick={next}
            className="inline-flex min-h-[44px] items-center gap-1 btn-brand px-5 py-2 text-sm font-bold">
            {zh ? "下一步" : "Next"}<ChevronRight className="h-4 w-4" aria-hidden />
          </button>
        ) : (
          <button type="submit" disabled={submitting}
            className="inline-flex min-h-[44px] items-center gap-2 btn-brand px-6 py-2 text-sm font-bold disabled:opacity-50">
            {submitting ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : <Send className="h-4 w-4" aria-hidden />}
            {zh ? "提交查詢" : "Submit enquiry"}
          </button>
        )}
      </div>
      <p className="mt-3 text-xs text-[color:var(--text-tertiary)]">
        {zh ? "提交後會顯示確認同預計回覆時間，唔會即時顯示為最終報價。"
            : "You'll see a confirmation and expected response time — not an instant final quote."}
      </p>
    </form>
  );
}

function FieldErr({ msg }: { msg?: string }) {
  if (!msg) return null;
  return <p className="mt-1 text-xs text-red-600">{"此欄必須填寫"}</p>;
}
function Label({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="mb-1 block text-sm font-semibold text-[color:var(--heading-foreground)]">
      {children}{required ? <span className="text-red-500"> *</span> : null}
    </label>
  );
}
const inputCls = "w-full rounded-lg border border-[color:var(--border-medium)] bg-[color:var(--card-bg)] px-3 py-2.5 text-sm text-[color:var(--heading-foreground)] outline-none focus:border-brand-primary";
function Text({ k, data, set, label, placeholder, type = "text", required, errorKey }: {
  k: keyof EventXpScopingPayload; data: EventXpScopingPayload; set: (k: any, v: any) => void;
  label: string; placeholder?: string; type?: string; required?: boolean; errorKey?: string;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <input type={type} className={inputCls} value={data[k] as string} placeholder={placeholder}
        onChange={(e) => set(k, e.target.value)} />
      <FieldErr msg={errorKey ? "required" : undefined} />
    </div>
  );
}
function Select({ k, data, set, label, options, required, errorKey, zh }: {
  k: keyof EventXpScopingPayload; data: EventXpScopingPayload; set: (k: any, v: any) => void;
  label: string; options: { v: string; l: string }[]; required?: boolean; errorKey?: string; zh: boolean;
}) {
  return (
    <div>
      <Label required={required}>{label}</Label>
      <select className={inputCls} value={data[k] as string} onChange={(e) => set(k, e.target.value as any)}>
        <option value="">{zh ? "請選擇" : "Please select"}</option>
        {options.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
      </select>
      <FieldErr msg={errorKey ? "required" : undefined} />
    </div>
  );
}
function CheckChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button type="button" onClick={onClick}
      className={`min-h-[40px] rounded-full border px-3 py-1.5 text-sm font-semibold transition ${
        active ? "border-brand-primary bg-brand-primary/10 text-brand-primary"
        : "border-[color:var(--border-light)] text-[color:var(--text-secondary)]"
      }`}>{children}</button>
  );
}

function Stage1({ data, errors, set, zh }: { data: EventXpScopingPayload; errors: Record<string, string>; set: any; zh: boolean }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{zh ? "1. 機構資料" : "1. Organisation"}</h2>
      <Text k="organisationName" data={data} set={set} required errorKey={errors.organisationName} label={zh ? "機構名稱" : "Organisation name"} />
      <div className="grid gap-4 sm:grid-cols-2">
        <Text k="contactName" data={data} set={set} required errorKey={errors.contactName} label={zh ? "聯絡人" : "Contact name"} />
        <Text k="role" data={data} set={set} label={zh ? "職位" : "Role"} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Text k="email" data={data} set={set} type="email" required errorKey={errors.email} label={zh ? "電郵" : "Email"} />
        <Text k="phone" data={data} set={set} type="tel" required errorKey={errors.phone} label={zh ? "電話" : "Phone"} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select k="orgType" data={data} set={set} required errorKey={errors.orgType} zh={zh} label={zh ? "機構類型" : "Organisation type"}
          options={(zh
            ? [["chamber","商會"],["association","協會"],["training","培訓機構"],["community","社區組織"],["corporate","企業"],["bni","BNI"],["other","其他"]]
            : [["chamber","Chamber"],["association","Association"],["training","Training provider"],["community","Community org"],["corporate","Corporate"],["bni","BNI"],["other","Other"]]
          ).map(([v, l]) => ({ v, l }))} />
        <Select k="memberCount" data={data} set={set} required errorKey={errors.memberCount} zh={zh} label={zh ? "會員／參加者規模" : "Member / participant count"}
          options={(zh
            ? [["under100","100 以下"],["100to500","100–500"],["500to2000","500–2000"],["over2000","2000 以上"]]
            : [["under100","Under 100"],["100to500","100–500"],["500to2000","500–2000"],["over2000","Over 2000"]]
          ).map(([v, l]) => ({ v, l }))} />
      </div>
    </div>
  );
}

function Stage2({ data, errors, set, zh }: { data: EventXpScopingPayload; errors: Record<string, string>; set: any; zh: boolean }) {
  const att = (zh
    ? [["under50","50 以下"],["50to200","50–200"],["200to500","200–500"],["over500","500 以上"]]
    : [["under50","Under 50"],["50to200","50–200"],["200to500","200–500"],["over500","Over 500"]]
  ).map(([v, l]) => ({ v, l }));
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{zh ? "2. 活動量" : "2. Event volume"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select k="eventsPerYear" data={data} set={set} required errorKey={errors.eventsPerYear} zh={zh} label={zh ? "每年活動數量" : "Events per year"}
          options={(zh
            ? [["under12","12 以下"],["12to36","12–36"],["36to100","36–100"],["over100","100 以上"]]
            : [["under12","Under 12"],["12to36","12–36"],["36to100","36–100"],["over100","Over 100"]]
          ).map(([v, l]) => ({ v, l }))} />
        <Select k="locations" data={data} set={set} required errorKey={errors.locations} zh={zh} label={zh ? "營運地點數目" : "Operating locations"}
          options={(zh
            ? [["1","1 個"],["2to5","2–5 個"],["over5","5 個以上"]]
            : [["1","1"],["2to5","2–5"],["over5","Over 5"]]
          ).map(([v, l]) => ({ v, l }))} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select k="typicalAttendance" data={data} set={set} required errorKey={errors.typicalAttendance} zh={zh} label={zh ? "每場一般出席人數" : "Typical attendance"} options={att} />
        <Select k="maxAttendance" data={data} set={set} zh={zh} label={zh ? "每場最高出席人數" : "Max attendance"} options={att} />
      </div>
      <Select k="recurring" data={data} set={set} required errorKey={errors.recurring} zh={zh} label={zh ? "活動性質" : "Event nature"}
        options={(zh
          ? [["recurring","定期重複"],["oneoff","一次性"],["mixed","混合"]]
          : [["recurring","Recurring"],["oneoff","One-off"],["mixed","Mixed"]]
        ).map(([v, l]) => ({ v, l }))} />
    </div>
  );
}

function Stage3({ data, errors, set, toggleArr, zh }: { data: EventXpScopingPayload; errors: Record<string, string>; set: any; toggleArr: any; zh: boolean }) {
  const tools = (zh
    ? [["excel","Excel"],["googleform","Google Form"],["whatsapp","WhatsApp"],["crm","CRM"],["membership","會員系統"],["none","冇用"]]
    : [["excel","Excel"],["googleform","Google Form"],["whatsapp","WhatsApp"],["crm","CRM"],["membership","Membership system"],["none","None"]]
  ) as [string, string][];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{zh ? "3. 現時流程" : "3. Current process"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select k="registrationMethod" data={data} set={set} required errorKey={errors.registrationMethod} zh={zh} label={zh ? "現時點樣報名" : "Registration method"}
          options={(zh
            ? [["paper","紙表"],["googleform","Google Form"],["excel","Excel"],["whatsapp","WhatsApp"],["crm","CRM"],["other","其他"]]
            : [["paper","Paper"],["googleform","Google Form"],["excel","Excel"],["whatsapp","WhatsApp"],["crm","CRM"],["other","Other"]]
          ).map(([v, l]) => ({ v, l }))} />
        <Select k="checkInMethod" data={data} set={set} required errorKey={errors.checkInMethod} zh={zh} label={zh ? "現場 check-in 方式" : "Check-in method"}
          options={(zh
            ? [["manual","人手搵名"],["qr","QR"],["kiosk","Kiosk"],["none","冇正式 check-in"]]
            : [["manual","Manual"],["qr","QR"],["kiosk","Kiosk"],["none","No formal check-in"]]
          ).map(([v, l]) => ({ v, l }))} />
      </div>
      <div>
        <Label>{zh ? "而家用緊咩工具？" : "Current tools in use"}</Label>
        <div className="flex flex-wrap gap-2">
          {tools.map(([v, l]) => (
            <CheckChip key={v} active={data.currentTools.includes(v as any)} onClick={() => toggleArr("currentTools", v)}>{l}</CheckChip>
          ))}
        </div>
      </div>
      <div>
        <Label>{zh ? "最花時間／最容易出錯係邊一步？" : "Which step takes the most time / is most error-prone?"}</Label>
        <textarea className={inputCls} rows={3} value={data.biggestProblem}
          onChange={(e) => set("biggestProblem", e.target.value)}
          placeholder={zh ? "例如：活動後合併 Excel 出報告" : "e.g. merging Excel files into a report after the event"} />
      </div>
      <Select k="adminHoursPerEvent" data={data} set={set} required errorKey={errors.adminHoursPerEvent} zh={zh} label={zh ? "每場活動行政時間" : "Admin hours per event"}
        options={(zh
          ? [["under2","2 小時以下"],["2to5","2–5 小時"],["5to10","5–10 小時"],["over10","10 小時以上"]]
          : [["under2","Under 2h"],["2to5","2–5h"],["5to10","5–10h"],["over10","Over 10h"]]
        ).map(([v, l]) => ({ v, l }))} />
    </div>
  );
}

function Stage4({ data, toggleArr, zh }: { data: EventXpScopingPayload; toggleArr: any; zh: boolean }) {
  const caps = (zh
    ? [["memberMgmt","會員管理"],["guestMgmt","嘉賓管理"],["kioskQrCheckIn","QR / Kiosk check-in"],["attendanceReport","出席報告"],["rosterImport","Roster 匯入"],["whatsappComms","WhatsApp 通知"],["membershipScoring","會員狀態／評分"],["aiMatchingSeating","AI 配對／座位"],["customBranding","自訂品牌"],["integrations","現有系統整合"],["onsiteSupport","現場／活動日支援"]]
    : [["memberMgmt","Member management"],["guestMgmt","Guest management"],["kioskQrCheckIn","QR / Kiosk check-in"],["attendanceReport","Attendance report"],["rosterImport","Roster import"],["whatsappComms","WhatsApp comms"],["membershipScoring","Membership status / scoring"],["aiMatchingSeating","AI matching / seating"],["customBranding","Custom branding"],["integrations","Integrations"],["onsiteSupport","On-site / event-day support"]]
  ) as [string, string][];
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{zh ? "4. 需要嘅功能" : "4. Required capabilities"}</h2>
      <p className="text-sm text-[color:var(--text-secondary)]">{zh ? "剔選你需要嘅功能（可多選）" : "Select the capabilities you need (multi-select)"}</p>
      <div className="flex flex-wrap gap-2">
        {caps.map(([v, l]) => (
          <CheckChip key={v} active={data.capabilities.includes(v as any)} onClick={() => toggleArr("capabilities", v)}>{l}</CheckChip>
        ))}
      </div>
    </div>
  );
}

function Stage5({ data, errors, set, zh }: { data: EventXpScopingPayload; errors: Record<string, string>; set: any; zh: boolean }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{zh ? "5. 商業及技術要求" : "5. Commercial & technical"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select k="launchDate" data={data} set={set} required errorKey={errors.launchDate} zh={zh} label={zh ? "預計上線" : "Preferred launch"}
          options={(zh
            ? [["asap","盡快"],["1to3m","1–3 個月"],["3to6m","3–6 個月"],["over6m","6 個月以上"],["exploring","只係了解中"]]
            : [["asap","ASAP"],["1to3m","1–3 months"],["3to6m","3–6 months"],["over6m","Over 6 months"],["exploring","Just exploring"]]
          ).map(([v, l]) => ({ v, l }))} />
        <Select k="budgetRange" data={data} set={set} required errorKey={errors.budgetRange} zh={zh} label={zh ? "預算範圍" : "Budget range"}
          options={(zh
            ? [["under20k","2 萬以下"],["20kto50k","2–5 萬"],["50kto150k","5–15 萬"],["over150k","15 萬以上"],["open","開放"]]
            : [["under20k","Under HK$20k"],["20kto50k","HK$20k–50k"],["50kto150k","HK$50k–150k"],["over150k","Over HK$150k"],["open","Open"]]
          ).map(([v, l]) => ({ v, l }))} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Select k="commercialPreference" data={data} set={set} required errorKey={errors.commercialPreference} zh={zh} label={zh ? "服務模式" : "Commercial preference"}
          options={(zh
            ? [["managed","Managed service"],["licence","Licence"],["sourcecode","源碼買斷"],["undecided","未定"]]
            : [["managed","Managed service"],["licence","Licence"],["sourcecode","Source-code ownership"],["undecided","Undecided"]]
          ).map(([v, l]) => ({ v, l }))} />
        <Select k="privacyHosting" data={data} set={set} required errorKey={errors.privacyHosting} zh={zh} label={zh ? "Privacy / Hosting" : "Privacy / Hosting"}
          options={(zh
            ? [["cloud","雲端"],["private","私有雲"],["onprem","On-prem"],["undecided","未定"]]
            : [["cloud","Cloud"],["private","Private cloud"],["onprem","On-prem"],["undecided","Undecided"]]
          ).map(([v, l]) => ({ v, l }))} />
      </div>
      <Select k="supportHours" data={data} set={set} required errorKey={errors.supportHours} zh={zh} label={zh ? "所需支援時間" : "Required support hours"}
        options={(zh
          ? [["office","辦公時間"],["extended","延長時間"],["eventday","活動日現場"],["none","唔需要"]]
          : [["office","Office hours"],["extended","Extended hours"],["eventday","Event-day on-site"],["none","Not needed"]]
        ).map(([v, l]) => ({ v, l }))} />
      <Text k="decisionMaker" data={data} set={set} label={zh ? "批准人／決策流程" : "Decision maker / approval process"} placeholder={zh ? "例如：秘書 + 主席批准" : "e.g. Secretary + Chairperson approval"} />
    </div>
  );
}

function Stage6({ data, errors, set, zh }: { data: EventXpScopingPayload; errors: Record<string, string>; set: any; zh: boolean }) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-[color:var(--heading-foreground)]">{zh ? "6. 同意" : "6. Consent"}</h2>
      <label className="flex items-start gap-3 rounded-lg border border-[color:var(--border-light)] p-3">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[color:var(--brand-primary)]"
          checked={data.privacyAccepted} onChange={(e) => set("privacyAccepted", e.target.checked)} />
        <span className="text-sm leading-6 text-[color:var(--text-secondary)]">
          {zh ? "我已閱讀並同意私隱政策，授權 InnovateXP 處理我提交嘅資料以回覆此查詢。" : "I have read and agree to the privacy policy, and authorise InnovateXP to process my submission to respond to this enquiry."}
          <span className="text-red-500"> *</span>
        </span>
      </label>
      {errors.privacyAccepted ? <FieldErr msg="required" /> : null}
      <label className="flex items-start gap-3 rounded-lg border border-[color:var(--border-light)] p-3">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[color:var(--brand-primary)]"
          checked={data.contactPermission} onChange={(e) => set("contactPermission", e.target.checked)} />
        <span className="text-sm leading-6 text-[color:var(--text-secondary)]">
          {zh ? "我同意 InnovateXP 就此查詢透過電郵、電話或 WhatsApp 聯絡我。" : "I agree to be contacted about this enquiry by email, phone or WhatsApp."}
          <span className="text-red-500"> *</span>
        </span>
      </label>
      {errors.contactPermission ? <FieldErr msg="required" /> : null}
      <label className="flex items-start gap-3 rounded-lg border border-[color:var(--border-light)] p-3">
        <input type="checkbox" className="mt-1 h-4 w-4 accent-[color:var(--brand-primary)]"
          checked={data.marketingConsent} onChange={(e) => set("marketingConsent", e.target.checked)} />
        <span className="text-sm leading-6 text-[color:var(--text-secondary)]">
          {zh ? "（可選）我同意接收 InnovateXP 嘅市場推廣資訊，可隨時取消。" : "(Optional) I agree to receive marketing from InnovateXP; I can opt out anytime."}
        </span>
      </label>
      <p className="text-xs text-[color:var(--text-tertiary)]">Consent version: {CONSENT_VERSION}</p>
    </div>
  );
}
