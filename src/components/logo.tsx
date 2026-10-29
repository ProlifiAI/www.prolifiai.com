import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Official Prolifi logos (public/brand), transparent and trimmed to the artwork.
 * - default: navy and yellow, 1470 x 261 px (5.63:1), for light backgrounds (header)
 * - inverse: white, 1678 x 313 px (5.36:1), for dark backgrounds (footer)
 * The height sets the size and the width follows the ratio.
 */
const logos = {
  default: { src: "/brand/prolifi-logo.png", width: 1470, height: 261, className: "h-7 md:h-8 xl:h-9" },
  inverse: { src: "/brand/prolifi-logo-white.png", width: 1678, height: 313, className: "h-8 md:h-9 lg:h-10" },
} as const;

export function Logo({
  tone = "default",
  className,
  priority = false,
}: {
  tone?: "default" | "inverse";
  className?: string;
  priority?: boolean;
}) {
  const logo = logos[tone];
  return (
    <Image
      src={logo.src}
      alt="Prolifi"
      width={logo.width}
      height={logo.height}
      priority={priority}
      sizes="(min-width: 1280px) 220px, 180px"
      className={cn("w-auto", logo.className, className)}
    />
  );
}
