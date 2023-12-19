// NEXT.JS
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
// INTERNAL
import useAuth from "@/hooks/useAuth";
import signOut from "@/actions/SignOut.action";
import { Icons } from "@/components/Icons";
// STYLES
import styles from "./AccountNavigation.module.scss";

export default function AccountNavigation() {
  const router = useRouter();
  const { currentProfile, logoutUser, user } = useAuth();

  const onSignOut = async () => {
    await signOut();
    logoutUser();
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
            <Link className={styles.navDropdownLink} href="/account">
              <li>My Account</li>
            </Link>
            <li className={styles.manageProfiles}>
              <span>Profiles</span>
              <ul className={styles.profilesDropdown}>
                {user?.profiles
                  .filter((p) => p.id !== currentProfile.id)
                  .map((profile) => (
                    <li key={profile.id}>{profile.name}</li>
                  ))}
                <Link className={styles.navDropdownLink} href="/profiles/new">
                  <li>
                    <Icons type="add-circle" />
                    Add Profile
                  </li>
                </Link>
                <Link className={styles.navDropdownLink} href="/profiles/edit">
                  <li>
                    <Icons type="edit-light" />
                    Manage Profiles
                  </li>
                </Link>
              </ul>
            </li>
            <Link className={styles.navDropdownLink} href={"/help"}>
              <li>Help</li>
            </Link>
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
