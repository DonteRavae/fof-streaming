"use server";

// NEXT.JS
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
// INTERNAL
import * as db from "@/utils/db";
import { Subscriber } from "@/utils/interfaces";
import { validateAccessToken } from "@/utils/jwt";

export default async function checkAuthentication(): Promise<Subscriber | null> {
  const accessCookie = cookies().get("ffat");
  const refreshCookie = cookies().get("ffrt");
  if (!refreshCookie) redirect("/");

  if (!accessCookie) return db.refresh(refreshCookie.value);
  const accessTokenClaims = await validateAccessToken(accessCookie.value);
  if (!accessTokenClaims) return db.refresh(refreshCookie.value);
  else return await db.find_subscriber_by_id(accessTokenClaims.sub!);
}
