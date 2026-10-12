-- Apply to an isolated preview database first. Never run automatically on deploy.
BEGIN;
CREATE TABLE IF NOT EXISTS commerce_orders (
 id UUID PRIMARY KEY, offer TEXT NOT NULL, locale TEXT NOT NULL, email TEXT NOT NULL,
 amount INTEGER NOT NULL CHECK (amount > 0), currency TEXT NOT NULL DEFAULT 'hkd',
 policy_version TEXT NOT NULL, livemode BOOLEAN NOT NULL,
 payment_state TEXT NOT NULL DEFAULT 'pending', fulfillment_state TEXT NOT NULL DEFAULT 'awaiting_payment',
 checkout_session TEXT UNIQUE, payment_intent TEXT, customer TEXT, subscription TEXT UNIQUE,
 subscription_status TEXT, stripe_event_created BIGINT NOT NULL DEFAULT 0,
 access_expires_at TIMESTAMPTZ NOT NULL, intake JSONB,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS commerce_payment_intent ON commerce_orders (payment_intent);
CREATE TABLE IF NOT EXISTS commerce_events (
 id TEXT PRIMARY KEY, type TEXT NOT NULL, created BIGINT NOT NULL, processed_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS commerce_outbox (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), order_id UUID NOT NULL REFERENCES commerce_orders(id),
 kind TEXT NOT NULL, attempts INTEGER NOT NULL DEFAULT 0, sent_at TIMESTAMPTZ,
 available_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), locked_until TIMESTAMPTZ,
 UNIQUE (order_id, kind)
);
CREATE TABLE IF NOT EXISTS commerce_invitations (
 token_hash TEXT PRIMARY KEY, offer TEXT NOT NULL, email TEXT NOT NULL, scope TEXT NOT NULL,
 expires_at TIMESTAMPTZ NOT NULL, order_id UUID UNIQUE REFERENCES commerce_orders(id) DEFERRABLE INITIALLY DEFERRED,
 created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS commerce_outcomes (
 id UUID PRIMARY KEY DEFAULT gen_random_uuid(), company TEXT NOT NULL, stage TEXT NOT NULL,
 order_id UUID REFERENCES commerce_orders(id), note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
COMMIT;
