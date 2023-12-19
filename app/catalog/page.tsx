// INTERNAL
import Showcase from "@/components/Showcase/Showcase";
import SectionalVideoCardSlider from "@/components/SectionalVideoCardSlider/SectionalVideoCardSlider";
// STYLES
import styles from "./page.module.scss";

export default function CatalogOverviewPage() {
  return (
    <main className={styles.catalogOverviewPage}>
      <Showcase />
      <section className={styles.catalogGrid}>
        <SectionalVideoCardSlider label="Continue Watching" />
        <SectionalVideoCardSlider label="New on Force of Faith" />
        <SectionalVideoCardSlider label="Trending Now" />
      </section>
    </main>
  );
}
