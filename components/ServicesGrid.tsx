"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { BookOpen, Plane, Globe, FileText, ArrowRight } from "lucide-react";
import AppStoreMarquee from "./AppStoreMarquee";

const services = [
  { key: "japaneseLanguage", icon: BookOpen, href: "/japanese-language",      iconClass: "bg-blue-500/20  text-blue-300  group-hover:bg-blue-500/35"  },
  { key: "studyInJapan",     icon: Plane,    href: "/study-in-japan",          iconClass: "bg-red-500/20   text-red-300   group-hover:bg-red-500/35"   },
  { key: "studyInUK",        icon: Globe,    href: "/study-in-united-kingdom", iconClass: "bg-green-500/20 text-green-300 group-hover:bg-green-500/35" },
  { key: "visaServices",     icon: FileText, href: "/visa-services",           iconClass: "bg-amber-500/20 text-amber-300 group-hover:bg-amber-500/35" },
];

export default function ServicesGrid() {
  const t      = useTranslations("services");
  const locale = useLocale();

  return (
    <section id="programs" className="relative overflow-hidden">
    <AppStoreMarquee className="min-h-0 sm:min-h-[800px] py-6 sm:py-24">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-20">
        <div className="text-center mb-6 sm:mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#f87171] font-semibold text-xs sm:text-sm uppercase tracking-widest mb-1 sm:mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-2xl sm:text-4xl font-extrabold text-white mb-2 sm:mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto text-sm sm:text-base"
          >
            {t("subtitle")}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-6">
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
                className="group rounded-xl sm:rounded-2xl p-3 sm:p-7 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-2 sm:mb-5 transition-all duration-300 ${svc.iconClass}`}>
                  <Icon size={16} className="sm:hidden" />
                  <Icon size={22} className="hidden sm:block" />
                </div>
                <h3 className="font-bold text-white text-xs sm:text-lg mb-0 sm:mb-2 group-hover:text-[#f87171] transition-colors leading-snug">
                  {t(`${svc.key}.title` as any)}
                </h3>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed flex-1 hidden sm:block">
                  {t(`${svc.key}.desc` as any)}
                </p>
                <div className="hidden sm:flex items-center gap-1 mt-5 text-[#f87171] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more <ArrowRight size={14} />
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

    </AppStoreMarquee>
    </section>
  );
}
