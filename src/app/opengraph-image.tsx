import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Prolifi AI: make the right digital call, then build it to win customers";
export const size = ogSize;
export const contentType = "image/png";

/** Home page share image (and the fallback for any route without its own). */
export default function OpenGraphImage() {
  return renderOgImage({
    line1: "Make the right digital call.",
    line2: "Then build it to win customers.",
    footer: "Websites, MVPs and AI for Australian and New Zealand businesses",
  });
}
