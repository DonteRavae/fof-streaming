// STYLES
import VideoCard from "../VideoCard/VideoCard";
import styles from "./SectionalVideoCardSlider.module.scss";

type SectionalVideoCardSliderProps = {
  label: string;
};

export default function SectionalVideoCardSlider({
  label,
}: SectionalVideoCardSliderProps) {
  return (
    <section className={styles.sectionalContainer}>
      <h3 className={styles.label}>{label}</h3>
      <div className={styles.slider}>
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
        <VideoCard />
      </div>
    </section>
  );
}
