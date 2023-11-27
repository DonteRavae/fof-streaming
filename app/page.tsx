"use client";

// NEXT.JS
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Nixie_One } from "next/font/google";
// INTERNAL
import useAuth from "@/hooks/useAuth";
// EXTERNAL
import { SpinnerCircularFixed } from "spinners-react";
// STYLES
import styles from "./page.module.scss";

const nixie = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage() {
  const router = useRouter();
  const { loggedIn, authLoaded, currentProfile } = useAuth();

  if (authLoaded && loggedIn && !currentProfile)
    router.replace("/profiles/select");
  else
    return authLoaded && !loggedIn ? (
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.overlay} />
          <div className={styles.cta}>
            <h2 className={nixie.className}>
              Your favorite podcasts, preachers, and teachers.
              <br /> All in one place.
            </h2>
            <p className={nixie.className}>
              Try now for $4.99/month. Cancel anytime.
            </p>
            <Link className={styles.signUpBtn} href="access/signup">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
    ) : (
      <main className={styles.loadingContainer}>
        <SpinnerCircularFixed
          size={50}
          thickness={100}
          speed={180}
          color="#FFFFFF"
          secondaryColor="rgba(0, 0, 0, 0.44)"
        />
      </main>
    );
}
