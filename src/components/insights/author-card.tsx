import Image from "next/image";
import Link from "next/link";
import { LinkedinLogo } from "@phosphor-icons/react/dist/ssr";

import type { Author } from "@/content/insights/authors";

/** "About the author": photo, name, role, and links to the team page and LinkedIn. */
export function AuthorCard({ author }: { author: Author }) {
  const linkedin = author.sameAs.find((u) => u.includes("linkedin.com"));
  return (
    <section aria-labelledby="author-title" className="flex gap-5 rounded-panel bg-surface p-6 ring-1 ring-line md:p-7">
      <Image src={author.photo} alt={`Photo of ${author.name}`} width={72} height={72} className="size-16 shrink-0 rounded-full object-cover md:size-[72px]" />
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-ink-muted">About the author</p>
        <h2 id="author-title" className="mt-1 text-lg font-semibold text-heading">
          <Link href={author.profile} rel="author" className="hover:underline">
            {author.name}
          </Link>
        </h2>
        <p className="text-sm text-ink-muted">{author.role}, Prolifi AI</p>
        <p className="mt-3 text-pretty text-[0.95rem] text-ink">
          {author.name} is {author.role} at Prolifi AI, a strategy, design and development studio working with businesses
          across Australia and New Zealand.
        </p>
        {linkedin && (
          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer me"
            className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-heading underline decoration-line-strong underline-offset-4 hover:decoration-heading"
          >
            <LinkedinLogo size={16} aria-hidden />
            {author.name} on LinkedIn
          </a>
        )}
      </div>
    </section>
  );
}
