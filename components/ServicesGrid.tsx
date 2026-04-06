"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, Plane, Globe, FileText, ArrowRight } from "lucide-react";

const services = [
  { key: "japaneseLanguage", icon: BookOpen, href: "/japanese-language", color: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" },
  { key: "studyInJapan", icon: Plane, href: "/study-in-japan", color: "bg-red-50 text-[#c0392b] group-hover:bg-[#c0392b] group-hover:text-white" },
  { key: "studyInAustralia", icon: Globe, href: "/study-in-australia", color: "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white" },
  { key: "visaServices", icon: FileText, href: "/visa-services", color: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white" },
];

export default function ServicesGrid() {
  const t = useTranslations("services");
  const locale = useLocale();

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-[#0f172a] mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-500 max-w-xl mx-auto"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <motion.a
                key={svc.key}
                href={`/${locale}${svc.href}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl border border-slate-100 hover:border-transparent transition-all duration-300 hover:-translate-y-1 flex flex-col"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${svc.color}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-[#0f172a] text-lg mb-2 group-hover:text-[#c0392b] transition-colors">
                  {t(`${svc.key}.title` as any)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed flex-1">
                  {t(`${svc.key}.desc` as any)}
                </p>
                <div className="flex items-center gap-1 mt-5 text-[#c0392b] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
