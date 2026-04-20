import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import { useTranslations } from "next-intl";

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <ContactHero />
        <ContactCTA />
      </main>
      <Footer />
    </>
  );
}

function ContactHero() {
  const t = useTranslations("contact");
  return (
    <section className="bg-[#0f172a] py-16 sm:py-20 px-4 text-center">
      <p className="text-[#c0392b] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">Get In Touch</p>
      <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-3 sm:mb-4">{t("title")}</h1>
      <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto">{t("subtitle")}</p>
    </section>
  );
}
