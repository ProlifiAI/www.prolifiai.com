"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

import { cn } from "@/lib/utils";

/**
 * Decorative background video (the Google Flow "Hero Background" clip).
 *
 * - Autoplays muted and loops natively (`loop`), so the browser restarts it
 *   immediately with no fade or pause between plays.
 * - Plays on every screen size. Visitors who ask for reduced motion or data
 *   saving get the still poster instead.
 * - Pauses while scrolled out of view and resumes when it returns.
 * - Never receives pointer events.
 */
export function AnimatedBackgroundVideo({
  src,
  poster,
  className,
}: {
  src: string;
  poster: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLVideoElement>(null);
  const [allowed, setAllowed] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    setAllowed(!reduce && !conn?.saveData);
  }, [reduce]);

  useEffect(() => {
    const v = ref.current;
    if (!allowed || !v) return;

    // React does not render the `muted` attribute; browsers only allow
    // autoplay for muted media, so set it explicitly before playing.
    v.muted = true;
    v.defaultMuted = true;
    v.setAttribute("muted", "");

    let onScreen = true;
    const tryPlay = () => {
      if (onScreen && v.paused) v.play().catch(() => {});
    };
    const onPlaying = () => setPlaying(true);

    v.addEventListener("playing", onPlaying);
    v.addEventListener("canplay", tryPlay);
    if (!v.paused) setPlaying(true);
    tryPlay();

    const io = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) tryPlay();
      else v.pause();
    });
    io.observe(v);

    return () => {
      io.disconnect();
      v.removeEventListener("playing", onPlaying);
      v.removeEventListener("canplay", tryPlay);
    };
  }, [allowed]);

  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {/* Poster: shown until the first frame plays, and permanently when the video is not used */}
      <div className="absolute inset-0 bg-inverse bg-cover bg-center" style={{ backgroundImage: `url(${poster})` }} />
      {allowed && (
        <video
          ref={ref}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ease-[var(--ease-reveal)]",
            playing ? "opacity-100" : "opacity-0"
          )}
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          autoPlay
          preload="auto"
          disablePictureInPicture
          tabIndex={-1}
        />
      )}
    </div>
  );
}
