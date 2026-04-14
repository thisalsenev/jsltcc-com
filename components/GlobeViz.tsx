"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import * as THREE from "three";

// SSR-safe: react-globe.gl touches window/WebGL on import
const GlobeGL = dynamic(() => import("react-globe.gl"), { ssr: false });

/* ─── Static data ────────────────────────────────────────── */
const ARCS = [
  { startLat: 51.5074, startLng: -0.1278,  endLat: 35.6762, endLng: 139.6503 },
  { startLat: 35.6762, startLng: 139.6503, endLat:  6.9271, endLng:  79.8612 },
  { startLat:  6.9271, startLng:  79.8612, endLat: 51.5074, endLng:  -0.1278 },
];

const RINGS = [
  { lat:  6.9271, lng:  79.8612 },
  { lat: 35.6762, lng: 139.6503 },
  { lat: 51.5074, lng:  -0.1278 },
];

const WAYPOINTS = [
  { lat:  6.9271, lng:  79.8612 }, // Colombo
  { lat: 51.5074, lng:  -0.1278 }, // London
  { lat: 35.6762, lng: 139.6503 }, // Tokyo
];

// First painted frame will be here — the library snaps to this before rendering
const JAPAN_POV = { lat: 36.2, lng: 138.2, altitude: 2 };

// Created once so React never sees a new object reference
const GLOBE_MATERIAL = new THREE.MeshBasicMaterial({ color: 0x0a191e });
const HIGH_RES = new Set(["Sri Lanka", "Japan", "United Kingdom"]);

/* ─── Component ──────────────────────────────────────────── */
export default function GlobeViz() {
  const globeEl          = useRef<any>(null);
  const mountRef         = useRef<HTMLDivElement>(null);
  const pendulumTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isReady, setIsReady]       = useState(false);
  const [countries, setCountries]   = useState<any[]>([]);
  const [containerWidth, setContainerWidth] = useState(0);

  // Fetch hex-polygon countries
  useEffect(() => {
    fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
      .then(r => r.json())
      .then(d => setCountries(d.features));
  }, []);

  // Measure container width so the canvas never defaults to window.innerWidth
  useEffect(() => {
    if (!mountRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      setContainerWidth(entry.contentRect.width);
    });
    ro.observe(mountRef.current);
    return () => ro.disconnect();
  }, []);

  // Pause RAF when scrolled off-screen
  useEffect(() => {
    if (!mountRef.current) return;
    const observer = new IntersectionObserver(([e]) => {
      if (!globeEl.current) return;
      e.isIntersecting
        ? globeEl.current.resumeAnimation?.()
        : globeEl.current.pauseAnimation?.();
    }, { threshold: 0 });
    observer.observe(mountRef.current);
    return () => observer.disconnect();
  }, []);

  // Cleanup pendulum on unmount
  useEffect(() => () => { if (pendulumTimer.current) clearTimeout(pendulumTimer.current); }, []);

  const handleGlobeReady = useCallback(() => {
    const g = globeEl.current;
    if (!g) return;

    // ① Native 0 ms snap — library positions camera before painting frame 1
    g.pointOfView(JAPAN_POV, 0);

    // ② Invisible dark core (matches #0a191e hero background)
    if (typeof g.globeMaterial === "function") {
      g.globeMaterial(GLOBE_MATERIAL);
    }

    // ③ Decorative only — disable user interaction
    const ctrl = g.controls();
    ctrl.enableZoom   = false;
    ctrl.enablePan    = false;
    ctrl.enableRotate = false;

    // ④ Reveal after 80 ms so WebGL has committed the Japan frame
    setTimeout(() => {
      setIsReady(true);

      // ⑤ Pendulum starts after the entrance animation finishes
      let idx = 2; // begin at Tokyo (closest to Japan)
      const tick = () => {
        idx = (idx + 1) % WAYPOINTS.length;
        g.pointOfView({ ...WAYPOINTS[idx], altitude: 2 }, 6000);
        pendulumTimer.current = setTimeout(tick, 6200);
      };
      pendulumTimer.current = setTimeout(tick, 1700); // 700 ms entrance + 1 s pause
    }, 80);
  }, []);

  return (
    <motion.div
      ref={mountRef}
      className="relative z-[10] w-full h-[600px] pointer-events-none"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
    >
      <GlobeGL
        ref={globeEl}
        width={containerWidth || undefined}
        height={600}
        backgroundColor="rgba(0,0,0,0)"
        showAtmosphere
        atmosphereColor="#8bb4f7"
        atmosphereAltitude={0.12}
        hexPolygonsData={countries}
        hexPolygonResolution={(d: any) => HIGH_RES.has(d.properties.ADMIN) ? 5 : 3}
        hexPolygonMargin={0.6}
        hexPolygonAltitude={0.005}
        hexPolygonColor={() => "#8bb4f7"}
        arcsData={ARCS}
        arcColor={() => "#c5a059"}
        arcAltitudeAutoScale={0.3}
        arcStroke={0.8}
        arcDashLength={0.5}
        arcDashGap={3}
        arcDashInitialGap={() => Math.random() * 5}
        arcDashAnimateTime={1500}
        ringsData={RINGS}
        ringColor={() => "#c5a059"}
        ringMaxRadius={1.5}
        ringPropagationSpeed={1.2}
        ringRepeatPeriod={1500}
        onGlobeReady={handleGlobeReady}
      />
    </motion.div>
  );
}
