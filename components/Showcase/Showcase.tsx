"use client";

// REACT
import { useEffect, useRef, useState } from "react";

// STYLES
import styles from "./Showcase.module.scss";
import { Icons } from "../Icons";

export default function Showcase() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mute, toggleMute] = useState<boolean>(true);
  useEffect(() => {
    setTimeout(() => {
      if (videoRef && videoRef.current) {
        videoRef.current.play();
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
      <video ref={videoRef} muted>
        <source type="video/mp4" src="/ShowcaseTestVideo.mp4" />
      </video>
      <button className={styles.volumeToggle} onClick={toggleVolume}>
        <Icons type={mute ? "volume-muted" : "volume-up"} />
      </button>
    </section>
  );
}
