import { useTranslations } from "next-intl";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { GraduationCap, Briefcase, Award } from "lucide-react";

export default function VisaServicesPage() {
  return (
    <>
      <Header />
      <main className="pt-20">
        <VisaContent />
      </main>
      <Footer />
    </>
  );
}

function VisaContent() {
  const t = useTranslations("visaServices");

  const visas = [
    {
      icon: GraduationCap,
      title: t("studentVisa"),
      desc: "For students enrolled in Japanese language schools, colleges, or universities. We assist with all documentation, application forms, and embassy preparation.",
      requirements: ["Acceptance letter from a Japanese school", "Financial proof", "Passport copy", "Educational certificates", "Bank statements"],
      color: "bg-blue-50 border-blue-200",
      iconColor: "bg-blue-100 text-blue-600",
    },
    {
      icon: Briefcase,
      title: t("workingVisa"),
      desc: "For those seeking employment in Japan. We help match you with employers and navigate the complex working visa requirements.",
      requirements: ["Job offer from a Japanese company", "Certificate of Eligibility (COE)", "Passport copy", "Educational & professional certificates"],
      color: "bg-green-50 border-green-200",
      iconColor: "bg-green-100 text-green-600",
    },
    {
      icon: Award,
      title: t("trainingVisa"),
      desc: "The Technical Intern Training Program visa — ideal for gaining practical skills in Japan. We work with approved sending organizations.",
      requirements: ["Approved sending organization", "Training plan documents", "Employer acceptance", "Health certificate"],
      color: "bg-amber-50 border-amber-200",
      iconColor: "bg-amber-100 text-amber-600",
    },
  ];

  return (
    <>
      <section className="bg-[#0f172a] py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-3">Visa Assistance</p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-5">{t("title")}</h1>
          <p className="text-slate-300 text-lg">{t("hero")}</p>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {visas.map((visa) => {
              const Icon = visa.icon;
              return (
                <div key={visa.title} className={`rounded-2xl p-8 border ${visa.color}`}>
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${visa.iconColor}`}>
                    <Icon size={22} />
                  </div>
                  <h2 className="font-bold text-[#0f172a] text-xl mb-3">{visa.title}</h2>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">{visa.desc}</p>
                  <h4 className="font-semibold text-[#0f172a] text-sm mb-3">Key Requirements:</h4>
                  <ul className="space-y-2">
                    {visa.requirements.map((req) => (
                      <li key={req} className="flex items-start gap-2 text-sm text-slate-600">
                        <span className="w-1.5 h-1.5 bg-[#c0392b] rounded-full mt-1.5 shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <button className="mt-6 w-full bg-[#0f172a] hover:bg-[#c0392b] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors">
                    Get Started
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
