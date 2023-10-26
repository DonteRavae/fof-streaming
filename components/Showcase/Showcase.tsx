"use client";

// REACT
import { use, useEffect, useRef, useState } from "react";
// INTERNAL
import ShowcaseVideoCard from "./ShowcaseVideoCard/ShowcaseVideoCard";
// STYLES
import styles from "./Showcase.module.scss";

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
  const [currentlyPlaying, setCurrentlyPlaying] = useState<ShowcaseVideo>(
    showcaseVideos[0]
  );

  useEffect(() => {
    if (scrollerRef && scrollerRef.current) {
      scrollerRef.current.scroll(0, 0);
    }
  }, []);

  useEffect(() => {
    const autoScrollShowcase = setInterval(() => {
      let currentVideoIndex = showcaseVideos.findIndex(
        (vid) => vid.id === currentlyPlaying.id
      );

      if (scrollerRef && scrollerRef.current) {
        if (currentVideoIndex === showcaseVideos.length - 1) {
          scrollerRef.current.scroll(0, 0);
          setCurrentlyPlaying(showcaseVideos[0]);
        } else {
          let elDimensions = scrollerRef.current.getBoundingClientRect();
          let videoCardWidth = elDimensions.right - elDimensions.left;
          scrollerRef.current.scroll(
            videoCardWidth * (currentVideoIndex + 1),
            0
          );
          setCurrentlyPlaying(showcaseVideos[currentVideoIndex + 1]);
        }
      }
    }, 10000);

    return () => clearInterval(autoScrollShowcase);
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
      <div className={styles.showcaseScroller} ref={scrollerRef}>
        {showcaseVideos.map((vid) => (
          <ShowcaseVideoCard key={vid.id} source={vid.url} />
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
