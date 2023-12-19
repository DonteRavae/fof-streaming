// NEXT.JS
import Image from "next/image";
// INTERNAL
import test_poster from "@/assets/video_poster.jpg";
// STYLES
import styles from "./VideoCard.module.scss";

export default function VideoCard() {
  return (
    <article className={`${styles.container} `}>
      <Image src={test_poster} alt="" fill className={`${styles.poster}`} />
    </article>
  );
}
