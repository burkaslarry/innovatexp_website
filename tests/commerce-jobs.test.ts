import { test } from "node:test";
import assert from "node:assert/strict";
import { jobAuthorized } from "@/lib/commerce/jobs";
import { GET } from "@/app/api/commerce/cron/route";
import { POST } from "@/app/api/commerce/jobs/route";

test("jobs reject missing, wrong, short and multi-byte bearer credentials", () => {
  const secret = "a".repeat(40);
  const req = (auth?: string) => new Request("https://example.test/jobs", { headers: auth ? { authorization: auth } : {} });
  assert.equal(jobAuthorized(req(), secret), false);
  assert.equal(jobAuthorized(req(`Bearer ${"b".repeat(40)}`), secret), false);
  assert.equal(jobAuthorized(req(`Bearer ${secret}`), undefined), false);
  assert.equal(jobAuthorized(req("Bearer short"), "short"), false);
  assert.equal(jobAuthorized(req(`Bearer ${"é".repeat(40)}`), secret), false);
  assert.equal(jobAuthorized(req(`Bearer ${secret}`), secret), true);
});

test("cron and manual jobs have independent secrets and never run without authentication", async () => {
  const old = { ...process.env };
  try {
    process.env.CRON_SECRET = "c".repeat(40);
    process.env.COMMERCE_JOB_SECRET = "m".repeat(40);
    const req = (secret: string) => new Request("https://example.test/jobs", { headers: { authorization: `Bearer ${secret}` } });
    assert.equal((await GET(req(process.env.COMMERCE_JOB_SECRET))).status, 401);
    assert.equal((await POST(req(process.env.CRON_SECRET))).status, 401);
  } finally { process.env = old; }
});
