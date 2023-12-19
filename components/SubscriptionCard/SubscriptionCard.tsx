"use client";

// INTERNAL
import useAuth from "@/hooks/useAuth";
import checkout from "@/actions/Checkout.action";
import SubmitButton from "../SubmitButton/SubmitButton";
// STYLES
import styles from "./SubscriptionCard.module.scss";

const CARD_DESCRIPTION: string =
  "Watch all you want with zero ads. Change or cancel your plan anytime";
const MONTHLY_PRICE: number = 5.0;
const YEARLY_PRICE: number = 50.0;

export default function SubscriptionCard({
  interval,
  customerId,
}: {
  interval: "monthly" | "yearly";
  customerId?: string;
}) {
  const { user } = useAuth();
  const onCheckout = async (formData: FormData) => {
    await checkout(formData, customerId);
  };

  return (
    <article className={styles.subscriptionCard}>
      <header className={styles.subscriptionInfo}>
        <h3>Force of Faith Base Plan</h3>
        <p className={styles.price}>
          {interval === "monthly" ? (
            <>
              <strong>{`$${MONTHLY_PRICE}`}</strong>
              {`/month`}
            </>
          ) : (
            <>
              <strong>{`$${YEARLY_PRICE}`}</strong>
              {`/year`}
            </>
          )}
        </p>
        <p className={styles.description}>{CARD_DESCRIPTION}</p>
      </header>
      <form action={onCheckout} className={styles.checkoutData}>
        <input type="hidden" name="email" value={user?.email} />
        <input type="hidden" name="interval" value={interval} />
        <SubmitButton
          className={styles.subscribeButton}
          disabled={false}
          label="Subscribe"
        />
      </form>
    </article>
  );
}
