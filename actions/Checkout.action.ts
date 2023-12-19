"use server";

// NEXT.JS
import { headers } from "next/headers";
import { redirect } from "next/navigation";
// EXTERNAL
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY as string);

export default async function checkout(
  formData: FormData,
  customerId?: string
): Promise<void> {
  const origin = headers().get("origin") || "http://localhost:3000";
  const userEmail = formData.get("email") as string;
  const interval = formData.get("interval") as string;

  let checkoutSession: Stripe.Checkout.Session | null = null;

  try {
    checkoutSession = await (customerId
      ? stripe.checkout.sessions.create({
          mode: "subscription",
          customer: customerId,
          line_items: [
            {
              price:
                interval === "monthly"
                  ? process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
                  : process.env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID,
              quantity: 1,
            },
          ],
          success_url: `${origin}/profiles/select?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/access/signup/checkout?session_id={CHECKOUT_SESSION_ID}`,
        })
      : stripe.checkout.sessions.create({
          mode: "subscription",
          customer_email: userEmail,
          line_items: [
            {
              price:
                interval === "monthly"
                  ? process.env.STRIPE_MONTHLY_SUBSCRIPTION_PRICE_ID
                  : process.env.STRIPE_YEARLY_SUBSCRIPTION_PRICE_ID,
              quantity: 1,
            },
          ],
          success_url: `${origin}/catalog?session_id={CHECKOUT_SESSION_ID}`,
          cancel_url: `${origin}/access/signup/checkout?session_id={CHECKOUT_SESSION_ID}`,
        }));
  } catch (error: any) {
    if (error instanceof Stripe.errors.StripeError) {
      const { message } = error;
      console.error(message);
      return;
    }
  }

  if (checkoutSession) redirect(checkoutSession.url as string);
}
