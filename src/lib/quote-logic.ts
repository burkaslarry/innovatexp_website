export type QuotePath = "eventxp" | "smartsales" | "consulting" | "bundle";

/** Machine-readable quote result; use LanguageContext `t(planKey)` etc. for display */
export type QuoteComputed = {
  path: QuotePath;
  planKey: string;
  rangeKey: string;
  rationaleKeys: string[];
};

export type QuoteAnswers = Record<string, string | string[]>;

const PLAN = {
  bundle_custom: "wizard.plan.bundle_custom",
  eventxp_enterprise: "wizard.plan.eventxp_enterprise",
  eventxp_ai_growth: "wizard.plan.eventxp_ai_growth",
  eventxp_professional: "wizard.plan.eventxp_professional",
  smartsales_team_custom: "wizard.plan.smartsales_team_custom",
  smartsales_pro_setup: "wizard.plan.smartsales_pro_setup",
  smartsales_pro: "wizard.plan.smartsales_pro",
  smartsales_starter: "wizard.plan.smartsales_starter",
  consulting_bootcamp: "wizard.plan.consulting_bootcamp",
  consulting_agent: "wizard.plan.consulting_agent",
  consulting_full: "wizard.plan.consulting_full",
  consulting_audit: "wizard.plan.consulting_audit",
} as const;

const RANGE = {
  custom: "wizard.range.custom",
  hkd_2480_mo: "wizard.range.hkd_2480_mo",
  hkd_2880_mo: "wizard.range.hkd_2880_mo",
  hkd_2800_mo: "wizard.range.hkd_2800_mo",
  hkd_4800_mo: "wizard.range.hkd_4800_mo",
  hkd_4800_15000: "wizard.range.hkd_4800_15000",
  from_8000: "wizard.range.from_8000",
  from_12000: "wizard.range.from_12000",
  from_25000: "wizard.range.from_25000",
  from_80000: "wizard.range.from_80000",
} as const;

const R = {
  bundle_multi: "wizard.rationale.bundle_multi",
  eventxp_large: "wizard.rationale.eventxp_large",
  eventxp_integration: "wizard.rationale.eventxp_integration",
  eventxp_ai_outcome: "wizard.rationale.eventxp_ai_outcome",
  eventxp_professional_fit: "wizard.rationale.eventxp_professional_fit",
  smartsales_large_team: "wizard.rationale.smartsales_large_team",
  smartsales_migration: "wizard.rationale.smartsales_migration",
  smartsales_pro_fit: "wizard.rationale.smartsales_pro_fit",
  smartsales_starter_fit: "wizard.rationale.smartsales_starter_fit",
  consulting_training_goal: "wizard.rationale.consulting_training_goal",
  consulting_build_focus: "wizard.rationale.consulting_build_focus",
  consulting_budget_scope: "wizard.rationale.consulting_budget_scope",
  consulting_audit_entry: "wizard.rationale.consulting_audit_entry",
} as const;

export function computeQuote(path: QuotePath, answers: QuoteAnswers): QuoteComputed {
  if (path === "bundle") {
    return {
      path,
      planKey: PLAN.bundle_custom,
      rangeKey: RANGE.custom,
      rationaleKeys: [R.bundle_multi],
    };
  }

  if (path === "eventxp") {
    const size = String(answers.eventxp_size || "");
    const integration = String(answers.eventxp_integration || "");
    const outcome = String(answers.eventxp_outcome || "");

    const needsIntegration =
      integration === "need_sync" || integration === "need_advice" || integration === "notion_airtable" || integration === "other_crm";
    const largeEvent = size === "500_plus";
    const wantsAI = outcome === "followup_leads" || outcome === "all";

    if (largeEvent || needsIntegration) {
      const rationaleKeys: string[] = [];
      if (largeEvent) rationaleKeys.push(R.eventxp_large);
      if (needsIntegration) rationaleKeys.push(R.eventxp_integration);
      return {
        path,
        planKey: PLAN.eventxp_enterprise,
        rangeKey: RANGE.custom,
        rationaleKeys,
      };
    }

    if (wantsAI) {
      return {
        path,
        planKey: PLAN.eventxp_ai_growth,
        rangeKey: RANGE.hkd_2880_mo,
        rationaleKeys: [R.eventxp_ai_outcome],
      };
    }

    return {
      path,
      planKey: PLAN.eventxp_professional,
      rangeKey: RANGE.hkd_2480_mo,
      rationaleKeys: [R.eventxp_professional_fit],
    };
  }

  if (path === "smartsales") {
    const teamSize = String(answers.smartsales_team_size || "");
    const currentCrm = String(answers.smartsales_current_crm || "");
    const pain = String(answers.smartsales_pain || "");

    const needsMigration =
      currentCrm === "spreadsheet" || currentCrm === "other_crm" || currentCrm === "notion";
    const wantsAdvanced =
      pain === "no_pipeline" ||
      pain === "prioritise" ||
      pain === "all" ||
      pain === "dont_know_follow" ||
      pain === "no_system" ||
      pain === "hard_write";

    if (teamSize === "15_plus") {
      return {
        path,
        planKey: PLAN.smartsales_team_custom,
        rangeKey: RANGE.custom,
        rationaleKeys: [R.smartsales_large_team],
      };
    }

    if (needsMigration) {
      return {
        path,
        planKey: PLAN.smartsales_pro_setup,
        rangeKey: RANGE.hkd_4800_15000,
        rationaleKeys: [R.smartsales_migration],
      };
    }

    if (wantsAdvanced || teamSize === "2_5" || teamSize === "6_15") {
      return {
        path,
        planKey: PLAN.smartsales_pro,
        rangeKey: RANGE.hkd_4800_mo,
        rationaleKeys: [R.smartsales_pro_fit],
      };
    }

    return {
      path,
      planKey: PLAN.smartsales_starter,
      rangeKey: RANGE.hkd_2800_mo,
      rationaleKeys: [R.smartsales_starter_fit],
    };
  }

  // consulting
  const stage = String(answers.consulting_stage || "");
  const goal = String(answers.consulting_goal || "");
  const budget = String(answers.consulting_budget || "");

  const stageImpl =
    stage === "implement_idea" || stage === "has_idea" || stage === "has_prototype";

  if (goal === "culture" || goal === "train_team") {
    return {
      path,
      planKey: PLAN.consulting_bootcamp,
      rangeKey: RANGE.from_12000,
      rationaleKeys: [R.consulting_training_goal],
    };
  }

  if (goal === "scale" || goal === "one_workflow" || stageImpl) {
    return {
      path,
      planKey: PLAN.consulting_agent,
      rangeKey: RANGE.from_25000,
      rationaleKeys: [R.consulting_build_focus],
    };
  }

  if (budget === "80k_plus") {
    return {
      path,
      planKey: PLAN.consulting_full,
      rangeKey: RANGE.from_80000,
      rationaleKeys: [R.consulting_budget_scope],
    };
  }

  return {
    path,
    planKey: PLAN.consulting_audit,
    rangeKey: RANGE.from_8000,
    rationaleKeys: [R.consulting_audit_entry],
  };
}

