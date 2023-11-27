// NEXT.JS
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import signOut from "@/actions/SignOut";
import { Icons } from "@/components/Icons";
// STYLES
import styles from "./AccountNavigation.module.scss";

export default function AccountNavigation() {
  const router = useRouter();
  const { currentProfile, logoutUser, user } = useAuth();

  const onSignOut = () => {
    signOut();
    logoutUser();
    router.replace("/");
  };

  return (
    currentProfile && (
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
        <section className={styles.dropdown}>
          <menu className={styles.navDropdown}>
            <li>
              <Link href="/account">My Account</Link>
            </li>
            <li className={styles.manageProfiles}>
              <span>Profiles</span>
              <ul className={styles.profilesDropdown}>
                {user?.profiles
                  .filter((p) => p.id !== currentProfile.id)
                  .map((profile) => (
                    <li key={profile.id}>{profile.name}</li>
                  ))}
                <li>
                  <Icons type="add-circle" />
                  <Link href="/profiles/new">Add Profile</Link>
                </li>
                <li>
                  <Icons type="edit-light" />
                  <Link href="/profiles/edit">Manage Profiles</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href={"/help"}>Help</Link>
            </li>
            <li className={styles.signOutButtonContainer}>
              <button className={styles.signOutButton} onClick={onSignOut}>
                Sign Out
              </button>
            </li>
          </menu>
        </section>
      </nav>
    )
  );
}
