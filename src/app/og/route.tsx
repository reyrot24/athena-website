import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

// Immagine di anteprima per i social (1200×630), generata al build.
export async function GET() {
  const logo = await readFile(join(process.cwd(), "public/logo.png"));
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
          color: "#f3f0ea",
          background:
            "radial-gradient(circle at 88% 0%, rgba(246,161,76,0.5), rgba(246,161,76,0) 55%), #0b0b0c",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={logoSrc} width={150} height={150} alt="" style={{ margin: -30 }} />
          <div style={{ fontSize: 28, letterSpacing: 8, textTransform: "uppercase", opacity: 0.75 }}>
            SSD CAM Athena · Montescaglioso
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            fontSize: 150,
            fontWeight: 900,
            lineHeight: 0.9,
            letterSpacing: -4,
            textTransform: "uppercase",
          }}
        >
          <span>We are</span>
          <span style={{ color: "#f6a14c" }}>Athena</span>
        </div>
        <div style={{ fontSize: 30, opacity: 0.8 }}>Sala pesi · Corsi · Discipline per tutte le età</div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}
