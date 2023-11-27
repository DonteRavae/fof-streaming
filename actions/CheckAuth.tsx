"use server";

// NEXT.JS
import { cookies } from "next/headers";
// INTERNAL
import * as db from "@/utils/db";
import { Subscriber } from "@/utils/interfaces";
import { validateAccessToken } from "@/utils/jwt";

export default async function checkAuth(): Promise<Subscriber | null> {
  const accessCookie = cookies().get("ffat");
  const refreshCookie = cookies().get("ffrt");
  if (!accessCookie || !refreshCookie) return null;

  const accessTokenClaims = validateAccessToken(accessCookie.value);
  if (!accessTokenClaims) return await db.refresh(refreshCookie.value);
  else return await db.find_subscriber_by_id(accessTokenClaims.sub!);
}
