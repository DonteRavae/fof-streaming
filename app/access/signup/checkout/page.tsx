// INTERNAL
import getStripeCustomerId from "@/actions/GetStripeCustomerId.action";
import SubscriptionCard from "@/components/SubscriptionCard/SubscriptionCard";
// STYLES
import styles from "./page.module.scss";

export default async function SubsciptionCheckoutPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let customerId;
  if ("restart" in searchParams && searchParams["restart"]) {
    customerId = await getStripeCustomerId();
  }

  return (
    <main className={styles.subsciptionCheckoutPage}>
      <header className={styles.steps}>
        <h5>Step 2 of 2</h5>
        <h2>{"You're Almost Finished!"}</h2>
        <h3>Select Your Plan</h3>
      </header>
      <section>
        <SubscriptionCard interval="monthly" customerId={customerId} />
        <SubscriptionCard interval="yearly" customerId={customerId} />
      </section>
    </main>
  );
}
