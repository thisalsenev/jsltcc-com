"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import Image from "next/image";

const cities = [
  {
    name: "Tokyo",
    nameJa: "東京",
    region: "Kanto",
    schools: 12,
    description: "Japan's capital — the ultimate urban study experience.",
    image: "/images/cities/tokyo.jpg",
  },
  {
    name: "Osaka",
    nameJa: "大阪",
    region: "Kansai",
    schools: 8,
    description: "Japan's kitchen — vibrant culture and great student life.",
    image: "/images/cities/osaka.jpeg",
  },
  {
    name: "Hiroshima",
    nameJa: "広島",
    region: "Chugoku",
    schools: 3,
    description: "A city of resilience, peace, and modern opportunity.",
    image: "/images/cities/hiroshima.jpeg",
  },
  {
    name: "Sapporo",
    nameJa: "札幌",
    region: "Hokkaido",
    schools: 4,
    description: "Fresh air, stunning nature, and excellent universities.",
    image: "/images/cities/sapporo.jpg",
  },
  {
    name: "Nagoya",
    nameJa: "名古屋",
    region: "Chubu",
    schools: 5,
    description: "Japan's industrial hub with world-class vocational schools.",
    image: "/images/cities/nagoya.jpeg",
  },
  {
    name: "Kobe",
    nameJa: "神戸",
    region: "Kansai",
    schools: 4,
    description: "Cosmopolitan port city with an international atmosphere.",
    image: "/images/cities/kobe.jpg",
  },
  {
    name: "Yokohama",
    nameJa: "横浜",
    region: "Kanto",
    schools: 5,
    description: "A dynamic port city with a thriving international community.",
    image: "/images/cities/yokohama.jpg",
  },
  {
    name: "Chiba",
    nameJa: "千葉",
    region: "Kanto",
    schools: 3,
    description: "Close to Tokyo with a relaxed pace and growing student scene.",
    image: "/images/cities/chiba.jpeg",
  },
  {
    name: "Saitama",
    nameJa: "さいたま",
    region: "Kanto",
    schools: 3,
    description: "Affordable living with easy access to central Tokyo.",
    image: "/images/cities/saitama.jpg",
  },
];

export default function CitiesSection() {
  const t = useTranslations("cities");
  const locale = useLocale();

  return (
    <section className="py-20 bg-[#0f172a]" id="cities">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-[#c0392b] font-semibold text-sm uppercase tracking-widest mb-2"
          >
            Study Destinations
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

        {/* Cities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
          {cities.map((city, i) => (
            <motion.a
              key={city.name}
              href={`/${locale}/study-in-japan`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group relative rounded-2xl overflow-hidden cursor-pointer h-60 flex flex-col justify-between shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300"
            >
              {/* Photo */}
              <Image
                src={city.image}
                alt={city.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

              {/* Top badge */}
              <div className="relative z-10 p-4">
                <span className="text-xs font-semibold bg-white/15 backdrop-blur-sm text-white px-2.5 py-1 rounded-full border border-white/20">
                  {city.region}
                </span>
              </div>

              {/* Bottom info */}
              <div className="relative z-10 p-4">
                <div className="flex items-baseline gap-2 mb-1">
                  <h3 className="text-white font-bold text-xl">{city.name}</h3>
                  <span className="text-white/60 text-sm">{city.nameJa}</span>
                </div>
                <div className="flex items-center gap-1 text-white/50 text-xs mb-2">
                  <MapPin size={10} />
                  {city.schools} partner schools
                </div>
                <p className="text-white/70 text-xs leading-relaxed line-clamp-1 mb-2">
                  {city.description}
                </p>
                <span className="inline-flex items-center gap-1 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  {t("exploreCity")} <ArrowRight size={12} />
                </span>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
