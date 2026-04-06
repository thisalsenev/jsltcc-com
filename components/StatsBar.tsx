"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

function Counter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
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
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
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
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}

export default function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    { value: 2002, suffix: "", label: t("founded") },
    { value: 5000, suffix: "+", label: t("graduates") },
    { value: 40, suffix: "+", label: t("partnerSchools") },
    { value: 6, suffix: "", label: t("destinations") },
  ];

  return (
    <section className="bg-white border-b border-slate-100 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <Counter end={stat.value} suffix={stat.suffix} />
              <div className="text-slate-500 font-medium text-sm uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
