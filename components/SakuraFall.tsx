"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const random = (min: number, max: number) => Math.random() * (max - min) + min;

export default function SakuraFall() {
  const [petals, setPetals] = useState<any[]>([]);
  const [visible, setVisible] = useState(true);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 640;
    const count = isMobile ? 12 : 30;
    const generatedPetals = Array.from({ length: count }).map((_, i) => ({
      id: i,
      left: `${random(2, 98)}vw`,
      scale: random(0.4, 1.2),
      duration: random(10, 20),
      delay: random(0, 15),
      sway: random(-50, 50),
    }));
    setPetals(generatedPetals);
  }, []);

  // Stop animating once the hero scrolls out of view — saves work on every
  // section below the fold.
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (petals.length === 0) return <div ref={wrapRef} className="absolute inset-0 z-[2] pointer-events-none" />;

  return (
    <div ref={wrapRef} className="absolute inset-0 z-[2] overflow-hidden pointer-events-none">
      {visible && petals.map((petal) => (
        <motion.div
          key={petal.id}
          className="absolute top-[-5%]"
          style={{ left: petal.left, scale: petal.scale, willChange: "transform, opacity" }}
          initial={{ y: "-10vh", opacity: 0, rotate: 0 }}
          animate={{
            y: ["0vh", "110vh"],
            x: [0, petal.sway, -petal.sway, petal.sway, 0],
            rotate: [0, 180, 360],
            opacity: [0, 0.8, 0.8, 0],
          }}
          transition={{
            duration: petal.duration,
            delay: petal.delay,
            ease: "linear",
            repeat: Infinity,
          }}
        >
          <svg
            width="16"
            height="18"
            viewBox="0 0 16 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-sm"
          >
            <path
              d="M8.00002 17.5C8.00002 17.5 15.5 13.5 14.5 6C13.5 -1.5 8.00002 1 8.00002 1C8.00002 1 2.50002 -1.5 1.50002 6C0.50002 13.5 8.00002 17.5 8.00002 17.5Z"
              fill="#FBCFE8"
              fillOpacity="0.8"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
