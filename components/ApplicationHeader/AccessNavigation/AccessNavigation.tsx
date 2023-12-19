"use client";

// NEXT.JS
import Link from "next/link";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import signOutUser from "@/actions/SignOut.action";
// STYLES
import styles from "./AccessNavigation.module.scss";
import CallToActionButton from "@/components/CallToActionButton/CallToActionButton";

export default function AccessNavigation({
  signIn,
  signOut,
}: {
  signIn?: boolean;
  signOut?: boolean;
}) {
  const { logoutUser } = useAuth();

  const onSignOut = async () => {
    await signOutUser();
    logoutUser();
  };

  return (
    <nav className={styles.accessNav}>
      {signIn ? (
        <Link href="/access/signin">
          <CallToActionButton>Sign In</CallToActionButton>
          {/* <button>Sign In</button> */}
        </Link>
      ) : signOut ? (
        <Link href="/">
          <CallToActionButton onClick={onSignOut}>Sign Out</CallToActionButton>
          {/* <button onClick={onSignOut}>Sign Out</button> */}
        </Link>
      ) : null}
    </nav>
  );
}
