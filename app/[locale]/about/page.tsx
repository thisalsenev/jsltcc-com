import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Image from "next/image";

const historyPairs = [
  { label: "Our Beginnings", before: "/images/about/history1.jpg",   after: "/images/about/history2.jpg"   },
  { label: "Growing Forward", before: "/images/about/history 3.jpg", after: "/images/about/history 4.jpg" },
  { label: "Today",            before: "/images/about/history 5.jpg", after: "/images/about/history 6.jpg" },
];

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
      <section className="bg-[#0f172a] py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">About Us</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-base sm:text-lg">{t("hero")}</p>
        </div>
      </section>

      {/* Story */}
      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-3 sm:mb-4">{t("storyTitle")}</h2>
              <p className="text-slate-600 leading-relaxed text-sm sm:text-base">{t("story")}</p>
            </div>
            <div className="bg-slate-50 rounded-2xl p-6 sm:p-8 border border-slate-100">
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

      {/* History / Journey — hover to reveal */}
      <section className="py-14 sm:py-20 bg-[#0f172a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <p className="text-[#c0392b] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-2">Our Journey</p>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">Moments That Shaped Us</h2>
            <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-xl mx-auto">Hover over each image to see the story unfold.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
            {historyPairs.map((pair) => (
              <div
                key={pair.label}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 shadow-xl cursor-pointer"
              >
                {/* Before (default) */}
                <Image
                  src={pair.before}
                  alt={pair.label}
                  fill
                  className="object-cover transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
                {/* After (on hover) */}
                <Image
                  src={pair.after}
                  alt={`${pair.label} — revealed`}
                  fill
                  className="absolute inset-0 object-cover opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />

                {/* Subtle gradient + label */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-5 pointer-events-none">
                  <p className="text-[#c0392b] text-[11px] font-semibold uppercase tracking-widest mb-1 transition-opacity duration-300 group-hover:opacity-90">JSLTCC</p>
                  <h3 className="text-white text-lg sm:text-xl font-bold leading-tight">{pair.label}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-12 sm:py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-5 sm:gap-8">
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
              <div className="w-10 h-10 bg-[#c0392b] rounded-xl mb-5 flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <h3 className="text-xl font-bold text-[#0f172a] mb-3">{t("missionTitle")}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{t("mission")}</p>
            </div>
            <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-100">
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
