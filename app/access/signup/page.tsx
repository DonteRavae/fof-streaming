"use client";

// NEXT.JS
import { useRouter } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import SignUpForm from "@/components/MemberAccessForms/SignUpForm";
// STYLES
import styles from "./page.module.scss";

export default function SignUpPage() {
  const router = useRouter();
  const { currentProfile, authLoaded } = useAuth();

  if (currentProfile) router.replace("/catalog");

  return (
    authLoaded &&
    !currentProfile && (
      <main className={styles.signUpPage}>
        <div className={styles.formContainer}>
          <SignUpForm />
        </div>
      </main>
    )
  );
}
