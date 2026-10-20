"use client"

import { useRef } from "react"
import { motion, useInView, type MotionProps, type Variants } from "motion/react"

import { ease, reveal } from "@/lib/motion"

/**
 * Reveal system, built on Magic UI's Blur Fade
 * (https://magicui.design/docs/components/blur-fade).
 *
 * Variants:
 *   fade-up (default)  rises into place while fading in
 *   fade-in            opacity only
 *   slide-left         enters from the left
 *   slide-right        enters from the right
 *   blur-up            fade-up plus a restrained blur-to-sharp, for headings
 *
 * Content reveals once when ~15% is visible and stays visible. Reduced-motion
 * users get opacity-only fades through the global <MotionConfig reducedMotion="user">,
 * and a <noscript> rule in the root layout keeps everything visible without JS.
 *
 * `direction` and `blur` are kept for compatibility with the original Magic UI API.
 */
export type RevealVariant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "blur-up"

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: RevealVariant
  duration?: number
  delay?: number
  offset?: number
  /** Legacy Magic UI prop: "up" = fade-up, "left"/"right" = slide variants */
  direction?: "up" | "down" | "left" | "right"
  /** When false (default for hero content) the element animates on mount instead of on scroll */
  inView?: boolean
  amount?: number
  blur?: string
  as?: "div" | "li"
}

function resolveVariant(variant?: RevealVariant, direction?: BlurFadeProps["direction"]): RevealVariant {
  if (variant) return variant
  if (direction === "left") return "slide-right" // Magic UI "left" moves towards the left
  if (direction === "right") return "slide-left"
  return "fade-up"
}

export function BlurFade({
  children,
  className,
  variant,
  duration = reveal.duration,
  delay = 0,
  offset = reveal.distance,
  direction,
  inView = false,
  amount = reveal.amount,
  blur,
  as = "div",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null)
  const seen = useInView(ref, { once: true, amount })
  const show = !inView || seen
  const v = resolveVariant(variant, direction)
  const blurAmount = blur ?? (v === "blur-up" ? "6px" : "0px")

  const hidden: Record<string, number | string> = { opacity: 0 }
  if (v === "fade-up" || v === "blur-up") hidden.y = offset
  if (v === "slide-left") hidden.x = -offset * 1.4
  if (v === "slide-right") hidden.x = offset * 1.4
  if (blurAmount !== "0px") hidden.filter = `blur(${blurAmount})`

  const visible: Record<string, number | string> = { opacity: 1, x: 0, y: 0 }
  if (blurAmount !== "0px") visible.filter = "blur(0px)"

  const variants: Variants = { hidden, visible }
  const Component = as === "li" ? motion.li : motion.div

  return (
    <Component
      ref={ref}
      initial="hidden"
      animate={show ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay, duration, ease: ease.reveal }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  )
}

/** Preferred name for new code */
export const Reveal = BlurFade
