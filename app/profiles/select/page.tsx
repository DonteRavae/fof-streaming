"use client";

// REACT
import { useEffect } from "react";
// NEXT.JS
import Image from "next/image";
import { useRouter } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import { Icons } from "@/components/Icons";
import { Profile } from "@/utils/interfaces";
// STYLES
import styles from "./page.module.scss";

export default function SelectProfilePage() {
  const router = useRouter();
  const {
    user,
    authLoaded,
    selectProfile,
    persistUserProfile,
  } = useAuth();

  const handleProfileSelection = (profile: Profile) => {
    selectProfile(profile);
    persistUserProfile(profile.id);
    router.replace("/catalog");
  };

  return (
    authLoaded && (
      <main className={styles.selectProfilePage}>
        <h1>{"Who's Watching?"}</h1>
        <ul className={styles.profileList}>
          {user?.profiles.map((profile) => (
            <li
              key={profile.id}
              className={styles.profileCard}
              onClick={() => handleProfileSelection(profile)}
            >
              <button className={styles.profilePicWrapper}>
                <Image
                  priority
                  width={150}
                  height={150}
                  className={styles.profilePic}
                  src={`https://api.multiavatar.com/${profile.id}.svg`}
                  alt="User Avatar"
                />
              </button>
              <h3>{profile.name}</h3>
            </li>
          ))}
          <li className={styles.profileCard}>
            <button className={`${styles.profilePicWrapper} ${styles.addProfile}`}>
              <Icons type="add" />
            </button>
            <h3>Add Profile</h3>
          </li>
        </ul>
      </main>
    )
  );
}
