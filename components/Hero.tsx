import Image from "next/image";
import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ArrowDownIcon, ClockIcon } from "./icons";

export default function Hero({ dict }: { dict: Dictionary }) {
  const t = dict.hero;

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] items-center justify-center overflow-hidden">
      <Image
        src="/images/cafe-interior.jpg"
        alt={t.imageAlt}
        fill
        priority
        quality={75}
        sizes="100vw"
        className="-z-20 object-cover object-center"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-espresso-dark/60" />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-b from-espresso-dark/40 via-transparent to-espresso-dark/80"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-5 pb-16 pt-28 text-center">
        <p className="eyebrow text-cream-200 sm:text-sm">{t.eyebrow}</p>
        <h1 className="mt-4 font-serif text-6xl font-semibold leading-none tracking-tight text-cream-50 sm:text-7xl lg:text-8xl">
          {site.name}
        </h1>
        <p className="mt-5 max-w-md text-lg leading-relaxed text-cream-100 sm:max-w-xl sm:text-xl">{t.tagline}</p>

        <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-cream-50/25 bg-espresso-dark/40 px-4 py-2 text-sm text-cream-100 backdrop-blur-sm">
          <ClockIcon className="h-4 w-4 text-terracotta-light" />
          {t.hoursSummary}
        </p>

        <a
          href="#menu"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-terracotta px-7 py-3.5 text-base font-semibold text-cream-50 shadow-lg shadow-espresso-dark/30 transition-colors hover:bg-terracotta-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream-50"
        >
          {t.viewMenu}
          <ArrowDownIcon className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}
