import { impactMetrics, type ImpactMetric } from "@/content/company";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/section-heading";
import { Reveal } from "@/components/ui/blur-fade";
import { CountUp } from "@/components/motion/count-up";
import { reveal } from "@/lib/motion";

/**
 * "Our Impact": credibility directly after the home hero.
 *
 * Asymmetric 2 x 2 grid on large screens (wide / narrow, then narrow / wide)
 * with alternating neutral fills instead of borders or shadows. Numbers count
 * up once; text metrics are set as statements and never animated as counters.
 * Unverified numeric claims are only rendered outside production.
 */
const showUnverified = process.env.NODE_ENV !== "production";

function isShown(m: ImpactMetric) {
  return m.kind === "text" || m.verified || showUnverified;
}

export function MetricsSection() {
  const items = impactMetrics.filter(isShown);
  const asymmetric = items.length === 4;

  return (
    <section aria-labelledby="impact-title" className="pb-24 pt-28 md:pb-32 md:pt-40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Our impact"
          title={<span id="impact-title">Digital Work. Measurable Impact.</span>}
          body="We bring strategy, creativity, and technology together to help businesses build a stronger digital presence."
        />

        <ul className="mt-14 grid gap-3 md:grid-cols-2 lg:grid-cols-12">
          {items.map((m, i) => {
            // wide / narrow / narrow / wide
            const span = asymmetric ? (i === 0 || i === 3 ? "lg:col-span-7" : "lg:col-span-5") : "lg:col-span-6";
            const tone = i % 3 === 0 ? "bg-surface" : "bg-canvas-deep";
            return (
              <Reveal
                as="li"
                key={m.id}
                inView
                delay={i * reveal.stagger}
                className={cn("relative flex min-h-56 flex-col justify-between gap-10 rounded-panel p-7 md:p-9", span, tone)}
              >
                {m.kind === "number" && !m.verified && (
                  <span className="absolute right-5 top-5 rounded-full bg-danger/10 px-2.5 py-1 text-[0.7rem] font-semibold text-danger">
                    Needs confirmation (hidden in production)
                  </span>
                )}
                {m.kind === "number" ? (
                  <CountUp
                    value={m.value}
                    decimals={m.decimals}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    delay={0.15 + i * reveal.stagger}
                    className="text-[clamp(3.4rem,7vw,6rem)] font-semibold leading-none tracking-[-0.05em] text-heading"
                    suffixClassName="text-accent-strong"
                  />
                ) : (
                  <p className="max-w-[14ch] text-balance text-[clamp(2rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em] text-heading">
                    {m.display}
                  </p>
                )}
                <div className="max-w-[44ch]">
                  {m.kind === "number" && (
                    <p className="flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.12em] text-heading">
                      <span aria-hidden className="h-0.5 w-6 rounded-full bg-accent" />
                      {m.label}
                    </p>
                  )}
                  <p className={cn("text-pretty text-ink-muted", m.kind === "number" && "mt-3")}>{m.description}</p>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
