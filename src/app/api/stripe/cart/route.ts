import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/site-url";
import { enforceFormSubmissionLimit } from "@/lib/form-submission-limit";
import { cartAvailableOffers } from "@/lib/commerce/config";
import { CartError, normalizeCartRequest, setCartCookie, startCartCheckout } from "@/lib/commerce/cart";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const headers = { "Cache-Control": "no-store" };
export async function GET() {
  return NextResponse.json({ availableOffers: cartAvailableOffers() }, { headers });
}

async function readBody(req: Request): Promise<unknown> {
  if (Number(req.headers.get("content-length") || 0) > 4096) throw new CartError("Request too large", 413);
  if (req.headers.get("content-type")?.split(";")[0].trim().toLowerCase() !== "application/json") throw new CartError("JSON required", 400);
  const reader = req.body?.getReader();
  if (!reader) throw new CartError("Invalid checkout request", 400);
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > 4096) { await reader.cancel(); throw new CartError("Request too large", 413); }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new CartError("Invalid checkout request", 400); }
}

export async function POST(req: Request) {
  try {
    const site = new URL(getSiteUrl()).origin;
    if (req.headers.get("origin") !== site) throw new CartError("Invalid origin", 403);
    const input = normalizeCartRequest(await readBody(req));
    const available = cartAvailableOffers();
    if (input.items.some((i) => !available.includes(i.offer))) throw new CartError("Payment temporarily unavailable", 503);
    const blocked = await enforceFormSubmissionLimit(req);
    if (blocked) { blocked.headers.set("Cache-Control", "no-store"); return blocked; }
    const { cart, url } = await startCartCheckout(input, site);
    await setCartCookie(cart);
    return NextResponse.json({ url }, { headers });
  } catch (error) {
    return NextResponse.json({ error: error instanceof CartError ? error.message : "Payment temporarily unavailable" }, {
      status: error instanceof CartError ? error.status : 503, headers,
    });
  }
}
