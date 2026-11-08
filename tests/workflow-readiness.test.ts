import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { WorkflowReadiness } from "@/components/questionnaires/WorkflowReadiness";
import { CaseComparison } from "@/components/CaseComparison";
import { getCaseStudies } from "@/content/case-studies";
import { LOCALES } from "@/lib/i18n-routing";
import {
  INITIAL_READINESS_STATE,
  READINESS_CHOICES,
  READINESS_QUESTIONS,
  WORKFLOW_READINESS_COPY,
  missingReadinessAnswers,
  recommendWorkflowReadiness,
  workflowReadinessReducer,
  type ReadinessAnswers,
  type ReadinessState,
} from "@/content/questionnaires/workflow-readiness";

const ready: ReadinessAnswers = { workflow: "ready", data: "ready", owner: "ready", acceptance: "ready" };

function escapeHtml(text: string): string {
  return renderToStaticMarkup(createElement(Fragment, null, text));
}

test("readiness requires every answer and rejects invalid values without a result", () => {
  assert.deepEqual(missingReadinessAnswers({}), [...READINESS_QUESTIONS]);
  assert.equal(recommendWorkflowReadiness({}), null);
  for (const question of READINESS_QUESTIONS) {
    const incomplete = { ...ready };
    delete incomplete[question];
    assert.deepEqual(missingReadinessAnswers(incomplete), [question]);
    assert.equal(recommendWorkflowReadiness(incomplete), null);
    assert.equal(recommendWorkflowReadiness({ ...ready, [question]: "forged" } as ReadinessAnswers), null);
  }
});

test("all 81 answer combinations follow deterministic dependency rules; unsure is valid", () => {
  const counts = { "clarify-workflow": 0, "prepare-data": 0, "scope-pilot": 0 };
  for (const workflow of READINESS_CHOICES) for (const data of READINESS_CHOICES) {
    for (const owner of READINESS_CHOICES) for (const acceptance of READINESS_CHOICES) {
      const answers = { workflow, data, owner, acceptance };
      assert.deepEqual(missingReadinessAnswers(answers), []);
      const expected = workflow !== "ready" || owner !== "ready" || acceptance !== "ready"
        ? "clarify-workflow" : data !== "ready" ? "prepare-data" : "scope-pilot";
      assert.equal(recommendWorkflowReadiness(answers), expected);
      counts[expected]++;
    }
  }
  assert.deepEqual(counts, { "clarify-workflow": 78, "prepare-data": 2, "scope-pilot": 1 });
});

test("answers never auto-produce a result; edits and reset clear stale results without mutation", () => {
  let state: ReadinessState = workflowReadinessReducer(INITIAL_READINESS_STATE, { type: "submit" });
  assert.equal(state.missing.length, 4);
  for (const question of READINESS_QUESTIONS) {
    state = workflowReadinessReducer(state, { type: "answer", question, choice: "ready" });
    assert.equal(state.recommendation, null);
  }
  assert.deepEqual(state.missing, []);
  state = workflowReadinessReducer(state, { type: "submit" });
  assert.equal(state.recommendation, "scope-pilot");
  const previous = state;
  state = workflowReadinessReducer(state, { type: "answer", question: "data", choice: "unsure" });
  assert.equal(state.recommendation, null);
  assert.equal(previous.answers.data, "ready");
  state = workflowReadinessReducer(state, { type: "submit" });
  assert.equal(state.recommendation, "prepare-data");
  assert.deepEqual(workflowReadinessReducer(state, { type: "reset" }), INITIAL_READINESS_STATE);
  assert.deepEqual(INITIAL_READINESS_STATE.answers, {});
});

test("five locales provide complete questions, boundaries, evidence and next steps without English fallback", () => {
  assert.deepEqual(Object.keys(WORKFLOW_READINESS_COPY).sort(), [...LOCALES].sort());
  for (const locale of LOCALES) {
    const copy = WORKFLOW_READINESS_COPY[locale];
    assert.match(copy.boundary, /HK\$3,880/);
    assert.match(copy.boundary, /AI Readiness Snapshot/);
    for (const [key, value] of Object.entries(copy)) {
      if (typeof value === "string") {
        assert.ok(value.trim(), `${locale}.${key}`);
        if (locale !== "en") assert.notEqual(value, WORKFLOW_READINESS_COPY.en[key as keyof typeof copy]);
      }
    }
    assert.deepEqual(Object.keys(copy.questions), [...READINESS_QUESTIONS]);
    for (const question of READINESS_QUESTIONS) {
      for (const [key, value] of Object.entries(copy.questions[question])) {
        assert.ok(value.trim(), `${locale}.${question}.${key}`);
        if (locale !== "en") assert.notEqual(value, WORKFLOW_READINESS_COPY.en.questions[question][key as "label"]);
      }
    }
    for (const recommendation of Object.values(copy.recommendations)) {
      assert.ok(recommendation.title && recommendation.why);
      assert.equal(recommendation.steps.length, 3);
      assert.ok(recommendation.steps.every((step) => step.trim().length > 0));
    }
  }
});

