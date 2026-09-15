import type { Dictionary } from "@/lib/i18n";
import { menu } from "@/lib/menu";
import MenuCard from "./MenuCard";
import SectionHeading from "./SectionHeading";

export default function Menu({ dict }: { dict: Dictionary }) {
  const t = dict.menu;

  return (
    <section id="menu" className="scroll-mt-16 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow={t.eyebrow} title={t.title} intro={t.intro} align="center" />

        <nav aria-label={t.categoriesLabel} className="mt-8 flex flex-wrap justify-center gap-2">
          {menu.map((category) => (
            <a
              key={category.id}
              href={`#${category.id}`}
              className="rounded-full border border-espresso/15 px-4 py-1.5 text-sm font-medium text-espresso transition-colors hover:border-terracotta hover:text-terracotta"
            >
              {t.categories[category.id].title}
            </a>
          ))}
        </nav>

        <div className="mt-12 space-y-14 sm:mt-16 sm:space-y-20">
          {menu.map((category) => (
            <div key={category.id} id={category.id} className="scroll-mt-20">
              <div className="flex flex-col gap-1 border-b border-espresso/10 pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
                <h3 className="font-serif text-2xl font-semibold text-espresso sm:text-3xl">
                  {t.categories[category.id].title}
                </h3>
                <p className="text-sm text-espresso-light">{t.categories[category.id].note}</p>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
                {category.items.map((item) => (
                  <MenuCard key={item.id} item={item} copy={t.items[item.id]} pricePrefix={t.pricePrefix} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
