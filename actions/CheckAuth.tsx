"use server";

// NEXT.JS
import { cookies } from "next/headers";
// INTERNAL
import * as db from "@/utils/db";
import { validateAccessToken } from "@/utils/jwt";

export default async function checkAuth(pid: string | null) {
  const access_cookie = cookies().get("ffat");
  if (!access_cookie) return null;

  if (validateAccessToken(access_cookie.value)) {
    if (pid) return await db.get_profile_by_id(pid);
  } else {
    const refresh_cookie = cookies().get("ffrt");
    if (!refresh_cookie) return null;
    if (pid) return await db.refresh(refresh_cookie.value, pid);
  }
}
