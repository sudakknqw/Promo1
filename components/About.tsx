import type { Dictionary } from "@/lib/i18n";
import AboutGallery from "./AboutGallery";
import SectionHeading from "./SectionHeading";

export default function About({ dict }: { dict: Dictionary }) {
  const t = dict.about;

  return (
    <section id="about" className="scroll-mt-16 bg-cream-200/60 py-16 sm:py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 md:grid-cols-2 lg:gap-16">
        <AboutGallery copy={t.gallery} />

        <div>
          <SectionHeading eyebrow={t.eyebrow} title={t.title} />
          <div className="mt-6 space-y-4 text-base leading-relaxed text-espresso-light sm:text-lg">
            <p>
              <em className="font-serif not-italic text-espresso">{t.intro.emphasis}</em>
              {t.intro.rest}
            </p>
            <p>{t.body}</p>
          </div>

          <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-espresso/10 pt-6">
            {t.facts.map((fact) => (
              <div key={fact.label}>
                <dt className="sr-only">{fact.label}</dt>
                <dd className="font-serif text-2xl font-semibold text-terracotta sm:text-3xl">{fact.value}</dd>
                <dd className="mt-1 text-xs leading-snug text-espresso-light sm:text-sm">{fact.label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
