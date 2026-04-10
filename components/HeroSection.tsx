"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ChevronRight } from "lucide-react";
import DynamicCities from "./DynamicCities";
import GlobeViz from "./GlobeViz";
import SakuraFall from "./SakuraFall";

export default function HeroSection() {
  const t      = useTranslations("hero");
  const locale = useLocale();

  return (
    <section
      id="hero"
      className="relative mt-16 min-h-[calc(100vh-4rem)] flex items-center overflow-hidden"
    >
      {/* Solid white background */}
      <div className="absolute inset-0 bg-white pointer-events-none" />

      {/* Sakura petals — behind globe and text (z-[2]) */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <SakuraFall />
      </div>

      {/* ── Two-column layout (z-10 sits above petals) ── */}
      <div
        className="relative w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12"
        style={{ zIndex: 10 }}
      >
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-0">

          {/* LEFT — text */}
          <div className="flex-1 max-w-[580px]">

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 text-[#c0392b] text-sm font-semibold mb-7 tracking-wide"
            >
              <span className="w-1.5 h-1.5 bg-[#c0392b] rounded-full animate-pulse" />
              Since 2002 — Trusted by 5,000+ Students
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-[3rem] sm:text-5xl lg:text-[3.75rem] font-extrabold text-[#0f172a] leading-[1.05] tracking-tight mb-6"
            >
              {t("headline")}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7 }}
              className="text-lg text-slate-500 leading-relaxed mb-10 max-w-[480px]"
            >
              {t("subheadline")}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="flex flex-wrap items-center gap-4 mb-14"
            >
              <a
                href={`/${locale}/study-in-japan`}
                className="group inline-flex items-center gap-2 bg-[#0f172a] hover:bg-[#c0392b] text-white font-semibold px-7 py-3.5 rounded-lg transition-all duration-200 text-sm shadow-sm hover:shadow-md"
              >
                {t("explorePrograms")}
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href={`/${locale}/contact`}
                className="group inline-flex items-center gap-2 text-[#0f172a] hover:text-[#c0392b] font-semibold px-7 py-3.5 rounded-lg border border-slate-200 hover:border-[#c0392b]/40 transition-all duration-200 text-sm"
              >
                {t("contactUs")}
                <ChevronRight size={16} className="transition-transform group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            {/* Dynamic Cities */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <DynamicCities />
            </motion.div>
          </div>

          {/* RIGHT — Globe */}
          <div className="flex-1 hidden lg:block">
            <GlobeViz />
          </div>

        </div>
      </div>
    </section>
  );
}
