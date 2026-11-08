-- Additive only; apply to an isolated preview database before any production rollout.
BEGIN;
CREATE TABLE IF NOT EXISTS commerce_checkouts (
  id UUID PRIMARY KEY,
  request_id UUID NOT NULL UNIQUE,
  fingerprint TEXT NOT NULL,
  email TEXT NOT NULL, locale TEXT NOT NULL, livemode BOOLEAN NOT NULL,
  currency TEXT NOT NULL CHECK (currency = 'hkd'),
  amount INTEGER NOT NULL CHECK (amount > 0),
  mode TEXT NOT NULL CHECK (mode IN ('payment', 'subscription')),
  items JSONB NOT NULL CHECK (jsonb_typeof(items) = 'array' AND jsonb_array_length(items) BETWEEN 1 AND 8),
  access_expires_at TIMESTAMPTZ NOT NULL,
  checkout_session TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CHECK (mode <> 'subscription' OR jsonb_array_length(items) = 1)
);
ALTER TABLE commerce_orders ADD COLUMN IF NOT EXISTS checkout_id UUID REFERENCES commerce_checkouts(id);
CREATE INDEX IF NOT EXISTS commerce_orders_checkout_id ON commerce_orders(checkout_id);
COMMIT;
