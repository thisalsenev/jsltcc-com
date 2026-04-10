"use client";

import { ReactNode } from "react";

// ── Image sets — your existing city photos ──────────────────────────────────
const LANE_LEFT = [
  "/images/cities/tokyo.jpg",
  "/images/cities/Nagano.jpg",
  "/images/cities/sapporo.jpg",
  "/images/cities/Hiroshima.jpg",
];
const LANE_MIDDLE = [
  "/images/cities/Osaka.jpg",
  "/images/cities/kobe.jpg",
  "/images/cities/yokohama.jpg",
  "/images/cities/Nagoya.webp",
];
const LANE_RIGHT = [
  "/images/cities/saitama.jpg",
  "/images/cities/Hiroshima.jpg",
  "/images/cities/tokyo.jpg",
  "/images/cities/Nagano.jpg",
];

// ── Single lane ─────────────────────────────────────────────────────────────
function Lane({
  images,
  animationClass,
  laneStyle,
}: {
  images: string[];
  animationClass: string;
  laneStyle: React.CSSProperties;
}) {
  // Images are doubled so translateY(-50%) produces a seamless loop
  const doubled = [...images, ...images];

  return (
    <div
      className="flex-1 overflow-hidden relative"
      style={{ height: "140%", ...laneStyle }}
    >
      {/* height:200% + duplicate images = exact seamless loop */}
      <div
        className={`flex flex-col gap-[30px] ${animationClass}`}
        style={{ height: "200%" }}
      >
        {doubled.map((src, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={i}
            src={src}
            alt=""
            aria-hidden="true"
            className="w-full rounded-[20px] shadow-[0_10px_30px_rgba(0,0,0,0.6)] opacity-75"
            style={{ filter: "brightness(0.9) contrast(1.1)" }}
          />
        ))}
      </div>
    </div>
  );
}

// ── Props ────────────────────────────────────────────────────────────────────
interface AppStoreMarqueeProps {
  /** Your Programs cards (or any content) rendered above the animation */
  children?: ReactNode;
  /** Dark base colour — default matches the original prototype */
  bgColor?: string;
}

// ── Component ────────────────────────────────────────────────────────────────
export default function AppStoreMarquee({
  children,
  bgColor = "#1a140f",
}: AppStoreMarqueeProps) {
  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ background: bgColor }}
    >

      {/* ── 1. Isometric lane wrapper ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 flex overflow-hidden"
        style={{ gap: "8%", padding: "0 10%", transform: "skewX(-8deg)" }}
      >
        {/* Left lane — rotated left, scrolls UP */}
        <Lane
          images={LANE_LEFT}
          animationClass="animate-marquee-up"
          laneStyle={{ transform: "rotate(-14deg) translateY(-10%)" }}
        />

        {/* Middle lane — slight tilt, scrolls DOWN */}
        <Lane
          images={LANE_MIDDLE}
          animationClass="animate-marquee-down"
          laneStyle={{ transform: "rotate(2deg)" }}
        />

        {/* Right lane — rotated right, scrolls UP (faster) */}
        <Lane
          images={LANE_RIGHT}
          animationClass="animate-marquee-up-fast"
          laneStyle={{ transform: "rotate(14deg) translateY(-10%)" }}
        />
      </div>

      {/* ── 2. Warm golden tint (mix-blend-mode: multiply) ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 2,
          background:
            "linear-gradient(45deg, rgba(245,200,100,0.35), rgba(255,230,150,0.25))",
          mixBlendMode: "multiply",
        }}
      />

      {/* ── 3. Top + bottom fade masks so content bleeds into section edges ── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 3,
          background: `linear-gradient(to bottom,
            ${bgColor} 0%,
            transparent 14%,
            transparent 86%,
            ${bgColor} 100%)`,
        }}
      />

      {/* ── 4. Foreground slot — your cards, headings, buttons ── */}
      <div className="relative" style={{ zIndex: 10 }}>
        {children}
      </div>

    </div>
  );
}
