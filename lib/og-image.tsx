import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";
export const ogAlt = "JSLTCC — Japan Sri Lanka Technology & Cultural Centre";

/** Shared generator for /opengraph-image and /twitter-image. */
export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          color: "#ffffff",
          background:
            "linear-gradient(135deg, #0f172a 0%, #1e293b 35%, #3b1a1a 70%, #0f172a 100%)",
          position: "relative",
        }}
      >
        {/* Cyberpunk glow accents */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-200px",
            width: "600px",
            height: "600px",
            background:
              "radial-gradient(circle, rgba(231,76,60,0.35) 0%, transparent 60%)",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-200px",
            left: "-200px",
            width: "500px",
            height: "500px",
            background:
              "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 60%)",
            display: "flex",
          }}
        />

        {/* "Since 2002" pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            background: "rgba(255,255,255,0.08)",
            border: "1px solid rgba(255,255,255,0.18)",
            padding: "10px 20px",
            borderRadius: "999px",
            fontSize: "20px",
            color: "#f87171",
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            alignSelf: "flex-start",
            marginBottom: "30px",
          }}
        >
          <span
            style={{
              display: "flex",
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              background: "#f87171",
            }}
          />
          Since 2002 · Trusted by 5,000+ Students
        </div>

        {/* Wordmark */}
        <div
          style={{
            display: "flex",
            fontSize: "108px",
            fontWeight: 900,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            marginBottom: "20px",
            color: "#ffffff",
          }}
        >
          JSLTCC
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            fontSize: "44px",
            fontWeight: 600,
            color: "#cbd5e1",
            lineHeight: 1.15,
            marginBottom: "40px",
            maxWidth: "900px",
          }}
        >
          Japanese Language & Study Abroad in Sri Lanka
        </div>

        {/* Footer row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            fontSize: "22px",
            color: "rgba(255,255,255,0.7)",
            fontWeight: 500,
          }}
        >
          <span style={{ display: "flex" }}>JLPT &amp; TOPJ Prep</span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>·</span>
          <span style={{ display: "flex" }}>Japan · UK · Australia</span>
          <span style={{ display: "flex", color: "rgba(255,255,255,0.3)" }}>·</span>
          <span style={{ display: "flex", color: "#f87171", fontWeight: 700 }}>
            jsltcc.com
          </span>
        </div>
      </div>
    ),
    { ...ogSize }
  );
}
