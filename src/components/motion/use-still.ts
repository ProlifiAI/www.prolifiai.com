"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

/**
 * True when the visitor asks for reduced motion, read after mount.
 * The server can't know the preference, so the first client render must
 * match the server's (motion on) or React reports a hydration mismatch.
 */
export function useStill() {
  const reduce = useReducedMotion();
  const [still, setStill] = useState(false);
  useEffect(() => setStill(reduce === true), [reduce]);
  return still;
}
