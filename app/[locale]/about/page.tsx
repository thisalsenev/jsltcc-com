import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <AboutContent />
      </main>
      <Footer />
    </>
  );
}

function AboutContent() {
  const t = useTranslations("about");

  return (
    <>
      {/* Hero */}
      <section className="bg-[#0f172a] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-lg">{t("hero")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-extrabold text-[#0f172a] mb-4">{t("storyTitle")}</h2>
              <p className="text-slate-600 leading-relaxed">{t("story")}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
              <div className="grid grid-cols-2 gap-6 text-center">
                {[
                  { value: "2002", label: "Founded" },
                  { value: "5,000+", label: "Graduates" },
                  { value: "40+", label: "Partner Schools" },
                  { value: "20+", label: "Years Experience" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-3xl font-extrabold text-[#c0392b]">{stat.value}</div>
                    <div className="text-slate-500 text-sm mt-1">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-slate-100">
              <div className="w-10 h-10 bg-[#c0392b] rounded-xl mb-5 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">{t("missionTitle")}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t("mission")}</p>
            </div>
            <div className="bg-white rounded-2xl p-8 border border-slate-100">
              <div className="w-10 h-10 bg-[#0f172a] rounded-xl mb-5 flex items-center justify-center">
                <span className="text-white font-bold text-sm">V</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">{t("visionTitle")}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t("vision")}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
