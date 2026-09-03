"use client";

import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useInnovateXpM3Theme } from "@/components/questionnaires/useInnovateXpM3Theme";
import {
  getBniPowerTeamCopy,
  type PowerTeamExample,
  type PowerTeamResult,
  type PowerTeamSuggestion,
} from "@/content/bni-power-team";
import type { AppLocale } from "@/lib/i18n-routing";

function CollaborateMark({
  item,
  badge,
  fallbackNote,
}: {
  item: Pick<PowerTeamExample, "collaborate" | "collaborateNote">;
  badge: string;
  fallbackNote: string;
}) {
  if (!item.collaborate) return null;
  return (
    <Box sx={{ mt: 1.25 }}>
      <Chip
        size="small"
        label={badge}
        color="secondary"
        sx={{
          fontWeight: 700,
          mb: 0.75,
          color: "#fff",
          "& .MuiChip-label": { color: "#fff" },
        }}
      />
      <Typography variant="body2" sx={{ color: "secondary.main", fontWeight: 600, lineHeight: 1.6 }}>
        {item.collaborateNote || fallbackNote}
      </Typography>
    </Box>
  );
}

function ExampleList({
  title,
  hint,
  items,
  badge,
  fallbackNote,
}: {
  title: string;
  hint: string;
  items: PowerTeamExample[];
  badge: string;
  fallbackNote: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        {hint}
      </Typography>
      <Stack spacing={1.5}>
        {items.map((item, index) => (
          <Box
            key={`${item.name}-${index}`}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: item.collaborate ? "secondary.light" : "divider",
              bgcolor: item.collaborate ? "rgba(0, 137, 123, 0.06)" : "transparent",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>
              {index + 1}. {item.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.7 }}>
              {item.explanation}
            </Typography>
            <CollaborateMark item={item} badge={badge} fallbackNote={fallbackNote} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

function PowerTeamList({
  title,
  hint,
  items,
  badge,
  fallbackNote,
}: {
  title: string;
  hint: string;
  items: PowerTeamSuggestion[];
  badge: string;
  fallbackNote: string;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: { xs: 2.5, md: 3 },
        borderRadius: 3,
        border: "1px solid",
        borderColor: "divider",
        bgcolor: "background.paper",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 800 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2 }}>
        {hint}
      </Typography>
      <Stack spacing={1.75}>
        {items.map((item, index) => (
          <Box
            key={`${item.targetMarket}-${index}`}
            sx={{
              p: 1.75,
              borderRadius: 2,
              border: "1px solid",
              borderColor: item.collaborate ? "secondary.light" : "divider",
              bgcolor: item.collaborate ? "rgba(0, 137, 123, 0.06)" : "transparent",
            }}
          >
            <Typography sx={{ fontWeight: 700 }}>
              {index + 1}. {item.targetMarket}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.75, fontWeight: 600 }}>
              {item.members.join(" · ")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, lineHeight: 1.7 }}>
              {item.explanation}
            </Typography>
            <CollaborateMark item={item} badge={badge} fallbackNote={fallbackNote} />
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}

export function BniPowerTeamQuestionnaire({
  locale,
  bookingHref,
  whatsappHref,
}: {
  locale: AppLocale;
  bookingHref: string;
  whatsappHref: string;
}) {
  const c = getBniPowerTeamCopy(locale);
  const theme = useInnovateXpM3Theme();
  const [profession, setProfession] = useState("");
  const [offering, setOffering] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [result, setResult] = useState<PowerTeamResult | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!profession.trim() || !offering.trim()) {
      setError(c.requiredError);
      setStatus("error");
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch("/api/bni-power-team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          profession: profession.trim(),
          offering: offering.trim(),
          locale,
        }),
      });
      const data = (await res.json()) as { ok?: boolean; result?: PowerTeamResult; error?: string };
      if (!res.ok || !data.ok || !data.result) {
        throw new Error(data.error || "failed");
      }
      setResult(data.result);
      setStatus("success");
    } catch {
      setStatus("error");
      setError(c.failError);
    }
  };

  const onReset = () => {
    setResult(null);
    setStatus("idle");
    setError("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={3}>
        <Box>
          <Typography
            variant="overline"
            sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: "0.08em" }}
          >
            {c.eyebrow}
          </Typography>
          <Typography
            component="h1"
            variant="h4"
            sx={{ mt: 1, fontWeight: 800, lineHeight: 1.25 }}
          >
            {c.title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1.5, lineHeight: 1.8 }}>
            {c.intro}
          </Typography>
          <Paper
            elevation={0}
            sx={{
              mt: 2,
              p: 2,
              borderRadius: 2,
              bgcolor: "rgba(25, 118, 210, 0.06)",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Typography sx={{ fontWeight: 600, lineHeight: 1.7 }}>{c.why}</Typography>
          </Paper>
        </Box>

        {status !== "success" || !result ? (
          <Paper
            component="form"
            onSubmit={onSubmit}
            elevation={0}
            sx={{
              p: { xs: 2.5, md: 3.5 },
              borderRadius: 3,
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Stack spacing={2.5}>
              <TextField
                label={c.professionLabel}
                placeholder={c.professionPlaceholder}
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                required
                fullWidth
                inputProps={{ maxLength: 200 }}
              />
              <TextField
                label={c.offeringLabel}
                placeholder={c.offeringPlaceholder}
                value={offering}
                onChange={(e) => setOffering(e.target.value)}
                required
                fullWidth
                multiline
                minRows={4}
                inputProps={{ maxLength: 4000 }}
              />
              {error ? <Alert severity="error">{error}</Alert> : null}
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={status === "sending"}
                startIcon={status === "sending" ? <CircularProgress size={18} color="inherit" /> : undefined}
                sx={{ alignSelf: { xs: "stretch", sm: "flex-start" }, minHeight: 48, fontWeight: 700 }}
              >
                {status === "sending" ? c.submitting : c.submit}
              </Button>
            </Stack>
          </Paper>
        ) : (
          <Stack spacing={2.5}>
            <Box>
              <Typography
                variant="overline"
                sx={{ color: "secondary.main", fontWeight: 700, letterSpacing: "0.08em" }}
              >
                {c.resultEyebrow}
              </Typography>
              {result.professionSummary ? (
                <Typography variant="h6" sx={{ mt: 0.75, fontWeight: 700 }}>
                  {result.professionSummary}
                </Typography>
              ) : null}
            </Box>

            <ExampleList
              title={c.upstreamTitle}
              hint={c.upstreamHint}
              items={result.upstream}
              badge={c.collaborateBadge}
              fallbackNote={c.collaborateDefaultNote}
            />
            <ExampleList
              title={c.parallelTitle}
              hint={c.parallelHint}
              items={result.parallel}
              badge={c.collaborateBadge}
              fallbackNote={c.collaborateDefaultNote}
            />
            <ExampleList
              title={c.downstreamTitle}
              hint={c.downstreamHint}
              items={result.downstream}
              badge={c.collaborateBadge}
              fallbackNote={c.collaborateDefaultNote}
            />
            <PowerTeamList
              title={c.powerTeamTitle}
              hint={c.powerTeamHint}
              items={result.powerTeams}
              badge={c.collaborateBadge}
              fallbackNote={c.collaborateDefaultNote}
            />

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button component={Link} href={bookingHref} variant="contained" sx={{ minHeight: 48, fontWeight: 700 }}>
                {c.bookCta}
              </Button>
              <Button
                component={Link}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ minHeight: 48, fontWeight: 700 }}
              >
                {c.whatsappCta}
              </Button>
              <Button onClick={onReset} variant="text" sx={{ minHeight: 48, fontWeight: 700 }}>
                {c.reset}
              </Button>
            </Stack>
          </Stack>
        )}
      </Stack>
    </ThemeProvider>
  );
}
