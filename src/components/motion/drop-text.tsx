import type { CSSProperties, ElementType } from "react";

import { DropScope, type ScopeProps } from "@/components/motion/drop-scope";

export { DropScope };

/**
 * Prolifi's signature text motion, modelled on the Ariyana Studio reference:
 * characters drop in from above, each inside its own clip, with a back-in-out
 * curve (dip, fall, slight overshoot, settle). Styles live in globals.css.
 *
 * - `mode="load"`: plays on page load. Rendered with [data-drop-in] on the
 *   server, so it is pure CSS and works without JavaScript. `intro` waits for
 *   the brand intro when it is showing.
 * - `mode="view"`: plays once, the first time the text scrolls into view.
 *
 * Accessibility: the scope carries the full text as its accessible name
 * (aria-label) and the split characters are aria-hidden, so screen readers
 * read the heading once, normally. The characters' text content is still the
 * original sentence, so search engines see it once too. Words stay
 * unbreakable units and spaces stay real spaces, so wrapping is unchanged.
 *
 * Usage
 *   <DropText as="h2" text="What we stand for" className="..." />
 *   or, for headings with styled parts, a DropScope around several <Chars>:
 *   <DropScope as="h1" chars={countChars(a, b)}>
 *     <span><Chars text={a} /></span> <span className="text-accent"><Chars text={b} from={a.length} /></span>
 *   </DropScope>
 */

/** Visible characters, used to space the stagger evenly */
export function countChars(...parts: string[]) {
  return parts.join("").replace(/\s/g, "").length;
}

/**
 * The split characters of one run of text. `from` continues the stagger
 * index from earlier runs in the same DropScope.
 */
export function Chars({ text, from = 0 }: { text: string; from?: number }) {
  let i = from;
  const words = text.split(/(\s+)/);
  return (
    <span aria-hidden>
        {words.map((word, w) =>
          /^\s+$/.test(word) ? (
            " "
          ) : word ? (
            <span key={w} className="drop-word">
              {[...word].map((ch, c) => (
                <span key={c} className="drop-clip">
                  <span className="drop-char" style={{ "--i": i++ } as CSSProperties}>
                    {ch}
                  </span>
                </span>
              ))}
            </span>
          ) : null
        )}
    </span>
  );
}

/** Single run of text: the common case for headings */
export function DropText({
  text,
  as = "span",
  ...rest
}: { text: string; as?: ElementType } & Omit<ScopeProps, "chars" | "children" | "as" | "label">) {
  return (
    <DropScope as={as} label={text} chars={countChars(text)} {...rest}>
      <Chars text={text} />
    </DropScope>
  );
}

/**
 * Hover roll for links: the label rolls up as an identical copy rolls in from
 * below, character by character. Put `roll-host` on the interactive element.
 * With `drop`, the visible copy also drops in on page load.
 */
export function RollText({
  text,
  drop = false,
  intro = false,
  delay = 0,
}: {
  text: string;
  drop?: boolean;
  intro?: boolean;
  delay?: number;
}) {
  const chars = [...text];
  const layer = (withDrop: boolean) =>
    chars.map((ch, i) => (
      <span key={i} className="roll-char" style={{ "--i": i } as CSSProperties}>
        {/* Spaces become non-breaking: a plain space inside an inline-block collapses */}
        {withDrop ? (
          <span className="drop-char" style={{ "--i": i } as CSSProperties}>
            {ch === " " ? "\u00a0" : ch}
          </span>
        ) : ch === " " ? (
          "\u00a0"
        ) : (
          ch
        )}
      </span>
    ));
  // The first layer is the readable label; the copy that rolls in is aria-hidden
  return (
    <span className="roll">
      {drop ? (
        <DropScope mode="load" intro={intro} delay={delay} chars={countChars(text)} className="roll-layer">
          {layer(true)}
        </DropScope>
      ) : (
        <span className="roll-layer">{layer(false)}</span>
      )}
      <span aria-hidden className="roll-layer">
        {layer(false)}
      </span>
    </span>
  );
}
