"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";
import Image from "next/image";

type FilterType = "all" | "language" | "university" | "vocational";

const cityImages: Record<string, string> = {
  Yokohama: "/images/cities/yokohama.jpg",
  Tokyo: "/images/cities/tokyo.jpg",
  Saitama: "/images/cities/saitama.jpg",
  Nagoya: "/images/cities/Nagoya.webp",
  Osaka: "/images/cities/Osaka.jpg",
  Kobe: "/images/cities/kobe.jpg",
  Hiroshima: "/images/cities/Hiroshima.jpg",
  Sapporo: "/images/cities/sapporo.jpg",
  Chiba: "/images/cities/Chiba .webp",
  Nagano: "/images/cities/Nagano.jpg",
};

const schools = [
  { id: 1, name: "YIEA", city: "Yokohama", type: "language", programs: ["General Japanese", "JLPT Prep"], logo: "YI" },
  { id: 2, name: "Arts College", city: "Yokohama", type: "language", programs: ["Japanese Language", "Cultural Studies"], logo: "AC" },
  { id: 3, name: "Tokyo Meisei Japanese Language Academy", city: "Tokyo", type: "language", programs: ["JLPT N1-N5", "Intensive Japanese"], logo: "TM" },
  { id: 4, name: "Funabashi Japanese Language Academy", city: "Saitama", type: "language", programs: ["General Japanese", "JLPT Prep"], logo: "FJ" },
  { id: 15, name: "International Bridge Academy", city: "Saitama", type: "language", programs: ["Japanese Language"], logo: "IB" },
  { id: 5, name: "Nagoya Advanced Academy of Japanese", city: "Nagoya", type: "language", programs: ["Advanced Japanese", "JLPT N1-N2"], logo: "NA" },
  { id: 6, name: "JP Education Academy", city: "Nagoya", type: "language", programs: ["General Japanese", "NAT Test Prep"], logo: "JP" },
  { id: 7, name: "Umikaze Academy of Japanese", city: "Osaka", type: "language", programs: ["General Japanese", "TOPJ Prep"], logo: "UA" },
  { id: 8, name: "Osaka Christian College", city: "Osaka", type: "language", programs: ["Japanese Language", "Cultural Exchange"], logo: "OC" },
  { id: 16, name: "AIUEO International School", city: "Nagoya", type: "language", programs: ["Japanese Language"], logo: "AU" },
  { id: 9, name: "Asia International Center", city: "Kobe", type: "language", programs: ["General Japanese", "JLPT Prep"], logo: "AI" },
  { id: 10, name: "Kaisei Academy Japanese Language School", city: "Kobe", type: "language", programs: ["Intensive Japanese", "NAT Test Prep"], logo: "KA" },
  { id: 11, name: "Narashino Institute of Foreign Languages", city: "Chiba", type: "language", programs: ["General Japanese", "JLPT Prep"], logo: "NI" },
  { id: 12, name: "Japan International Institute of Cybernetics", city: "Tokyo", type: "language", programs: ["Japanese Language", "Technology"], logo: "JI" },
  { id: 13, name: "YIEA Tokyo", city: "Tokyo", type: "language", programs: ["General Japanese", "JLPT Prep"], logo: "YT" },
  { id: 14, name: "ISI Language School", city: "Nagano", type: "language", programs: ["General Japanese", "Intensive Japanese"], logo: "IS" },
];

const typeColors: Record<string, string> = {
  language: "bg-blue-100 text-blue-700",
  university: "bg-purple-100 text-purple-700",
  vocational: "bg-amber-100 text-amber-700",
};

