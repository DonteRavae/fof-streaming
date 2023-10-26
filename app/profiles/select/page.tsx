"use client";

// REACT
import { useEffect } from "react";
// NEXT.JS
import Image from "next/image";
import { useRouter } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import { Profile } from "@/utils/interfaces";
// STYLES
import styles from "./page.module.scss";
import { Icons } from "@/components/Icons";

export default function SelectProfilePage() {
  const router = useRouter();
  const {
    authLoaded,
    profiles,
    currentProfile,
    persistProfile,
    selectProfile,
    persistUserProfile,
  } = useAuth();

  if (currentProfile) router.replace("/catalog");

  useEffect(() => {
    localStorage.setItem("pid", JSON.stringify(persistProfile));
  }, [persistProfile]);

  const handleProfileSelection = (profile: Profile) => {
    selectProfile(profile);
    persistUserProfile(profile.id);
    router.replace("/catalog");
  };

  return (
    authLoaded &&
    !currentProfile && (
      <main className={styles.selectProfilePage}>
        <h1>{"Who's Watching?"}</h1>
        <ul className={styles.profileList}>
          {profiles.map((profile) => (
            <li
              key={profile.id}
              className={styles.profileCard}
              onClick={() => handleProfileSelection(profile)}
            >
              <div className={styles.profilePicWrapper}>
                <Image
                  priority
                  width={150}
                  height={150}
                  className={styles.profilePic}
                  src={`https://api.multiavatar.com/${profile.id}.svg`}
                  alt="User Avatar"
                />
              </div>
              <h3>{profile.name}</h3>
            </li>
          ))}
          <li className={styles.profileCard}>
            <div className={`${styles.profilePicWrapper} ${styles.addProfile}`}>
              <Icons type="add" />
            </div>
            <h3>Add Profile</h3>
          </li>
        </ul>
      </main>
    )
  );
}
