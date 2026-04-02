/**
 * Web3Forms (https://web3forms.com) — contact email API, not a crypto wallet.
 *
 * Recipients: each access key sends to the inbox verified in the Web3Forms dashboard
 * for that key — you cannot set info@ purely in code unless that key was created for it.
 *
 * - Contact form: `submitToWeb3FormsContact` → all keys in getWeb3FormsAccessKeysForContact()
 * - Server-only preference: `WEB3FORMS_ACCESS_KEY` overrides the first public key for single-key sends.
 */

const LEGACY_KEYS = [
  "5561f46b-c354-4847-9f43-13e57e8d2e68",
] as const;

const SUBMIT_URL = "https://api.web3forms.com/submit";

/** Undici/Node default User-Agent is often challenged by Cloudflare; align with browser submits. */
const WEB3FORMS_HEADERS: HeadersInit = {
  "Content-Type": "application/json",
  Accept: "application/json",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
};

/**
 * Keys used when posting to Web3Forms from multiple entry points.
 * - Server routes (wizard-lead, etc.): include `WEB3FORMS_ACCESS_KEY` first so Vercel-only
 *   secrets work (this var is not exposed to the browser).
 * - Client (ContactForm): only `NEXT_PUBLIC_*` keys exist in the bundle; server key is absent.
 */
export function getWeb3FormsAccessKeysForContact(): string[] {
  const ordered: string[] = [];
  const serverKey = process.env.WEB3FORMS_ACCESS_KEY?.trim();
  if (serverKey) ordered.push(serverKey);
  const k1 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  const k2 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2?.trim();
  if (k1) ordered.push(k1);
  if (k2) ordered.push(k2);
  const unique = [...new Set(ordered.filter(Boolean))];
  if (unique.length > 0) return unique;
  return [...LEGACY_KEYS];
}

/** Single key for server-side notifications (e.g. booking confirmation) — no duplicate emails. */
export function getPrimaryWeb3FormsAccessKey(): string {
  const keys = getWeb3FormsAccessKeysForContact();
  return keys[0] ?? LEGACY_KEYS[0];
}

/**
 * Preferred key for server-side sends.
 * Use a non-public env var when available, fallback to the primary public key.
 */
export function getServerWeb3FormsAccessKey(): string {
  return process.env.WEB3FORMS_ACCESS_KEY?.trim() || getPrimaryWeb3FormsAccessKey();
}

export async function submitToWeb3FormsServer(fields: Record<string, string>) {
  const access_key = getServerWeb3FormsAccessKey();
  const rest = { ...fields, access_key };
  const response = await fetch(SUBMIT_URL, {
    method: "POST",
    headers: WEB3FORMS_HEADERS,
    body: JSON.stringify(rest),
  });
  const text = await response.text();
  try {
    const data = JSON.parse(text) as { success?: boolean; message?: string };
    return { ok: response.ok, success: Boolean(data.success), message: data.message };
  } catch {
    return { ok: response.ok, success: false, message: text.slice(0, 500) };
  }
}

export type Web3FormsSubmitResult = {
  success: boolean;
  /** True if every configured key returned success */
  allSucceeded: boolean;
};

/**
 * POST the same payload to each access key (Web3Forms requires access_key per request).
 * Strips any existing access_key from fields and attaches the correct key per call.
 */
export async function submitToWeb3FormsContact(
  fields: Record<string, string>
): Promise<Web3FormsSubmitResult & { detail?: string }> {
  const keys = getWeb3FormsAccessKeysForContact();
  const rest = { ...fields };
  delete rest.access_key;

  const outcomes = await Promise.all(
    keys.map(async (access_key) => {
      const body = JSON.stringify({ ...rest, access_key });
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: WEB3FORMS_HEADERS,
        body,
      });
      const text = await response.text();
      try {
        const data = JSON.parse(text) as { success?: boolean; message?: string };
        return {
          ok: Boolean(data.success),
          message: data.message ?? (data.success ? undefined : text.slice(0, 240)),
        };
      } catch {
        return {
          ok: false as const,
          message: text.includes("Just a moment")
            ? "Blocked by Cloudflare (use browser submit or try again later)"
            : text.slice(0, 240),
        };
      }
    })
  );

  const successCount = outcomes.filter((o) => o.ok).length;
  const detail = outcomes.find((o) => !o.ok && o.message)?.message;
  return {
    success: successCount > 0,
    allSucceeded: successCount === keys.length && keys.length > 0,
    detail,
  };
}
