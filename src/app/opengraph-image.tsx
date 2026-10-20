import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Prolifi AI: build your digital presence and unlock your next stage of growth";
export const size = ogSize;
export const contentType = "image/png";

/** Home page share image (and the fallback for any route without its own). */
export default function OpenGraphImage() {
  return renderOgImage({
    line1: "Build your digital presence.",
    line2: "Unlock your next stage of growth.",
    footer: "Websites, social media and digital products for growing businesses",
  });
}
