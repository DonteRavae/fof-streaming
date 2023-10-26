"use server";

// NEXT.JS
import { cookies } from "next/headers";
// INTERNAL
import * as db from "@/utils/db";
import { validateAccessToken } from "@/utils/jwt";
import { IProfile } from "@/utils/interfaces";

export default async function checkAuth(
  pid: string | null
): Promise<[IProfile, IProfile[]] | null> {
  const access_cookie = cookies().get("ffat");
  if (!access_cookie) return null;

  if (pid) {
    if (validateAccessToken(access_cookie.value)) {
      return await db.refresh_profiles_by_id(pid);
    } else {
      const refresh_cookie = cookies().get("ffrt");
      if (!refresh_cookie) return null;
      return await db.refresh(refresh_cookie.value, pid);
    }
  } else return null;
}
