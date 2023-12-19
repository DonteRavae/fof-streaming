"use server";

// INTERNAL
import * as db from "@/utils/db";
import { getAccessTokenClaims } from "@/utils/helpers";

export default async function getStripeCustomerId() {
  const claims = await getAccessTokenClaims();
  if (!claims) return;
  return await db.getStripeCustomerId(claims.sub!);
}
