import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders the small inline syntax used in article text:
 * **bold**, *italic*, [link text](/path or https://...) and [n] source markers.
 * Internal links use next/link; external links open safely in a new tab.
 */
const TOKEN = /(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\)|\[\d+\])/g;

export function Inline({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return (
    <>
      {parts.map((part, i): ReactNode => {
        if (part.startsWith("**")) return <strong key={i} className="font-semibold text-heading">{part.slice(2, -2)}</strong>;
        if (/^\[\d+\]$/.test(part)) {
          const n = part.slice(1, -1);
          return (
            <sup key={i} className="ml-0.5 text-[0.7em]">
              <a href={`#source-${n}`} aria-label={`Source ${n}`} className="text-accent-strong underline-offset-2 hover:underline">
                [{n}]
              </a>
            </sup>
          );
        }
        if (part.startsWith("[")) {
          const m = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
          if (m) {
            const [, label, href] = m;
            const cls = "font-medium text-heading underline decoration-accent decoration-2 underline-offset-4 hover:decoration-heading";
            return href.startsWith("/") || href.startsWith("#") ? (
              <Link key={i} href={href} className={cls}>
                {label}
              </Link>
            ) : (
              <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {label}
              </a>
            );
          }
        }
        if (part.startsWith("*") && part.endsWith("*")) return <em key={i}>{part.slice(1, -1)}</em>;
        return part;
      })}
    </>
  );
}
