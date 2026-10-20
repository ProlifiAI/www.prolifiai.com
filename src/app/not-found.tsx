import { ctas } from "@/content/site";
import { ButtonLink } from "@/components/button";

export default function NotFound() {
  return (
    <section className="container-page flex min-h-[70dvh] flex-col items-start justify-center pb-24 pt-[calc(var(--header-h)+4rem)]">
      <p className="text-label font-semibold uppercase text-brand">Error 404</p>
      <h1 className="mt-4 max-w-2xl text-balance text-h1 font-semibold text-heading">This page could not be found</h1>
      <p className="mt-5 max-w-[48ch] text-lead text-ink-muted">
        The link may be broken or the page may have moved. Head back home or explore what Prolifi does.
      </p>
      <div className="mt-9 flex flex-wrap gap-3">
        <ButtonLink href="/">Back to Home</ButtonLink>
        <ButtonLink href={ctas.services.href} variant="outline">
          {ctas.services.label}
        </ButtonLink>
      </div>
    </section>
  );
}
