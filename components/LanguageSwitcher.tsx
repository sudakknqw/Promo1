"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useState, type MouseEvent } from "react";
import { localeNames, locales, type Locale } from "@/lib/i18n";

// Blocks rendered in the same order in both languages, so the Nth one is the same block after a switch.
const ANCHOR_SELECTOR = "main :is(h1, h2, h3, h4, p, article, address, iframe, dl > div):not(.sr-only), footer";
const HEADER_HEIGHT = 64;

type ScrollAnchor = { index: number; top: number };

// Module scope so it survives the re-render into the other language.
let pendingAnchor: ScrollAnchor | null = null;

/** The block starting closest to the top of the visible area, below the fixed header. */
function captureAnchor(): ScrollAnchor | null {
  const blocks = document.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR);
  let best: ScrollAnchor | null = null;
  for (let index = 0; index < blocks.length; index++) {
    const top = blocks[index].getBoundingClientRect().top;
    if (top >= HEADER_HEIGHT && (best === null || top < best.top)) best = { index, top };
  }
  return best;
}

const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  // Moves the highlight on click, before the other language has loaded.
  const [active, setActive] = useState(locale);

  // Text is longer or shorter in the other language, so keeping scrollY alone shifts the content.
  // Before paint, put the block that was at the top of the screen back where it was.
  useIsomorphicLayoutEffect(() => {
    setActive(locale);
    const anchor = pendingAnchor;
    pendingAnchor = null;
    if (!anchor) return;

    const block = document.querySelectorAll<HTMLElement>(ANCHOR_SELECTOR)[anchor.index];
    if (!block) return;
    const shift = block.getBoundingClientRect().top - anchor.top;
    if (shift !== 0) window.scrollTo({ top: window.scrollY + shift, behavior: "instant" });
  }, [locale]);

  const onSwitch = (e: MouseEvent<HTMLAnchorElement>, code: Locale) => {
    if (code === locale || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    pendingAnchor = captureAnchor();
    setActive(code);
  };

  return (
    <div
      role="group"
      aria-label={label}
      className="relative flex h-9 shrink-0 items-center rounded-full border border-cream-50/30 p-0.5 transition-colors hover:border-cream-50 hover:bg-cream-50/10"
    >
      <span
        aria-hidden="true"
        className={`absolute inset-y-0.5 left-0.5 w-[calc(50%-2px)] rounded-full bg-cream-50 shadow-sm transition-transform duration-300 ease-out motion-reduce:transition-none ${
          active === "th" ? "translate-x-full" : "translate-x-0"
        }`}
      />
      {locales.map((code) => {
        const isActive = code === active;
        return (
          <Link
            key={code}
            href={`/${code}`}
            scroll={false}
            hrefLang={code}
            lang={code}
            aria-label={localeNames[code]}
            aria-current={isActive ? "true" : undefined}
            onClick={(e) => onSwitch(e, code)}
            className={`relative z-10 flex h-full w-7 items-center justify-center rounded-full text-[11px] font-semibold tracking-wide transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50 sm:w-8 sm:text-xs ${
              isActive ? "text-espresso" : "text-cream-200 hover:text-cream-50"
            }`}
          >
            {code.toUpperCase()}
          </Link>
        );
      })}
    </div>
  );
}
