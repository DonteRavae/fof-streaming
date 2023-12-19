// INTERNAL
import FadeIn from "@/components/FadeIn/FadeIn";
import getStripeDetails from "@/actions/GetStripeDetails.action";
import cancelSubscription from "@/actions/CancelSubscription.action";
import BillingDetails from "@/components/BillingDetails/BillingDetails";
import AccountDetailsCard from "@/components/AccountDetailsCard/AccountDetailsCard";
import AccountManagementDetails from "@/components/AccountManagementDetails/AccountManagementDetails";
// STYLES
import styles from "./page.module.scss";

export default async function AccountPage() {
  const stripeDetails = await getStripeDetails();
  const cancelSubscriptionHandler = cancelSubscription;
  return (
    <main className={styles.accountPage}>
      <FadeIn from="top">
        <AccountDetailsCard label="Account Details">
          <AccountManagementDetails />
        </AccountDetailsCard>
      </FadeIn>
      <FadeIn from="bottom">
        <AccountDetailsCard label="Billing">
          {stripeDetails ? (
            <BillingDetails
              stripeDetails={stripeDetails!}
              cancelSubscriptionHandler={cancelSubscriptionHandler}
            />
          ) : (
            "There was an error loading billing details."
          )}
        </AccountDetailsCard>
      </FadeIn>
      {/* <FadeIn from="top">
        <AccountDetailsCard label="Profiles" profilesManagement />
      </FadeIn> */}
      {/* <FadeIn from="top">
        <AccountDetailsCard label="Security" security />
      </FadeIn> */}
    </main>
  );
}
