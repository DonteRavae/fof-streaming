"use server";

// NEXT.JS
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// INTERNAL
import * as db from "../utils/db";

export default async function signOut() {
  const refreshCookie = cookies().get("ffrt");
  if (!refreshCookie) return;

  const refreshToken = refreshCookie.value;
  if (!refreshToken) return;

  await db.logout_subscriber(refreshToken);

  cookies().delete("ffrt");
  cookies().delete("ffat");
}
