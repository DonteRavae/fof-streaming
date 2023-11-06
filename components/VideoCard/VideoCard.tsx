"use client";

// REACT
import { useEffect, useRef, useState } from "react";
// NEXT.JS
import Image from "next/image";
// INTERNAL
import test_poster from "@/assets/video_poster.jpg";
// STYLES
import styles from "./VideoCard.module.scss";

type VideoCardProps = {
  source: string;
  showcase?: boolean;
  showcaseVideoLength?: number;
};

export default function VideoCard({
  source,
  showcase,
  showcaseVideoLength,
}: VideoCardProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reveal, setReveal] = useState<boolean>(false);
  const [showcaseReveal, revealShowcase] = useState<boolean>(false);

  useEffect(() => {
    let showcaseTimeout: NodeJS.Timeout | undefined;
    if (showcase && videoRef && videoRef.current) {
      showcaseTimeout = setTimeout(() => {
        revealShowcase(true);
        videoRef.current?.play();
      }, 2000);
      videoRef.current.currentTime = 0;
    }

    revealShowcase(false);
    return () => {
      showcaseTimeout && clearTimeout(showcaseTimeout);
    };
  }, [showcase, showcaseVideoLength]);

  const playPreview = () => {
    if (!showcase && videoRef && videoRef.current) {
      videoRef.current.currentTime = 0;
      setReveal(true);
      setTimeout(() => {
        if (videoRef && videoRef.current) {
          videoRef.current.play();
        }
      }, 500);
    }
  };

  const stopPreview = () => (!showcase ? setReveal(false) : null);

  return (
    <article
      className={`${styles.container}  ${reveal ? styles.revealVideo : ""} ${
        showcaseReveal ? styles.revealShowcaseVideo : ""
      }`}
      onMouseEnter={playPreview}
      onMouseOut={stopPreview}
    >
      <video ref={videoRef} muted src={source}></video>
      <Image src={test_poster} alt="" fill className={`${styles.poster}`} />
    </article>
  );
}
