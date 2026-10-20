import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Contact Prolifi AI and start your project";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Contact",
    line1: "Let's work together.",
    line2: "Start your project.",
    footer: "Tell us about your business and what you need",
  });
}
