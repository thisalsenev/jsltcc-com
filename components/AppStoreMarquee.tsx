"use client";

import React, { ReactNode } from "react";

// ── Default photos (Programs/Services section) ────────────────────────────────
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

// ── 6 lanes, staggered durations ─────────────────────────────────────────────
const LANE_DURATIONS = ["40s", "52s", "35s", "48s", "38s", "44s"];

// ── Props ─────────────────────────────────────────────────────────────────────
interface AppStoreMarqueeProps {
  children?: ReactNode;
  images?: string[];
  /** Height + padding of the outer section — override per use-site */
  className?: string;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AppStoreMarquee({
  children,
  images,
  className = "min-h-[400px] py-12",
}: AppStoreMarqueeProps) {
  const imgs = images ?? DEFAULT_IMAGES;

  // Each lane gets its own slice so adjacent lanes show different images.
  // We still double every slice so translateY(-50%) loops back to frame 1.
  const lanes = LANE_DURATIONS.map((duration, i) => {
    // Rotate the base array by i*2 so lanes look visually distinct
    const rotated = [...imgs.slice(i * 2 % imgs.length), ...imgs.slice(0, i * 2 % imgs.length)];
    const doubled = [...rotated, ...rotated];
    return {
      images:    i % 2 === 0 ? doubled : [...doubled].reverse(),
      direction: i % 2 === 0 ? "up" : "down",
      duration,
    };
  });

  return (
    <section
      className={`relative w-full overflow-hidden bg-[#1a140f] flex items-center justify-center ${className}`}
    >
      {/* ── Master wrapper ─────────────────────────────────────────────────────
           150 × 200% + rotate(15deg) so the rotated panel bleeds past all edges.
           No fixed height on the scrollers — images use aspect-ratio so the
           two duplicated halves are always exactly equal height → seamless loop. */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[150%] h-[200%] z-0 flex gap-3 pointer-events-none"
        style={{ transform: "translate(-50%, -50%) rotate(15deg)" }}
      >
        {lanes.map((lane, laneIdx) => (
          <div key={laneIdx} className="flex-1 h-full relative overflow-hidden">
            {/* ── No h-[200%] here — content height drives the animation ── */}
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
                  // px-1.5 shrinks each tile slightly within its lane
                  // aspect-[3/4] makes every tile the same height → perfect loop
                  className="w-full px-1.5 rounded-2xl shadow-2xl opacity-70 object-cover flex-shrink-0"
                  style={{
                    aspectRatio: "1/1",
                    filter: "brightness(0.85) contrast(1.1)",
                  }}
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
          background:
            "linear-gradient(to top right, rgba(245,200,100,0.35), rgba(255,230,150,0.25))",
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
