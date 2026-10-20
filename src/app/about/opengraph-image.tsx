import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "About Prolifi AI: a digital studio for businesses ready to grow";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "About",
    line1: "A digital studio for",
    line2: "businesses ready to grow.",
    footer: "Strategy, design and execution in one team",
  });
}
