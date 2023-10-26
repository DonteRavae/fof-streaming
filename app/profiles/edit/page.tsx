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

export default function EditProfilesPage() {
  const router = useRouter();
  const {
    authLoaded,
    profiles,
    loggedIn,
    persistProfile,
    selectProfile,
    persistUserProfile,
  } = useAuth();

  useEffect(() => {
    localStorage.setItem("pid", JSON.stringify(persistProfile));
  }, [persistProfile]);

  const handleProfileSelection = (profile: Profile) => {
    selectProfile(profile);
    persistUserProfile(profile.id);
    router.replace("/catalog");
  };

  const finishEditing = () => {
    selectProfile(null);
    router.push("/profiles/select");
  };

  return (
    authLoaded &&
    loggedIn && (
      <main className={styles.editProfilesPage}>
        <h1>{"Manage Profiles"}</h1>
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
                <div className={styles.editIcon}>
                  <Icons type="edit-light" />
                </div>
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
        <button className={styles.finishEditButton} onClick={finishEditing}>
          Done
        </button>
      </main>
    )
  );
}
