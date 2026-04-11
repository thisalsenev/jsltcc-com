"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

// ── Animated counter ──────────────────────────────────────────────────────────
function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = (end / 2000) * 16;
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

// ── Particle shape ────────────────────────────────────────────────────────────
interface Particle {
  id: number; left: number; duration: number; delay: number; gold: boolean;
}

// ── StatsBar ──────────────────────────────────────────────────────────────────
export default function StatsBar() {
  const t = useTranslations("stats");

  // useInView on the section itself — large target, 100% reliable trigger
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: false, amount: 0.2 });

  // Increment animKey each time the section enters view to remount particles
  const [animKey, setAnimKey] = useState(0);
  useEffect(() => {
    if (isInView) setAnimKey(k => k + 1);
  }, [isInView]);

  // Particles generated once on mount (client-only — avoids SSR hydration mismatch)
  const [particles, setParticles] = useState<Particle[]>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 28 }, (_, i) => ({
        id:       i,
        left:     2 + Math.random() * 96,
        duration: 0.55 + Math.random() * 0.65,
        delay:    Math.random() * 0.9,
        gold:     Math.random() > 0.55,
      }))
    );
  }, []);

  const stats = [
    { value: 2002, suffix: "",  label: t("founded")        },
    { value: 5000, suffix: "+", label: t("graduates")      },
    { value: 20,   suffix: "+", label: t("partnerSchools") },
    { value: 2,    suffix: "",  label: t("destinations")   },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#0f172a] border-b border-white/10 py-16"
    >
      {/* ── z-[1] Particle layer — driven by section-level useInView ── */}
      <AnimatePresence>
        {isInView && particles.map((p) => (
          <motion.div
            key={`${animKey}-${p.id}`}
            className="absolute top-0 z-[1] pointer-events-none"
            style={{ left: `${p.left}%` }}
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 180, opacity: [0, 1, 1, 0] }}
            transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
          >
            <div
              style={{
                width:        "1.5px",
                height:       "32px",
                borderRadius: "9999px",
                background:   p.gold ? "rgba(197,160,89,0.95)"   : "rgba(139,180,247,0.95)",
                boxShadow:    p.gold
                  ? "0 0 6px 2px rgba(197,160,89,0.7),  0 0 14px 4px rgba(197,160,89,0.3)"
                  : "0 0 6px 2px rgba(139,180,247,0.7), 0 0 14px 4px rgba(139,180,247,0.3)",
              }}
            />
          </motion.div>
        ))}
      </AnimatePresence>

      {/* ── z-[10] Stats content ── */}
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
