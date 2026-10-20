/**
 * Shared motion tokens. Every reveal, parallax layer and transition on the
 * site reads from here so timing stays consistent.
 */
export const ease = {
  /** Smooth, decisive ease-out used for reveals */
  reveal: [0.22, 1, 0.36, 1] as const,
  /** Softer spring-like curve for layered movement */
  spring: [0.32, 0.72, 0, 1] as const,
};

export const reveal = {
  /** Travel distance for fade-up / slide reveals, in px */
  distance: 28,
  /** Default duration, in seconds */
  duration: 0.65,
  /** Delay between related items */
  stagger: 0.08,
  /** Fraction of the element that must be visible before it reveals */
  amount: 0.15,
};

/** Parallax travel, as a fraction of the element height. Mobile uses a smaller factor. */
export const parallax = {
  desktop: 1,
  mobile: 0.45,
};
