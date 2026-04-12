"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CITIES = [
  { name: "Tokyo",      country: "Japan",           flag: "🇯🇵" },
  { name: "London",     country: "United Kingdom",  flag: "🇬🇧" },
  { name: "Osaka",      country: "Japan",           flag: "🇯🇵" },
  { name: "Manchester", country: "United Kingdom",  flag: "🇬🇧" },
  { name: "Kyoto",      country: "Japan",           flag: "🇯🇵" },
  { name: "Birmingham", country: "United Kingdom",  flag: "🇬🇧" },
  { name: "Sapporo",    country: "Japan",           flag: "🇯🇵" },
  { name: "Nagoya",     country: "Japan",           flag: "🇯🇵" },
  { name: "Yokohama",   country: "Japan",           flag: "🇯🇵" },
  { name: "Kobe",       country: "Japan",           flag: "🇯🇵" },
];

/* Group array into chunks of 2 */
const PAIRS = CITIES.reduce<(typeof CITIES)[]>((acc, _, i) => {
  if (i % 2 === 0) acc.push(CITIES.slice(i, i + 2));
  return acc;
}, []);

export default function DynamicCities() {
  const [pairIndex, setPairIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setPairIndex(prev => (prev + 1) % PAIRS.length);
    }, 3000);
    return () => clearInterval(id);
  }, []);

  const currentPair = PAIRS[pairIndex];

  return (
    <div className="pt-7 mt-8 border-t border-white/10">
      <p className="text-sm text-slate-400 font-medium uppercase tracking-widest mb-5">
        Destination Cities
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={pairIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          className="flex flex-wrap gap-4"
        >
          {currentPair.map((city) => (
            <div
              key={city.name}
              className="inline-flex items-center gap-3 px-7 py-4 rounded-full text-lg font-semibold text-white border border-white/15 transition-all duration-500 ease-out hover:border-white/30 hover:bg-white/10"
              style={{
                background:          "rgba(255,255,255,0.07)",
                backdropFilter:      "blur(12px)",
                WebkitBackdropFilter:"blur(12px)",
                boxShadow:           "0 1px 16px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
              }}
            >
              <span className="text-2xl">{city.flag}</span>
              <span>{city.name}</span>
              <span className="text-slate-400 font-normal text-sm">{city.country}</span>

            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
