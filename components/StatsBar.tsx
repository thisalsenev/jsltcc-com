"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// ── Animated counter (unchanged) ─────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref    = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 2000;
          const step = (end / duration) * 16;
          const timer = setInterval(() => {
            start += step;
            if (start >= end) { setCount(end); clearInterval(timer); }
            else               { setCount(Math.floor(start)); }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <div ref={ref} className="text-4xl font-extrabold text-[#c0392b]">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

// ── Particle type ─────────────────────────────────────────────────────────────
interface Particle {
  id:       number;
  left:     number;   // % across the container width
  duration: number;   // seconds
  delay:    number;   // seconds
  gold:     boolean;  // true = warm gold, false = tech cyan
}

// ── StatsBar ──────────────────────────────────────────────────────────────────
export default function StatsBar() {
  const t = useTranslations("stats");

  // Generate particles client-side only — avoids SSR/hydration mismatch
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }, (_, i) => ({
        id:       i,
        left:     2 + Math.random() * 96,          // 2 – 98 %
        duration: 0.55 + Math.random() * 0.65,     // 0.55 – 1.2 s
        delay:    Math.random() * 0.9,             // 0 – 0.9 s stagger
        gold:     Math.random() > 0.55,            // ~45 % cyan, ~55 % gold
      }))
    );
  }, []);

  const stats = [
    { value: 2002, suffix: "",  label: t("founded")       },
    { value: 5000, suffix: "+", label: t("graduates")     },
    { value: 20,   suffix: "+", label: t("partnerSchools") },
    { value: 2,    suffix: "",  label: t("destinations")  },
  ];

  return (
    // relative + overflow-hidden contain the particles to this section
    <section className="relative overflow-hidden bg-[#0f172a] border-b border-white/10 py-16">

      {/* ── z-[0] Particle layer ── */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute top-0 pointer-events-none"
          style={{ left: `${p.left}%`, zIndex: 0 }}
          initial={{ y: -40, opacity: 0 }}
          whileInView={{ y: 180, opacity: [0, 1, 1, 0] }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{
            duration: p.duration,
            delay:    p.delay,
            ease:     "easeIn",
          }}
        >
          {/* Glowing streak — 1 px wide, 32 px tall */}
          <div
            style={{
              width:     "1.5px",
              height:    "32px",
              borderRadius: "9999px",
              background: p.gold
                ? "rgba(197,160,89,0.9)"
                : "rgba(139,180,247,0.9)",
              boxShadow: p.gold
                ? "0 0 6px 2px rgba(197,160,89,0.7),  0 0 12px 4px rgba(197,160,89,0.3)"
                : "0 0 6px 2px rgba(139,180,247,0.7), 0 0 12px 4px rgba(139,180,247,0.3)",
            }}
          />
        </motion.div>
      ))}

      {/* ── z-[10] Stats content (unchanged) ── */}
      <div className="relative z-[10] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <Counter end={stat.value} suffix={stat.suffix} />
              <div className="text-slate-400 font-medium text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
