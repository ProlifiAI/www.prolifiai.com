"use client";

import { useState } from "react";
import { Check, LinkSimple, LinkedinLogo, XLogo } from "@phosphor-icons/react";

/** Plain share links (no third-party scripts) plus copy-to-clipboard. */
export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const item =
    "flex size-11 items-center justify-center rounded-full ring-1 ring-inset ring-line-strong text-heading transition-colors hover:bg-inverse hover:text-on-inverse focus-visible:bg-inverse focus-visible:text-on-inverse";
  return (
    <div className="flex items-center gap-2">
      <span className="mr-2 text-sm font-medium text-ink-muted">Share</span>
      <a className={item} href={`https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <LinkedinLogo size={18} />
      </a>
      <a className={item} href={`https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}`} target="_blank" rel="noopener noreferrer" aria-label="Share on X">
        <XLogo size={18} />
      </a>
      <button
        type="button"
        className={item}
        aria-label={copied ? "Link copied" : "Copy link"}
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(url);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          } catch {
            /* clipboard unavailable: the address bar still works */
          }
        }}
      >
        {copied ? <Check size={18} weight="bold" /> : <LinkSimple size={18} />}
      </button>
      <span role="status" className="sr-only">
        {copied ? "Link copied" : ""}
      </span>
    </div>
  );
}
