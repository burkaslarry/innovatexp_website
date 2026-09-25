import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, ClipboardList, Users, QrCode, BarChart3, Upload, Sparkles, MessageSquare, Palette, Plug2, ShieldCheck } from "lucide-react";
import { FaqAccordion } from "@/components/FaqAccordion";
import { BookingCtaButton } from "@/components/BookingCtaButton";
import type { AppLocale } from "@/lib/i18n-routing";
import { PRICING, formatHkd } from "@/content/pricing";

type Faq = { question: string; answer: string };

export function EventXpSections({
  locale,
  zh,
  faqs,
}: {
  locale: AppLocale;
  zh: boolean;
  faqs: Faq[];
}) {
  const bookingHref = `/${locale}/bookme`;
  const scopingHref = `/${locale}/eventxp-scoping`;
  const primaryLabel = zh ? "預約 EventXP 流程診斷" : "Book an EventXP workflow diagnosis";
  const secondaryLabel = zh ? "索取初步方案及報價" : "Get a scoped proposal & quote";
  const trialPrice = formatHkd(PRICING.quickCash.eventXpTrial, locale);
  const monthlyFrom = formatHkd(PRICING.tools.eventXp.maintenanceStarterMonthly, locale);

  return (
    <>
      {/* HERO */}
      <section className="container mx-auto max-w-5xl px-4 pb-10 pt-16 md:pt-24">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-primary">
          {zh ? "EventXP · 活動暨會員營運方案" : "EventXP · Event & Membership Operations"}
        </p>
        <h1 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight tracking-[-0.02em] text-[color:var(--heading-foreground)]">
          {zh
            ? "將活動登記、現場 Check-in、會員與嘉賓跟進，集中到一個流程"
            : "Bring registration, on-site check-in, and member & guest follow-up into one workflow"}
        </h1>
        <p className="mt-5 max-w-3xl text-lg leading-8 text-[color:var(--text-secondary)]">
          {zh
            ? "EventXP 按你嘅活動及會員流程配置，減少紙張、Excel、WhatsApp 同重複輸入，令團隊由活動開始到報告完成都更順暢。"
            : "EventXP is configured around your event and membership workflow — reducing paper, Excel, WhatsApp and duplicate input, so your team runs smoother from event start to report."}
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <BookingCtaButton href={bookingHref} placement="hero">
            {primaryLabel}
          </BookingCtaButton>
          <Link
            href={scopingHref}
            className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-6 py-3 text-base font-semibold text-[color:var(--heading-foreground)] transition hover:border-brand-primary hover:text-brand-primary"
          >
            {secondaryLabel}
          </Link>
        </div>
        <p className="mt-3 text-xs text-[color:var(--text-tertiary)]">
          {zh
            ? `單場流程試行 ${trialPrice}；持續方案由 ${monthlyFrom}／月起。較大範圍聽診後報價，唔使買我會直講。`
            : `One-event workflow trial ${trialPrice}; ongoing plans from ${monthlyFrom}/month. Larger scopes are quoted after diagnosis — if you don't need it, we'll say so.`}
        </p>
      </section>

      {/* 2. PAIN POINTS */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "你係咪都遇到呢啲情況？" : "Do any of these sound familiar?"}
        </h2>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(zh
            ? [
                { t: "報名靠紙表", d: "報名表散落 WhatsApp 同紙張，事後先入 Excel，漏單同重複輸入好常見。" },
                { t: "名單版本混亂", d: "Excel 多人改，最終版本唔清楚，現場用錯名單。" },
                { t: "WhatsApp 確認漏回", d: "嘉賓確認靠人手逐個覆，冇追蹤邊個未回。" },
                { t: "現場排隊", d: "簽到靠人手搵名，入場慢，遲到記錄唔齊。" },
                { t: "報告靠人手拼", d: "活動後要逐份 Excel 合併先出到出席報告。" },
                { t: "會員出席無累積", d: "每場出席紀錄散落，睇唔到會員參與趨勢。" },
              ]
            : [
                { t: "Paper-based registration", d: "Forms scattered across WhatsApp and paper, entered into Excel afterwards — lost entries and duplicate input." },
                { t: "Roster version chaos", d: "Multiple people edit the Excel; the final version is unclear and the wrong list gets used." },
                { t: "WhatsApp confirmations slip", d: "Guest confirmations are replied to one by one, with no tracking of who hasn't responded." },
                { t: "Door queues", d: "Check-in means finding names by hand; entry is slow and latecomers aren't recorded cleanly." },
                { t: "Reports assembled by hand", d: "After each event, several Excel files are merged manually to produce a report." },
                { t: "No membership history", d: "Attendance is scattered per event, so member participation trends aren't visible." },
              ]
          ).map((p) => (
            <div key={p.t} className="ixp-card p-4">
              <p className="flex items-center gap-2 text-sm font-bold text-[color:var(--heading-foreground)]">
                <XCircle className="h-4 w-4 text-red-500" aria-hidden />
                {p.t}
              </p>
              <p className="mt-2 text-sm leading-6 text-[color:var(--text-secondary)]">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. BEFORE / AFTER */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "由散落紙張、Excel、WhatsApp，到一條流程" : "From paper, Excel and WhatsApp patchwork to one workflow"}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="ixp-card p-5">
            <p className="text-sm font-bold uppercase tracking-wider text-red-500">{zh ? "而家" : "Before"}</p>
            <ul className="mt-3 space-y-2">
              {(zh
                ? ["報名表喺 WhatsApp 同紙張", "名單喺 Excel 多人改", "簽到靠人手搵名", "出席報告逐份拼", "活動後跟進靠記性"]
                : ["Registration on WhatsApp and paper", "Roster in Excel, edited by many", "Check-in by finding names manually", "Attendance report assembled by hand", "Follow-up relies on memory"]
              ).map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-[color:var(--text-secondary)]">
                  <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="ixp-card p-5">
            <p className="text-sm font-bold uppercase tracking-wider text-brand-primary">{zh ? "用 EventXP 之後" : "With EventXP"}</p>
            <ul className="mt-3 space-y-2">
              {(zh
                ? ["報名集中喺一個流程", "名單單一來源、即時更新", "QR / kiosk check-in 即時記錄", "出席報告一鍵匯出", "跟進名單按出席自動排序"]
                : ["Registration in one workflow", "Single source of truth, live updated", "QR / kiosk check-in records instantly", "Attendance report exported in one click", "Follow-up list auto-prioritised by attendance"]
              ).map((x) => (
                <li key={x} className="flex items-start gap-2 text-sm text-[color:var(--text-secondary)]">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                  {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 4. CORE CAPABILITIES */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "核心能力" : "Core capabilities"}
        </h2>
        <p className="mt-2 max-w-3xl text-base leading-7 text-[color:var(--text-secondary)]">
          {zh
            ? "由報名到報告，每一步都對應你現有流程嘅一環。"
            : "Each step maps to a part of your existing workflow, from registration to reporting."}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(zh
            ? [
                { icon: ClipboardList, t: "活動設定", d: "建立活動、出席者欄位同 check-in 規則。" },
                { icon: Users, t: "會員、嘉賓及觀察員記錄", d: "結構化出席者紀錄，支援會員、嘉賓同觀察員分類。" },
                { icon: QrCode, t: "QR 及 kiosk check-in", d: "QR 掃描或自助 kiosk，即時記錄出席。" },
                { icon: BarChart3, t: "即時出席報告", d: "活動進行中即時睇到出席率，活動後匯出報告。" },
                { icon: Upload, t: "Roster 匯入匯出", d: "import 現有名單、export 出席結果，唔使由零開始。" },
              ]
            : [
                { icon: ClipboardList, t: "Event setup", d: "Create events, attendee fields and check-in rules." },
                { icon: Users, t: "Member, guest & observer records", d: "Structured attendee records with member, guest and observer types." },
                { icon: QrCode, t: "QR & kiosk check-in", d: "QR scan or self-service kiosk, attendance recorded instantly." },
                { icon: BarChart3, t: "Live attendance reporting", d: "See turnout during the event; export reports afterwards." },
                { icon: Upload, t: "Roster import & export", d: "Import existing rosters, export attendance results — no start-from-zero." },
              ]
          ).map((c) => (
            <div key={c.t} className="ixp-card p-4">
              <c.icon className="h-6 w-6 text-brand-primary" aria-hidden />
              <p className="mt-3 text-sm font-bold text-[color:var(--heading-foreground)]">{c.t}</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. OPTIONAL MODULES */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "可選模組" : "Optional modules"}
        </h2>
        <p className="mt-2 max-w-3xl text-base leading-7 text-[color:var(--text-secondary)]">
          {zh
            ? "按活動需要啟用，唔係綑綁必須。"
            : "Enabled per event need — never bundled as required."}
        </p>
        <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(zh
            ? [
                { icon: Sparkles, t: "會員狀態 / 評分", d: "按出席累積會員狀態或評分，輔助續會決定。" },
                { icon: Sparkles, t: "AI 配對及座位安排", d: "按出席者背景建議配對或座位，適用於 networking 場合。" },
                { icon: MessageSquare, t: "WhatsApp 通知", d: "報名確認、提醒同跟進訊息整合。" },
                { icon: Palette, t: "自訂品牌", d: "報名頁同 check-in 介面套用機構品牌。" },
                { icon: Plug2, t: "現有系統整合", d: "按 API 或匯出格式銜接現有 CRM 或會員系統。" },
              ]
            : [
                { icon: Sparkles, t: "Membership status / scoring", d: "Accumulate status or scores from attendance to support renewal decisions." },
                { icon: Sparkles, t: "AI matching & seating", d: "Suggest matches or seating by attendee background for networking events." },
                { icon: MessageSquare, t: "WhatsApp notifications", d: "Registration confirmation, reminders and follow-up messaging." },
                { icon: Palette, t: "Custom branding", d: "Apply your branding to registration and check-in surfaces." },
                { icon: Plug2, t: "Existing system integration", d: "Connect to your CRM or membership system via API or export format." },
              ]
          ).map((m) => (
            <div key={m.t} className="ixp-card p-4">
              <m.icon className="h-6 w-6 text-brand-primary" aria-hidden />
              <p className="mt-3 text-sm font-bold text-[color:var(--heading-foreground)]">{m.t}</p>
              <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">{m.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. SUITABLE ORGANISATION TYPES */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "適合邊類機構" : "Suitable organisation types"}
        </h2>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {(zh
            ? ["商會及專業協會", "培訓機構及教育團隊", "社區及非牟利組織", "企業內部活動團隊", "BNI（作為 implementation example）"]
            : ["Chambers & professional associations", "Training providers & education teams", "Community & non-profit organisations", "Corporate internal event teams", "BNI (as an implementation example)"]
          ).map((o) => (
            <li key={o} className="flex items-center gap-2 rounded-lg border border-[color:var(--border-light)] bg-[color:var(--card-bg)] px-4 py-3 text-sm font-medium text-[color:var(--heading-foreground)]">
              <CheckCircle2 className="h-4 w-4 text-brand-primary" aria-hidden />
              {o}
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm leading-6 text-[color:var(--text-secondary)]">
          {zh
            ? "BNI 嘅流程只係其中一個 implementation example，唔係產品嘅通用設定。"
            : "BNI is one optional implementation example, not the product's default configuration."}
        </p>
      </section>

      {/* 7. HOW IMPLEMENTATION WORKS */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "實施點進行" : "How implementation works"}
        </h2>
        <p className="mt-2 max-w-3xl text-base leading-7 text-[color:var(--text-secondary)]">
          {zh
            ? "EventXP 係按你機構嘅流程配置，唔係開箱即用嘅固定產品。"
            : "EventXP is configured around your organisation's workflow — not an out-of-the-box fixed product."}
        </p>
        <ol className="mt-6 grid gap-3 md:grid-cols-2">
          {(zh
            ? [
                { t: "流程診斷", d: "先睇你現時報名、check-in、報告同跟進點做，搵出最漏同最慢嘅位。" },
                { t: "配置", d: "按你流程配置 EventXP，由報名或 check-in 其中一環開始。" },
                { t: "試運一場", d: "用一場真實活動試運，確認現場流程同報告符合需要。" },
                { t: "擴展", d: "逐步加入報告、跟進同 optional module，按需要擴展。" },
              ]
            : [
                { t: "Workflow diagnosis", d: "Review how registration, check-in, reporting and follow-up work today; find the leakiest, slowest points." },
                { t: "Configuration", d: "Configure EventXP around your workflow, starting from registration or check-in." },
                { t: "Trial run", d: "Run one real event to confirm on-site flow and reporting meet your needs." },
                { t: "Expand", d: "Add reporting, follow-up and optional modules as needed." },
              ]
          ).map((s, i) => (
            <li key={s.t} className="ixp-card flex gap-3 p-4">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-primary/10 text-sm font-bold text-brand-primary">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-bold text-[color:var(--heading-foreground)]">{s.t}</p>
                <p className="mt-1 text-sm leading-6 text-[color:var(--text-secondary)]">{s.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* 8. PRIVACY & DATA-HANDLING */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "資料及私隱處理" : "Privacy & data handling"}
        </h2>
        <div className="ixp-card mt-6 p-5">
          <ShieldCheck className="h-6 w-6 text-brand-primary" aria-hidden />
          <ul className="mt-3 space-y-2 text-sm leading-6 text-[color:var(--text-secondary)]">
            {(zh
              ? [
                "資料儲存、保留期限同存取權限按你機構嘅 privacy 要求配置。",
                "Hosting 方式（雲端或私有）喺實施前講清楚。",
                "活動後保留期限同資料銷毀安排會寫入實施方案。",
                "我哋唔會代你發未經授權嘅 WhatsApp 或電郵訊息。",
                "唔會喺網站公開未經證實嘅認證或合規聲明。",
              ]
              : [
                "Storage, retention and access control are configured to your organisation's privacy requirements.",
                "Hosting (cloud or private) is agreed before implementation.",
                "Post-event retention and data deletion are written into the implementation plan.",
                "We do not send WhatsApp or email messages on your behalf without authorisation.",
                "No unverified compliance or certification claims are published on this site.",
              ]
            ).map((x) => (
              <li key={x} className="flex items-start gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-brand-primary" aria-hidden />
                {x}
              </li>
            ))}
          </ul>
          <Link
            href={`/${locale}/privacy-policy`}
            className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-primary hover:underline"
          >
            {zh ? "私隱政策" : "Privacy policy"}
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Link>
        </div>
      </section>

      {/* 8b. AEO direct answers (GEO / featured snippet) */}
      <section className="container mx-auto max-w-5xl px-4 py-12" id="eventxp-answers">
        <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
          {zh ? "常見問題 — 直接答案" : "Common questions — direct answers"}
        </h2>
        <div className="mt-6 space-y-4">
          {(zh
            ? [
                {
                  q: "活動 Check-in 系統有咩用？",
                  a: "將現場簽到同出席記錄集中處理，減少紙表同 Excel 人手對名。EventXP 支援 QR 同 kiosk check-in，活動進行中可即時睇出席率，活動後可匯出報告同排序跟進名單。",
                },
                {
                  q: "QR Check-in 同 kiosk Check-in 有咩分別？",
                  a: "QR check-in 係工作人員掃描參加者 QR code；kiosk check-in 係自助裝置畀參加者自己掃描或輸入。EventXP 兩者都支援，按場地同人手安排選擇。",
                },
                {
                  q: "點樣由 Excel 轉用活動管理系統？",
                  a: "先做流程診斷搵出最慢同最易出錯嘅位，再由報名或 check-in 一環開始配置，import 現有 roster，試運一場後擴展到報告同跟進。",
                },
              ]
            : [
                {
                  q: "What is an event check-in system for?",
                  a: "It centralises on-site sign-in and attendance records, reducing paper and Excel name-matching. EventXP supports QR and kiosk check-in, live turnout during the event, and exportable reports plus follow-up lists afterwards.",
                },
                {
                  q: "What's the difference between QR and kiosk check-in?",
                  a: "QR check-in has staff scan an attendee's code; kiosk check-in uses a self-service device. EventXP supports both — choose by venue and staffing.",
                },
                {
                  q: "How do we move from Excel to an event operations system?",
                  a: "Start with a workflow diagnosis, configure from registration or check-in, import your existing roster, run one real event, then expand to reporting and follow-up.",
                },
              ]
          ).map((item) => (
            <div key={item.q} className="ixp-card p-4">
              <h3 className="text-sm font-bold text-[color:var(--heading-foreground)]">{item.q}</h3>
              <p className="mt-2 text-sm leading-7 text-[color:var(--text-secondary)]" data-geo-answer>
                {item.a}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-[color:var(--text-tertiary)]">
          {zh
            ? "更多答案見下方 FAQ，或填寫方案診斷表格。"
            : "See the FAQ below for more, or complete the solution scoping form."}
        </p>
      </section>

      {/* 9. FAQ */}
      <section className="container mx-auto max-w-5xl px-4 py-12">
        <FaqAccordion
          id="eventxp-faq"
          title={zh ? "常見問題" : "FAQ"}
          faqs={faqs}
          defaultOpenIndex={0}
        />
      </section>

      {/* INTERNAL LINKS */}
      <section className="container mx-auto max-w-5xl px-4 py-8">
        <div className="ixp-card flex flex-wrap gap-3 p-5">
          <p className="w-full text-sm font-bold text-[color:var(--heading-foreground)]">
            {zh ? "相關頁面" : "Related pages"}
          </p>
          {[
            { href: `/${locale}/sme-ai-workflow`, label: zh ? "中小企 AI 工作流" : "SME AI Workflow" },
            { href: `/${locale}/ai-consulting`, label: zh ? "AI 顧問" : "AI Consulting" },
            { href: `/${locale}/bookme`, label: zh ? "預約診斷" : "Book a diagnosis" },
            { href: `/${locale}/case-studies`, label: zh ? "交付能力" : "Delivery capability" },
            { href: `/${locale}/private-ai-solutions`, label: zh ? "Private AI 方案" : "Private AI" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-[color:var(--border-medium)] px-4 py-2 text-sm font-semibold text-[color:var(--heading-foreground)] transition hover:border-brand-primary hover:text-brand-primary"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="container mx-auto max-w-5xl px-4 py-16">
        <div className="ixp-card p-6 text-center md:p-10">
          <h2 className="text-2xl font-bold text-[color:var(--heading-foreground)] md:text-3xl">
            {zh ? "準備將活動流程集中處理？" : "Ready to consolidate your event workflow?"}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-base leading-7 text-[color:var(--text-secondary)]">
            {zh
              ? "預約一次 EventXP 流程診斷，我會同你過一次現有報名、check-in、報告同跟進流程，再畀你一份配置方案同報價。"
              : "Book an EventXP workflow diagnosis. We'll walk through your current registration, check-in, reporting and follow-up, then give you a configured proposal and quote."}
          </p>
          <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
            <BookingCtaButton href={bookingHref} placement="final_cta">
              {primaryLabel}
            </BookingCtaButton>
            <Link
              href={scopingHref}
              className="inline-flex min-h-[48px] items-center justify-center rounded-[var(--btn-radius)] border border-[color:var(--border-medium)] px-6 py-3 text-base font-semibold text-[color:var(--heading-foreground)] transition hover:border-brand-primary hover:text-brand-primary"
            >
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
