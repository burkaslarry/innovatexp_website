export const PROVIDER_TIMEZONE = "Asia/Hong_Kong";
export const SLOT_MINUTES = 30;
export function validTimezone(value: unknown): value is string {
  if (typeof value !== "string" || value.length > 80) return false;
  try { new Intl.DateTimeFormat("en", { timeZone: value }); return true; } catch { return false; }
}
export function slotsForDay(day: string): { start: string; end: string }[] {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(day)) return [];
  const start = new Date(`${day}T10:00:00+08:00`);
  if (Number.isNaN(start.getTime()) || new Intl.DateTimeFormat("en-CA", { timeZone: PROVIDER_TIMEZONE, year: "numeric", month: "2-digit", day: "2-digit" }).format(start) !== day) return [];
  return Array.from({ length: 20 }, (_, i) => ({ start: new Date(start.getTime() + i * SLOT_MINUTES * 60_000).toISOString(), end: new Date(start.getTime() + (i + 1) * SLOT_MINUTES * 60_000).toISOString() }));
}
export function validBookingSlot(day: unknown, start: unknown, end: unknown, now = Date.now()): boolean {
  if (typeof day !== "string" || typeof start !== "string" || typeof end !== "string") return false;
  const s = Date.parse(start), e = Date.parse(end);
  return s > now && s < now + 180 * 86400_000 && slotsForDay(day).some((slot) => Date.parse(slot.start) === s && Date.parse(slot.end) === e);
}
export function slotLabel(start: string, end: string, timezone = PROVIDER_TIMEZONE, locale = "en") {
  const fmt = new Intl.DateTimeFormat(locale, { timeZone: timezone, month: "short", day: "numeric", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
  return `${fmt.format(new Date(start))} – ${fmt.format(new Date(end))} (${timezone})`;
}
