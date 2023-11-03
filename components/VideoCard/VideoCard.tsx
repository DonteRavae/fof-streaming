// STYLES
import styles from "./VideoCard.module.scss";

type VideoCardProps = {
  source: string;
};

export default function VideoCard({ source }: VideoCardProps) {
  return (
    <article className={`${styles.container}`}>
      <video muted autoPlay src={source}></video>
    </article>
  );
}
