import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { hasAdminSession } from "@/lib/admin-auth";
import { commerceSql } from "@/lib/commerce/orders";
import { OFFERS, isOfferId } from "@/content/commerce";
import { creditsForOffer } from "@/content/credit-checkout";

export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "訂單及點數名單 | InnovateXP",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

type OrderRow = {
  id: string;
  created_at: string;
  email: string;
  offer: string;
  amount: number;
  payment_state: string;
  subscription_status: string | null;
  locale: string;
  livemode: boolean;
};
type SummaryRow = { offer: string; payment_state: string; orders: number; amount: number };
type CreditRow = { email: string; orders: number; credits: number; last_paid: string };

const STATE_LABEL: Record<string, string> = {
  pending: "待付款",
  paid: "已付款",
  failed: "未完成",
  refunded: "已退款",
  partially_refunded: "部分退款",
};

const money = (cents: number) => `HK$${(cents / 100).toLocaleString("en-HK")}`;
const when = (value: string) =>
  new Intl.DateTimeFormat("zh-HK", { timeZone: "Asia/Hong_Kong", dateStyle: "medium", timeStyle: "short" }).format(new Date(value));

export default async function AdminOrdersPage({
  searchParams,
}: {
  searchParams: Promise<{ email?: string }>;
}) {
  if (!(await hasAdminSession())) redirect("/admin");
  const { email = "" } = await searchParams;
  const filter = email.trim().toLowerCase().slice(0, 120);

  let rows: OrderRow[] = [];
  let summary: SummaryRow[] = [];
  let creditRows: CreditRow[] = [];
  let loadError = "";
  let isLive = false;

  try {
    const sql = commerceSql();
    const recent = filter
      ? sql`SELECT id, created_at, email, offer, amount, payment_state, subscription_status, locale, livemode
          FROM innovatexp_website_commerce_orders WHERE lower(email) LIKE ${`%${filter}%`}
          ORDER BY created_at DESC LIMIT 200`
      : sql`SELECT id, created_at, email, offer, amount, payment_state, subscription_status, locale, livemode
          FROM innovatexp_website_commerce_orders ORDER BY created_at DESC LIMIT 200`;
    const [orderRows, summaryRows, credits] = await Promise.all([
      recent,
      sql`SELECT offer, payment_state, count(*)::integer AS orders, COALESCE(sum(amount), 0)::integer AS amount
          FROM innovatexp_website_commerce_orders GROUP BY offer, payment_state`,
      sql`SELECT lower(email) AS email, count(*)::integer AS orders,
            COALESCE(sum(CASE offer WHEN 'sessionCredits1000' THEN 1000 WHEN 'sessionCredits2000' THEN 2200
              WHEN 'sessionCredits4000' THEN 4400 ELSE 0 END), 0)::integer AS credits,
            max(created_at) AS last_paid
          FROM innovatexp_website_commerce_orders
          WHERE payment_state = 'paid' AND offer LIKE 'sessionCredits%'
          GROUP BY lower(email) ORDER BY credits DESC LIMIT 100`,
    ]);
    rows = orderRows as unknown as OrderRow[];
    summary = summaryRows as unknown as SummaryRow[];
    creditRows = credits as unknown as CreditRow[];
    isLive = rows.some((row) => row.livemode);
  } catch {
    loadError = "無法讀取訂單資料。請檢查 DATABASE_URL 及資料表。";
  }

  const paid = summary.filter((row) => row.payment_state === "paid");
  const paidOrders = paid.reduce((total, row) => total + Number(row.orders), 0);
  const paidAmount = paid.reduce((total, row) => total + Number(row.amount), 0);
  const creditsSold = creditRows.reduce((total, row) => total + Number(row.credits), 0);
  const activeSubscriptions = rows.filter(
    (row) => row.subscription_status && ["active", "trialing", "past_due"].includes(row.subscription_status),
  ).length;

  return (
    <main className="min-h-screen bg-[#f7f4ee] px-5 py-10 text-[#251f19] md:px-10">
      <div className="mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-[#c8bba9] pb-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8b6b43]">InnovateXP / Operations</p>
            <h1 className="mt-2 text-3xl">訂單及點數名單</h1>
            <p className="mt-2 text-sm text-[#51483d]">
              {isLive ? "Live mode" : "未見 live mode 訂單"} · 只記購買，未記實際出席；出席及扣鐘以 WhatsApp 及人手紀錄為準。
            </p>
          </div>
          <form method="post" action="/api/admin/logout">
            <button type="submit" className="min-h-11 border border-[#c8bba9] px-5 py-2 text-sm">
              登出
            </button>
          </form>
        </header>

        {loadError ? (
          <p role="alert" className="mt-6 border border-[#8a2c1d] p-4 text-sm">
            {loadError}
          </p>
        ) : (
          <>
            <section className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4" aria-label="Summary">
              {[
                { label: "已付款訂單", value: paidOrders.toLocaleString("en-HK") },
                { label: "已收款", value: money(paidAmount) },
                { label: "已售點數", value: creditsSold.toLocaleString("en-HK") },
                { label: "訂閱中（現有列表）", value: activeSubscriptions.toLocaleString("en-HK") },
              ].map((tile) => (
                <div key={tile.label} className="border border-[#c8bba9] bg-[#fffdfa] p-4">
                  <p className="text-xs uppercase tracking-[0.12em] text-[#8b6b43]">{tile.label}</p>
                  <p className="mt-2 text-2xl">{tile.value}</p>
                </div>
              ))}
            </section>

            <section className="mt-10" aria-labelledby="credit-buyers">
              <h2 id="credit-buyers" className="text-xl">
                點數買家（已付款）
              </h2>
              <p className="mt-2 text-sm text-[#51483d]">
                買家按付款電郵列出。1,000 點 = 3 節，2,200 點 = 7 節餘 100，4,400 點 = 14 節餘 200。
              </p>
              {creditRows.length ? (
                <div className="mt-4 overflow-x-auto border border-[#c8bba9] bg-[#fffdfa]">
                  <table className="w-full min-w-[640px] border-collapse text-sm">
                    <thead className="border-b border-[#c8bba9] text-left">
                      <tr>
                        <th className="p-3 font-semibold">電郵</th>
                        <th className="p-3 font-semibold">已購點數</th>
                        <th className="p-3 font-semibold">折合節數</th>
                        <th className="p-3 font-semibold">訂單</th>
                        <th className="p-3 font-semibold">最近付款</th>
                      </tr>
                    </thead>
                    <tbody>
                      {creditRows.map((row) => (
                        <tr key={row.email} className="border-b border-[#e6ded2] last:border-0">
                          <td className="p-3">{row.email}</td>
                          <td className="p-3">{Number(row.credits).toLocaleString("en-HK")}</td>
                          <td className="p-3">
                            {Math.floor(Number(row.credits) / 300)} 節
                            {Number(row.credits) % 300 ? `（餘 ${Number(row.credits) % 300} 點）` : ""}
                          </td>
                          <td className="p-3">{Number(row.orders)}</td>
                          <td className="p-3">{when(row.last_paid)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 border border-[#c8bba9] p-4 text-sm">未有點數購買紀錄。</p>
              )}
            </section>

            <section className="mt-10" aria-labelledby="orders">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 id="orders" className="text-xl">
                    最近訂單
                  </h2>
                  <p className="mt-2 text-sm text-[#51483d]">最多顯示 200 單。以香港時間顯示。</p>
                </div>
                <form method="get" className="flex items-end gap-2">
                  <label className="text-sm">
                    電郵
                    <input
                      type="search"
                      name="email"
                      defaultValue={filter}
                      className="mt-1 block min-h-10 w-56 border border-[#c8bba9] bg-white px-3"
                    />
                  </label>
                  <button type="submit" className="min-h-10 bg-[#251f19] px-4 text-sm text-white">
                    篩選
                  </button>
                  {filter ? (
                    <Link className="min-h-10 py-2 text-sm underline" href="/admin/orders">
                      清除
                    </Link>
                  ) : null}
                </form>
              </div>

              {rows.length ? (
                <div className="mt-4 overflow-x-auto border border-[#c8bba9] bg-[#fffdfa]">
                  <table className="w-full min-w-[820px] border-collapse text-sm">
                    <thead className="border-b border-[#c8bba9] text-left">
                      <tr>
                        <th className="p-3 font-semibold">日期</th>
                        <th className="p-3 font-semibold">電郵</th>
                        <th className="p-3 font-semibold">產品</th>
                        <th className="p-3 font-semibold">金額</th>
                        <th className="p-3 font-semibold">付款狀態</th>
                        <th className="p-3 font-semibold">訂閱</th>
                        <th className="p-3 font-semibold">語言</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row) => (
                        <tr key={row.id} className="border-b border-[#e6ded2] last:border-0">
                          <td className="p-3 whitespace-nowrap">{when(row.created_at)}</td>
                          <td className="p-3">{row.email}</td>
                          <td className="p-3">
                            {isOfferId(row.offer) ? OFFERS[row.offer].name : row.offer}
                            {creditsForOffer(row.offer) > 0 ? (
                              <span className="ml-2 text-xs text-[#8b6b43]">
                                {creditsForOffer(row.offer).toLocaleString("en-HK")} 點
                              </span>
                            ) : null}
                          </td>
                          <td className="p-3 whitespace-nowrap">{money(Number(row.amount))}</td>
                          <td className="p-3 whitespace-nowrap">{STATE_LABEL[row.payment_state] ?? row.payment_state}</td>
                          <td className="p-3">{row.subscription_status ?? "—"}</td>
                          <td className="p-3">{row.locale}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="mt-4 border border-[#c8bba9] p-4 text-sm">
                  {filter ? "此電郵未有訂單。" : "暫時未有訂單。"}
                </p>
              )}
            </section>

            <section className="mt-10 border-t border-[#c8bba9] pt-5 text-sm leading-7 text-[#51483d]">
              <h2 className="text-base font-semibold text-[#251f19]">按產品及狀態</h2>
              <ul className="mt-2 space-y-1">
                {summary.map((row) => (
                  <li key={`${row.offer}-${row.payment_state}`}>
                    {isOfferId(row.offer) ? OFFERS[row.offer].name : row.offer} · {STATE_LABEL[row.payment_state] ?? row.payment_state} ·{" "}
                    {Number(row.orders)} 單 · {money(Number(row.amount))}
                  </li>
                ))}
              </ul>
            </section>
          </>
        )}
      </div>
    </main>
  );
}
