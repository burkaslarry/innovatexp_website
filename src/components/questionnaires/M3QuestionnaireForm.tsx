"use client";

import { useMemo, useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  Chip,
  FormControlLabel,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
  Alert,
} from "@mui/material";
import Link from "next/link";
import type { QuestionField } from "@/content/questionnaires/consultation";
import { innovateXpM3Theme } from "@/lib/m3-theme";

export type Answers = Record<string, string | string[]>;

type ShellCopy = {
  next: string;
  back: string;
  submit: string;
  sending: string;
  requiredError: string;
  failError: string;
  consent: string;
  successTitle: string;
  successBody: string;
  highIntentBody?: string;
  bookCta?: string;
  whatsappCta?: string;
  pricingEyebrow?: string;
  pricingTitle?: string;
  pricingIntro?: string;
  pricingCards?: { name: string; price: string; note: string }[];
};

type Props = {
  eyebrow: string;
  title: string;
  intro: string;
  privacy: string;
  questions: QuestionField[];
  steps?: { title: string; questionIds: string[] }[];
  copy: ShellCopy;
  pathId: string;
  subjectPrefix: string;
  bookingHref?: string;
  whatsappHref?: string;
  showBookingOnSuccess?: boolean;
  requireContact?: boolean;
  isHighIntent?: (answers: Answers) => boolean;
  contactDefaults?: { name?: string; company?: string; email?: string; phone?: string };
};

function labelFor(q: QuestionField, value: string): string {
  const opt = q.options?.find((o) => o.id === value);
  return opt?.label ?? value;
}

function formatQa(questions: QuestionField[], answers: Answers): string {
  return questions
    .map((q) => {
      const raw = answers[q.id];
      if (!raw || (Array.isArray(raw) && raw.length === 0)) return null;
      const display = Array.isArray(raw)
        ? raw.map((id) => labelFor(q, id)).join(", ")
        : q.type === "single"
          ? labelFor(q, raw)
          : raw;
      return `${q.label}: ${display}`;
    })
    .filter(Boolean)
    .join("\n");
}

