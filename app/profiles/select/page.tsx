// INTERNAL
import ProfileList from "@/components/ProfileList/ProfileList";
// STYLES
import styles from "./page.module.scss";

export default function SelectProfilePage() {
  return (
    <main className={styles.selectProfilePage}>
      <h1>{"Who's Watching?"}</h1>
      <ProfileList />
    </main>
  );
}
