import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { adminConfigured, hasAdminSession } from "@/lib/admin-auth";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "營運後台 | InnovateXP",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await hasAdminSession()) redirect("/admin/orders");
  const { error } = await searchParams;
  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-16 text-[#251f19]">
      <div className="mx-auto max-w-md border border-[#c8bba9] bg-[#fffdfa] p-7">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b43]">InnovateXP / Operations</p>
        <h1 className="mt-3 text-2xl">營運後台</h1>
        <p className="mt-2 text-sm leading-6 text-[#51483d]">查看已付款訂單及點數購買名單。只供授權人員使用。</p>
        {adminConfigured() ? (
          <form method="post" action="/api/admin/login" className="mt-6 space-y-4">
            <label className="block text-sm">
              密碼
              <input
                type="password"
                name="password"
                required
                autoFocus
                autoComplete="current-password"
                className="mt-2 block min-h-11 w-full border border-[#c8bba9] bg-white p-3 text-[#251f19]"
              />
            </label>
            <button type="submit" className="inline-flex min-h-11 w-full items-center justify-center bg-[#251f19] px-6 py-3 text-white">
              登入
            </button>
            {error ? (
              <p role="alert" className="text-sm leading-6 text-[#8a2c1d]">
                {error === "rate" ? "嘗試次數太多，請 15 分鐘後再試。" : "密碼不正確，請再試。"}
              </p>
            ) : null}
          </form>
        ) : (
          <p className="mt-6 text-sm leading-6 text-[#8a2c1d]">後台未啟用。請在伺服器設定 ADMIN_PANEL_SECRET。</p>
        )}
      </div>
    </main>
  );
}
