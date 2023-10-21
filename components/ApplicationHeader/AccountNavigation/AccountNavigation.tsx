// NEXT.JS
import Image from "next/image";
// INTERNAL
import useAuth from "@/hooks/useAuth";
// STYLES
import styles from "./AccountNavigation.module.scss";

export default function AccountNavigation() {
  const { currentProfile } = useAuth();
  return (
    <nav className={styles.accountNav}>
      <p>{currentProfile?.name}</p>
      <Image
        priority
        width={50}
        height={50}
        className={styles.profilePic}
        src={`https://api.multiavatar.com/${currentProfile?.id}.svg`}
        alt="User Avatar"
      />
      <section className={styles.dropdown}></section>
    </nav>
  );
}
