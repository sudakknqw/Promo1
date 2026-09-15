import type { Metadata, Viewport } from "next";
import { DM_Sans, Fraunces, IBM_Plex_Sans_Thai, Noto_Serif_Thai } from "next/font/google";
import { getDictionary } from "@/lib/dictionaries";
import { defaultLocale, isLocale, locales } from "@/lib/i18n";
import "../globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

// Thai faces are only fetched when Thai glyphs render, so no preload on the English page.
const notoSerifThai = Noto_Serif_Thai({
  subsets: ["thai"],
  variable: "--font-serif-thai",
  display: "swap",
  preload: false,
});

const plexSansThai = IBM_Plex_Sans_Thai({
  subsets: ["thai"],
  weight: ["400", "500", "600"],
  variable: "--font-sans-thai",
  display: "swap",
  preload: false,
});

type Props = { children: React.ReactNode; params: { lang: string } };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: Omit<Props, "children">): Metadata {
  const { meta } = getDictionary(isLocale(params.lang) ? params.lang : defaultLocale);
  return { title: meta.title, description: meta.description };
}

export const viewport: Viewport = {
  themeColor: "#3A271D",
};

export default function RootLayout({ children, params }: Props) {
  const lang = isLocale(params.lang) ? params.lang : defaultLocale;

  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${dmSans.variable} ${notoSerifThai.variable} ${plexSansThai.variable}`}
    >
      <body className="bg-cream-100 font-sans text-espresso antialiased">{children}</body>
    </html>
  );
}
