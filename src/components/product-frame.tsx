"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export function ProductFrame({
  src,
  alt,
  label,
  status = "Ready",
  priority = false,
  className = "",
}: {
  src: string;
  alt: string;
  label: string;
  status?: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <figure className={`product-frame ${className}`}>
      <figcaption className="frame-bar">
        <span className="window-controls"><i /><i /><i /></span>
        <span className="frame-label">{label}</span>
        <span className="frame-status"><i />{status}</span>
      </figcaption>
      <div className="frame-media">
        <Image src={src} alt={alt} width={2880} height={1800} priority={priority} sizes="(max-width: 800px) 100vw, 1400px" />
      </div>
    </figure>
  );
}

export function ProductFilm({
  src,
  poster,
  caption,
}: {
  src: string;
  poster: string;
  caption: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [userPaused, setUserPaused] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

    const pause = () => {
      video.pause();
      setPlaying(false);
    };
    const play = () => {
      if (motion.matches || userPaused) return;
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    };
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.3) play();
      else pause();
    }, { threshold: [0, 0.3, 0.7] });
    const onMotionChange = () => motion.matches ? pause() : play();

    observer.observe(video);
    motion.addEventListener("change", onMotionChange);
    if (motion.matches) pause();
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", onMotionChange);
      pause();
    };
  }, [userPaused]);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;
    if (playing) {
      setUserPaused(true);
      video.pause();
      setPlaying(false);
    } else {
      setUserPaused(false);
      video.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
    }
  }

  return (
    <figure className="film-frame">
      <div className="film-media">
        <video ref={videoRef} muted loop playsInline preload="metadata" poster={poster} aria-label={caption}>
          <source src={src} type="video/mp4" />
        </video>
      </div>
      <button className="film-control" type="button" onClick={togglePlayback} aria-label={`${playing ? "Pause" : "Play"} product demonstration`}>
        <span aria-hidden="true">{playing ? "Ⅱ" : "▶"}</span>{playing ? "Pause" : "Play"}
      </button>
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
