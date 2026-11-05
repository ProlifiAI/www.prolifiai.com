import { ogSize, renderOgImage } from "@/lib/og";

export const alt = "Prolifi AI website design pricing: $500, $1,200 or a custom quote";
export const size = ogSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderOgImage({
    eyebrow: "Pricing",
    line1: "Simple, honest pricing.",
    line2: "$500 · $1,200 · Enterprise.",
    footer: "One-off website packages in US dollars",
  });
}
