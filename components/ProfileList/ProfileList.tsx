"use client";

// NEXT.JS
import Link from "next/link";
import Image from "next/image";
// INTERNAL
import { Icons } from "../Icons";
import useAuth from "@/hooks/useAuth";
import { Profile } from "@/utils/interfaces";
// STYLES
import styles from "./ProfileList.module.scss";
import { redirect } from "next/navigation";

export default function ProfileList() {
  const { user, selectProfile, persistUserProfile } = useAuth();

  const handleProfileSelection = (profile: Profile) => {
    selectProfile(profile);
    persistUserProfile(profile.id);
    redirect("/catalog");
  };

  return (
    <ul className={styles.profileList}>
      {user?.profiles.map((profile) => (
        <li key={profile.id} className={styles.profileCard}>
          <Link
            className={styles.profilePicWrapper}
            href={"/catalog"}
            onClick={() => handleProfileSelection(profile)}
          >
            <Image
              priority
              width={150}
              height={150}
              className={styles.profilePic}
              src={`https://api.multiavatar.com/${profile.id}.svg`}
              alt="User Avatar"
            />
          </Link>
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
  );
}
