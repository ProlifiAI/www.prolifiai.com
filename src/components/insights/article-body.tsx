import type { Article } from "@/content/insights/types";
import { categoryById } from "@/content/insights/categories";
import { Inline } from "@/components/insights/inline";
import { InsightCta } from "@/components/insights/insight-cta";

/**
 * Renders an article's blocks with the site's type scale. Measure is kept
 * to roughly 68 characters for comfortable reading; headings get scroll
 * margin so table-of-contents jumps clear the floating header.
 */
export function ArticleBody({ article }: { article: Article }) {
  const category = categoryById(article.category);
  return (
    <div className="text-[1.0625rem] leading-[1.75] text-ink md:text-[1.125rem]">
      {article.body.map((b, i) => {
        switch (b.type) {
          case "p":
            return (
              <p key={i} className="mt-6 text-pretty first:mt-0">
                <Inline text={b.text} />
              </p>
            );
          case "h2":
            return (
              <h2
                key={i}
                id={b.id}
                className="mt-14 scroll-mt-[calc(var(--header-h)+1.5rem)] text-balance text-[clamp(1.5rem,2.4vw,2rem)] font-semibold leading-tight tracking-[-0.02em] text-heading"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3 key={i} className="mt-10 text-xl font-semibold text-heading">
                {b.text}
              </h3>
            );
          case "ul":
          case "ol": {
            const List = b.type;
            return (
              <List key={i} className={`mt-6 space-y-3 pl-6 ${b.type === "ul" ? "list-disc marker:text-accent" : "list-decimal marker:font-semibold marker:text-heading"}`}>
                {b.items.map((item, j) => (
                  <li key={j} className="pl-1 text-pretty">
                    <Inline text={item} />
                  </li>
                ))}
              </List>
            );
          }
          case "quote":
            return (
              <blockquote key={i} className="my-10 border-l-4 border-accent pl-6 text-xl font-medium leading-relaxed text-heading">
                <p>
                  <Inline text={b.text} />
                </p>
                {b.cite && <footer className="mt-3 text-sm font-normal text-ink-muted">{b.cite}</footer>}
              </blockquote>
            );
          case "callout":
            return (
              <div key={i} className="my-10 rounded-panel bg-surface p-6 ring-1 ring-line md:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-accent-strong">{b.title}</p>
                {b.text && (
                  <p className="mt-3 text-pretty">
                    <Inline text={b.text} />
                  </p>
                )}
                {b.items && (
                  <ul className="mt-4 space-y-3">
                    {b.items.map((item, j) => (
                      <li key={j} className="flex gap-3 text-pretty text-[1rem] leading-relaxed">
                        <span aria-hidden className="mt-[0.6em] size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>
                          <Inline text={item} />
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          case "cta":
            return <InsightCta key={i} category={category} variant="inline" />;
          case "sources":
            return (
              <section key={i} aria-labelledby="sources-title" className="mt-14 border-t border-line pt-8">
                <h2 id="sources-title" className="text-sm font-semibold uppercase tracking-[0.14em] text-ink-muted">
                  Sources
                </h2>
                <ol className="mt-4 space-y-2 text-sm leading-relaxed text-ink-muted">
                  {b.items.map((s, j) => (
                    <li key={j} id={`source-${j + 1}`} className="scroll-mt-[calc(var(--header-h)+1.5rem)]">
                      [{j + 1}]{" "}
                      {s.href ? (
                        <a href={s.href} target="_blank" rel="noopener noreferrer" className="underline decoration-line-strong underline-offset-2 hover:text-heading">
                          {s.label}
                        </a>
                      ) : (
                        s.label
                      )}
                    </li>
                  ))}
                </ol>
              </section>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
