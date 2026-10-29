import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

/** Shared social share card: navy, logo, two-line headline with a yellow second line. */
export const ogSize = { width: 1200, height: 630 };

export async function renderOgImage({
  eyebrow,
  line1,
  line2,
  footer,
}: {
  eyebrow?: string;
  line1: string;
  line2: string;
  footer: string;
}) {
  const logo = await readFile(path.join(process.cwd(), "public/brand/prolifi-logo-white.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0e3062",
          color: "#f4f6fb",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={322} height={60} alt="Prolifi" />
          {eyebrow && (
            <span
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 4,
                textTransform: "uppercase",
                color: "#f4c430",
                border: "2px solid rgba(244,196,48,0.5)",
                borderRadius: 999,
                padding: "10px 24px",
              }}
            >
              {eyebrow}
            </span>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>{line1}</span>
          <span style={{ fontSize: 76, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2, color: "#f4c430" }}>{line2}</span>
        </div>
        <span style={{ fontSize: 28, color: "#a7b3cc" }}>{footer}</span>
      </div>
    ),
    ogSize
  );
}
