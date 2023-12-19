// NEXT.JS
import Link from "next/link";
import { Nixie_One } from "next/font/google";
// STYLES
import styles from "./page.module.scss";
import CallToActionButton from "@/components/CallToActionButton/CallToActionButton";

const nixie = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

export default function LandingPage() {
  return (
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
          <Link href="access/signup">
            <CallToActionButton>
              Sign Up Now
            </CallToActionButton>
          </Link>
        </div>
      </section>
    </main>
  );
}
