import Image from "next/image";

import { cn } from "@/lib/utils";

/**
 * Official Prolifi logo (public/brand). The artwork is 1664 x 288 px, so the
 * height sets the size and the width follows the 5.78:1 ratio.
 * `inverse` uses the white version for dark backgrounds.
 */
export function Logo({
  tone = "default",
  className,
  priority = false,
}: {
  tone?: "default" | "inverse";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "inverse" ? "/brand/prolifi-logo-white.png" : "/brand/prolifi-logo.png"}
      alt="Prolifi"
      width={1664}
      height={288}
      priority={priority}
      sizes="180px"
      className={cn("h-7 w-auto md:h-8", className)}
    />
  );
}
