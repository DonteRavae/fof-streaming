// INTERNAL
import * as db from "@/utils/db";
import { StripeDetails } from "@/utils/interfaces";
import { validateAccessToken } from "@/utils/jwt";
import { cookies } from "next/headers";
// EXTERNAL
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!);

export default async function getStripeDetails(): Promise<
  StripeDetails | undefined
> {
  const accessCookie = cookies().get("ffat");
  if (!accessCookie) return;
  const claims = await validateAccessToken(accessCookie.value);
  if (!claims) return;

  try {
    const subscriptionId = await db.getSubscriptionId(claims.sub!);
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    const paymentMethodId = subscription.default_payment_method as string;
    const paymentMethod = await stripe.paymentMethods.retrieve(paymentMethodId);

    return {
      paymentMethodBrand: paymentMethod.card!.brand,
      paymentMethodLastFour: paymentMethod.card!.last4,
      billingInterval:
        subscription.items.data[0].price.recurring!.interval.toString(),
      subscriptionStartDate: subscription.start_date,
      nextBillingDate: subscription.current_period_end,
    };
  } catch (error) {
    console.error(error);
    return;
  }
}
