/**
 * Public WhatsApp CTAs go through /api/whatsapp so the number is never shown in UI
 * or shipped in client bundles. Set WHATSAPP_NUMBER (server env) on Vercel.
 * Booking (/bookme) remains the primary public contact path.
 */
export function buildWhatsAppHref(prefill: string): string {
  return `/api/whatsapp?text=${encodeURIComponent(prefill)}`;
}
