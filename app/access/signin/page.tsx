"use client";

// NEXT.JS
import { redirect, useRouter } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import SignInForm from "@/components/MemberAccessForms/SignInForm";
// STYLES
import styles from "./page.module.scss";

export default function SignInPage() {
  const router = useRouter();
  const { currentProfile, authLoaded } = useAuth();

  if (currentProfile) router.replace("/catalog");

  return (
    authLoaded &&
    !currentProfile && (
      <main className={styles.signInPage}>
        <div className={styles.overlay} />
        <div className={styles.formContainer}>
          <SignInForm />
        </div>
      </main>
    )
  );
}
