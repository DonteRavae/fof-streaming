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
        <VideoCard source="/ShowcaseTestVideo.mp4" />
        <VideoCard source="/ShowcaseTestVideo2.m4v" />
        <VideoCard source="/ShowcaseTestVideo.mp4" />
        <VideoCard source="/ShowcaseTestVideo2.m4v" />
        <VideoCard source="/ShowcaseTestVideo.mp4" />
        <VideoCard source="/ShowcaseTestVideo2.m4v" />
        <VideoCard source="/ShowcaseTestVideo.mp4" />
      </div>
    </section>
  );
}
