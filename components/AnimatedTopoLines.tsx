"use client";

// Deterministic wavy paths — no Math.random() so SSR is safe.
// Each call produces organic-looking topographic contour lines.
function makePaths(count: number, layerIdx: number, W = 1800, H = 900): string[] {
  const paths: string[] = [];
  for (let i = 0; i < count; i++) {
    const baseY = (H / (count + 1)) * (i + 1);
    const amp   = 12 + ((layerIdx * 5 + i * 8) % 22);
    const freq  = 210 + ((layerIdx * 60 + i * 40) % 160);
    const phase = (layerIdx * 1.4 + i * 0.75) % (Math.PI * 2);

    let d = `M -200 ${baseY.toFixed(1)}`;
    for (let x = -200; x < W + 300; x += freq) {
      const cp1y = (baseY - amp + Math.sin(x * 0.003 + phase)       * 9).toFixed(1);
      const cp2y = (baseY + amp + Math.cos(x * 0.002 + phase * 0.7) * 7).toFixed(1);
      const ey   = (baseY      + Math.sin((x + freq) * 0.002 + phase * 0.5) * 6).toFixed(1);
      d += ` C ${(x + freq * 0.3).toFixed(1)} ${cp1y} ${(x + freq * 0.7).toFixed(1)} ${cp2y} ${(x + freq).toFixed(1)} ${ey}`;
    }
    paths.push(d);
  }
  return paths;
}

// 4 independent layers — different path density, opacity, stroke weight, drift speed
const LAYERS = [
  { paths: makePaths(9,  0), opacity: 0.30, stroke: 1.0,  cls: "topo-layer-1" },
  { paths: makePaths(12, 1), opacity: 0.14, stroke: 0.6,  cls: "topo-layer-2" },
  { paths: makePaths(7,  2), opacity: 0.22, stroke: 1.3,  cls: "topo-layer-3" },
  { paths: makePaths(5,  3), opacity: 0.10, stroke: 2.0,  cls: "topo-layer-4" },
];

const W = 1800;
const H = 900;

export default function AnimatedTopoLines() {
  return (
    <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
      {LAYERS.map((layer, li) => (
        <svg
          key={li}
          className={layer.cls}
          viewBox={`0 0 ${W} ${H}`}
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            opacity: layer.opacity,
          }}
        >
          {layer.paths.map((d, pi) => (
            <path
              key={pi}
              d={d}
              stroke="#8bb4f7"
              strokeWidth={layer.stroke}
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
      ))}
    </div>
  );
}
