import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: {
          50: "#FCF8F2",
          100: "#F6EEE2",
          200: "#EBDDC8",
          300: "#DCC7A8",
        },
        espresso: {
          DEFAULT: "#3A271D",
          light: "#6B5244",
          dark: "#24170F",
        },
        terracotta: {
          DEFAULT: "#B4532F",
          light: "#D27A55",
          dark: "#933F20",
        },
      },
      fontFamily: {
        // Latin faces first; Thai glyphs fall through to the Thai faces.
        serif: ["var(--font-fraunces)", "var(--font-serif-thai)", "Georgia", "serif"],
        sans: ["var(--font-dm-sans)", "var(--font-sans-thai)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
