// REACT
import { useState } from "react";
// NEXT.JS
import Image from "next/image";
// INTERNAL
import useAuth from "@/hooks/useAuth";
// STYLES
import styles from "./AccountNavigation.module.scss";
import signOut from "@/actions/SignOut";
import { useRouter } from "next/navigation";

export default function AccountNavigation() {
  const router = useRouter();
  const { currentProfile, logoutUser, selectProfile } = useAuth();
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const onSignOut = () => {
    signOut();
    logoutUser();
    router.replace("/");
  };

  return (
    currentProfile && (
      <nav
        className={styles.accountNav}
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        <p>{currentProfile?.name}</p>
        <Image
          priority
          width={50}
          height={50}
          className={styles.profilePic}
          src={`https://api.multiavatar.com/${currentProfile?.id}.svg`}
          alt="User Avatar"
        />
        <section
          className={`${styles.dropdown} ${
            isVisible ? styles.showDropdown : ""
          }`}
        >
          <ul>
            <li>My Account</li>
            <li>Profiles</li>
            <li>Help</li>
            <li>
              <button className={styles.signOutButton} onClick={onSignOut}>
                Sign Out
              </button>
            </li>
          </ul>
        </section>
      </nav>
    )
  );
}
