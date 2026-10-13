import { runNotificationJobs } from "@/lib/commerce/jobs";

export const runtime = "nodejs";
export async function POST(req: Request) {
  return runNotificationJobs(req, process.env.COMMERCE_JOB_SECRET);
}
