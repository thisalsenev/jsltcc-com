"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, ExternalLink } from "lucide-react";

type FilterType = "all" | "language" | "university" | "vocational";

const schools = [
  { id: 1, name: "Tokyo Language Institute", city: "Tokyo", type: "language", programs: ["JLPT N1-N5", "Business Japanese"], logo: "TLI" },
  { id: 2, name: "Osaka International School", city: "Osaka", type: "language", programs: ["General Japanese", "JLPT Prep"], logo: "OIS" },
  { id: 3, name: "Kyoto University of Arts", city: "Kyoto", type: "university", programs: ["Arts & Design", "Japanese Studies"], logo: "KUA" },
  { id: 4, name: "Waseda Language Academy", city: "Tokyo", type: "language", programs: ["Academic Japanese", "JLPT N1-N3"], logo: "WLA" },
  { id: 5, name: "Fukuoka Tech Institute", city: "Fukuoka", type: "vocational", programs: ["IT & Technology", "Engineering"], logo: "FTI" },
  { id: 6, name: "Sapporo Japanese School", city: "Sapporo", type: "language", programs: ["General Japanese", "Cultural Exchange"], logo: "SJS" },
  { id: 7, name: "Nagoya Business College", city: "Nagoya", type: "vocational", programs: ["Business Management", "Accounting"], logo: "NBC" },
  { id: 8, name: "Kobe International University", city: "Kobe", type: "university", programs: ["Economics", "Engineering", "Science"], logo: "KIU" },
  { id: 9, name: "Yokohama Language Center", city: "Yokohama", type: "language", programs: ["Intensive Japanese", "TOPJ Prep"], logo: "YLC" },
  { id: 10, name: "Hiroshima Design School", city: "Hiroshima", type: "vocational", programs: ["Graphic Design", "Architecture"], logo: "HDS" },
  { id: 11, name: "Sendai University", city: "Sendai", type: "university", programs: ["Science & Technology", "Medicine"], logo: "SU" },
  { id: 12, name: "Nara Cultural Institute", city: "Nara", type: "language", programs: ["Traditional Japanese", "Culture & History"], logo: "NCI" },
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
    { key: "university", label: t("filterUniversity") },
    { key: "vocational", label: t("filterVocational") },
  ];

  const filtered = activeFilter === "all" ? schools : schools.filter((s) => s.type === activeFilter);

  return (
    <section className="py-20 bg-white" id="schools">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((school, i) => (
              <motion.div
                key={school.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="group bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#c0392b]/40 hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Logo placeholder */}
                <div className="w-12 h-12 bg-[#0f172a] rounded-xl flex items-center justify-center text-white font-bold text-sm mb-4">
                  {school.logo}
                </div>

                {/* Type badge */}
                <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${typeColors[school.type]}`}>
                  {school.type.charAt(0).toUpperCase() + school.type.slice(1)}
                </span>

                {/* Name */}
                <h3 className="font-bold text-[#0f172a] mt-2 mb-1 group-hover:text-[#c0392b] transition-colors leading-snug">
                  {school.name}
                </h3>

                {/* Location */}
                <div className="flex items-center gap-1 text-slate-400 text-xs mb-3">
                  <MapPin size={11} />
                  {school.city}, Japan
                </div>

                {/* Programs */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {school.programs.map((p) => (
                    <span key={p} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md">
                      {p}
                    </span>
                  ))}
                </div>

                {/* View Details */}
                <button className="flex items-center gap-1 text-[#c0392b] text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("viewDetails")} <ExternalLink size={13} />
                </button>
              </motion.div>
            ))}
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
