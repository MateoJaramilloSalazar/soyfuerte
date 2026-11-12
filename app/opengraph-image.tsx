import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const alt = "SoyFuerte · Créetelo. Entrénalo. Vívelo.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Imagen Open Graph: logo sobre negro. */
export default async function Image() {
  const svg = await readFile(join(process.cwd(), "public/brand/logo-soyfuerte-rojo.svg"), "utf8");
  // Recorta el viewBox al área del logo (el archivo original es 800×800 con margen).
  const cropped = svg.replace('viewBox="0 0 800 800"', 'viewBox="161 254 479 292"');
  const src = `data:image/svg+xml;base64,${Buffer.from(cropped).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0e0e0e",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} width={760} height={463} alt="" />
      </div>
    ),
    size,
  );
}
