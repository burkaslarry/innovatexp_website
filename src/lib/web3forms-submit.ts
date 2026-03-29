/**
 * Web3Forms (https://web3forms.com) — contact email API, not a crypto wallet.
 * Two keys were used historically in this repo; we submit to all configured keys
 * so both inboxes receive the same inquiry unless you override via env.
 */

const LEGACY_KEYS = [
  "5561f46b-c354-4847-9f43-13e57e8d2e68",
] as const;

const SUBMIT_URL = "https://api.web3forms.com/submit";

/** Keys used for contact-form submissions (one or both legacy keys, or env). */
export function getWeb3FormsAccessKeysForContact(): string[] {
  const k1 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY?.trim();
  const k2 = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY_2?.trim();
  if (k1 || k2) {
    return [...new Set([k1, k2].filter(Boolean) as string[])];
  }
  return [...LEGACY_KEYS];
}

/** Single key for server-side notifications (e.g. booking confirmation) — no duplicate emails. */
export function getPrimaryWeb3FormsAccessKey(): string {
  const keys = getWeb3FormsAccessKeysForContact();
  return keys[0] ?? LEGACY_KEYS[0];
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
): Promise<Web3FormsSubmitResult> {
  const keys = getWeb3FormsAccessKeysForContact();
  const rest = { ...fields };
  delete rest.access_key;

  const outcomes = await Promise.all(
    keys.map(async (access_key) => {
      const body = JSON.stringify({ ...rest, access_key });
      const response = await fetch(SUBMIT_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body,
      });
      try {
        const data = (await response.json()) as { success?: boolean };
        return Boolean(data.success);
      } catch {
        return false;
      }
    })
  );

  const successCount = outcomes.filter(Boolean).length;
  return {
    success: successCount > 0,
    allSucceeded: successCount === keys.length && keys.length > 0,
  };
}
