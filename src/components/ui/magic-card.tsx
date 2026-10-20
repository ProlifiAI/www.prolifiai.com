"use client"

import React, { useCallback } from "react"
import { motion, useMotionTemplate, useMotionValue } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * MagicCard, adapted from Magic UI (https://magicui.design/docs/components/magic-card).
 *
 * Kept: the pointer-tracked spotlight on the border and surface (gradient mode).
 * Removed: the "orb" mode and its next-themes dependency, since the Prolifi
 * site has a single light theme for cards. Touch devices simply never see the
 * spotlight, which keeps it decorative rather than informational.
 */
interface MagicCardProps {
  children?: React.ReactNode
  className?: string
  gradientSize?: number
  gradientColor?: string
  gradientOpacity?: number
  gradientFrom?: string
  gradientTo?: string
}

export function MagicCard({
  children,
  className,
  gradientSize = 220,
  gradientColor = "#eef3fd",
  gradientOpacity = 0.9,
  gradientFrom = "#3978e8",
  gradientTo = "#f4c430",
}: MagicCardProps) {
  const mouseX = useMotionValue(-gradientSize)
  const mouseY = useMotionValue(-gradientSize)

  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      const rect = e.currentTarget.getBoundingClientRect()
      mouseX.set(e.clientX - rect.left)
      mouseY.set(e.clientY - rect.top)
    },
    [mouseX, mouseY]
  )

  const reset = useCallback(() => {
    mouseX.set(-gradientSize)
    mouseY.set(-gradientSize)
  }, [mouseX, mouseY, gradientSize])

  const border = useMotionTemplate`
    linear-gradient(var(--color-background) 0 0) padding-box,
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientFrom},
      ${gradientTo},
      var(--color-border) 100%
    ) border-box
  `
  const glow = useMotionTemplate`
    radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
      ${gradientColor},
      transparent 100%
    )
  `

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      style={{ background: border }}
    >
      <div className="bg-background absolute inset-px z-0 rounded-[inherit]" />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-px z-0 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: glow, opacity: gradientOpacity }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  )
}
