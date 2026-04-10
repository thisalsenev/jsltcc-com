"use client";

import React, { ReactNode } from "react";

// ── Real city photos from /public/images/cities ─────────────────────────────
const IMAGES = [
  "/images/cities/tokyo.jpg",
  "/images/cities/Osaka.jpg",
  "/images/cities/sapporo.jpg",
  "/images/cities/Hiroshima.jpg",
  "/images/cities/yokohama.jpg",
  "/images/cities/kobe.jpg",
  "/images/cities/Nagano.jpg",
  "/images/cities/Nagoya.webp",
];

// Duplicate for seamless infinite loop (translateY(-50%) lands exactly on frame 1)
const doubled  = [...IMAGES, ...IMAGES];
const reversed = [...doubled].reverse();

// ── Lane config ───────────────────────────────────────────────────────────────
const LANES = [
  { images: doubled,  direction: "up",   duration: "40s" },
  { images: reversed, direction: "down", duration: "48s" },
  { images: doubled,  direction: "up",   duration: "35s" },
  { images: reversed, direction: "down", duration: "45s" },
  { images: doubled,  direction: "up",   duration: "38s" },
];

// ── Props ─────────────────────────────────────────────────────────────────────
interface AppStoreMarqueeProps {
  /** Your Programs/Services cards (or any content) rendered above the animation */
  children?: ReactNode;
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function AppStoreMarquee({ children }: AppStoreMarqueeProps) {
  return (
    <section className="relative w-full min-h-[800px] overflow-hidden bg-[#1a140f] py-24 flex items-center justify-center">

      {/* ── Master wrapper
            150% × 200% ensures the rotated panel bleeds past all four edges
            so there is never a visible corner gap.                          ── */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 w-[150%] h-[200%] z-0 flex gap-4 md:gap-6 pointer-events-none"
        style={{ transform: "translate(-50%, -50%) rotate(15deg)" }}
      >
        {LANES.map((lane, laneIdx) => (
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

      {/* ── Warm golden tint (mix-blend-mode: multiply) ── */}
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
