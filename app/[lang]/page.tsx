import { notFound } from "next/navigation";
import About from "@/components/About";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Location from "@/components/Location";
import Menu from "@/components/Menu";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

export default function Home({ params }: { params: { lang: string } }) {
  if (!isLocale(params.lang)) notFound();

  const locale = params.lang;
  const dict = getDictionary(locale);

  return (
    <>
      <Header locale={locale} dict={dict} />
      <main>
        <Hero dict={dict} />
        <Menu dict={dict} />
        <About dict={dict} />
        <Location locale={locale} dict={dict} />
      </main>
      <Footer dict={dict} />
    </>
  );
}
