"use client";

// NEXT.JS
import Link from "next/link";
import { Nixie_One } from "next/font/google";
import { usePathname } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import AccessNavigation from "./AccessNavigation/AccessNavigation";
import AccountNavigation from "./AccountNavigation/AccountNavigation";
// STYLES
import styles from "./ApplicationHeader.module.scss";

const nixie = Nixie_One({
  weight: "400",
  subsets: ["latin"],
});

export default function ApplicationHeader() {
  const { loggedIn, authLoaded } = useAuth();
  const path = usePathname();
  return (
    <header className={styles.applicationHeader}>
      {authLoaded && (
        <>
          <Link href={`${loggedIn ? "/catalog" : "/"}`}>
            <h2 className={nixie.className}>Force of Faith</h2>
          </Link>
          {loggedIn && path !== "/access/select-profile" && (
            <nav className={styles.applicationNav}>
              <Link href="/catalog/sermons">Sermons</Link>
              <Link href="/catalog/podcasts">Podcasts</Link>
              <Link href="/catalog/testimonials">Testimonials</Link>
              <Link href="/watchlist">My List</Link>
            </nav>
          )}
          {/* ADD SEARCHBAR */}
          {loggedIn && <AccountNavigation />}
          {!loggedIn && <AccessNavigation />}
        </>
      )}
    </header>
  );
}
