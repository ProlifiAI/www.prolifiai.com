import { generalFaqs } from "@/content/company";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { CtaBand, FaqSection, ProcessSection } from "@/components/sections";
import { MetricsSection } from "@/components/metrics";
import { ValueProposition } from "@/components/value-proposition";
import { WhatWeDo } from "@/components/what-we-do";
import { TestimonialsSection } from "@/components/testimonials";
import {
  CapabilityMarquee,
  FeaturedComposition,
  HomeHero,
  PricingPreview,
  Proposition,
  SelectedWork,
} from "@/components/home";

export const metadata = pageMetadata({ title: site.title, description: site.description, path: "/" });

/**
 * Journey: hero (with floating achievement cards) > impact metrics >
 * services (full-scale Build > Launch > Scale sticky stack) and process > the Prolifi
 * difference > pricing > client experiences > FAQ > final CTA.
 * The founders section lives on the About page only.
 */
export default function HomePage() {
  return (
    <>
      <HomeHero />
      <FeaturedComposition />
      <MetricsSection />
      <Proposition />
      <WhatWeDo />
      <CapabilityMarquee />
      <SelectedWork />
      <ProcessSection />
      <ValueProposition />
      <PricingPreview />
      <TestimonialsSection />
      <FaqSection items={generalFaqs} />
      <CtaBand />
    </>
  );
}
