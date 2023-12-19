"use client";

// REACT
import { useEffect, useRef } from "react";
// INTERNAL
import { Icons } from "../Icons";
import useAuth from "@/hooks/useAuth";
import Modal, { ModalRef } from "../Modal/Modal";
import { StripeDetails } from "@/utils/interfaces";
import CallToActionButton from "../CallToActionButton/CallToActionButton";
// STYLES
import styles from "./BillingDetails.module.scss";

export default function BillingDetails({
  stripeDetails,
  cancelSubscriptionHandler,
}: {
  stripeDetails: StripeDetails;
  cancelSubscriptionHandler: () => Promise<void>;
}) {
  const { user } = useAuth();
  const cancelSubscriptionModalRef = useRef<ModalRef | null>(null);

  const handleCancelSubscription = () => {
    cancelSubscriptionModalRef.current?.showModal();
  };

  const onSubscriptionCancellation = async () => {
    await cancelSubscriptionHandler();
  };
  return (
    <>
      {/* 
          - Plan Details 
          - Invoices (List of past invoices)
          */}

      <p className={styles.billingDetails}>
        <strong>Next Billing Date:</strong>{" "}
        {new Date(stripeDetails?.nextBillingDate!).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        }) || ""}
      </p>
      <p className={styles.billingDetails}>
        <strong>Payment Method:</strong>
        <Icons type={`brand-${stripeDetails?.paymentMethodBrand}`} /> **
        {stripeDetails?.paymentMethodLastFour}
      </p>
      <CallToActionButton
        secondary
        className={styles.cancelSubscriptionButton}
        onClick={handleCancelSubscription}
      >
        Cancel Subscription
      </CallToActionButton>
      <Modal
        ref={cancelSubscriptionModalRef}
        className={styles.subscriptionManagementModal}
      >
        <p>{`Are you sure you want to cancel your subscription? This can't be undone and you will not be able to view content after ${new Date(
          stripeDetails.nextBillingDate!
        ).toLocaleDateString("en-us", {
          year: "numeric",
          month: "long",
          day: "numeric",
        })}.`}</p>

        <section className={styles.accountDecisionButtons}>
          <CallToActionButton
            secondary
            className={styles.exitModalButton}
            onClick={() => cancelSubscriptionModalRef.current?.closeModal()}
          >
            Nevermind
          </CallToActionButton>
          <CallToActionButton
            className={styles.exitModalButton}
            onClick={onSubscriptionCancellation}
          >
            Proceed
          </CallToActionButton>
        </section>
      </Modal>
    </>
  );
}
