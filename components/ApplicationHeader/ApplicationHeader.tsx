"use client";

// REACT
import { useEffect, useState } from "react";
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
  const [sticky, setSticky] = useState<boolean>(false);
  const path = usePathname();

  useEffect(() => {
    window.addEventListener("scroll", scrollListener);

    return () => window.removeEventListener("scroll", scrollListener);
  }, []);

  const scrollListener = () => {
    if (scrollY > 60) setSticky(true);
    else setSticky(false);
  };

  return (
    <header
      className={`${styles.applicationHeader} ${sticky ? styles.sticky : ""}`}
    >
      {path !== "/profiles/select" && (
        <Link href={`${loggedIn ? "/catalog" : "/"}`}>
          <h2 className={nixie.className}>Force of Faith</h2>
        </Link>
      )}
      {authLoaded && (
        <>
          {loggedIn &&
            !path.startsWith("/profiles") &&
            !path.startsWith("/access") && (
              <nav className={styles.applicationNav}>
                <menu>
                  <li>
                    <Link href="/catalog/sermons">Sermons</Link>
                  </li>
                  <li>
                    <Link href="/catalog/podcasts">Podcasts</Link>
                  </li>
                  <li>
                    <Link href="/catalog/testimonials">Testimonials</Link>
                  </li>
                  <li>
                    <Link href="/watchlist">My List</Link>
                  </li>
                </menu>
              </nav>
            )}
          {/* ADD SEARCHBAR */}
          {loggedIn && !path.startsWith("/profiles") && <AccountNavigation />}
          {!loggedIn &&
            path !== "/access/signin" &&
            path !== "/access/signup/checkout" &&
            !path.startsWith("/catalog") && <AccessNavigation signIn />}
          {loggedIn && path === "/access/signup/checkout" && (
            <AccessNavigation signOut />
          )}
        </>
      )}
    </header>
  );
}
