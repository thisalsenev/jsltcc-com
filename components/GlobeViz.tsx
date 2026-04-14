"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThreeGlobe from "three-globe";

/* ── Coordinates ── */
const ARCS = [
  { startLat: 51.5074, startLng: -0.1278, endLat: 35.6762, endLng: 139.6503 },
  { startLat: 35.6762, startLng: 139.6503, endLat: 6.9271, endLng: 79.8612 },
  { startLat: 6.9271, startLng: 79.8612, endLat: 51.5074, endLng: -0.1278 },
];

const POINTS = [
  { lat: 6.9271, lng: 79.8612, city: "Colombo" },
  { lat: 35.6762, lng: 139.6503, city: "Tokyo" },
  { lat: 51.5074, lng: -0.1278, city: "London" },
];

const JAPAN_ROT = { x: 36.2 * (Math.PI / 180), y: -138.2 * (Math.PI / 180) };

export default function GlobeViz() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. SCENE
    const scene = new THREE.Scene();

    // 2. CAMERA
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 290;
    camera.position.y = 20;

    // 3. RENDERER
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // 4. LIGHTS
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dLight = new THREE.DirectionalLight(0xffffff, 2);
    dLight.position.set(-200, 500, 200);
    scene.add(dLight);

    // 5. GLOBE
    const Globe = new ThreeGlobe()
      .showGlobe(true)
      .globeMaterial(new THREE.MeshBasicMaterial({ color: 0x0a191e }))
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
      .then(r => r.json())
      .then(countries => {
        Globe.hexPolygonsData(countries.features)
          .hexPolygonResolution((feat: any) =>
            ["Sri Lanka", "Japan", "United Kingdom"].includes(feat.properties.ADMIN) ? 5 : 3
          )
          .hexPolygonMargin(0.6)
          .hexPolygonAltitude(0.005)
          .hexPolygonColor(() => "#8bb4f7");
      });

    Globe.position.y = 15;
    scene.add(Globe);

    // 6. MOUSE
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // 7. ANIMATION
    let animationFrameId: number;
    let isVisible = true;

    const waypoints = [
      { x: 0.12, y: -1.39 },
      { x: 0.90, y: 0.00 },
      { x: 0.62, y: -2.43 },
    ];

    let currentBaseX = JAPAN_ROT.x;
    let currentBaseY = JAPAN_ROT.y;

    // Force Japan rotation for every frame rendered while the wrapper is still
    // opacity-0. This neutralises any frame ThreeGlobe's Kapsule async init
    // may render at [0,0]. isRevealedRef flips to true once setIsReady fires.
    const isRevealedRef = { current: false };

    const renderLoop = () => {
      if (!isVisible) return;

      const time = Date.now();
      const index = Math.floor(time / 6000) % waypoints.length;
      const target = waypoints[index];

      currentBaseX += (target.x - currentBaseX) * 0.005;
      currentBaseY += (target.y - currentBaseY) * 0.005;

      const mouseTiltX = mouseY * 0.5;
      const mousePanY  = mouseX * 0.5;

      if (!isRevealedRef.current) {
        // Globe is still hidden — pin to Japan so the first visible frame is correct
        Globe.rotation.x = JAPAN_ROT.x;
        Globe.rotation.y = JAPAN_ROT.y;
      } else {
        Globe.rotation.x += ((currentBaseX + mouseTiltX) - Globe.rotation.x) * 0.05;
        Globe.rotation.y += ((currentBaseY + mousePanY)  - Globe.rotation.y) * 0.05;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

    // Wait 100 ms for WebGL to paint Japan invisibly, then reveal.
    const revealTimer = setTimeout(() => {
      isRevealedRef.current = true;
      setIsReady(true);
    }, 100);

    // Pause RAF when off-screen
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { isVisible = true; renderLoop(); }
        else { isVisible = false; cancelAnimationFrame(animationFrameId); }
      },
      { threshold: 0 }
    );
    if (mountRef.current) observer.observe(mountRef.current);

    // 8. RESIZE
    const handleResize = () => {
      if (!mountRef.current) return;
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener("resize", handleResize);

    // 9. CLEANUP
    return () => {
      clearTimeout(revealTimer);
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
    // State-Locked Curtain: stays opacity-0 until 100ms after mount,
    // ensuring WebGL has painted Japan before the user sees anything.
    <div
      className={`relative z-[10] w-full h-[600px] pointer-events-none transition-opacity duration-700 ease-in-out ${
        isReady ? "opacity-100" : "opacity-0"
      }`}
    >
      <div ref={mountRef} className="w-full h-full" />
    </div>
  );
}
