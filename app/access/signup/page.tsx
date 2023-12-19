// INTERNAL
import SignUpForm from "@/components/MemberAccessForms/SignUpForm";
// STYLES
import styles from "./page.module.scss";

export default function SignUpPage() {
  return (
    <>
      <main className={styles.signUpPage}>
        <header className={styles.steps}>
          <h5>Step 1 of 2</h5>
        </header>
        <section className={styles.formContainer}>
          <SignUpForm />
        </section>
      </main>
    </>
  );
}
