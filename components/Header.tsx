import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ChatIcon, PhoneIcon } from "./icons";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const t = dict.header;

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-cream-50/10 bg-espresso-dark/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-2 px-4 sm:gap-3 sm:px-6">
        <a
          href="#top"
          className="shrink-0 font-serif text-lg font-semibold tracking-tight text-cream-50 min-[400px]:text-xl sm:text-2xl"
        >
          Baan <span className="text-terracotta-light">Kaffe</span>
        </a>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher locale={locale} label={t.language} />

          <nav aria-label={t.contact} className="flex items-center gap-1.5 sm:gap-2">
            <a
              href={site.phone.href}
              aria-label={`${t.call} ${site.phone.display}`}
              className="inline-flex h-9 items-center gap-1.5 rounded-full border border-cream-50/30 px-3 text-sm font-medium text-cream-50 transition-colors hover:border-cream-50 hover:bg-cream-50/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50 sm:px-3.5"
            >
              <PhoneIcon className="h-4 w-4 max-[359px]:hidden" />
              {t.call}
            </a>
            <a
              href={site.line.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${t.lineLabel} ${site.line.id} ${dict.common.opensNewTab}`}
              className="inline-flex h-9 items-center gap-1.5 rounded-full bg-terracotta px-3 text-sm font-medium text-cream-50 transition-colors hover:bg-terracotta-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream-50 sm:px-3.5"
            >
              <ChatIcon className="h-4 w-4 max-[359px]:hidden" />
              LINE
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
}
