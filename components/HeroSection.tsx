"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  const t = useTranslations("hero");
  const locale = useLocale();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/Japan and Sri Lanka united.png"
          alt="Japan and Sri Lanka united"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay so text stays readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0f172a]/80 via-[#0f172a]/60 to-[#0f172a]/85" />
      </div>

      {/* Decorative elements on top of image */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full border border-[#c0392b]/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full border border-[#c0392b]/15" />
        <div className="absolute top-20 left-10 w-2 h-2 bg-[#c0392b] rounded-full opacity-60 animate-pulse" />
        <div className="absolute top-40 right-20 w-1.5 h-1.5 bg-[#f59e0b] rounded-full opacity-40 animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-32 left-1/4 w-1 h-1 bg-white rounded-full opacity-30 animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute bottom-20 right-1/3 w-2 h-2 bg-[#c0392b] rounded-full opacity-40 animate-pulse" style={{ animationDelay: "0.5s" }} />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#c0392b]/20 border border-[#c0392b]/30 text-[#f87171] text-sm font-medium px-4 py-1.5 rounded-full mb-6"
        >
          <span className="w-1.5 h-1.5 bg-[#f87171] rounded-full animate-pulse" />
          Since 2002 — Trusted by 5,000+ Students
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-tight mb-6"
        >
          {t("headline")}
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto mb-10 leading-relaxed"
        >
          {t("subheadline")}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href={`/${locale}/study-in-japan`}
            className="inline-flex items-center gap-2 bg-[#c0392b] hover:bg-[#e74c3c] text-white font-semibold px-8 py-3.5 rounded-xl transition-all shadow-lg hover:shadow-[#c0392b]/30 hover:shadow-xl hover:-translate-y-0.5"
          >
            {t("explorePrograms")}
            <ArrowRight size={18} />
          </a>
          <a
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/30 text-white font-semibold px-8 py-3.5 rounded-xl transition-all backdrop-blur-sm"
          >
            <Play size={16} />
            {t("contactUs")}
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-300"
        >
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-slate-300" />
          <div className="w-5 h-8 border-2 border-slate-300 rounded-full flex justify-center pt-1.5">
            <div className="w-1 h-2 bg-slate-300 rounded-full animate-bounce" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
