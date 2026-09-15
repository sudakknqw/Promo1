import type { MenuCategoryId, MenuItemId } from "./menu";

export const locales = ["en", "th"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeNames: Record<Locale, string> = {
  en: "English",
  th: "ภาษาไทย",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

type Week<T> = [T, T, T, T, T, T, T];

export type MenuItemCopy = {
  name: string;
  description: string;
  alt: string;
  tag?: string;
};

export type GalleryPhotoId = "counter" | "bar" | "pour-over";

export type GalleryCopy = {
  label: string;
  previous: string;
  next: string;
  /** "Show photo" → "Show photo 2" */
  showPhoto: string;
  /** "Photo" → "Photo 1 of 3" */
  photo: string;
  of: string;
  alts: Record<GalleryPhotoId, string>;
};

export type Dictionary = {
  meta: { title: string; description: string };
  common: { opensNewTab: string };
  header: { contact: string; call: string; lineLabel: string; language: string };
  hero: { eyebrow: string; tagline: string; hoursSummary: string; viewMenu: string; imageAlt: string };
  menu: {
    eyebrow: string;
    title: string;
    intro: string;
    categoriesLabel: string;
    pricePrefix: string;
    categories: Record<MenuCategoryId, { title: string; note: string }>;
    items: Record<MenuItemId, MenuItemCopy>;
  };
  about: {
    eyebrow: string;
    title: string;
    /** First paragraph opens with an emphasised word. */
    intro: { emphasis: string; rest: string };
    body: string;
    facts: { value: string; label: string }[];
    gallery: GalleryCopy;
  };
  location: {
    eyebrow: string;
    title: string;
    addressTitle: string;
    addressLines: string[];
    note: string;
    directions: string;
    hoursTitle: string;
    closed: string;
    /** Monday → Sunday, matching `site.hours`. */
    days: Week<string>;
    mapTitle: string;
  };
  footer: { tagline: string; rights: string; demo: string };
};
