// REACT
import { ReactNode } from "react";
// STYLES
import styles from "./AccountDetailsCard.module.scss";

type AccountDetailsCardProps = {
  label: string;
  children: ReactNode;
};

export default function AccountDetailsCard({
  label,
  children,
}: AccountDetailsCardProps) {
  return (
    <article className={styles.accountDetailsCard}>
      <h3 className={styles.accountDetailsLabel}>{label}</h3>
      {children}
    </article>
  );
}
