import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SchoolsSection from "@/components/SchoolsSection";
import CitiesSection from "@/components/CitiesSection";

export default function StudyInJapanPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <StudyJapanContent />
      </main>
      <Footer />
    </>
  );
}

function StudyJapanContent() {
  const t = useTranslations("studyJapan");

  const steps = [
    { step: "01", title: "Free Counselling", desc: "Meet our advisors and discuss your goals, budget, and preferred location in Japan." },
    { step: "02", title: "School Selection", desc: "We match you with the best school from our 40+ partner institutions." },
    { step: "03", title: "Document Preparation", desc: "We guide you through all required documents for the school and visa application." },
    { step: "04", title: "Application Submission", desc: "We submit your application to the school and follow up on your behalf." },
    { step: "05", title: "Visa Processing", desc: "We handle your student visa application and prepare you for the embassy interview." },
    { step: "06", title: "Pre-Departure Support", desc: "Orientation session, accommodation tips, and arrival support in Japan." },
  ];

  return (
    <>
      <section className="bg-[#0f172a] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-3">Study Abroad</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-lg">{t("hero")}</p>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-10 text-center">{t("processTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {steps.map((step) => (
              <div key={step.step} className="relative bg-slate-50 rounded-2xl p-6 border border-slate-100">
                <div className="text-5xl font-extrabold text-slate-100 absolute top-4 right-4">{step.step}</div>
                <h3 className="font-bold text-[#0f172a] mb-2 relative">{step.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed relative">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SchoolsSection />
      <CitiesSection />
    </>
  );
}
