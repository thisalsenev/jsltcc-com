"use client";

import { useTranslations, useLocale } from "next-intl";
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
  const locale = useLocale();

  const courses = [
    { title: "Beginner Japanese (N5)", duration: "3 months", schedule: "Weekdays", desc: "Perfect for absolute beginners. Learn hiragana, katakana, and basic conversation." },
    { title: "Elementary Japanese (N4)", duration: "4 months", schedule: "Weekdays / Weekends", desc: "Build on basics with grammar, vocabulary, and reading skills." },
    { title: "Intermediate Japanese (N3)", duration: "4 months", schedule: "Weekends", desc: "Tackle everyday conversation, news reading, and written Japanese." },
    { title: "JLPT Exam Prep", duration: "2 weeks", schedule: "Weekdays / Weekends", desc: "University and professional-level Japanese. Deep grammar and complex texts." },
    { title: "TOPJ Exam Prep", duration: "2 weeks", schedule: "Weekends", desc: "Intensive preparation for the Test of Practical Japanese." },
    { title: "NAT Test Prep", duration: "2 weeks", schedule: "Weekends", desc: "Focused preparation for the NAT-TEST, required for many Japanese schools." },
  ];

  return (
    <>
      <section className="bg-[#0f172a] py-16 sm:py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-3">Courses</p>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white mb-4 sm:mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-base sm:text-lg">{t("hero")}</p>
        </div>
      </section>

      <section className="py-14 sm:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#0f172a] mb-8 sm:mb-10 text-center">{t("coursesTitle")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {courses.map((course) => (
              <div key={course.title} className="border border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-[#c0392b]/40 hover:shadow-md transition-all flex flex-col">
                <h3 className="font-bold text-[#0f172a] mb-2">{course.title}</h3>
                <p className="text-slate-500 text-sm mb-4 leading-relaxed flex-1">{course.desc}</p>
                <div className="text-xs text-slate-400 space-y-1 mb-4">
                  <div>Duration: <span className="text-slate-600 font-medium">{course.duration}</span></div>
                  <div>Schedule: <span className="text-slate-600 font-medium">{course.schedule}</span></div>
                </div>
                <a
                  href={`/${locale}/contact?program=japanese`}
                  className="block text-center bg-[#0f172a] hover:bg-[#c0392b] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors"
                >
                  Enquire
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
