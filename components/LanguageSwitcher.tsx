"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { localeNames, locales, type Locale } from "@/lib/i18n";

export default function LanguageSwitcher({ locale, label }: { locale: Locale; label: string }) {
  // Moves the highlight on click, before the other language has loaded.
  const [active, setActive] = useState(locale);
  useEffect(() => setActive(locale), [locale]);

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
            onClick={() => setActive(code)}
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
