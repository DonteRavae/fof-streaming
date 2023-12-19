// INTERNAL
import SignInForm from "@/components/MemberAccessForms/SignInForm";
// STYLES
import styles from "./page.module.scss";

export default function SignInPage() {
  return (
    <main className={styles.signInPage}>
      <div className={styles.overlay} />
      <div className={styles.formContainer}>
        <SignInForm />
      </div>
    </main>
  );
}
