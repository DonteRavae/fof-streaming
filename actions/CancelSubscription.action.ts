"use server";

// NEXT.JS
import { cookies } from "next/headers";
// INTERNAL
import * as db from "@/utils/db";
import { validateAccessToken } from "@/utils/jwt";
// EXTERNAL
import Stripe from "stripe";
import { redirect } from "next/navigation";
import signOut from "./SignOut.action";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!);

export default async function cancelSubscription() {
  const accessCookie = cookies().get("ffat");
  if (!accessCookie) return;
  const claims = await validateAccessToken(accessCookie.value);
  if (!claims) return;

  try {
    const subscriptionId = await db.getSubscriptionId(claims.sub!);
    await stripe.subscriptions.cancel(subscriptionId);
    await signOut();
    return redirect("/");
  } catch (error) {
    console.log(error);
    return;
  }
}
