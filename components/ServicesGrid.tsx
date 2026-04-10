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
    <AppStoreMarquee bgColor="#0f172a">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#f87171] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            What We Offer
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl font-extrabold text-white mb-4"
          >
            {t("title")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-slate-400 max-w-xl mx-auto"
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
                className="group rounded-2xl p-7 border border-white/10 hover:border-white/25 transition-all duration-300 hover:-translate-y-1 flex flex-col"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 transition-all duration-300 ${svc.iconClass}`}>
                  <Icon size={22} />
                </div>
                <h3 className="font-bold text-white text-lg mb-2 group-hover:text-[#f87171] transition-colors">
                  {t(`${svc.key}.title` as any)}
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed flex-1">
                  {t(`${svc.key}.desc` as any)}
                </p>
                <div className="flex items-center gap-1 mt-5 text-[#f87171] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
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
