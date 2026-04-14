"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

/* ── Coordinates ── */
const ARCS = [
  { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503 }, // London → Tokyo
  { startLat: 35.6762, startLng: 139.6503, endLat: 6.9271, endLng: 79.8612 },  // Tokyo → Colombo
  { startLat: 6.9271, startLng: 79.8612, endLat: 51.5074, endLng: -0.1278 },   // Colombo → London
];

const POINTS = [
  { lat: 6.9271, lng: 79.8612, city: "Colombo" },
  { lat: 35.6762, lng: 139.6503, city: "Tokyo" },
  { lat: 51.5074, lng: -0.1278, city: "London" },
];

export default function GlobeViz() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. SETUP RAW THREE.JS SCENE
    const scene = new THREE.Scene();

    // 2. SETUP CAMERA
    const camera = new THREE.PerspectiveCamera(45, mountRef.current.clientWidth / mountRef.current.clientHeight, 0.1, 1000);
    camera.position.z = 290;
    camera.position.y = 20;

    // 3. SETUP RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    // Keep canvas invisible until the first frame with correct rotation is drawn
    renderer.domElement.style.opacity = "0";
    renderer.domElement.style.transition = "opacity 0.4s ease";
    mountRef.current.appendChild(renderer.domElement);

    // 4. SETUP LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dLight = new THREE.DirectionalLight(0xffffff, 2);
    dLight.position.set(-200, 500, 200);
    scene.add(dLight);

    // 5. INITIALIZE VANILLA THREE-GLOBE
    // Flat unlit material — ignores all scene lighting so it blends into the hero background
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x0a191e });

    const Globe = new ThreeGlobe()
      .showGlobe(true)
      .globeMaterial(coreMaterial)
      .showAtmosphere(true)
      .atmosphereColor("#8bb4f7")
      .atmosphereAltitude(0.12)
      .arcsData(ARCS)
      .arcColor(() => "#c5a059")
      .arcAltitudeAutoScale(0.3)
      .arcStroke(0.8)
      .arcDashLength(0.5)
      .arcDashGap(3)
      .arcDashInitialGap(() => Math.random() * 5)
      .arcDashAnimateTime(1500)
      .ringsData(POINTS)
      .ringColor(() => "#c5a059")
      .ringMaxRadius(1.5)
      .ringPropagationSpeed(1.2)
      .ringRepeatPeriod(1500);


    fetch("https://raw.githubusercontent.com/vasturiano/react-globe.gl/master/example/datasets/ne_110m_admin_0_countries.geojson")
      .then(res => res.json())
      .then(countries => {
        Globe.hexPolygonsData(countries.features)
          // Dynamic Resolution: Tighter dots for target countries, default dots for the rest
          .hexPolygonResolution((feat: any) => {
            const highResCountries = ["Sri Lanka", "Japan", "United Kingdom"];
            return highResCountries.includes(feat.properties.ADMIN) ? 5 : 3;
          })
          .hexPolygonMargin(0.6)
          .hexPolygonAltitude(0.005) // Keeps them elevated above the solid core
          .hexPolygonColor(() => "#8bb4f7"); // Glowing light blue dots
      });

    Globe.position.y = 15;
    scene.add(Globe);

    // Set initial rotation to Japan (36.2°N, 138.2°E) so the globe renders
    // facing Japan on frame 1 — no startup whip.
    const JAPAN_ROT = { x: 36.2 * (Math.PI / 180), y: -138.2 * (Math.PI / 180) };
    Globe.rotation.x = JAPAN_ROT.x;
    Globe.rotation.y = JAPAN_ROT.y;

    // 6. INTERACTIVE MOUSE TRACKING SETUP
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates from -1 to +1
      mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 7. THE ANIMATION LOOP & WAYPOINTS
    let animationFrameId: number;
    let isVisible = true; // controlled by IntersectionObserver below
    let revealed = false;  // becomes true after the first correctly-rotated frame

    const waypoints = [
      { x: 0.12, y: -1.39 }, // Colombo
      { x: 0.90, y: 0.00 },  // London
      { x: 0.62, y: -2.43 }, // Tokyo
    ];

    // Start currentBase at Japan so the first lerp step begins from exactly
    // where the globe is visually — eliminating any initial swing.
    let currentBaseX = JAPAN_ROT.x;
    let currentBaseY = JAPAN_ROT.y;

    const renderLoop = () => {
      // Only consume GPU cycles while the globe is visible in the viewport
      if (!isVisible) return;

      const time = Date.now();
      const cycleDuration = 6000;
      const index = Math.floor(time / cycleDuration) % waypoints.length;
      const targetWaypoint = waypoints[index];

      currentBaseX += (targetWaypoint.x - currentBaseX) * 0.005;
      currentBaseY += (targetWaypoint.y - currentBaseY) * 0.005;

      const mouseTiltX = mouseY * 0.5;
      const mousePanY  = mouseX * 0.5;

      Globe.rotation.x += ((currentBaseX + mouseTiltX) - Globe.rotation.x) * 0.05;
      Globe.rotation.y += ((currentBaseY + mousePanY)  - Globe.rotation.y) * 0.05;

      renderer.render(scene, camera);

      // Reveal the canvas only after the first frame is painted at Japan's rotation
      if (!revealed) {
        revealed = true;
        renderer.domElement.style.opacity = "1";
      }

      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // Pause RAF when globe scrolls out of view; resume when it re-enters
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
          // Restart the loop — it stopped itself when isVisible went false
          renderLoop();
        } else {
          isVisible = false;
          cancelAnimationFrame(animationFrameId);
        }
      },
      { threshold: 0 }
    );
    if (mountRef.current) observer.observe(mountRef.current);

    // 8. HANDLE WINDOW RESIZE
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 9. CLEANUP
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative z-[10] w-full h-[600px] flex items-center justify-center pointer-events-none"
    />
  );
}
