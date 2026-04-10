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
    mountRef.current.appendChild(renderer.domElement);

    // 4. SETUP LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dLight = new THREE.DirectionalLight(0xffffff, 2);
    dLight.position.set(-200, 500, 200);
    scene.add(dLight);

    // 5. INITIALIZE VANILLA THREE-GLOBE
    // Flat unlit material — ignores all scene lighting so it blends into the hero background
    const coreMaterial = new THREE.MeshBasicMaterial({ color: 0xf8fafc });

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
          .hexPolygonColor(() => "#cbd5e1"); // Silver frosty dots
      });

    Globe.position.y = 15;
    scene.add(Globe);

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

    // Exact coordinates converted to 3D radians (X = tilt up/down, Y = pan left/right)
    const waypoints = [
      { x: 0.12, y: -1.39 }, // Colombo
      { x: 0.90, y: 0.00 },  // London
      { x: 0.62, y: -2.43 }, // Tokyo
    ];

    let currentBaseX = waypoints[0].x;
    let currentBaseY = waypoints[0].y;

    const renderLoop = () => {
      // 1. Determine which city we should be looking at based on the time
      const time = Date.now();
      const cycleDuration = 6000; // Hover on each city area for roughly 6 seconds
      const index = Math.floor(time / cycleDuration) % waypoints.length;
      const targetWaypoint = waypoints[index];

      // 2. Smoothly glide the base rotation diagonally toward the active waypoint
      // The 0.005 multiplier makes it a buttery-slow, majestic pan
      currentBaseX += (targetWaypoint.x - currentBaseX) * 0.005;
      currentBaseY += (targetWaypoint.y - currentBaseY) * 0.005;

      // 3. Calculate Mouse Parallax overrides
      const mouseTiltX = mouseY * 0.5; // Mouse vertical controls X-axis tilt
      const mousePanY  = mouseX * 0.5; // Mouse horizontal controls Y-axis pan

      // 4. Combine the cinematic flight path with the mouse interaction
      Globe.rotation.x += ((currentBaseX + mouseTiltX) - Globe.rotation.x) * 0.05;
      Globe.rotation.y += ((currentBaseY + mousePanY)  - Globe.rotation.y) * 0.05;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(renderLoop);
    };
    renderLoop();

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
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
      // ThreeGlobe does not expose a dispose() method
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="relative z-[10] w-full h-[600px] flex items-center justify-center pointer-events-none"
    />
  );
}
