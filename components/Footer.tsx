import type { ComponentType, SVGProps } from "react";
import type { Dictionary } from "@/lib/i18n";
import { site, type SocialKind } from "@/lib/site";
import { ChatIcon, FacebookIcon, InstagramIcon } from "./icons";

const socialIcons: Record<SocialKind, ComponentType<SVGProps<SVGSVGElement>>> = {
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  line: ChatIcon,
};

export default function Footer({ dict }: { dict: Dictionary }) {
  const t = dict.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso-dark text-cream-200">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 py-12 text-center sm:px-6 md:flex-row md:justify-between md:text-left">
        <div>
          <p className="font-serif text-2xl font-semibold text-cream-50">
            Baan <span className="text-terracotta-light">Kaffe</span>
          </p>
          <p className="mt-1 text-sm">{t.tagline}</p>
        </div>

        <ul className="flex gap-3">
          {site.socials.map(({ kind, label, url }) => {
            const SocialIcon = socialIcons[kind];
            return (
              <li key={kind}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} ${dict.common.opensNewTab}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-cream-50/20 text-cream-100 transition-colors hover:border-terracotta-light hover:bg-terracotta hover:text-cream-50"
                >
                  <SocialIcon className="h-5 w-5" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="border-t border-cream-50/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-1 px-4 py-5 text-center text-xs sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {year} Baan Kaffe. {t.rights}
          </p>
          <p className="text-cream-300/70">{t.demo}</p>
        </div>
      </div>
    </footer>
  );
}
