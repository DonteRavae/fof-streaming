"use client";

// REACT
import { ReactNode, useEffect, useRef, useState } from "react";
// STYLES
import styles from "./FadeIn.module.scss";

export default function FadeIn({
  children,
  from,
}: {
  children: ReactNode;
  from?: string;
}) {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => setIsVisible(entry.isIntersecting));
    });

    const el = containerRef.current;
    el && observer.observe(el);

    return () => {
      el && observer.unobserve(el);
    };
  }, []);
  return (
    <div
      className={`${styles.fadeInContainer} 
      ${from === "top" ? styles.fromTop : ""}
      ${from === "right" ? styles.fromRight : ""}
      ${from === "bottom" ? styles.fromBottom : ""}
      ${from === "left" ? styles.fromLeft : ""}
      ${isVisible ? styles.isVisible : ""}`}
      ref={containerRef}
    >
      {children}
    </div>
  );
}
