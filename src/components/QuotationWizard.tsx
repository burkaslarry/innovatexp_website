"use client";

import { useMemo, useState, useCallback, useEffect, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { addDays, format, startOfDay } from "date-fns";
import { zhTW, enUS } from "date-fns/locale";
import {
  computeQuote,
  formatQuoteSummary,
  formatDiagnosticAnswersOnly,
  type QuoteAnswers,
  type QuotePath,
  type QuoteComputed,
} from "@/lib/quote-logic";
import { normalizeWhatsappE164 } from "@/lib/normalize-whatsapp";
import { PHONE_DIAL_CUSTOM, PHONE_DIAL_OPTIONS } from "@/lib/phone-dial-codes";
import { buildBookingConfirmationWeb3Fields } from "@/lib/build-booking-web3forms-fields";
import { submitToWeb3FormsContact } from "@/lib/web3forms-submit";
import { useLanguage } from "@/app/LanguageContext";

/*
 * InnovateXP Quotation Wizard — conversion flow
 * ---------------------------------------------------------------------------
 * 1) User completes path questions (or uses ExpertShortcut → same booking path).
 * 2) flowx_booking: pick date + slot from /api/calendar/slots (no Notion book yet).
 * 3) flowx_identity: name, email, WhatsApp (country + local), company.
 * 4) submitFlowX → POST /api/calendar/book (Notion + optional server Web3Forms).
 *    One team email only (InnovateXP Limited): booking confirm includes 留言 = slot summary + QA.
 *    If server did not send email, browser calls submitToWeb3FormsContact (Web3Forms disallows server IP).
 * ---------------------------------------------------------------------------
 */
type StepId =
  | "q0"
  | "eventxp_q1"
  | "eventxp_q2"
  | "eventxp_q3"
  | "eventxp_q4"
  | "eventxp_q5"
  | "smartsales_q1"
  | "smartsales_q2"
  | "smartsales_q3"
  | "smartsales_q4"
  | "smartsales_q5"
  | "consulting_q1"
  | "consulting_q2"
  | "consulting_q3"
  | "consulting_q4"
  | "consulting_q5"
  | "bundle_q1"
  | "bundle_q2"
  | "result"
  | "flowx_identity"
  | "flowx_booking";

type Opt = { id: string; label: string };

interface TimeSlot {
  start: string;
  end: string;
  display: string;
}

/** First bookable day: today (weekdays) or next Monday if today is Sat/Sun. */
function getDefaultSelectedDate(): Date {
  const d = startOfDay(new Date());
  const day = d.getDay();
  if (day === 0) return addDays(d, 1);
  if (day === 6) return addDays(d, 2);
  return d;
}

const disabledDays = [{ dayOfWeek: [0, 6] }];

function hookCopy(path: QuotePath | null, step: StepId, t: (k: string) => string) {
  if (step === "q0" || !path) {
    return { body: t("wizard.hook.q0.body"), cta: t("wizard.hook.q0.cta") };
  }
  if (path === "smartsales") return { body: t("wizard.hook.smartsales.body"), cta: t("wizard.hook.smartsales.cta") };
  if (path === "eventxp") return { body: t("wizard.hook.eventxp.body"), cta: t("wizard.hook.eventxp.cta") };
  if (path === "consulting") return { body: t("wizard.hook.consulting.body"), cta: t("wizard.hook.consulting.cta") };
  return { body: t("wizard.hook.bundle.body"), cta: t("wizard.hook.bundle.cta") };
}

function ExpertShortcut({
  path,
  step,
  onSkip,
  t,
}: {
  path: QuotePath | null;
  step: StepId;
  onSkip: () => void;
  t: (k: string) => string;
}) {
  const { body, cta } = hookCopy(path, step, t);
  return (
    <div className="mt-8 space-y-3 rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50/90 to-white px-4 py-4 dark:border-amber-900/50 dark:from-amber-950/30 dark:to-slate-900/60 md:px-5 md:py-5">
      <p className="text-center text-xs font-medium text-slate-600 dark:text-slate-400">{t("wizard.trust_signal")}</p>
      <p className="text-sm font-semibold leading-relaxed text-slate-800 dark:text-slate-100">{body}</p>
      <button
        type="button"
        onClick={onSkip}
        className="min-h-[48px] w-full rounded-xl border-2 border-amber-600/60 bg-white px-4 py-3 text-center text-sm font-bold text-amber-900 shadow-sm transition hover:bg-amber-50 active:scale-[0.99] dark:border-amber-500/50 dark:bg-slate-800 dark:text-amber-100 dark:hover:bg-slate-700"
      >
        {cta}
      </button>
    </div>
  );
}

export default function QuotationWizard({
  onEnquirySubmitted,
}: {
  onEnquirySubmitted?: (data: {
    summary: string;
    email?: string;
    phone?: string;
    company?: string;
    contactName?: string;
  }) => void;
}) {
  const { t, language } = useLanguage();

  const [path, setPath] = useState<QuotePath | null>(null);
  const [answers, setAnswers] = useState<QuoteAnswers>({});
  const [step, setStep] = useState<StepId>("q0");
  const [result, setResult] = useState<QuoteComputed | null>(null);

  const [fxName, setFxName] = useState("");
  const [fxEmail, setFxEmail] = useState("");
  const [fxDialSelect, setFxDialSelect] = useState("852");
  const [fxCustomDial, setFxCustomDial] = useState("");
  const [fxWa, setFxWa] = useState("");
  const [fxCompany, setFxCompany] = useState("");
  const [fxBusy, setFxBusy] = useState(false);
  const [fxErr, setFxErr] = useState<string | null>(null);

  /* Calendar state: used only after user reaches flowx_booking (before identity form). */
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(() => getDefaultSelectedDate());
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<TimeSlot | null>(null);
  const [isFetchingSlots, setIsFetchingSlots] = useState(false);
  const [bookingError, setBookingError] = useState<string | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  const summary = useMemo(() => {
    if (!path) return "";
    if (result) return formatQuoteSummary(result, answers, t);
    return formatDiagnosticAnswersOnly(path, answers, t);
  }, [result, answers, t, path]);

  const diagnosticText = summary;

  /*
   * Expert shortcut: skip remaining quiz but still tag answers (wizard_skip).
   * Always land on the calendar first so the user picks a slot before contact fields.
   */
  const skipToExpert = useCallback(() => {
    const onResult = step === "result";

    if (!onResult) {
      setResult(null);
    }

    if (step === "q0" && !path) {
      setPath("consulting");
      setAnswers({ wizard_skip: "Skip to expert consultation (from Step 0)" });
    } else {
      setAnswers((prev) => ({
        ...prev,
        wizard_skip: onResult
          ? "Skip to expert consultation (from diagnosis result)"
          : "Skip to expert consultation",
      }));
    }

    setStep("flowx_booking");
  }, [path, step]);

  /** Human-readable slot line stored in payload.appointmentDetail for CRM/email context. */
  function formatAppointmentDetail(): string {
    if (!selectedDate || !selectedTimeSlot) return "";
    const dateLabel = format(
      selectedDate,
      language === "en" ? "MMM dd, yyyy (EEEE)" : "yyyy年MM月dd日 (EEEE)",
      { locale: language === "en" ? enUS : zhTW },
    );
    return `${dateLabel} — ${selectedTimeSlot.display}`;
  }

  function goToFirstPathStep(p: QuotePath) {
    if (p === "eventxp") setStep("eventxp_q1");
    else if (p === "smartsales") setStep("smartsales_q1");
    else if (p === "consulting") setStep("consulting_q1");
    else setStep("bundle_q1");
  }

  function onPickPath(p: QuotePath) {
    setPath(p);
    setAnswers({});
    setResult(null);
    goToFirstPathStep(p);
  }

  function setA(key: string, value: string | string[]) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function computeAndShowResult() {
    if (!path) return;
    const r = computeQuote(path, answers);
    setResult(r);
    setStep("result");
  }

  function downloadSummary() {
    if (!diagnosticText) return;
    const blob = new Blob([diagnosticText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "innovatexp-diagnosis-summary.txt";
    a.click();
    URL.revokeObjectURL(url);
  }

  /*
   * Final submit: calendar + identity valid → /api/calendar/book (Notion + optional server email).
   * Email copy is always 「業務拜訪預約確認」from_name InnovateXP Limited; 留言 = slot summary + QA.
   * Browser Web3Forms only when server email did not send (emailSuccess !== true).
   */
  async function submitFlowX() {
    setFxErr(null);
    const email = fxEmail.trim();
    const wa = normalizeWhatsappE164(fxDialSelect, fxWa, fxCustomDial);
    const company = fxCompany.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFxErr(t("wizard.flowx.error"));
      return;
    }
    if (fxDialSelect === PHONE_DIAL_CUSTOM && !fxCustomDial.replace(/\D/g, "").length) {
      setFxErr(t("wizard.flowx.error"));
      return;
    }
    if (!wa) {
      setFxErr(t("wizard.flowx.error"));
      return;
    }
    if (!company) {
      setFxErr(t("wizard.flowx.error"));
      return;
    }
    if (!selectedDate || !selectedTimeSlot) {
      setFxErr(t("wizard.flowx.error"));
      return;
    }

    setFxBusy(true);
    try {
      const formattedQa = diagnosticText || formatDiagnosticAnswersOnly(path || "consulting", answers, t);
      const visitorName = (fxName.trim() || company).trim() || "-";

      /* 1) Persist slot to Notion + team notifications via existing calendar API */
      const bookRes = await fetch("/api/calendar/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          visitorName,
          visitorEmail: email,
          visitorPhone: wa,
          visitorCompany: company,
          selectedDate: format(selectedDate, "yyyy-MM-dd"),
          selectedTimeSlot,
          message: [formatAppointmentDetail(), "", formattedQa].filter(Boolean).join("\n\n"),
        }),
      });
      const bookData = (await bookRes.json().catch(() => ({}))) as {
        error?: string;
        notionSuccess?: boolean;
        emailSuccess?: boolean;
      };
      if (!bookRes.ok) {
        setFxErr(bookData.error || t("wizard.flowx.book_fail"));
        setFxBusy(false);
        return;
      }

      const combinedMessage = [formatAppointmentDetail(), "", formattedQa].filter(Boolean).join("\n\n");
      const slot = selectedTimeSlot!;

      /* 2a) Booking confirmation email — browser path (Web3Forms blocks most server IPs). */
      if (bookData.emailSuccess !== true) {
        const confirm = await submitToWeb3FormsContact(
          buildBookingConfirmationWeb3Fields({
            visitorName,
            visitorEmail: email,
            visitorPhone: wa,
            visitorCompany: company,
            message: combinedMessage,
            slotStartIso: slot.start,
            slotEndIso: slot.end,
          }),
        );
        if (!confirm.success) {
          setFxErr(t("wizard.flowx.submit_fail"));
          setFxBusy(false);
          return;
        }
      }

      onEnquirySubmitted?.({
        summary: formattedQa,
        email,
        phone: wa,
        company,
        contactName: visitorName,
      });
      const baseOk = t("wizard.flowx.submit_success");
      setBookingSuccess(
        bookData.notionSuccess === false ? `${baseOk}\n\n${t("wizard.flowx.notion_warn")}` : baseOk,
      );
    } catch {
      setFxErr(t("wizard.flowx.submit_fail"));
    } finally {
      setFxBusy(false);
    }
  }

  const fetchSlots = useCallback(async (date: Date | undefined) => {
    if (!date) {
      setAvailableSlots([]);
      return;
    }
    setIsFetchingSlots(true);
    setBookingError(null);
    setSelectedTimeSlot(null);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      const response = await fetch(`/api/calendar/slots?date=${formattedDate}`);
      if (!response.ok) throw new Error("slots_error");
      const data = (await response.json()) as { slots?: TimeSlot[] };
      setAvailableSlots(data.slots || []);
    } catch {
      setAvailableSlots([]);
      setBookingError(t("bookme.time.no_slots"));
    } finally {
      setIsFetchingSlots(false);
    }
  }, [t]);

  /* Changing the DayPicker date refetches free slots for that weekday. */
  const onSelectDate = useCallback((d: Date | undefined) => {
    setSelectedDate(d);
    void fetchSlots(d);
  }, [fetchSlots]);

  /* When entering the booking step, ensure slots load for the current selectedDate. */
  useEffect(() => {
    if (step !== "flowx_booking") return;
    if (!selectedDate) return;
    void fetchSlots(selectedDate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step]);

  const eventxpEvents: Opt[] = useMemo(
    () => [
      { id: "1_3", label: t("wizard.eventxp.events.1_3") },
      { id: "4_10", label: t("wizard.eventxp.events.4_10") },
      { id: "11_24", label: t("wizard.eventxp.events.11_24") },
      { id: "25_plus", label: t("wizard.eventxp.events.25_plus") },
    ],
    [t]
  );

  const pathBanner = path ? (
    <p className="mb-4 text-center text-xs font-bold uppercase tracking-wide text-brand-primary dark:text-teal-300">
      {path === "eventxp"
        ? t("wizard.path_tagline.eventxp")
        : path === "smartsales"
          ? t("wizard.path_tagline.smartsales")
          : path === "consulting"
            ? t("wizard.path_tagline.consulting")
            : t("wizard.path_tagline.bundle")}
    </p>
  ) : null;

  const stepCard = (
    <Card className="border-2 border-slate-200 dark:border-slate-700">
      {!["result", "flowx_identity"].includes(step) ? (
        <div className="text-center">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white sm:text-2xl">{t("wizard.title")}</h2>
          <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{t("wizard.subtitle")}</p>
        </div>
      ) : null}

      <div className={!["result", "flowx_identity"].includes(step) ? "mt-6" : ""}>
        {step === "q0" ? (
          <>
            <h3 className="text-base font-semibold leading-snug text-slate-900 dark:text-white">{t("wizard.q0")}</h3>
            <div className="mt-4 grid grid-cols-1 gap-3">
              {(["eventxp", "smartsales", "consulting", "bundle"] as const).map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => onPickPath(p)}
                  className="rounded-2xl border-2 border-slate-200 bg-white px-4 py-4 text-left shadow-sm transition hover:border-brand-primary/40 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:hover:border-[#00B9B3]/50"
                >
                  <span className="block text-xs font-bold text-brand-primary dark:text-teal-300">
                    {p === "eventxp"
                      ? t("wizard.path_tagline.eventxp")
                      : p === "smartsales"
                        ? t("wizard.path_tagline.smartsales")
                        : p === "consulting"
                          ? t("wizard.path_tagline.consulting")
                          : t("wizard.path_tagline.bundle")}
                  </span>
                  <span className="mt-2 block text-sm font-semibold text-slate-900 dark:text-white">
                    {p === "eventxp"
                      ? t("wizard.path_intro.eventxp")
                      : p === "smartsales"
                        ? t("wizard.path_intro.smartsales")
                        : p === "consulting"
                          ? t("wizard.path_intro.consulting")
                          : t("wizard.path_intro.bundle")}
                  </span>
                </button>
              ))}
            </div>
            <ExpertShortcut path={null} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}

        {!["q0", "result", "flowx_identity"].includes(step) ? pathBanner : null}

        {step === "eventxp_q1" ? (
          <>
            <ChoiceStep
              title={t("wizard.eventxp.events.q")}
              options={eventxpEvents}
              onPick={(id) => {
                setA("eventxp_events_per_year", id);
                setStep("eventxp_q2");
              }}
              onBack={() => setStep("q0")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "eventxp_q2" ? (
          <>
            <ChoiceStep
              title={t("wizard.eventxp.size.q")}
              options={[
                { id: "under_30", label: t("wizard.eventxp.size.under_30") },
                { id: "30_100", label: t("wizard.eventxp.size.30_100") },
                { id: "100_500", label: t("wizard.eventxp.size.100_500") },
                { id: "500_plus", label: t("wizard.eventxp.size.500_plus") },
              ]}
              onPick={(id) => {
                setA("eventxp_size", id);
                setStep("eventxp_q3");
              }}
              onBack={() => setStep("eventxp_q1")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "eventxp_q3" ? (
          <>
            <ChoiceStep
              title={t("wizard.eventxp.checkin.q")}
              options={[
                { id: "paper", label: t("wizard.eventxp.checkin.paper") },
                { id: "spreadsheet", label: t("wizard.eventxp.checkin.spreadsheet") },
                { id: "other_app", label: t("wizard.eventxp.checkin.other_app") },
                { id: "none", label: t("wizard.eventxp.checkin.none") },
              ]}
              onPick={(id) => {
                setA("eventxp_checkin", id);
                setStep("eventxp_q4");
              }}
              onBack={() => setStep("eventxp_q2")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "eventxp_q4" ? (
          <>
            <ChoiceStep
              title={t("wizard.eventxp.outcome.q")}
              options={[
                { id: "checkin_speed", label: t("wizard.eventxp.outcome.checkin_speed") },
                { id: "followup_leads", label: t("wizard.eventxp.outcome.followup_leads") },
                { id: "reporting", label: t("wizard.eventxp.outcome.reporting") },
              ]}
              onPick={(id) => {
                setA("eventxp_outcome", id);
                setStep("eventxp_q5");
              }}
              onBack={() => setStep("eventxp_q3")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "eventxp_q5" ? (
          <>
            <ChoiceStep
              title={t("wizard.eventxp.integration.q")}
              options={[
                { id: "need_sync", label: t("wizard.eventxp.integration.need_sync") },
                { id: "not_yet", label: t("wizard.eventxp.integration.not_yet") },
                { id: "need_advice", label: t("wizard.eventxp.integration.need_advice") },
              ]}
              onPick={(id) => {
                setA("eventxp_integration", id);
                computeAndShowResult();
              }}
              onBack={() => setStep("eventxp_q4")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}

        {step === "smartsales_q1" ? (
          <>
            <ChoiceStep
              title={t("wizard.smartsales.team.q")}
              options={[
                { id: "solo", label: t("wizard.smartsales.team.solo") },
                { id: "2_5", label: t("wizard.smartsales.team.2_5") },
                { id: "6_15", label: t("wizard.smartsales.team.6_15") },
                { id: "15_plus", label: t("wizard.smartsales.team.15_plus") },
              ]}
              onPick={(id) => {
                setA("smartsales_team_size", id);
                setStep("smartsales_q2");
              }}
              onBack={() => setStep("q0")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "smartsales_q2" ? (
          <>
            <ChoiceStep
              title={t("wizard.smartsales.source.q")}
              options={[
                { id: "whatsapp", label: t("wizard.smartsales.source.whatsapp") },
                { id: "referrals", label: t("wizard.smartsales.source.referrals") },
                { id: "ads", label: t("wizard.smartsales.source.ads") },
                { id: "website", label: t("wizard.smartsales.source.website") },
              ]}
              onPick={(id) => {
                setA("smartsales_source", id);
                setStep("smartsales_q3");
              }}
              onBack={() => setStep("smartsales_q1")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "smartsales_q3" ? (
          <>
            <ChoiceStep
              title={t("wizard.smartsales.pain.q")}
              options={[
                { id: "slow_reply", label: t("wizard.smartsales.pain.slow_reply") },
                { id: "dont_know_follow", label: t("wizard.smartsales.pain.dont_know_follow") },
                { id: "no_system", label: t("wizard.smartsales.pain.no_system") },
                { id: "hard_write", label: t("wizard.smartsales.pain.hard_write") },
              ]}
              onPick={(id) => {
                setA("smartsales_pain", id);
                setStep("smartsales_q4");
              }}
              onBack={() => setStep("smartsales_q2")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "smartsales_q4" ? (
          <>
            <ChoiceStep
              title={t("wizard.smartsales.crm.q")}
              options={[
                { id: "whatsapp_only", label: t("wizard.smartsales.crm.whatsapp_only") },
                { id: "spreadsheet", label: t("wizard.smartsales.crm.spreadsheet") },
                { id: "other_crm", label: t("wizard.smartsales.crm.other_crm") },
                { id: "notion", label: t("wizard.smartsales.crm.notion") },
              ]}
              onPick={(id) => {
                setA("smartsales_current_crm", id);
                setStep("smartsales_q5");
              }}
              onBack={() => setStep("smartsales_q3")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "smartsales_q5" ? (
          <>
            <ChoiceStep
              title={t("wizard.smartsales.urgency.q")}
              options={[
                { id: "within_1mo", label: t("wizard.smartsales.urgency.within_1mo") },
                { id: "1_3_mo", label: t("wizard.smartsales.urgency.1_3_mo") },
                { id: "exploring", label: t("wizard.smartsales.urgency.exploring") },
              ]}
              onPick={(id) => {
                setA("smartsales_urgency", id);
                computeAndShowResult();
              }}
              onBack={() => setStep("smartsales_q4")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}

        {step === "consulting_q1" ? (
          <>
            <ChoiceStep
              title={t("wizard.consulting.stage.q")}
              options={[
                { id: "heard", label: t("wizard.consulting.stage.heard") },
                { id: "chatgpt_team", label: t("wizard.consulting.stage.chatgpt_team") },
                { id: "implement_idea", label: t("wizard.consulting.stage.implement_idea") },
              ]}
              onPick={(id) => {
                setA("consulting_stage", id);
                setStep("consulting_q2");
              }}
              onBack={() => setStep("q0")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "consulting_q2" ? (
          <>
            <ChoiceStep
              title={t("wizard.consulting.workflow.q")}
              options={[
                { id: "sales", label: t("wizard.consulting.workflow.sales") },
                { id: "reporting", label: t("wizard.consulting.workflow.reporting") },
                { id: "documents", label: t("wizard.consulting.workflow.documents") },
                { id: "support", label: t("wizard.consulting.workflow.support") },
              ]}
              onPick={(id) => {
                setA("consulting_workflow", id);
                setStep("consulting_q3");
              }}
              onBack={() => setStep("consulting_q1")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "consulting_q3" ? (
          <>
            <ChoiceStep
              title={t("wizard.consulting.stack.q")}
              options={[
                { id: "google", label: t("wizard.consulting.stack.google") },
                { id: "microsoft", label: t("wizard.consulting.stack.microsoft") },
                { id: "notion", label: t("wizard.consulting.stack.notion") },
                { id: "custom", label: t("wizard.consulting.stack.custom") },
              ]}
              onPick={(id) => {
                setA("consulting_stack", id);
                setStep("consulting_q4");
              }}
              onBack={() => setStep("consulting_q2")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "consulting_q4" ? (
          <>
            <ChoiceStep
              title={t("wizard.consulting.goal.q")}
              options={[
                { id: "save_time", label: t("wizard.consulting.goal.save_time") },
                { id: "scale", label: t("wizard.consulting.goal.scale") },
                { id: "culture", label: t("wizard.consulting.goal.culture") },
              ]}
              onPick={(id) => {
                setA("consulting_goal", id);
                setStep("consulting_q5");
              }}
              onBack={() => setStep("consulting_q3")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}
        {step === "consulting_q5" ? (
          <>
            <ChoiceStep
              title={t("wizard.consulting.budget.q")}
              options={[
                { id: "under_10k", label: t("wizard.consulting.budget.under_10k") },
                { id: "10_30k", label: t("wizard.consulting.budget.10_30k") },
                { id: "30_80k", label: t("wizard.consulting.budget.30_80k") },
                { id: "80k_plus", label: t("wizard.consulting.budget.80k_plus") },
              ]}
              onPick={(id) => {
                setA("consulting_budget", id);
                computeAndShowResult();
              }}
              onBack={() => setStep("consulting_q4")}
              backLabel={t("wizard.back")}
            />
            <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
          </>
        ) : null}

        {step === "bundle_q1" ? (
          <>
            <MultiSelectStep
              title={t("wizard.bundle.products.q")}
              options={[
                { id: "eventxp", label: t("wizard.bundle.product.eventxp") },
                { id: "smartsales", label: t("wizard.bundle.product.smartsales") },
                { id: "consulting", label: t("wizard.bundle.product.consulting") },
              ]}
              value={(answers.bundle_products as string[]) || []}
              onChange={(v) => setA("bundle_products", v)}
              onNext={() => setStep("bundle_q2")}
              onBack={() => setStep("q0")}
              backLabel={t("wizard.back")}
              nextLabel={t("wizard.next")}
              footer={<ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />}
            />
          </>
        ) : null}
        {step === "bundle_q2" ? (
          <>
            <TextStep
              title={t("wizard.bundle.goal.q")}
              value={String(answers.bundle_goal || "")}
              placeholder={t("wizard.bundle.goal.placeholder")}
              onChange={(v) => setA("bundle_goal", v)}
              onNext={() => computeAndShowResult()}
              onBack={() => setStep("bundle_q1")}
              backLabel={t("wizard.back")}
              nextLabel={t("wizard.next")}
              footer={<ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />}
            />
          </>
        ) : null}

        {step === "result" && result ? (
          <div>
            <p className="text-base font-semibold leading-relaxed text-slate-800 dark:text-slate-100">
              {t("wizard.finale.thanks")}
            </p>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t("wizard.finale.team_note")}</p>
            <p className="mt-3 text-sm italic text-slate-600 dark:text-slate-400">{t("wizard.finale.roi")}</p>

            <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-950/40">
              <div className="text-sm text-slate-700 dark:text-slate-300">
                <div className="font-semibold text-slate-900 dark:text-white">{t("wizard.finale.recommend_label")}</div>
                <div className="mt-1 text-base font-bold text-brand-primary dark:text-teal-300">{t(result.planKey)}</div>
                <div className="mt-4 font-semibold text-slate-900 dark:text-white">{t("wizard.result.estimated")}</div>
                <div className="mt-1 text-base font-bold text-slate-900 dark:text-white">{t(result.rangeKey)}</div>
                {result.rationaleKeys.length ? (
                  <ul className="mt-4 list-disc space-y-1 pl-5">
                    {result.rationaleKeys.map((rk) => (
                      <li key={rk}>{t(rk)}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </div>

            <div className="mt-5 flex flex-col gap-3">
              <button
                type="button"
                onClick={downloadSummary}
                className="min-h-[48px] w-full rounded-full border-2 border-slate-800 bg-slate-900 px-6 py-3 text-base font-bold text-white transition hover:bg-slate-800 dark:border-slate-600 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                {t("wizard.finale.download")}
              </button>
              <button
                type="button"
                onClick={() => {
                  setStep("flowx_booking");
                }}
                className="min-h-[48px] w-full rounded-full bg-brand-primary px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950"
              >
                {t("wizard.finale.next_calendar")}
              </button>
              <ExpertShortcut path={path} step={step} onSkip={skipToExpert} t={t} />
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={() => (path ? goToFirstPathStep(path) : setStep("q0"))}
                className="min-h-[48px] w-full rounded-full border border-slate-300 bg-transparent px-6 py-3 text-base font-semibold text-slate-800 transition hover:bg-slate-50 dark:border-slate-600 dark:text-slate-100 dark:hover:bg-white/5"
              >
                {t("wizard.result.edit_answers")}
              </button>
            </div>
          </div>
        ) : null}

        {step === "flowx_identity" ? (
          <div className="rounded-2xl border border-brand-primary/20 bg-gradient-to-b from-white to-slate-50/80 px-4 py-8 dark:border-slate-600 dark:from-slate-900 dark:to-slate-950/80 md:px-8">
            <h3 className="text-center text-xl font-bold text-slate-900 dark:text-white md:text-2xl">
              {t("wizard.flowx.title")}
            </h3>
            <p className="mx-auto mt-2 max-w-lg text-center text-sm text-slate-600 dark:text-slate-400">
              {t("wizard.flowx.subtitle")}
            </p>
            <div className="mx-auto mt-8 max-w-md space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t("wizard.flowx.name")}
                </label>
                <input
                  value={fxName}
                  onChange={(e) => setFxName(e.target.value)}
                  className="mt-1 w-full min-h-[52px] rounded-xl border-2 border-slate-300 px-4 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t("wizard.flowx.email")} <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  inputMode="email"
                  value={fxEmail}
                  onChange={(e) => setFxEmail(e.target.value)}
                  className="mt-1 w-full min-h-[52px] rounded-xl border-2 border-slate-300 px-4 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t("wizard.flowx.whatsapp")} <span className="text-red-500">*</span>
                </label>
                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">{t("wizard.flowx.country")}</p>
                <select
                  value={fxDialSelect}
                  onChange={(e) => setFxDialSelect(e.target.value)}
                  className="mt-1 w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-3 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-[#00B9B3]"
                  aria-label={t("wizard.flowx.country")}
                >
                  {PHONE_DIAL_OPTIONS.map((o) => (
                    <option key={o.code} value={o.code}>
                      {language === "en" ? o.labelEn : o.labelZh} (+{o.code})
                    </option>
                  ))}
                  <option value={PHONE_DIAL_CUSTOM}>{t("wizard.flowx.dial_other")}</option>
                </select>
                {fxDialSelect === PHONE_DIAL_CUSTOM ? (
                  <div className="mt-2">
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                      {t("wizard.flowx.custom_dial")} <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      value={fxCustomDial}
                      onChange={(e) => setFxCustomDial(e.target.value.replace(/[^\d]/g, "").slice(0, 3))}
                      placeholder={t("wizard.flowx.custom_dial_placeholder")}
                      maxLength={3}
                      className="mt-1 w-full min-h-[48px] rounded-xl border-2 border-slate-300 bg-white px-4 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                      autoComplete="tel-country-code"
                    />
                  </div>
                ) : null}
                <label className="mt-3 block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  {t("wizard.flowx.mobile_local")}
                </label>
                <input
                  type="tel"
                  inputMode="tel"
                  value={fxWa}
                  onChange={(e) => setFxWa(e.target.value)}
                  placeholder={t("bookme.visitor.placeholder.phone")}
                  className="mt-1 w-full min-h-[52px] rounded-xl border-2 border-slate-300 bg-white px-4 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white dark:focus:border-[#00B9B3]"
                  autoComplete="tel-national"
                />
                <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{t("wizard.flowx.whatsapp_hint")}</p>
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-800 dark:text-slate-200">
                  {t("wizard.flowx.company")} <span className="text-red-500">*</span>
                </label>
                <input
                  value={fxCompany}
                  onChange={(e) => setFxCompany(e.target.value)}
                  className="mt-1 w-full min-h-[52px] rounded-xl border-2 border-slate-300 px-4 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900 dark:text-white"
                  autoComplete="organization"
                  required
                />
              </div>
              {fxErr ? (
                <p className="text-sm font-medium text-red-600 dark:text-red-400" role="alert">
                  {fxErr}
                </p>
              ) : null}
              <button
                type="button"
                disabled={fxBusy}
                onClick={() => void submitFlowX()}
                className="min-h-[52px] w-full rounded-full bg-brand-primary px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-brand-primary-hover disabled:opacity-60 dark:bg-[#00B9B3] dark:text-slate-950"
              >
                {fxBusy ? "…" : t("wizard.flowx.submit")}
              </button>
              <button
                type="button"
                onClick={() => setStep("flowx_booking")}
                className="w-full text-center text-sm font-semibold text-brand-primary underline dark:text-teal-300"
              >
                {t("wizard.back")}
              </button>
            </div>
          </div>
        ) : null}

        {step === "flowx_booking" ? (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-6 dark:border-slate-700 dark:bg-slate-950/40 md:px-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{t("bookme.title")}</h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{t("bookme.subtitle")}</p>
              </div>
              <button
                type="button"
                onClick={() => (result ? setStep("result") : path ? goToFirstPathStep(path) : setStep("q0"))}
                className="text-sm font-semibold text-brand-primary underline dark:text-teal-300"
              >
                {t("wizard.back")}
              </button>
            </div>

            <div className="mt-6 space-y-6">
              <div id="wizard-booking-date" className="scroll-mt-[var(--header-offset)] space-y-3" tabIndex={-1}>
                <label className="block text-slate-900 dark:text-white text-base font-bold">
                  📆 {t("bookme.date.label")} <span className="text-red-500">*</span>
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/40">
                  <div className="flex justify-center">
                    <DayPicker
                      mode="single"
                      selected={selectedDate}
                      onSelect={onSelectDate}
                      disabled={disabledDays}
                      locale={language === "en" ? enUS : zhTW}
                      defaultMonth={new Date()}
                      modifiersClassNames={{
                        selected: "bg-brand-primary text-white font-bold rounded-lg dark:bg-[#00B9B3]",
                        today:
                          "border-2 border-brand-primary rounded-lg font-bold text-brand-primary dark:border-[#00B9B3] dark:text-teal-300",
                        disabled: "text-gray-400 dark:text-gray-600 opacity-40 cursor-not-allowed",
                      }}
                      className="text-gray-900 dark:text-white touch-manipulation"
                      styles={{
                        caption: { color: "inherit", fontSize: "1rem" },
                        head_cell: { color: "inherit" },
                        cell: { color: "inherit" },
                        day: { color: "inherit", minWidth: "44px", minHeight: "44px", fontSize: "0.95rem" },
                        nav_button: { color: "inherit", width: "44px", height: "44px" },
                      }}
                    />
                  </div>
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t("bookme.date.required")}</p>
              </div>

              <div className="space-y-3">
                <label className="block text-slate-900 dark:text-white text-base font-bold">
                  ⏰ {t("bookme.time.label")} <span className="text-red-500">*</span>
                </label>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-700 dark:bg-slate-900/40 min-h-[220px]">
                  {!selectedDate ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{t("bookme.time.select")}</p>
                    </div>
                  ) : null}
                  {isFetchingSlots ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="h-10 w-10 animate-spin rounded-full border-3 border-brand-primary border-t-transparent dark:border-[#00B9B3]" />
                      <span className="mt-3 text-slate-600 dark:text-slate-400 text-sm">{t("bookme.time.loading")}</span>
                    </div>
                  ) : null}
                  {selectedDate && !isFetchingSlots && availableSlots.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-10 text-center">
                      <p className="text-slate-500 dark:text-slate-400 text-sm">{t("bookme.time.no_slots")}</p>
                    </div>
                  ) : null}
                  {selectedDate && !isFetchingSlots && availableSlots.length > 0 ? (
                    <div className="grid grid-cols-2 gap-3">
                      {availableSlots.map((slot, index) => (
                        <button
                          key={`${slot.start}-${index}`}
                          type="button"
                          onClick={() => setSelectedTimeSlot(slot)}
                          className={[
                            "min-h-[52px] px-4 py-3 rounded-xl text-base font-semibold transition-all duration-200 active:scale-95 touch-manipulation border-2",
                            selectedTimeSlot?.start === slot.start
                              ? "bg-brand-primary text-white shadow-lg border-brand-primary-hover ring-2 ring-brand-primary/30 dark:bg-[#00B9B3] dark:border-[#009e98] dark:ring-[#00B9B3]/40"
                              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 border-slate-300 dark:border-slate-600 hover:border-brand-primary/50 hover:bg-brand-primary/5 dark:hover:bg-slate-800",
                          ].join(" ")}
                        >
                          {slot.display}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
                <p className="text-slate-500 dark:text-slate-400 text-sm">{t("bookme.time.hour")}</p>
              </div>

              {bookingError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-800 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-200">
                  {bookingError}
                </div>
              ) : null}

              {bookingSuccess ? (
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900 dark:border-emerald-900/40 dark:bg-emerald-950/20 dark:text-emerald-100">
                  {bookingSuccess}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setStep("flowx_identity")}
                disabled={!selectedDate || !selectedTimeSlot}
                className="min-h-[52px] w-full rounded-full bg-slate-900 px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
              >
                {t("wizard.flowx.to_identity")}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );

  return (
    <section id="quotation-wizard" aria-label="Quotation wizard" className="mb-6 scroll-mt-[var(--header-offset)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
        >
          {stepCard}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function ChoiceStep({
  title,
  options,
  onPick,
  onBack,
  backLabel,
}: {
  title: string;
  options: Opt[];
  onPick: (id: string) => void;
  onBack: () => void;
  backLabel: string;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
        <button
          type="button"
          className="text-sm font-semibold text-brand-primary underline decoration-brand-primary/30 underline-offset-2 dark:text-teal-300"
          onClick={onBack}
        >
          {backLabel}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3">
        {options.map((opt) => (
          <button
            key={opt.id}
            type="button"
            onClick={() => onPick(opt.id)}
            className="rounded-2xl border-2 border-slate-200 bg-white px-5 py-4 text-left text-sm font-semibold leading-snug text-slate-900 shadow-sm transition hover:border-oxford/30 hover:shadow-md dark:border-slate-700 dark:bg-slate-900/60 dark:text-white sm:text-base"
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MultiSelectStep({
  title,
  options,
  value,
  onChange,
  onNext,
  onBack,
  backLabel,
  nextLabel,
  footer,
}: {
  title: string;
  options: Opt[];
  value: string[];
  onChange: (v: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  backLabel: string;
  nextLabel: string;
  footer?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
        <button
          type="button"
          className="text-sm font-semibold text-brand-primary underline decoration-brand-primary/30 underline-offset-2 dark:text-teal-300"
          onClick={onBack}
        >
          {backLabel}
        </button>
      </div>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
        {options.map((opt) => {
          const checked = value.includes(opt.id);
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => {
                const next = checked ? value.filter((v) => v !== opt.id) : [...value, opt.id];
                onChange(next);
              }}
              className={[
                "rounded-2xl border-2 px-4 py-4 text-left font-semibold text-sm leading-snug shadow-sm transition sm:text-base",
                checked
                  ? "border-brand-primary bg-brand-primary/10 text-slate-900 dark:border-[#00B9B3] dark:bg-[#00B9B3]/10 dark:text-white"
                  : "border-slate-200 bg-white text-slate-900 hover:border-oxford/30 dark:border-slate-700 dark:bg-slate-900/60 dark:text-white",
              ].join(" ")}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onNext}
          disabled={value.length === 0}
          className="min-h-[48px] w-full rounded-full bg-brand-primary px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-brand-primary-hover disabled:cursor-not-allowed disabled:bg-brand-primary/40 dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
        >
          {nextLabel}
        </button>
      </div>
      {footer}
    </div>
  );
}

function TextStep({
  title,
  value,
  placeholder,
  onChange,
  onNext,
  onBack,
  backLabel,
  nextLabel,
  footer,
}: {
  title: string;
  value: string;
  placeholder: string;
  onChange: (v: string) => void;
  onNext: () => void;
  onBack: () => void;
  backLabel: string;
  nextLabel: string;
  footer?: ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-base font-semibold text-slate-900 dark:text-white">{title}</h3>
        <button
          type="button"
          className="text-sm font-semibold text-brand-primary underline decoration-brand-primary/30 underline-offset-2 dark:text-teal-300"
          onClick={onBack}
        >
          {backLabel}
        </button>
      </div>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="mt-4 w-full rounded-2xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 outline-none focus:border-brand-primary dark:border-slate-600 dark:bg-slate-900/60 dark:text-white dark:focus:border-[#00B9B3]"
      />
      <div className="mt-5 flex gap-3">
        <button
          type="button"
          onClick={onNext}
          className="min-h-[48px] w-full rounded-full bg-brand-primary px-6 py-3 text-base font-bold text-white shadow-md transition hover:bg-brand-primary-hover dark:bg-[#00B9B3] dark:text-slate-950 dark:hover:bg-[#009e98]"
        >
          {nextLabel}
        </button>
      </div>
      {footer}
    </div>
  );
}