// NEXT.JS
import Link from "next/link";
// INTERNAL
import ProfileList from "@/components/ProfileList/ProfileList";
// STYLES
import styles from "./page.module.scss";

export default function EditProfilesPage() {
  return (
    <main className={styles.editProfilesPage}>
      <h1>{"Manage Profiles"}</h1>
      <ProfileList />
      <Link href="/profiles/select">
        <button className={styles.finishEditButton}>Done</button>
      </Link>
    </main>
  );
}
