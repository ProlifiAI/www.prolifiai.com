import type { Metadata } from "next";
import { Check, Minus } from "@phosphor-icons/react/dist/ssr";

import { ctas } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { pricingFaqs } from "@/content/company";
import { comparison, quotedWork, websitePackages } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/button";
import { PricingCard } from "@/components/pricing-card";
import { SectionHeading } from "@/components/section-heading";
import { CtaBand, FaqSection, PageHero } from "@/components/sections";
import { BlurFade } from "@/components/ui/blur-fade";

export const metadata: Metadata = pageMetadata({
  title: "Website Design Pricing | Prolifi AI",
  description:
    "Website design packages at $450 and $900 (USD, one-off), or a custom quote for larger projects. Compare what each Prolifi AI package includes.",
  path: "/pricing",
});

function Cell({ value, highlighted }: { value: boolean | string; highlighted?: boolean }) {
  if (typeof value === "string") {
    return <span className="font-medium text-heading">{value}</span>;
  }
  return value ? (
    <>
      <span
        aria-hidden
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-full",
          highlighted ? "bg-accent text-on-accent" : "bg-inverse text-on-inverse"
        )}
      >
        <Check size={12} weight="bold" />
      </span>
      <span className="sr-only">Included</span>
    </>
  ) : (
    <>
      <Minus size={16} aria-hidden className="inline text-ink-muted/60" />
      <span className="sr-only">Not included</span>
    </>
  );
}

export default function PricingPage() {
  return (
    <>
      <PageHero
        video="pricing"
        eyebrow="Pricing"
        title="Simple, honest pricing"
        intro="Pick the website package that fits where you are today. Prices are one-off and in US dollars, and every project starts with a written quote."
      />

      <section className="bg-canvas-deep pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="container-page">
          <h2 className="sr-only">Website packages</h2>
          <ul className="grid items-stretch gap-5 lg:grid-cols-3">
            {websitePackages.map((pkg, i) => (
              <BlurFade as="li" key={pkg.id} direction="up" offset={18} delay={0.06 * i} duration={0.6}>
                <PricingCard pkg={pkg} />
              </BlurFade>
            ))}
          </ul>
          <p className="mt-10 text-sm text-ink-muted">
            All prices in US dollars (USD). The exact scope of your project is confirmed in your quote before any work begins.
          </p>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 md:py-32">
        <div className="container-page">
          <SectionHeading title="Compare the packages" />
          <div className="relative mt-12 overflow-x-auto rounded-panel bg-surface shadow-soft ring-1 ring-line">
            <table className="w-full min-w-[640px] border-collapse text-left">
              <caption className="sr-only">Features included in each website package</caption>
              <thead>
                <tr className="border-b border-line">
                  <th scope="col" className="px-6 py-5 text-sm font-medium text-ink-muted">
                    Feature
                  </th>
                  {websitePackages.map((p) => (
                    <th
                      key={p.id}
                      scope="col"
                      className={cn("px-6 py-5 text-center text-base font-semibold", p.highlighted ? "bg-inverse text-on-inverse" : "text-heading")}
                    >
                      {p.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.map((row) => (
                  <tr key={row.feature} className="border-b border-line last:border-0">
                    <th scope="row" className="px-6 py-4 text-[0.95rem] font-normal text-ink">
                      {row.feature}
                    </th>
                    {websitePackages.map((p) => (
                      <td key={p.id} className={cn("px-6 py-4 text-center", p.highlighted && "bg-inverse/[0.035]")}>
                        <Cell value={row.values[p.id]} highlighted={p.highlighted} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Quoted work */}
      <section className="relative isolate overflow-hidden bg-inverse py-24 text-on-inverse md:py-32">
        <div aria-hidden className="bg-grid-inverse absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" />
        <div className="container-page">
          <SectionHeading
            tone="inverse"
            title="Social media and product work, quoted to fit"
            body="These projects vary too much for fixed packages. Tell us what you need and we will send a clear quote."
          />
          <ul className="mt-14 grid gap-5 md:grid-cols-2">
            {quotedWork.map((q, i) => (
              <BlurFade as="li" key={q.title} inView direction="up" offset={16} delay={0.08 * i} duration={0.6} className="flex flex-col rounded-panel bg-inverse-raised p-8 edge-inverse md:p-10">
                <p className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{q.pillar}</p>
                <h3 className="mt-3 text-h3 font-semibold">{q.title}</h3>
                <p className="mt-3 max-w-[46ch] text-pretty text-on-inverse-muted">{q.body}</p>
                <div className="mt-8">
                  <ButtonLink href={`${ctas.contact.href}?pillar=${q.pillarId}`} variant="inverse">
                    Request a Quote
                  </ButtonLink>
                </div>
              </BlurFade>
            ))}
          </ul>
        </div>
      </section>

      <FaqSection items={pricingFaqs} title="Pricing questions" />
      <CtaBand title="Not sure which package fits?" body="Tell us about your business and we will recommend the right starting point." />
    </>
  );
}
