import type { Dictionary, Locale } from "@/lib/i18n";
import en from "./en";
import th from "./th";

const dictionaries: Record<Locale, Dictionary> = { en, th };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
