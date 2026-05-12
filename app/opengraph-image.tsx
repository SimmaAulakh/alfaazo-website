import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "Alfaazo — Learn Punjabi with Bite-Sized Lessons";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const fontData = await readFile(
    join(process.cwd(), "assets/DMSans-Bold.ttf")
  );
  const logoData = await readFile(join(process.cwd(), "public/logo.png"), "base64");
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#FDF6EC",
          fontFamily: "DM Sans",
          position: "relative",
        }}
      >
        {/* Purple accent bar at top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: "linear-gradient(90deg, #673AB7, #9575FF, #673AB7)",
            display: "flex",
          }}
        />

        {/* Decorative Gurmukhi characters */}
        <div
          style={{
            position: "absolute",
            top: 40,
            right: 60,
            fontSize: 140,
            color: "rgba(103, 58, 183, 0.06)",
            display: "flex",
          }}
        >
          ੳ
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            left: 60,
            fontSize: 120,
            color: "rgba(103, 58, 183, 0.06)",
            display: "flex",
          }}
        >
          ਅ
        </div>

        {/* Logo */}
        <img src={logoSrc} width={80} height={80} style={{ borderRadius: 16, marginBottom: 24 }} />

        {/* Title */}
        <div
          style={{
            fontSize: 64,
            fontWeight: 700,
            color: "#512DA8",
            marginBottom: 12,
            display: "flex",
          }}
        >
          Alfaazo
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: 28,
            color: "#5C3D2E",
            opacity: 0.7,
            marginBottom: 32,
            display: "flex",
          }}
        >
          Learn Punjabi with Bite-Sized Lessons
        </div>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 16 }}>
          {["Gurmukhi Script", "Native Audio", "Free on iOS & Android"].map(
            (label) => (
              <div
                key={label}
                style={{
                  padding: "10px 24px",
                  borderRadius: 100,
                  background: "rgba(103, 58, 183, 0.1)",
                  color: "#673AB7",
                  fontSize: 18,
                  fontWeight: 700,
                  display: "flex",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>

        {/* Bottom branding */}
        <div
          style={{
            position: "absolute",
            bottom: 28,
            fontSize: 16,
            color: "rgba(92, 61, 46, 0.35)",
            display: "flex",
          }}
        >
          alfaazo.com — by Codefeb
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "DM Sans",
          data: fontData,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
