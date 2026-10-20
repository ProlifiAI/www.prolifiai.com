import { Check } from "@phosphor-icons/react/dist/ssr";

import { ctas } from "@/content/site";
import { currency, formatPrice, type Package } from "@/content/pricing";
import { cn } from "@/lib/utils";
import { ButtonLink } from "@/components/button";

export function PricingCard({ pkg }: { pkg: Package }) {
  const featured = pkg.highlighted;
  return (
    <article
      className={cn(
        "relative flex h-full flex-col rounded-panel p-7 transition-[transform,box-shadow] duration-500 ease-[var(--ease-reveal)] hover:-translate-y-1 md:p-8",
        featured
          ? "bg-inverse text-on-inverse shadow-lift edge-inverse hover:shadow-[0_40px_80px_-32px_rgb(14_48_98/0.55)] lg:-my-4 lg:py-12"
          : "bg-surface text-ink shadow-soft ring-1 ring-line transition-[transform,box-shadow,--tw-ring-color] hover:shadow-lift hover:ring-inverse/25"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className={cn("text-lg font-semibold", featured ? "text-on-inverse" : "text-heading")}>{pkg.name}</h3>
        {featured && (
          <span className="rounded-full bg-accent px-3 py-1 text-xs font-semibold text-on-accent">Most popular</span>
        )}
      </div>

      <p className="mt-6 flex items-baseline gap-2">
        {pkg.price !== null ? (
          <>
            <span className={cn("text-5xl font-semibold tracking-[-0.04em]", featured ? "text-on-inverse" : "text-heading")}>
              {formatPrice(pkg.price)}
            </span>
            <span className={cn("text-sm", featured ? "text-on-inverse-muted" : "text-ink-muted")}>{currency.code}</span>
          </>
        ) : (
          <span className={cn("text-5xl font-semibold tracking-[-0.04em]", featured ? "text-on-inverse" : "text-heading")}>
            Contact us
          </span>
        )}
      </p>
      <p className={cn("mt-1 text-sm", featured ? "text-on-inverse-muted" : "text-ink-muted")}>{pkg.billing}</p>
      <p className={cn("mt-5 text-pretty", featured ? "text-on-inverse/90" : "text-ink")}>{pkg.summary}</p>

      <ul className={cn("mt-6 space-y-3 border-t pt-6 text-[0.95rem]", featured ? "border-line-inverse" : "border-line")}>
        {pkg.features.map((f) => (
          <li key={f} className="flex gap-3">
            <span
              aria-hidden
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full",
                featured ? "bg-accent text-on-accent" : "bg-inverse/[0.07] text-heading"
              )}
            >
              <Check size={12} weight="bold" />
            </span>
            <span className={featured ? "text-on-inverse/90" : "text-ink"}>{f}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <ButtonLink
          href={`${ctas.contact.href}?package=${pkg.id}`}
          variant={featured ? "accent" : "outline"}
          className="w-full justify-between"
        >
          {pkg.cta}
        </ButtonLink>
      </div>
    </article>
  );
}
