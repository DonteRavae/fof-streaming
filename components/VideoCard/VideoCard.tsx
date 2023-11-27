"use client";

// REACT
import { forwardRef, useImperativeHandle, useRef, useState } from "react";
// NEXT.JS
import Image from "next/image";
// INTERNAL
import { Icons } from "../Icons";
import test_poster from "@/assets/video_poster.jpg";
// STYLES
import styles from "./VideoCard.module.scss";

export type VideoRef = {
  play: () => void;
  reset: () => void;
};

type VideoCardProps = {
  source: string;
  showcase?: boolean;
  showcaseVideoLength?: number;
};

export default forwardRef<VideoRef, VideoCardProps>(function VideoCard(
  { source, showcase, showcaseVideoLength }: VideoCardProps,
  ref
) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [reveal, setReveal] = useState<boolean>(false);

  const [showcaseReveal, revealShowcase] = useState<boolean>(false);
  const [mute, toggleMute] = useState<boolean>(true);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (videoRef && videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play();
        revealShowcase(true);
      }
    },
    reset: () => {
      if (videoRef && videoRef.current) {
        revealShowcase(false);
        videoRef.current.pause();
        videoRef.current.currentTime = 0;
        videoRef.current.muted = true;
        toggleMute(true);
      }
    },
  }));

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

  const stopPreview = () => {
    if (!showcase && videoRef && videoRef.current) {
      setReveal(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const toggleVolume = () => {
    toggleMute((prev) => !prev);
    if (videoRef && videoRef.current) {
      videoRef.current.muted = !mute;
    }
  };

  return (
    <article
      className={`${styles.container}  ${reveal ? styles.revealVideo : ""} ${
        showcaseReveal ? styles.revealShowcaseVideo : ""
      }`}
      onMouseEnter={playPreview}
      onMouseLeave={stopPreview}
    >
      <video ref={videoRef} muted src={source}></video>
      <button className={styles.volumeToggle} onClick={toggleVolume}>
        <Icons type={mute ? "volume-muted" : "volume-up"} />
      </button>
      <Image src={test_poster} alt="" fill className={`${styles.poster}`} />
    </article>
  );
});
