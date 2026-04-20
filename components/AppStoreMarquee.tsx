"use client";

import React, { ReactNode } from "react";

// ── Default photos ────────────────────────────────────────────────────────────
const DEFAULT_IMAGES = [
  "/images/cities/tokyo.jpg",
  "/images/cities/Osaka.jpg",
  "/images/cities/sapporo.jpg",
  "/images/cities/Hiroshima.jpg",
  "/images/cities/yokohama.jpg",
  "/images/cities/kobe.jpg",
  "/images/cities/Nagano.jpg",
  "/images/cities/Nagoya.webp",
  "/images/cities/london.jpg",
  "/images/cities/birmingham.jpg",
  "/images/cities/Manchester.jpg",
];

// ── 6 lanes, staggered durations ─────────────────────────────────────────────
const LANE_DURATIONS = ["40s", "52s", "35s", "48s", "38s", "44s"];

interface AppStoreMarqueeProps {
  children?: ReactNode;
  images?: string[];
  className?: string;
}

export default function AppStoreMarquee({
  children,
  images,
  className = "min-h-[400px] py-12",
}: AppStoreMarqueeProps) {
  const imgs = images ?? DEFAULT_IMAGES;

  // Build lanes — 4× copies so there are never gaps on any screen size
  const lanes = LANE_DURATIONS.map((duration, i) => {
    const rotated = [...imgs.slice(i * 2 % imgs.length), ...imgs.slice(0, i * 2 % imgs.length)];
    const filled  = [...rotated, ...rotated, ...rotated, ...rotated];
    return {
      images:    i % 2 === 0 ? filled : [...filled].reverse(),
      direction: i % 2 === 0 ? "up" : "down",
      duration,
    };
  });

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#1a140f] flex items-center justify-center ${className}`}
    >
      {/* ── Master wrapper ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[150%] h-[200%] z-0 flex gap-3 pointer-events-none"
        style={{ transform: "translate(-50%, -50%) rotate(15deg)" }}
      >
        {lanes.map((lane, laneIdx) => (
          <div
            key={laneIdx}
            /* On mobile show only 2 lanes; hide the rest via CSS — no JS needed */
            className={`flex-1 h-full relative overflow-hidden ${laneIdx >= 2 ? "hidden sm:flex" : "flex"} flex-col`}
          >
            <div
              className={`flex flex-col gap-3 w-full ${
                lane.direction === "up" ? "animate-scroll-up" : "animate-scroll-down"
              }`}
              style={{ animationDuration: lane.duration }}
            >
              {lane.images.map((src, imgIdx) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={`${laneIdx}-${imgIdx}`}
                  src={src}
                  alt=""
                  loading="eager"
                  decoding="async"
                  /* Mobile: tall portrait boxes (3/4). Desktop: square (1/1).
                     Pure CSS — no JS hydration delay. */
                  className="w-full px-1.5 rounded-2xl shadow-2xl opacity-70 object-cover flex-shrink-0 aspect-[3/4] sm:aspect-square"
                  style={{ filter: "brightness(0.85) contrast(1.1)" }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Warm golden tint ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: "linear-gradient(to top right, rgba(245,200,100,0.35), rgba(255,230,150,0.25))",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── Foreground content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6">
        {children}
      </div>
    </section>
  );
}
