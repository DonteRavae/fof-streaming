"use client";

// REACT
import { use, useEffect, useRef, useState } from "react";
// INTERNAL
import VideoCard, { VideoRef } from "../VideoCard/VideoCard";
// STYLES
import styles from "./Showcase.module.scss";

const SHOWCASE_PREVIEW_LENGTH = 10000;

type ShowcaseVideo = {
  id: number;
  url: string;
};

const showcaseVideos: ShowcaseVideo[] = [
  {
    id: 11,
    url: "/ShowcaseTestVideo.mp4",
  },
  {
    id: 12,
    url: "/ShowcaseTestVideo2.m4v",
  },
  {
    id: 13,
    url: "/ShowcaseTestVideo.mp4",
  },
  {
    id: 14,
    url: "/ShowcaseTestVideo2.m4v",
  },
  {
    id: 15,
    url: "/ShowcaseTestVideo.mp4",
  },
];

export default function Showcase() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<VideoRef | null>(null);
  const [currentlyPlaying, setCurrentlyPlaying] = useState<ShowcaseVideo>(
    showcaseVideos[0]
  );

  // On page reload, set slider to first video card
  useEffect(() => {
    if (scrollerRef && scrollerRef.current) {
      scrollerRef.current.scroll(0, 0);
    }
  }, []);

  // Advance slider every 10 seconds to next video card
  useEffect(() => {
    const autoScrollShowcase = setInterval(() => {
      let currentVideoIndex = showcaseVideos.findIndex(
        (vid) => vid.id === currentlyPlaying.id
      );

      if (scrollerRef && scrollerRef.current) {
        // If last video in slider, rotate back to beginning
        if (currentVideoIndex === showcaseVideos.length - 1) {
          scrollerRef.current.scroll(0, 0);
          setCurrentlyPlaying(showcaseVideos[0]);
        } else {
          // Advance to next video
          let elDimensions = scrollerRef.current.getBoundingClientRect();
          let videoCardWidth = elDimensions.right - elDimensions.left;
          scrollerRef.current.scroll(
            videoCardWidth * (currentVideoIndex + 1),
            0
          );
          setCurrentlyPlaying(showcaseVideos[currentVideoIndex + 1]);
        }
      }
    }, SHOWCASE_PREVIEW_LENGTH);

    return () => clearInterval(autoScrollShowcase);
  }, [currentlyPlaying]);

  useEffect(() => {
    if (videoRef && videoRef.current) {
      setTimeout(() => {
        videoRef?.current?.play();
      }, 1000);

      setTimeout(() => {
        videoRef?.current?.reset();
      }, SHOWCASE_PREVIEW_LENGTH);
    }
  }, [currentlyPlaying]);

  // HANDLERS

  const scrollToSelectedVideo = (selectedId: number) => {
    const index = showcaseVideos.findIndex((vid) => vid.id === selectedId);
    if (index < 0) {
      console.error("Invalid showcase video selection.");
      return;
    }

    if (scrollerRef && scrollerRef.current) {
      let elDimensions = scrollerRef.current.getBoundingClientRect();
      let videoCardWidth = elDimensions.right - elDimensions.left;
      scrollerRef.current.scroll(videoCardWidth * index, 0);
    }

    setCurrentlyPlaying(showcaseVideos[index]);
  };

  return (
    <section className={styles.showcaseContainer}>
      <div className={styles.showcaseSlider} ref={scrollerRef}>
        {showcaseVideos.map((vid) => (
          <VideoCard
            key={vid.id}
            source={vid.url}
            showcase={currentlyPlaying.id === vid.id}
            ref={currentlyPlaying.id === vid.id ? videoRef : null}
          />
        ))}
      </div>
      <ul className={styles.sliderNav}>
        {showcaseVideos.map((vid, idx) => (
          <li
            key={idx}
            className={`${styles.sliderNavDots} ${
              currentlyPlaying.id === vid.id ? styles.currentlyPlaying : ""
            }`}
            onClick={() => scrollToSelectedVideo(vid.id)}
          />
        ))}
      </ul>
    </section>
  );
}
