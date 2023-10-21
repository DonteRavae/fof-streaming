import { ReactNode } from "react";
// STYLES
import styles from "./page.module.scss";

export default function CatalogLayout({ children }: { children: ReactNode }) {
  return <div className={styles.catalogLayout}>{children}</div>;
}
