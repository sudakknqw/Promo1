import type { Locale } from "./i18n";

export type SocialKind = "instagram" | "facebook" | "line";

// Language-independent details. All visible copy lives in lib/dictionaries.
export const site = {
  name: "Baan Kaffe",
  phone: {
    display: "+66 2 123 4567",
    href: "tel:+6621234567",
  },
  line: {
    id: "@baankaffe",
    url: "https://line.me/R/ti/p/@baankaffe",
  },
  mapQuery: "Soi Ari 1, Phaya Thai, Bangkok",
  /** Monday → Sunday; `null` means closed. */
  hours: [null, "7:30 – 18:00", "7:30 – 18:00", "7:30 – 18:00", "7:30 – 18:00", "8:00 – 19:00", "8:00 – 19:00"],
  socials: [
    { kind: "instagram", label: "Instagram", url: "https://instagram.com/baankaffe" },
    { kind: "facebook", label: "Facebook", url: "https://facebook.com/baankaffe" },
    { kind: "line", label: "LINE", url: "https://line.me/R/ti/p/@baankaffe" },
  ] satisfies { kind: SocialKind; label: string; url: string }[],
} as const;

export function mapEmbedUrl(locale: Locale) {
  return `https://www.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=16&hl=${locale}&output=embed`;
}

export const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.mapQuery)}`;
