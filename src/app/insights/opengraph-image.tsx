import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Prolifi Insights: practical advice for better digital decisions";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Insights",
    line1: "Better digital decisions.",
    line2: "Practical, honest advice.",
    footer: "Websites, AI, design, product ideas and search visibility",
  });
}
