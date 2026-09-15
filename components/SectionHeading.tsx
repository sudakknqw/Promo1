type Props = {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export default function SectionHeading({ eyebrow, title, intro, align = "left", tone = "light" }: Props) {
  const centered = align === "center";
  const dark = tone === "dark";

  return (
    <div className={centered ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <p className={`eyebrow ${dark ? "text-terracotta-light" : "text-terracotta"}`}>{eyebrow}</p>
      <h2
        className={`mt-3 font-serif text-3xl font-semibold leading-tight sm:text-4xl lg:text-5xl ${
          dark ? "text-cream-50" : "text-espresso"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${dark ? "text-cream-200" : "text-espresso-light"}`}>
          {intro}
        </p>
      )}
    </div>
  );
}
