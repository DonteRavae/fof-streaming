"use client";

// NEXT.JS
import Link from "next/link";
// INTERNAL
import useAuth from "@/hooks/useAuth";
// STYLES
import styles from "./AccountManagementDetails.module.scss";
import CallToActionButton from "../CallToActionButton/CallToActionButton";

export default function AccountManagementDetails() {
  const { user } = useAuth();
  return (
    <>
      <p className={styles.details}>
        <strong>Email:</strong>
        {user?.email}
      </p>
      <p className={styles.details}>
        <strong>Password:</strong>
        <span className={styles.password}>********</span>
        <Link
          href="/help/forgot-password"
          className={styles.forgotPasswordLink}
        >
          Change Password
        </Link>
      </p>
      <CallToActionButton secondary className={styles.signOutAllButton}>Sign out of all devices</CallToActionButton>
    </>
  );
}
