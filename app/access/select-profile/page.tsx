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
        <div className={styles.profileList}>
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className={styles.profileCard}
              onClick={() => handleProfileSelection(profile)}
            >
              <Image
                priority
                width={100}
                height={100}
                className={styles.profilePic}
                src={`https://api.multiavatar.com/${profile.id}.svg`}
                alt="User Avatar"
              />
              <h4>{profile.name}</h4>
            </div>
          ))}
        </div>
      </main>
    )
  );
}
