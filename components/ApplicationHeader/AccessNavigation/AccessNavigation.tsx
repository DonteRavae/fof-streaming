"use client";

// NEXT.JS
import Link from "next/link";
// STYLES
import styles from "./AccessNavigation.module.scss";

export default function AccessNavigation() {
  return (
    <nav className={styles.accessNav}>
      <Link href="/access/signin">Sign In</Link>
    </nav>
  );
}