export default function SchoolsSection() {
  const t = useTranslations("schools");
  const [activeFilter, setActiveFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: t("filterAll") },
    { key: "language", label: t("filterLanguage") },
  ];

  const filtered = activeFilter === "all" ? schools : schools.filter((s) => s.type === activeFilter);

  return (
    <section className="relative overflow-hidden py-14 sm:py-20" id="schools">

      {/* GPU-accelerated panning background */}
      <motion.div
        className="absolute w-[120%] h-[120%] -left-[10%] -top-[10%] z-0"
        style={{
          willChange: "transform",
          background: `
            radial-gradient(ellipse at 20% 20%, rgba(134, 239, 172, 0.7) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 10%, rgba(216, 180, 254, 0.7) 0%, transparent 45%),
            radial-gradient(ellipse at 60% 60%, rgba(167, 243, 208, 0.5) 0%, transparent 50%),
            radial-gradient(ellipse at 10% 80%, rgba(192, 132, 252, 0.6) 0%, transparent 45%),
            radial-gradient(ellipse at 90% 80%, rgba(110, 231, 183, 0.6) 0%, transparent 40%),
            radial-gradient(ellipse at 50% 30%, rgba(233, 213, 255, 0.6) 0%, transparent 55%),
            #f5f0ff
          `,
        }}
        animate={{ x: ["-2%", "2%", "-1%", "-2%"], y: ["-2%", "1%", "2%", "-2%"] }}
        transition={{ duration: 30, ease: "linear", repeat: Infinity }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Partner Network
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

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeFilter === f.key
                  ? "bg-[#0f172a] text-white border-[#0f172a] shadow-md"
                  : "bg-white/80 backdrop-blur-sm text-slate-600 border-slate-200 hover:border-slate-400"
              }`}
            >
              {f.label}
              {f.key === "all" && (
                <span className="ml-2 bg-[#c0392b] text-white text-xs px-1.5 py-0.5 rounded-full">
                  {schools.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Schools Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((school, i) => {
              const cityImg = cityImages[school.city];
              return (
                <motion.div
                  key={school.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.2, delay: i * 0.03 }}
                  className="group relative rounded-2xl overflow-hidden border border-slate-200 hover:border-[#c0392b]/40 hover:shadow-xl transition-all duration-300 cursor-pointer"
                >
                  {/* City background image */}
                  {cityImg && (
                    <div className="absolute inset-0">
                      <Image
                        src={cityImg}
                        alt={school.city}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      {/* Dark overlay */}
                      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/40 transition-colors duration-300" />
                    </div>
                  )}

                  {/* Content — white frosted stage */}
                  <div className="relative z-10 p-3 sm:p-5">
                    {/* Logo */}
                    <div className="w-8 h-8 sm:w-11 sm:h-11 bg-white rounded-lg sm:rounded-xl flex items-center justify-center text-[#0f172a] font-bold text-xs sm:text-sm mb-2 sm:mb-4 shadow-md">
                      {school.logo}
                    </div>

                    {/* Type badge */}
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeColors[school.type]}`}>
                      {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                    </span>

                    {/* Name + location — frosted white box */}
                    <div className="mt-2 sm:mt-3 mb-2 sm:mb-3 bg-white/90 backdrop-blur-sm rounded-lg sm:rounded-xl px-2 sm:px-3 py-2 sm:py-2.5 shadow-sm">
                      <h3 className="font-bold text-[#0f172a] text-xs sm:text-sm leading-snug group-hover:text-[#c0392b] transition-colors line-clamp-2">
                        {school.name}
                      </h3>
                      <div className="flex items-center gap-1 text-slate-500 text-xs mt-0.5 sm:mt-1">
                        <MapPin size={9} />
                        {school.city}
                      </div>
                    </div>

                    {/* Programs — hidden on mobile to save space */}
                    <div className="hidden sm:flex flex-wrap gap-1 mb-3">
                      {school.programs.map((p) => (
                        <span key={p} className="text-xs bg-white/80 backdrop-blur-sm text-slate-700 px-2 py-0.5 rounded-md font-medium shadow-sm">
                          {p}
                        </span>
                      ))}
                    </div>

                    {/* View Details */}
                    <button className="flex items-center gap-1 text-white text-xs font-semibold opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity">
                      {t("viewDetails")} <ExternalLink size={12} />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Count */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Showing {filtered.length} {t("schoolsCount")}
        </p>
      </div>
    </section>
  );
}
