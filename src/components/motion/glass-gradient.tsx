import { cn } from "@/lib/utils";

/**
 * Liquid-glass atmosphere for dark brand surfaces: deep navy base, three soft
 * light fields drifting very slowly (26-38s, transform only), a faint diagonal
 * sheen and a hairline grid. Pure CSS, so it costs no JavaScript; the drift
 * pauses for reduced-motion users (see globals.css).
 *
 * `flow`: adds a slow left-to-right band of the same navy tones under the
 * light fields (14s, alternating, transform only), so large blue panels feel
 * gently alive. Paused for reduced-motion users.
 *
 * Use on a `relative isolate overflow-hidden` parent.
 */
export function GlassGradientBackground({
  className,
  grid = true,
  warm = true,
  flow = false,
}: {
  className?: string;
  grid?: boolean;
  /** Include the restrained yellow light field */
  warm?: boolean;
  /** Add the horizontally flowing tonal band */
  flow?: boolean;
}) {
  return (
    <div aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-inverse", className)}>
      {flow && (
        // 200% wide, two identical halves, so sliding by half its width never shows an edge
        <div className="animate-flow absolute inset-y-0 left-0 w-[200%] bg-[linear-gradient(90deg,var(--palette-navy-900)_0%,var(--palette-navy-700)_25%,var(--palette-navy-950)_50%,var(--palette-navy-700)_75%,var(--palette-navy-900)_100%)] opacity-70" />
      )}
      <div className="animate-drift-a absolute -right-[15%] -top-[30%] size-[70%] rounded-full bg-[radial-gradient(closest-side,rgb(57_120_232/0.45),transparent)]" />
      <div className="animate-drift-b absolute -bottom-[35%] -left-[10%] size-[75%] rounded-full bg-[radial-gradient(closest-side,rgb(31_76_140/0.75),transparent)]" />
      {warm && (
        <div className="animate-drift-c absolute bottom-[-20%] right-[10%] size-[40%] rounded-full bg-[radial-gradient(closest-side,rgb(244_196_48/0.14),transparent)]" />
      )}
      {/* Refraction-like sheen */}
      <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgb(255_255_255/0.06)_45%,transparent_60%)]" />
      {grid && (
        <div className="bg-grid-inverse absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_60%_at_70%_20%,black,transparent)]" />
      )}
    </div>
  );
}