test("self-check initial HTML has labeled required radio groups, no PII/form submission, and unique IDs per mount", () => {
  for (const locale of LOCALES) {
    const markup = renderToStaticMarkup(createElement(Fragment, null,
      createElement(WorkflowReadiness, { locale }), createElement(WorkflowReadiness, { locale }),
    ));
    assert.equal((markup.match(/<fieldset/g) || []).length, 8);
    assert.equal((markup.match(/<legend/g) || []).length, 8);
    assert.equal((markup.match(/type="radio"/g) || []).length, 24);
    assert.equal((markup.match(/required=""/g) || []).length, 24);
    assert.doesNotMatch(markup, /<form|<textarea|type="(?:email|tel|text|file)"/);
    assert.ok(markup.includes(`href="/${locale}/ai-consulting"`));
    const ids = [...markup.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(ids).size, ids.length);
    const names = [...markup.matchAll(/\bname="([^"]+)"/g)].map((match) => match[1]);
    assert.equal(new Set(names).size, 8);
    for (const match of markup.matchAll(/\bfor="([^"]+)"/g)) assert.ok(ids.includes(match[1]));
    for (const match of markup.matchAll(/aria-(?:labelledby|describedby)="([^"]+)"/g)) {
      for (const id of match[1].split(" ")) assert.ok(ids.includes(id), id);
    }
    for (const result of Object.values(WORKFLOW_READINESS_COPY[locale].recommendations)) {
      assert.ok(!markup.includes(escapeHtml(result.title)), "no premature result");
    }
  }
});

test("case comparison keeps authoritative before, delivered, outcomes and limitations visible without interaction", () => {
  for (const locale of LOCALES) for (const item of getCaseStudies(locale)) {
    const markup = renderToStaticMarkup(createElement(CaseComparison, { locale, item }));
    const visible = markup.replace(/<details[\s\S]*?<\/details>/g, "");
    for (const text of [...item.challenge, ...item.deliverables, ...item.outcomes, item.proofNote]) {
      assert.ok(visible.includes(escapeHtml(text)), `${locale}: ${text}`);
    }
    for (const text of item.approach) assert.ok(markup.includes(escapeHtml(text)));
    for (const link of [...item.proofLinks, ...item.relatedLinks]) {
      const href = link.href.startsWith("http") ? link.href : `/${locale}${link.href}`;
      assert.ok(visible.includes(`href="${escapeHtml(href)}"`));
      assert.ok(visible.includes(escapeHtml(link.label)));
    }
    assert.match(markup, /<summary/);
    assert.doesNotMatch(markup, /<img|<video|<canvas/);
  }
});

test("integration stays separate from intake, network and storage, and cases precede speaking", () => {
  const root = new URL("../", import.meta.url);
  const component = readFileSync(new URL("src/components/questionnaires/WorkflowReadiness.tsx", root), "utf8");
  const content = readFileSync(new URL("src/content/questionnaires/workflow-readiness.ts", root), "utf8");
  assert.doesNotMatch(component + content, /\b(?:fetch|XMLHttpRequest|localStorage|sessionStorage|sendBeacon)\b|\/api\//);
  assert.match(component, /useId\(/);
  assert.ok(component.includes("/${locale}/bookme"));
  const route = readFileSync(new URL("src/app/[locale]/ai-consultation-questionnaire/page.tsx", root), "utf8");
  assert.ok(route.indexOf("<WorkflowReadiness") < route.indexOf("<AiConsultationQuestionnaire"));
  assert.match(route, /buildWhatsAppHref/);
  assert.match(route, /whatsappHref=\{whatsappHref\}/);
  const cases = readFileSync(new URL("src/features/marketing/CaseStudiesPage.tsx", root), "utf8");
  assert.match(cases, /<SitePageShell/);
  assert.ok(cases.indexOf("<CaseComparison") < cases.indexOf("{speaking.map"));
  assert.ok(cases.indexOf("<CaseComparison") < cases.indexOf("{vision.statement}"));
});
