import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { getPostBySlug } from "@/lib/blog";

export const alt = "Alfaazo Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  const title = post?.title ?? "Alfaazo Blog";
  const tag = post?.tag ?? "Blog";

  const fontData = await readFile(
    join(process.cwd(), "assets/DMSans-Bold.ttf")
  );
  const logoData = await readFile(
    join(process.cwd(), "public/logo.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logoData}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 70px",
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

        {/* Top: Logo + tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <img
            src={logoSrc}
            width={48}
            height={48}
            style={{ borderRadius: 12 }}
          />
          <div
            style={{
              fontSize: 22,
              color: "#512DA8",
              fontWeight: 700,
              display: "flex",
            }}
          >
            Alfaazo
          </div>
          <div
            style={{
              marginLeft: "auto",
              padding: "8px 20px",
              borderRadius: 100,
              background: "rgba(103, 58, 183, 0.12)",
              color: "#673AB7",
              fontSize: 16,
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              display: "flex",
            }}
          >
            {tag}
          </div>
        </div>

        {/* Center: Title */}
        <div
          style={{
            fontSize: title.length > 60 ? 40 : 48,
            fontWeight: 700,
            color: "#512DA8",
            lineHeight: 1.2,
            display: "flex",
            maxWidth: "90%",
          }}
        >
          {title}
        </div>

        {/* Bottom: URL */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              fontSize: 18,
              color: "rgba(92, 61, 46, 0.4)",
              display: "flex",
            }}
          >
            alfaazo.com/blog
          </div>
          <div
            style={{
              fontSize: 15,
              color: "rgba(92, 61, 46, 0.3)",
              display: "flex",
            }}
          >
            by Codefeb
          </div>
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
