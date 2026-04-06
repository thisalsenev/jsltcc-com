import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function JapaneseLangPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <JapaneseLangContent />
      </main>
      <Footer />
    </>
  );
}

function JapaneseLangContent() {
  const t = useTranslations("japaneseLanguage");

  const courses = [
    { title: "Beginner Japanese (N5)", duration: "3 months", schedule: "Weekdays / Weekends", desc: "Perfect for absolute beginners. Learn hiragana, katakana, and basic conversation." },
    { title: "Elementary Japanese (N4)", duration: "4 months", schedule: "Weekdays / Weekends", desc: "Build on basics with grammar, vocabulary, and reading skills." },
    { title: "Intermediate Japanese (N3)", duration: "5 months", schedule: "Weekdays / Weekends", desc: "Tackle everyday conversation, news reading, and written Japanese." },
    { title: "Advanced Japanese (N2-N1)", duration: "6 months", schedule: "Weekdays", desc: "University and professional-level Japanese. Deep grammar and complex texts." },
    { title: "TOPJ Exam Prep", duration: "2 months", schedule: "Weekends", desc: "Intensive preparation for the Test of Practical Japanese." },
    { title: "NAT Test Prep", duration: "2 months", schedule: "Weekends", desc: "Focused preparation for the NAT-TEST, required for many Japanese schools." },
  ];

  return (
    <>
      <section className="bg-[#0f172a] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-3">Courses</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-lg">{t("hero")}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-[#0f172a] mb-10 text-center">{t("coursesTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.title} className="border border-slate-200 rounded-2xl p-6 hover:border-[#c0392b]/40 hover:shadow-md transition-all">
                <h3 className="font-bold text-[#0f172a] mb-2">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed">{course.desc}</p>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Duration: <span className="text-slate-600 font-medium">{course.duration}</span></div>
                  <div>Schedule: <span className="text-slate-600 font-medium">{course.schedule}</span></div>
                </div>
                <button className="mt-4 w-full bg-[#0f172a] hover:bg-[#c0392b] text-white text-sm font-semibold py-2 rounded-lg transition-colors">
                  Enquire
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