/** Maps answer field → i18n prefix for option ids (omit for free-text bundle_goal). */
export const WIZARD_ANSWER_OPTION_PREFIX: Record<string, string> = {
  eventxp_events_per_year: "wizard.eventxp.events",
  eventxp_size: "wizard.eventxp.size",
  eventxp_checkin: "wizard.eventxp.checkin",
  eventxp_outcome: "wizard.eventxp.outcome",
  eventxp_integration: "wizard.eventxp.integration",
  smartsales_team_size: "wizard.smartsales.team",
  smartsales_source: "wizard.smartsales.source",
  smartsales_pain: "wizard.smartsales.pain",
  smartsales_current_crm: "wizard.smartsales.crm",
  smartsales_urgency: "wizard.smartsales.urgency",
  consulting_stage: "wizard.consulting.stage",
  consulting_workflow: "wizard.consulting.workflow",
  consulting_stack: "wizard.consulting.stack",
  consulting_goal: "wizard.consulting.goal",
  consulting_budget: "wizard.consulting.budget",
  bundle_products: "wizard.bundle.product",
};

const SUMMARY_ANSWER_ORDER: string[] = [
  "eventxp_events_per_year",
  "eventxp_size",
  "eventxp_checkin",
  "eventxp_outcome",
  "eventxp_integration",
  "smartsales_team_size",
  "smartsales_source",
  "smartsales_pain",
  "smartsales_current_crm",
  "smartsales_urgency",
  "consulting_stage",
  "consulting_workflow",
  "consulting_stack",
  "consulting_goal",
  "consulting_budget",
  "bundle_products",
  "bundle_goal",
  "wizard_skip",
];

function formatAnswerValue(key: string, value: string | string[], t: (k: string) => string): string {
  if (key === "bundle_goal" || key === "wizard_skip") return String(value);

  if (Array.isArray(value)) {
    const prefix = WIZARD_ANSWER_OPTION_PREFIX[key];
    if (!prefix) return value.join(", ");
    return value.map((id) => t(`${prefix}.${id}`)).join(", ");
  }

  const prefix = WIZARD_ANSWER_OPTION_PREFIX[key];
  if (prefix) return t(`${prefix}.${value}`);
  return String(value);
}

/**
 * Localized multi-line summary for booking message / contact prefill.
 */
export function formatQuoteSummary(computed: QuoteComputed, answers: QuoteAnswers, t: (k: string) => string): string {
  const lines: string[] = [];
  lines.push(`${t("wizard.summary.product")}: ${t(`wizard.paths.${computed.path}`)}`);
  lines.push(`${t("wizard.summary.plan")}: ${t(computed.planKey)}`);
  lines.push(`${t("wizard.summary.estimated")}: ${t(computed.rangeKey)}`);

  if (computed.rationaleKeys.length) {
    lines.push("");
    lines.push(`${t("wizard.summary.why")}:`);
    for (const rk of computed.rationaleKeys) {
      lines.push(`- ${t(rk)}`);
    }
  }

  lines.push("");
  lines.push(`${t("wizard.summary.answers_header")}:`);
  for (const k of SUMMARY_ANSWER_ORDER) {
    if (!(k in answers)) continue;
    const v = answers[k];
    if (v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    const label = t(`wizard.summary.label.${k}`);
    lines.push(`- ${label}: ${formatAnswerValue(k, v, t)}`);
  }

  return lines.join("\n");
}

/** Plain Q&A for CRM / wizard-lead email (no plan block). */
export function formatDiagnosticAnswersOnly(
  path: QuotePath,
  answers: QuoteAnswers,
  t: (k: string) => string
): string {
  const lines: string[] = [];
  lines.push(`${t("wizard.summary.product")}: ${t(`wizard.paths.${path}`)}`);
  lines.push("");
  for (const k of SUMMARY_ANSWER_ORDER) {
    if (!(k in answers)) continue;
    const v = answers[k];
    if (v === undefined || v === "") continue;
    if (Array.isArray(v) && v.length === 0) continue;
    const label = t(`wizard.summary.label.${k}`);
    lines.push(`${label}: ${formatAnswerValue(k, v, t)}`);
  }
  return lines.join("\n");
}
