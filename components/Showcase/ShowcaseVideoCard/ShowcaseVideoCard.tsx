// STYLES
import styles from "./ShowcaseVideoCard.module.scss";

type ShowcaseVideoCardProps = {
  poster?: string;
  source: string;
};

export default function ShowcaseVideoCard({ source }: ShowcaseVideoCardProps) {
  return (
    <video className={styles.showcaseVideoCard} muted src={source} />
  );
}
