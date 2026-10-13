import { runNotificationJobs } from "@/lib/commerce/jobs";

export const runtime = "nodejs";
/** Vercel Cron sends GET with CRON_SECRET. Schedule only after plan/cadence approval. */
export async function GET(req: Request) {
  return runNotificationJobs(req, process.env.CRON_SECRET);
}
