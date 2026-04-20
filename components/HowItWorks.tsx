"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ClipboardList, GraduationCap, Plane } from "lucide-react";

const icons = [ClipboardList, GraduationCap, Plane];

export default function HowItWorks() {
  const t = useTranslations("howItWorks");

  const steps = [
    { key: "step1", icon: icons[0] },
    { key: "step2", icon: icons[1] },
    { key: "step3", icon: icons[2] },
  ];

  return (
    <section className="py-14 sm:py-20 bg-slate-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Simple Process
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

        <div className="relative">
          {/* Connector line */}
          <div className="hidden md:block absolute top-12 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-[#c0392b]/30 via-[#c0392b] to-[#c0392b]/30" style={{ left: "16.6%", right: "16.6%" }} />

          <div className="grid md:grid-cols-3 gap-6 sm:gap-10">
            {steps.map(({ key, icon: Icon }, i) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[#0f172a] rounded-2xl flex items-center justify-center shadow-lg">
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 bg-[#c0392b] rounded-full flex items-center justify-center text-white text-xs font-bold shadow-md">
                    {i + 1}
                  </div>
                </div>
                <h3 className="font-bold text-[#0f172a] text-xl mb-3">
                  {t(`${key}.title` as any)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                  {t(`${key}.desc` as any)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
