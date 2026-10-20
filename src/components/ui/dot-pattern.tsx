import { useId } from "react"
import type { SVGProps } from "react"

import { cn } from "@/lib/utils"

/**
 * DotPattern, adapted from Magic UI (https://magicui.design/docs/components/dot-pattern).
 *
 * The registry version renders one animated <circle> per dot and measures the
 * container on resize. Prolifi only needs the static variant, so this version
 * keeps the same props but draws the dots with a single SVG <pattern>: no
 * JavaScript, no layout measurement and no per-dot DOM nodes.
 */
interface DotPatternProps extends SVGProps<SVGSVGElement> {
  width?: number
  height?: number
  x?: number
  y?: number
  cx?: number
  cy?: number
  cr?: number
  className?: string
}

export function DotPattern({
  width = 16,
  height = 16,
  x = 0,
  y = 0,
  cx = 1,
  cy = 1,
  cr = 1,
  className,
  ...props
}: DotPatternProps) {
  const id = useId()

  return (
    <svg
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full text-neutral-400/80",
        className
      )}
      {...props}
    >
      <defs>
        <pattern
          id={id}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  )
}