export function M3QuestionnaireForm({
  eyebrow,
  title,
  intro,
  privacy,
  questions,
  steps,
  copy,
  pathId,
  subjectPrefix,
  bookingHref,
  whatsappHref,
  showBookingOnSuccess = false,
  requireContact = true,
  isHighIntent,
}: Props) {
  const stepDefs = useMemo(() => {
    if (steps?.length) return steps;
    return [{ title: title, questionIds: questions.map((q) => q.id) }];
  }, [steps, questions, title]);

  const [stepIndex, setStepIndex] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [consent, setConsent] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const progress = ((stepIndex + 1) / stepDefs.length) * 100;
  const current = stepDefs[stepIndex];
  const currentQuestions = questions.filter((q) => current.questionIds.includes(q.id));
  const isLast = stepIndex === stepDefs.length - 1;

  const setSingle = (id: string, value: string) => {
    setAnswers((a) => ({ ...a, [id]: value }));
  };

  const toggleMulti = (q: QuestionField, optionId: string) => {
    setAnswers((a) => {
      const prev = Array.isArray(a[q.id]) ? [...(a[q.id] as string[])] : [];
      const exists = prev.includes(optionId);
      let next = exists ? prev.filter((x) => x !== optionId) : [...prev, optionId];
      if (!exists && q.maxSelect && next.length > q.maxSelect) {
        next = [...next.slice(1), optionId].slice(-q.maxSelect);
      }
      return { ...a, [q.id]: next };
    });
  };

  const validateCurrent = () => {
    for (const q of currentQuestions) {
      if (!q.required) continue;
      const v = answers[q.id];
      if (q.type === "multi") {
        if (!Array.isArray(v) || v.length === 0) return false;
      } else if (typeof v !== "string" || !v.trim()) {
        return false;
      } else if (q.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim())) {
        return false;
      }
    }
    if (isLast && !consent) return false;
    return true;
  };

  const goNext = () => {
    if (!validateCurrent()) {
      setError(copy.requiredError);
      return;
    }
    setError("");
    setStepIndex((i) => Math.min(i + 1, stepDefs.length - 1));
  };

  const submit = async () => {
    if (!validateCurrent()) {
      setError(copy.requiredError);
      return;
    }
    setError("");
    setStatus("sending");

    const name = String(answers.name || "").trim() || "-";
    const company = String(answers.company || "").trim() || (requireContact ? "" : "Feedback (no company)");
    const email = String(answers.email || "").trim();
    const phone = String(answers.phone || "").trim() || "n/a";

    if (requireContact) {
      if (!company || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus("error");
        setError(copy.requiredError);
        return;
      }
    }

    const formattedQa = formatQa(questions, answers);
    const profession = String(answers.role || answers.profession || "").trim();
    const industry = String(answers.industry || "").trim();
    const urgency = String(answers.urgency || "").trim();
    const interest = String(answers.interest || "").trim();

    try {
      const response = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pathId,
          questionnaireType: subjectPrefix,
          subject: `${subjectPrefix} — ${company || name}`,
          name,
          company: company || "Feedback",
          profession,
          email: email || undefined,
          phone: phone === "n/a" ? undefined : phone,
          industry,
          urgency,
          interest,
          formattedQa,
          answers,
        }),
      });
      if (!response.ok) throw new Error("fail");
      setStatus("success");
    } catch {
      setStatus("error");
      setError(copy.failError);
    }
  };

  if (status === "success") {
    const high = isHighIntent?.(answers);
    return (
      <ThemeProvider theme={innovateXpM3Theme}>
        <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: "1px solid", borderColor: "divider" }}>
          <Typography variant="h4" gutterBottom>
            {copy.successTitle}
          </Typography>
          <Typography color="text.secondary" sx={{ mb: 3, lineHeight: 1.7 }}>
            {high && copy.highIntentBody ? copy.highIntentBody : copy.successBody}
          </Typography>
          {showBookingOnSuccess && bookingHref ? (
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button component={Link} href={bookingHref} variant="contained" size="large">
                {copy.bookCta}
              </Button>
              {whatsappHref ? (
                <Button href={whatsappHref} target="_blank" rel="noopener noreferrer" variant="outlined" size="large">
                  {copy.whatsappCta}
                </Button>
              ) : null}
            </Stack>
          ) : null}
          {copy.pricingCards?.length ? (
            <Box sx={{ mt: 4 }}>
              <Typography variant="overline" color="primary" fontWeight={800}>
                {copy.pricingEyebrow}
              </Typography>
              <Typography variant="h5" gutterBottom>
                {copy.pricingTitle}
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 2 }}>
                {copy.pricingIntro}
              </Typography>
              <Stack spacing={1.5}>
                {copy.pricingCards.map((card) => (
                  <Paper key={card.name} variant="outlined" sx={{ p: 2, borderRadius: 3 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="baseline" gap={2}>
                      <Box>
                        <Typography fontWeight={700}>{card.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {card.note}
                        </Typography>
                      </Box>
                      <Typography fontWeight={800} color="primary.main">
                        {card.price}
                      </Typography>
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Paper>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={innovateXpM3Theme}>
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, border: "1px solid", borderColor: "divider" }}>
        <Typography variant="overline" color="primary" fontWeight={800}>
          {eyebrow}
        </Typography>
        <Typography variant="h4" sx={{ mb: 1.5 }}>
          {title}
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 2, lineHeight: 1.7 }}>
          {intro}
        </Typography>
        <Alert severity="info" sx={{ mb: 3, borderRadius: 3 }}>
          {privacy}
        </Alert>

        <LinearProgress variant="determinate" value={progress} sx={{ mb: 1, height: 8, borderRadius: 999 }} />
        <Typography variant="caption" color="text.secondary" sx={{ mb: 3, display: "block" }}>
          {stepIndex + 1} / {stepDefs.length} · {current.title}
        </Typography>

        <Stack spacing={3}>
          {currentQuestions.map((q) => (
            <Box key={q.id}>
              <Typography fontWeight={700} sx={{ mb: 1.25 }}>
                {q.label}
                {q.required ? " *" : ""}
              </Typography>
              {q.type === "single" || q.type === "multi" ? (
                <Stack direction="row" flexWrap="wrap" useFlexGap gap={1}>
                  {(q.options ?? []).map((opt) => {
                    const selected =
                      q.type === "multi"
                        ? Array.isArray(answers[q.id]) && (answers[q.id] as string[]).includes(opt.id)
                        : answers[q.id] === opt.id;
                    return (
                      <Chip
                        key={opt.id}
                        label={opt.label}
                        color={selected ? "primary" : "default"}
                        variant={selected ? "filled" : "outlined"}
                        onClick={() =>
                          q.type === "multi" ? toggleMulti(q, opt.id) : setSingle(q.id, opt.id)
                        }
                        sx={{ maxWidth: "100%", height: "auto", py: 1, "& .MuiChip-label": { whiteSpace: "normal" } }}
                      />
                    );
                  })}
                </Stack>
              ) : (
                <TextField
                  fullWidth
                  type={q.type === "email" ? "email" : q.type === "tel" ? "tel" : "text"}
                  placeholder={q.placeholder}
                  value={(answers[q.id] as string) || ""}
                  onChange={(e) => setSingle(q.id, e.target.value)}
                  multiline={q.id === "improve" || q.id === "discountNote"}
                  minRows={q.id === "improve" || q.id === "discountNote" ? 3 : 1}
                />
              )}
            </Box>
          ))}

          {isLast ? (
            <FormControlLabel
              control={<Checkbox checked={consent} onChange={(e) => setConsent(e.target.checked)} />}
              label={copy.consent}
            />
          ) : null}

          {error ? (
            <Alert severity="error" sx={{ borderRadius: 3 }}>
              {error}
            </Alert>
          ) : null}

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="space-between">
            <Button
              variant="text"
              disabled={stepIndex === 0 || status === "sending"}
              onClick={() => {
                setError("");
                setStepIndex((i) => Math.max(0, i - 1));
              }}
            >
              {copy.back}
            </Button>
            {isLast ? (
              <Button
                variant="contained"
                size="large"
                disabled={status === "sending"}
                onClick={() => void submit()}
              >
                {status === "sending" ? copy.sending : copy.submit}
              </Button>
            ) : (
              <Button variant="contained" size="large" onClick={goNext}>
                {copy.next}
              </Button>
            )}
          </Stack>
        </Stack>
      </Paper>
    </ThemeProvider>
  );
}
