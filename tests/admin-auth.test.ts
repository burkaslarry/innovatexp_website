import "next/dist/server/node-environment-baseline";
import { test } from "node:test";
import assert from "node:assert/strict";
import { adminConfigured, createSessionValue, passwordMatches, verifySessionValue } from "@/lib/admin-auth";

test("admin panel stays disabled without a long secret, then accepts only the exact password", () => {
  const previousAdmin = process.env.ADMIN_PANEL_SECRET;
  const previousCron = process.env.CRON_SECRET;
  const restore = () => {
    if (previousAdmin === undefined) delete process.env.ADMIN_PANEL_SECRET;
    else process.env.ADMIN_PANEL_SECRET = previousAdmin;
    if (previousCron === undefined) delete process.env.CRON_SECRET;
    else process.env.CRON_SECRET = previousCron;
  };
  try {
    delete process.env.ADMIN_PANEL_SECRET;
    delete process.env.CRON_SECRET;
    assert.equal(adminConfigured(), false);
    assert.equal(passwordMatches("anything"), false);
    assert.equal(verifySessionValue("1.2.3"), false);

    const secret = "ops-panel-test-secret-0123456789abcdef";
    process.env.ADMIN_PANEL_SECRET = secret;
    assert.equal(adminConfigured(), true);
    assert.equal(passwordMatches(secret), true);
    assert.equal(passwordMatches(`${secret}!`), false);
    assert.equal(passwordMatches(""), false);

    const { value } = createSessionValue();
    assert.equal(verifySessionValue(value), true);
    const [expires, nonce, mac] = value.split(".");
    assert.equal(verifySessionValue(`${expires}.${nonce}.${mac.slice(0, -1)}${mac.endsWith("0") ? "1" : "0"}`), false);
    assert.equal(verifySessionValue(`${expires}.${nonce}`), false);
    assert.equal(verifySessionValue(`${Number(expires) - 86_400_000}.${nonce}.${mac}`), false);
  } finally {
    restore();
  }
});
