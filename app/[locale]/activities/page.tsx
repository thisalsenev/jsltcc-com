import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ActivitiesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <ActivitiesContent />
      </main>
      <Footer />
    </>
  );
}

function ActivitiesContent() {
  const t = useTranslations("activities");

  const activities = [
    { title: "Annual Japanese Cultural Festival", category: "Cultural", date: "March 2024", desc: "Celebrating Japanese culture with traditional performances, food, and language competitions." },
    { title: "JLPT Exam Preparation Camp", category: "Academic", date: "October 2023", desc: "Intensive 3-day camp for N5–N2 level students preparing for the December JLPT exam." },
    { title: "Japan University Fair", category: "Academic", date: "September 2023", desc: "Representatives from 15 Japanese universities visited JSLTCC to meet prospective students." },
    { title: "Graduation Ceremony 2023", category: "Ceremony", date: "August 2023", desc: "Celebrating our 2023 graduating batch — 230 students heading to Japan and Australia." },
    { title: "Japanese Calligraphy Workshop", category: "Cultural", date: "July 2023", desc: "Hands-on workshop teaching the art of Japanese Shodo (書道) calligraphy." },
    { title: "Australia Study Expo", category: "Academic", date: "June 2023", desc: "Information session with representatives from Australian institutions and IELTS prep tips." },
  ];

  const categories = ["All", "Cultural", "Academic", "Ceremony"];

  return (
    <>
      <section className="bg-[#0f172a] py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">Events & Gallery</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-base sm:text-lg">{t("hero")}</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 justify-center mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                className="px-5 py-2 rounded-full text-sm font-medium border border-slate-200 hover:border-[#0f172a] hover:text-[#0f172a] text-slate-500 transition-all"
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {activities.map((act) => (
              <div key={act.title} className="border border-slate-200 rounded-2xl overflow-hidden hover:shadow-md hover:border-[#c0392b]/30 transition-all group">
                {/* Placeholder image */}
                <div className="h-32 sm:h-40 bg-gradient-to-br from-[#0f172a] to-[#1e293b] flex items-center justify-center">
                  <div className="text-white/20 text-5xl sm:text-6xl font-serif">日</div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold bg-[#c0392b]/10 text-[#c0392b] px-2.5 py-0.5 rounded-full">{act.category}</span>
                    <span className="text-xs text-slate-400">{act.date}</span>
                  </div>
                  <h3 className="font-bold text-[#0f172a] mb-2 group-hover:text-[#c0392b] transition-colors">{act.title}</h3>
                  <p className="text-slate-500 text-sm leading-relaxed">{act.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
