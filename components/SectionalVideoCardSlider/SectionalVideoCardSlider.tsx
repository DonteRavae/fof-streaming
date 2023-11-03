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
      <h2 className={styles.label}>{label}</h2>
      <div className={styles.slider}>
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
        <VideoCard source="" />
      </div>
    </section>
  );
}
