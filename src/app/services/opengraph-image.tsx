import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Prolifi AI services: Build, Launch and Scale your business online";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Services",
    line1: "Build. Launch. Scale.",
    line2: "Your business, online.",
    footer: "Websites, social media campaigns, product strategy and UI/UX design",
  });
}
