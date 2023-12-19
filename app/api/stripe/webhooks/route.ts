// NEXT.JS
import { NextRequest, NextResponse } from "next/server";
// INTERNAL
import * as db from "@/utils/db";
import { STRIPE_STATUS } from "@/utils/interfaces";
// EXTERNAL
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_TEST_KEY!);

const webhookSecret = process.env.STRIPE_WEBHOOK_TEST_SECRET!;

export async function POST(req: NextRequest, res: NextResponse) {
  const sig = req.headers.get("stripe-signature")!;
  const rawBody = await req.text();

  let event: Stripe.Event;
  let result = "Webhook called.";

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret);
  } catch (error: any) {
    // On error, log and return the error message
    console.log(`❌ Error message: ${error.message}`);
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  let subscription;
  let customer;

  // Handle the event
  switch (event.type) {
    case "payment_intent.created":
      // console.log("Payment Intent Created.");
      break;
    case "payment_intent.payment_failed":
      // console.log("Payment Failed.");
      break;
    case "payment_intent.processing":
      // console.log("Payment processing...");
      break;
    case "payment_intent.succeeded":
      // const paymentIntent = event.data.object;
      // console.log("paymentIntent: ", paymentIntent);
      // console.log(`Payment Succeeded`);
      break;
    case "customer.subscription.trial_will_end":
      // Inform user and update user's subscription status
      break;
    case "invoice.paid":
      // Set user's subscription status to active
      let invoice = event.data.object as Stripe.Invoice;

      await db.update_user_subscription_status(
        invoice.customer_email!,
        invoice.customer!.toString(),
        invoice.subscription!.toString(),
        STRIPE_STATUS.ACTIVE
      );
      break;
    case "customer.subscription.deleted":
      subscription = event.data.object as Stripe.Subscription;
      customer = (await stripe.customers.retrieve(
        subscription.customer.toString()
      )) as Stripe.Customer;
      await db.update_user_subscription_status(
        customer.email!,
        customer.id,
        subscription.id,
        STRIPE_STATUS.CANCELED
      );
      break;
    // ... handle other event types
    default:
      console.warn(`Unhandled event type: ${event.type}`);
  }
  return NextResponse.json({ received: true, status: result });
}
