/**
 * Hero background — converging-arrows pattern.
 * Ported from the Claude Design "Registration Page" handoff (arrows-bg.jsx).
 *
 * Each "group" is a + cross of 4 arrows pointing inward toward a shared
 * center. Arrows are either solid (blue→pink gradient + speed lines) or
 * hatch (grid-pattern wireframe). Six groups tile the background and
 * gently breathe inward on a stagger.
 */
export default function ArrowsBg({
  vbw = 420,
  vbh = 720,
}: {
  vbw?: number;
  vbh?: number;
}) {
  const VBW = vbw;
  const VBH = vbh;

  const groups = [
    { id: "g1", cx: 90, cy: 110, size: 0.95, delay: 0.0, pattern: ["hatch", "solid", "solid", "hatch"], hue: "pink" },
    { id: "g2", cx: 320, cy: 180, size: 1.05, delay: 0.4, pattern: ["solid", "hatch", "hatch", "solid"], hue: "blue" },
    { id: "g3", cx: 200, cy: 360, size: 1.0, delay: 0.8, pattern: ["hatch", "solid", "solid", "hatch"], hue: "pink" },
    { id: "g4", cx: 60, cy: 460, size: 0.9, delay: 1.2, pattern: ["solid", "hatch", "hatch", "solid"], hue: "blue" },
    { id: "g5", cx: 360, cy: 510, size: 1.0, delay: 0.6, pattern: ["hatch", "solid", "solid", "hatch"], hue: "pink" },
    { id: "g6", cx: 180, cy: 640, size: 1.0, delay: 1.0, pattern: ["solid", "hatch", "hatch", "solid"], hue: "blue" },
  ] as const;

  const BASE = {
    armLen: 78,
    shaftW: 24,
    headW: 76,
    headDepth: 36,
    gap: 4,
    trail: 34,
  };

  const arrowPoints = (s: number) => {
    const L = BASE.armLen * s;
    const sH = (BASE.shaftW * s) / 2;
    const hH = (BASE.headW * s) / 2;
    const headStart = L - BASE.headDepth * s;
    return [
      [0, -sH],
      [headStart, -sH],
      [headStart, -hH],
      [L, 0],
      [headStart, hH],
      [headStart, sH],
      [0, sH],
    ]
      .map((p) => p.join(","))
      .join(" ");
  };

  const armSlots = (g: { cx: number; cy: number; size: number }) => {
    const L = BASE.armLen * g.size;
    const off = L + BASE.gap;
    return {
      top: { tx: g.cx, ty: g.cy - off, rot: 90, dx: 0, dy: 1 },
      right: { tx: g.cx + off, ty: g.cy, rot: 180, dx: -1, dy: 0 },
      bottom: { tx: g.cx, ty: g.cy + off, rot: 270, dx: 0, dy: -1 },
      left: { tx: g.cx - off, ty: g.cy, rot: 0, dx: 1, dy: 0 },
    } as const;
  };

  return (
    <>
      <style>{`
        @keyframes regArrowBreathe {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(var(--ax, 0px), var(--ay, 0px)); }
        }
      `}</style>
      <svg
        viewBox={`0 0 ${VBW} ${VBH}`}
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      >
        <defs>
          <linearGradient id="regArrowBody" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#2e4dff" />
            <stop offset="55%" stopColor="#8a4dff" />
            <stop offset="100%" stopColor="#e54dff" />
          </linearGradient>
          <pattern id="regGridPink" patternUnits="userSpaceOnUse" width="5" height="5">
            <rect width="5" height="5" fill="transparent" />
            <path d="M 0 0 L 5 0 M 0 0 L 0 5" stroke="#e54dff" strokeWidth="0.85" />
          </pattern>
          <pattern id="regGridBlue" patternUnits="userSpaceOnUse" width="5" height="5">
            <rect width="5" height="5" fill="transparent" />
            <path d="M 0 0 L 5 0 M 0 0 L 0 5" stroke="#5670ff" strokeWidth="0.85" />
          </pattern>
          <radialGradient id="regBgGlow" cx="55%" cy="50%" r="75%">
            <stop offset="0%" stopColor="#7e3ff2" stopOpacity="0.18" />
            <stop offset="55%" stopColor="#4d6bff" stopOpacity="0.08" />
            <stop offset="100%" stopColor="#0e0a2e" stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width={VBW} height={VBH} fill="url(#regBgGlow)" />

        {groups.map((g) => {
          const slots = armSlots(g);
          const poly = arrowPoints(g.size);
          const armNames = ["top", "right", "bottom", "left"] as const;
          const trailLen = BASE.trail * g.size;
          const shaftHalf = (BASE.shaftW * g.size) / 2;
          const headHalf = (BASE.headW * g.size) / 2;
          const lineYs = [
            -headHalf * 0.85,
            -shaftHalf * 0.5,
            shaftHalf * 0.5,
            headHalf * 0.85,
          ];

          return armNames.map((name, idx) => {
            const arm = slots[name];
            const pat = g.pattern[idx];
            if (!pat) return null;
            const isSolid = pat === "solid";
            const fill = isSolid
              ? "url(#regArrowBody)"
              : g.hue === "pink"
              ? "url(#regGridPink)"
              : "url(#regGridBlue)";
            const stroke = isSolid ? "none" : g.hue === "pink" ? "#e54dff" : "#5670ff";
            const amp = 3;
            const ax = arm.dx * amp;
            const ay = arm.dy * amp;

            return (
              <g
                key={`${g.id}-${name}`}
                style={
                  {
                    animation: `regArrowBreathe 5s ease-in-out ${g.delay}s infinite`,
                    "--ax": `${ax}px`,
                    "--ay": `${ay}px`,
                  } as React.CSSProperties
                }
              >
                <g transform={`translate(${arm.tx} ${arm.ty}) rotate(${arm.rot})`}>
                  {isSolid &&
                    lineYs.map((y, li) => (
                      <line
                        key={li}
                        x1={-trailLen}
                        y1={y}
                        x2={-3}
                        y2={y}
                        stroke="#2e4dff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        opacity="0.85"
                      />
                    ))}
                  <polygon
                    points={poly}
                    fill={fill}
                    stroke={stroke}
                    strokeWidth={isSolid ? 0 : 1.3}
                    strokeLinejoin="round"
                  />
                </g>
              </g>
            );
          });
        })}
      </svg>
    </>
  );
}
