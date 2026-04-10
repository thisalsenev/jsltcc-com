"use client";

import React, { ReactNode } from "react";

// ── Default photos (used by the Programs/Services section) ───────────────────
const DEFAULT_IMAGES = [
  "/images/cities/tokyo.jpg",
  "/images/cities/Osaka.jpg",
  "/images/cities/sapporo.jpg",
  "/images/cities/Hiroshima.jpg",
  "/images/cities/yokohama.jpg",
  "/images/cities/kobe.jpg",
  "/images/cities/Nagano.jpg",
  "/images/cities/Nagoya.webp",
];

// ── Lane timing config ────────────────────────────────────────────────────────
const LANE_DURATIONS = ["40s", "48s", "35s", "45s", "38s"];

// ── Props ─────────────────────────────────────────────────────────────────────
interface AppStoreMarqueeProps {
  /** Cards, headings, or any content rendered above the animation */
  children?: ReactNode;
  /** Pass your own image paths to override the default city photos */
  images?: string[];
  /** Tailwind height + padding classes — controls the banner size.
   *  Defaults to 'min-h-[400px] py-12' for inner pages.
   *  Use 'min-h-[800px] py-24' to restore the full Programs section size. */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AppStoreMarquee({
  children,
  images,
  className = "min-h-[400px] py-12",
}: AppStoreMarqueeProps) {
  const imgs    = images ?? DEFAULT_IMAGES;
  const doubled = [...imgs, ...imgs];
  const reversed = [...doubled].reverse();

  // Lanes alternate up/down; even indices use original order, odd use reversed
  const lanes = LANE_DURATIONS.map((duration, i) => ({
    images:    i % 2 === 0 ? doubled : reversed,
    direction: i % 2 === 0 ? "up"    : "down",
    duration,
  }));

  return (
    <section className={`relative w-full overflow-hidden bg-[#1a140f] flex items-center justify-center ${className}`}>

      {/* ── Master wrapper: 150×200% + rotate(15deg) so corners never show ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[150%] h-[200%] z-0 flex gap-4 md:gap-6 pointer-events-none"
        style={{ transform: "translate(-50%, -50%) rotate(15deg)" }}
      >
        {lanes.map((lane, laneIdx) => (
          <div key={laneIdx} className="flex-1 h-full relative overflow-hidden">
            <div
              className={`flex flex-col gap-4 md:gap-6 h-[200%] w-full ${
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
                  className="w-full rounded-2xl shadow-2xl opacity-75 object-cover"
                  style={{ filter: "brightness(0.9) contrast(1.1)" }}
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
