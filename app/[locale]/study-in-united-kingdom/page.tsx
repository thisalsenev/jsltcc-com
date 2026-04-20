import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AppStoreMarquee from "@/components/AppStoreMarquee";

// Folder name has a space → URL-encode as %20
const UK_IMAGES = [
  "/images/united%20kingdom/NLTyQ.jpg",
  "/images/united%20kingdom/VsXou.jpg",
  "/images/united%20kingdom/XTQI1.jpg",
  "/images/united%20kingdom/opYlJ.jpg",
  "/images/united%20kingdom/tC2S7.jpg",
  "/images/united%20kingdom/uCUIz.jpg",
  "/images/united%20kingdom/7gZM3%20copy.jpg",
  "/images/united%20kingdom/jcysE%20copy.jpg",
  "/images/united%20kingdom/qvINr%20copy.jpg",
];

export default function StudyUKPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <StudyUKContent />
      </main>
      <Footer />
    </>
  );
}

function StudyUKContent() {
  const t = useTranslations("studyUK");

  const programs = [
    { title: "English Language Programs", duration: "3–12 months", city: "London / Manchester", desc: "Intensive English courses at accredited UK colleges." },
    { title: "Diploma & Certificate Courses", duration: "1–2 years", city: "Multiple cities", desc: "Foundation and higher diploma qualifications across the UK." },
    { title: "Undergraduate Degrees", duration: "3–4 years", city: "Multiple universities", desc: "Bachelor degree programs across a wide range of fields." },
    { title: "Postgraduate Degrees", duration: "1–2 years", city: "Multiple universities", desc: "Masters and PhD programs at top UK universities." },
  ];

  const cities = [
    { name: "London", desc: "The world's most international city — home to top-ranked universities.", color: "bg-blue-800" },
    { name: "Manchester", desc: "Vibrant student city with excellent universities and affordability.", color: "bg-red-800" },
    { name: "Birmingham", desc: "The UK's second city with a growing international student community.", color: "bg-slate-700" },
    { name: "Edinburgh", desc: "Scotland's stunning capital with one of the world's oldest universities.", color: "bg-emerald-800" },
  ];

  return (
    <>
      <AppStoreMarquee images={UK_IMAGES}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">Study Abroad</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-base sm:text-lg">{t("hero")}</p>
        </div>
      </AppStoreMarquee>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-8 sm:mb-10 text-center">{t("programsTitle")}</h2>
          <div className="grid md:grid-cols-2 gap-4 sm:gap-6 mb-12 sm:mb-16">
            {programs.map((p) => (
              <div key={p.title} className="border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-[#c0392b]/40 hover:shadow-md transition-all">
                <h3 className="font-bold text-[#0f172a] mb-2">{p.title}</h3>
                <p className="text-slate-500 text-sm mb-4">{p.desc}</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Duration: <span className="text-slate-600 font-medium">{p.duration}</span></div>
                  <div>Location: <span className="text-slate-600 font-medium">{p.city}</span></div>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-6 sm:mb-8 text-center">Partner Cities in the UK</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
            {cities.map((city) => (
              <div key={city.name} className={`${city.color} rounded-2xl p-4 sm:p-6 text-white`}>
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
