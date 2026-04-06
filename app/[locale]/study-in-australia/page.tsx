import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function StudyAustraliaPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <StudyAustraliaContent />
      </main>
      <Footer />
    </>
  );
}

function StudyAustraliaContent() {
  const t = useTranslations("studyAustralia");

  const programs = [
    { title: "English Language Programs", duration: "3–12 months", city: "Melbourne / Sydney", desc: "Intensive English courses at accredited colleges." },
    { title: "Diploma & Certificate Courses", duration: "1–2 years", city: "Multiple cities", desc: "Vocational Education and Training (VET) qualifications." },
    { title: "Undergraduate Degrees", duration: "3–4 years", city: "Multiple universities", desc: "Bachelor degree programs across a wide range of fields." },
    { title: "Postgraduate Degrees", duration: "1–2 years", city: "Multiple universities", desc: "Masters and PhD programs at top Australian universities." },
  ];

  const cities = [
    { name: "Sydney", desc: "Australia's largest city with world-class universities.", color: "bg-blue-600" },
    { name: "Melbourne", desc: "Cultural capital and top-ranked student city.", color: "bg-green-600" },
    { name: "Brisbane", desc: "Sunny, affordable, and growing fast.", color: "bg-amber-600" },
    { name: "Perth", desc: "Peaceful, beautiful, and close to Asia.", color: "bg-purple-600" },
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

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-10 text-center">{t("programsTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {programs.map((p) => (
              <div key={p.title} className="border border-slate-200 rounded-2xl p-6 hover:border-[#c0392b]/40 hover:shadow-md transition-all">
                <h3 className="font-bold text-[#0f172a] mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Duration: <span className="text-slate-600 font-medium">{p.duration}</span></div>
                  <div>Location: <span className="text-slate-600 font-medium">{p.city}</span></div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-8 text-center">Partner Cities in Australia</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {cities.map((city) => (
              <div key={city.name} className={`${city.color} rounded-2xl p-6 text-white`}>
                <h3 className="font-bold text-xl mb-2">{city.name}</h3>
                <p className="text-white/80 text-sm">{city.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
