import { cookies } from "next/headers";
import { getOrder } from "./orders";
import { verifyOrderToken } from "./tokens";

export const ORDER_COOKIE = "ixp_order_access";
export async function currentOrder() {
  const token = (await cookies()).get(ORDER_COOKIE)?.value;
  const id = verifyOrderToken(token);
  if (!id) return null;
  const order = await getOrder(id);
  return order && new Date(order.access_expires_at).getTime() > Date.now() ? order : null;
}
export async function setOrderCookie(token: string) {
  (await cookies()).set(ORDER_COOKIE, token, {
    httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 30 * 86400,
  });
}
