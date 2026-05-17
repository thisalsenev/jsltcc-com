"use client";

import { useEffect, useRef } from "react";

/**
 * Particle swarm canvas — magenta wave-drift flow field that lives behind
 * the header nav. Pure 2D canvas, no deps. Ported from the Claude Design
 * "Website Header — Particle Swarm" handoff bundle.
 *
 * Designed for thin header strips (~64-88px tall). Particle count is tuned
 * down from the desktop demo because the canvas is short.
 */
export default function HeaderSwarm({
  particleCount = 2300,
  speed = 0.6,
  flowScale = 0.0115,
  swirl = 0.5,
  particleSize = 0.6,
}: {
  particleCount?: number;
  speed?: number;
  flowScale?: number;
  swirl?: number;
  particleSize?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const palette = [
      { h: 330, s: 78, l: 56 },
      { h: 340, s: 82, l: 60 },
      { h: 315, s: 70, l: 58 },
      { h: 350, s: 75, l: 64 },
    ];

    type P = {
      x: number; y: number; vx: number; vy: number;
      driftSpeed: number; waveAmp: number; waveFreq: number;
      wavePhase: number; baseY: number;
      h: number; s: number; l: number;
      size: number; alpha: number;
    };

    let W = 0, H = 0;
    let DPR = Math.min(window.devicePixelRatio || 1, 2);
    let particles: P[] = [];
    let t = 0;
    let rafId = 0;
    let running = true;

    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const spawn = (p: P, initial: boolean) => {
      p.x = initial ? rand(-20, W) : rand(-40, -10);
      p.y = rand(H * 0.15, H * 0.85);
      const drift = rand(0.35, 0.9) * speed;
      p.vx = drift;
      p.vy = 0;
      p.driftSpeed = drift;
      p.waveAmp = rand(2, H * 0.12);
      p.waveFreq = rand(0.004, 0.012);
      p.wavePhase = rand(0, Math.PI * 2);
      p.baseY = p.y;
      const c = palette[Math.floor(Math.random() * palette.length)];
      p.h = c.h + rand(-6, 6);
      p.s = c.s;
      p.l = c.l + rand(-4, 4);
      p.size = particleSize * rand(0.6, 1.6);
      p.alpha = rand(0.5, 1.0);
    };

    const fieldAngle = (x: number, y: number, time: number) => {
      const s = flowScale;
      const a = Math.sin(x * s + time * 0.35) + Math.cos(y * s * 1.3 - time * 0.25);
      const b = Math.cos(x * s * 0.7 - time * 0.18) - Math.sin(y * s * 0.9 + time * 0.22);
      return (a + b) * Math.PI * 0.6;
    };

    const ensurePopulation = () => {
      while (particles.length < particleCount) {
        const p = {
          x: 0, y: 0, vx: 0, vy: 0, driftSpeed: 0, waveAmp: 0,
          waveFreq: 0, wavePhase: 0, baseY: 0,
          h: 0, s: 0, l: 0, size: 0, alpha: 0,
        };
        spawn(p, true);
        particles.push(p);
      }
    };

    const step = (dt: number) => {
      t += dt * 0.001;
      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";

      const swirlStrength = 0.08 * swirl;

      for (const p of particles) {
        p.x += p.driftSpeed;
        const wave = Math.sin(p.x * p.waveFreq + p.wavePhase + t * 0.4) * p.waveAmp;
        p.y = p.baseY + wave;

        const ang = fieldAngle(p.x, p.y, t);
        p.baseY += Math.sin(ang) * swirlStrength * 0.4;

        const fadeIn = Math.min(1, Math.max(0, p.x / 40));
        const fadeOut = Math.min(1, Math.max(0, (W - p.x) / 60));
        const a = fadeIn * fadeOut * p.alpha;

        ctx.fillStyle = `hsla(${p.h}, ${p.s}%, ${p.l}%, ${a * 0.95})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();

        if (p.x > W + 40) spawn(p, false);
      }
    };

    let last = performance.now();
    const frame = (now: number) => {
      const dt = Math.min(40, now - last);
      last = now;
      if (running) step(dt);
      rafId = requestAnimationFrame(frame);
    };

    const onVisibility = () => {
      running = !document.hidden;
      if (running) last = performance.now();
    };

    resize();
    ensurePopulation();
    rafId = requestAnimationFrame(frame);
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [particleCount, speed, flowScale, swirl, particleSize]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
