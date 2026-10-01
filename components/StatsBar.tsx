"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef } from "react";

/** 2002 is a year, not a quantity — it must not render as "2,002". */
const fmt = (n: number, plain: boolean) => (plain ? String(n) : n.toLocaleString());

function Counter({
  end,
  suffix = "",
  /** Count DOWN from the current year instead of up from zero. */
  fromThisYear = false,
  /** Render without thousands separators (years). */
  plain = false,
}: {
  end: number;
  suffix?: string;
  fromThisYear?: boolean;
  plain?: boolean;
}) {
  const ref     = useRef<HTMLDivElement>(null);
  const started = useRef(false);
  const rafRef  = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // The current year is read here, inside the effect, rather than during
    // render: reading it while rendering would put the server's year into
    // the HTML and the browser's year into the hydrated output, which
    // disagree either side of midnight. It also means the countdown never
    // needs updating as the years pass.
    const start = fromThisYear ? new Date().getFullYear() : 0;

    // Someone who asked the OS for less motion gets the number, not the
    // animation.
    const still = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (still) {
      el.textContent = `${fmt(end, plain)}${suffix}`;
      return;
    }

    el.textContent = `${fmt(start, plain)}${suffix}`;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const duration = 2000;
        const t0       = performance.now();

        const tick = (now: number) => {
          const p = Math.min(1, (now - t0) / duration);
          // Interpolating start → end rather than scaling end works in
          // both directions, so counting down needs no special case.
          const value = p === 1 ? end : Math.round(start + (end - start) * p);
          el.textContent = `${fmt(value, plain)}${suffix}`;
          if (p < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      // This cleanup used to be returned from the observer callback, where
      // the return value is discarded — so the frame loop outlived the
      // component.
      cancelAnimationFrame(rafRef.current);
    };
  }, [end, suffix, fromThisYear, plain]);

  return (
    <div ref={ref} className="text-3xl sm:text-4xl font-extrabold text-[#c0392b]">
      {/* The real figure, so the markup is correct before JavaScript runs
          and for anything that reads the page without it. The effect
          replaces this with the animation's starting value. */}
      {fmt(end, plain)}
      {suffix}
    </div>
  );
}

export default function StatsBar() {
  const t = useTranslations("stats");

  const stats = [
    // Founded counts DOWN from the current year to 2002 — a year ticking
    // backwards reads as "this many years of history", where counting up
    // from zero just looked like a very large quantity passing through
    // meaningless years on the way.
    { value: 2002, suffix: "",  label: t("founded"), fromThisYear: true, plain: true },
    { value: 4000, suffix: "+", label: t("graduates")      },
    { value: 20,   suffix: "+", label: t("partnerSchools") },
    { value: 2,    suffix: "",  label: t("destinations")   },
  ];

  return (
    <section className="bg-slate-100 border-b border-slate-200 py-10 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 sm:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2">
              <Counter
                end={stat.value}
                suffix={stat.suffix}
                fromThisYear={stat.fromThisYear}
                plain={stat.plain}
              />
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
