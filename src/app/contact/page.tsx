import type { Metadata } from "next";
import { Suspense } from "react";
import { EnvelopeSimple } from "@phosphor-icons/react/dist/ssr";

import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";
import { processSteps } from "@/content/services";
import { ContactForm } from "@/components/contact-form";
import { BlurFade } from "@/components/ui/blur-fade";
import { BrandVideoBackground } from "@/components/motion/brand-video-background";

export const metadata: Metadata = pageMetadata({
  title: "Contact Prolifi AI | Start Your Project",
  description:
    "Tell Prolifi AI about your business and what you need, from a new website to a launch campaign or product design. We reply by email.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* The Contact clip (a warm first meeting) fills only the sidebar beside the
          form, under the navy gradient; the form side stays calm. Cropped, never stretched. */}
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[34rem] overflow-hidden lg:h-full lg:w-[42%]">
        <BrandVideoBackground video="contact" align="center" />
      </div>
      <div className="container-page grid gap-12 pb-24 pt-[calc(var(--header-h)+3rem)] md:pt-[calc(var(--header-h)+4.5rem)] lg:grid-cols-12 lg:gap-10 lg:pb-32">
        <BlurFade direction="up" offset={14} duration={0.6} className="text-on-inverse lg:col-span-4">
          <p className="glass-surface mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-label font-semibold uppercase text-accent">
            Contact
          </p>
          <h1 className="text-balance text-h1 font-semibold">Let&apos;s work together</h1>
          <p className="mt-6 max-w-[40ch] text-pretty text-lead text-on-inverse-muted">
            Tell us about your business and what you would like to achieve. The more we know, the better our first
            conversation will be.
          </p>

          <div className="mt-12 hidden lg:block">
            <h2 className="text-sm font-medium text-accent">What happens next</h2>
            <ol className="mt-5 space-y-5">
              {processSteps.slice(0, 2).map((s, i) => (
                <li key={s.title} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span aria-hidden className="flex size-8 items-center justify-center rounded-full bg-white/10 text-sm font-semibold">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold">{s.title}</p>
                    <p className="mt-1 text-pretty text-sm text-on-inverse-muted">{s.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {site.contactEmail && (
            <p className="mt-10 flex items-center gap-3 text-on-inverse-muted">
              <EnvelopeSimple size={20} aria-hidden className="text-accent" />
              <a href={`mailto:${site.contactEmail}`} className="underline decoration-white/30 underline-offset-4 hover:text-on-inverse">
                {site.contactEmail}
              </a>
            </p>
          )}
        </BlurFade>

        <BlurFade direction="up" offset={20} delay={0.1} duration={0.7} className="lg:col-span-7 lg:col-start-6 lg:pt-6">
          <Suspense fallback={<div className="h-[52rem] animate-pulse rounded-panel bg-surface ring-1 ring-line" />}>
            <ContactForm />
          </Suspense>
        </BlurFade>
      </div>
    </section>
  );
}
