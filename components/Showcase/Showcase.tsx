"use client";

// NEXT.JS
import Image from "next/image";

// REACT
import { useEffect, useRef, useState } from "react";

// INTERNAL
import videoPoster from "@/assets/video_poster.jpg";

// STYLES
import styles from "./Showcase.module.scss";
import { Icons } from "../Icons";

export default function Showcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mute, toggleMute] = useState<boolean>(true);
  const [isPosterVisible, setIsPosterVisible] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      if (videoRef && videoRef.current) {
        // videoRef.current.play();
      }
    }, 1000);
  }, [videoRef]);

  const toggleVolume = () => {
    toggleMute((prev) => !prev);
    if (videoRef && videoRef.current) {
      videoRef.current.muted = !mute;
    }
  };

  return (
    <section className={styles.showcase}>
      <Image
        src={videoPoster}
        alt=""
        fill
        className={`${styles.poster} ${!isPosterVisible ? styles.hide : ""}`}
      />
      <video ref={videoRef} muted poster="../../assets/video_poster.jpg">
        <source
          type="video/mp4"
          src={`${process.env.AWS_PREVIEWS_URL!}/Preview_Test1.mp4`}
        />
      </video>
      <button className={styles.volumeToggle} onClick={toggleVolume}>
        <Icons type={mute ? "volume-muted" : "volume-up"} />
      </button>
    </section>
  );
}
