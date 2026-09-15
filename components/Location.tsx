import type { Dictionary, Locale } from "@/lib/i18n";
import { directionsUrl, mapEmbedUrl, site } from "@/lib/site";
import { ClockIcon, MapPinIcon } from "./icons";
import SectionHeading from "./SectionHeading";

export default function Location({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.location;

  return (
    <section id="location" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} />

        <div className="mt-10 grid gap-6 lg:grid-cols-5 lg:gap-8">
          <div className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-200">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                <MapPinIcon className="h-5 w-5 text-terracotta" />
                {t.addressTitle}
              </h3>
              <address className="mt-3 not-italic leading-relaxed text-espresso-light">
                {t.addressLines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </address>
              <p className="mt-2 text-sm text-espresso-light">{t.note}</p>
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block text-sm font-semibold text-terracotta underline decoration-terracotta/30 underline-offset-4 transition-colors hover:decoration-terracotta"
              >
                {t.directions}
                <span className="sr-only"> {dict.common.opensNewTab}</span>
              </a>
            </div>

            <div className="rounded-2xl bg-cream-50 p-6 ring-1 ring-cream-200">
              <h3 className="flex items-center gap-2 font-serif text-xl font-semibold">
                <ClockIcon className="h-5 w-5 text-terracotta" />
                {t.hoursTitle}
              </h3>
              <dl className="mt-4 divide-y divide-espresso/10">
                {t.days.map((day, index) => {
                  const time = site.hours[index];
                  return (
                    <div key={day} className="flex justify-between py-2 text-sm sm:text-base">
                      <dt className="text-espresso">{day}</dt>
                      <dd className={time ? "tabular-nums text-espresso-light" : "font-medium text-terracotta"}>
                        {time ?? t.closed}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </div>
          </div>

          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream-200 ring-1 ring-cream-200 lg:col-span-3 lg:aspect-auto lg:min-h-full">
            <iframe
              src={mapEmbedUrl(locale)}
              title={t.mapTitle}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
