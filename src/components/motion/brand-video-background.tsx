import { cn } from "@/lib/utils";
import { AnimatedBackgroundVideo } from "@/components/motion/background-video";

/**
 * Inner-page hero clips (Google Flow), one per page so each has its own
 * identity. All are navy-graded, 1920x1080 H.264, about 1 MB, with a poster
 * frame from the first frame. Source files and where they came from:
 *   about    "About Page Hero Background.mp4"    people meeting in a glass office
 *   services "Services Page Hero Background.mp4" designer at a desk with web layouts
 *   pricing  "Pricing Page Hero Background.mp4"  calculator, notebook and laptop
 *   contact  "Contact Page Background.mp4"       a warm first meeting at a table
 * The home hero keeps its own liquid-glass clip and never uses these.
 */
export const pageVideos = {
  about: { src: "/video/about-hero.mp4", poster: "/video/about-hero-poster.jpg" },
  services: { src: "/video/services-hero.mp4", poster: "/video/services-hero-poster.jpg" },
  pricing: { src: "/video/pricing-hero.mp4", poster: "/video/pricing-hero-poster.jpg" },
  contact: { src: "/video/contact-hero.mp4", poster: "/video/contact-hero-poster.jpg" },
  /** "Insight Page Hero Section.mp4": blog pages on laptops and tablets */
  insights: { src: "/video/insights-hero.mp4", poster: "/video/insights-hero-poster.jpg" },
} as const;

export type PageVideo = keyof typeof pageVideos;

/**
 * A page clip as a section background, under the brand's navy gradient
 * overlays, which keep headings and buttons readable over the footage.
 *
 * - `align="left"`: text sits on the left, so the gradient is deepest there.
 * - `align="center"`: even overlay, for narrow panels such as the Contact sidebar.
 *
 * Cropped with object-cover, so it fills any panel shape without distortion,
 * and loops natively. The poster is the static fallback (reduced motion, data
 * saver, or before the video loads); the layer is absolutely positioned, so
 * loading never shifts the layout.
 */
export function BrandVideoBackground({
  video,
  align = "left",
  className,
}: {
  video: PageVideo;
  align?: "left" | "center";
  className?: string;
}) {
  const { src, poster } = pageVideos[video];
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 overflow-hidden bg-inverse", className)}>
      <AnimatedBackgroundVideo src={src} poster={poster} className="scale-[1.04]" />
      {align === "left" ? (
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgb(8_29_61/0.82)_0%,rgb(8_29_61/0.62)_42%,rgb(14_48_98/0.28)_100%)]" />
      ) : (
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgb(8_29_61/0.7)_0%,rgb(8_29_61/0.55)_55%,rgb(8_29_61/0.75)_100%)]" />
      )}
      {/* A faint warm glow, the only yellow in the layer */}
      <div className="absolute -right-[10%] top-[10%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgb(244_196_48/0.10),transparent_65%)]" />
      {/* Soft fade at the bottom edge so the section meets the page cleanly */}
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-inverse/70 to-transparent" />
    </div>
  );
}
