import Image from "next/image";
import type { ReactNode } from "react";
import { fotos, type FotoKey } from "@/content/fotos";

type PhotoProps = {
  foto: FotoKey;
  /** Proporción del marco, p. ej. "4/5", "16/9". La foto se recorta con object-cover. */
  ratio?: string;
  className?: string;
  sizes?: string;
  /** Precargar (solo la foto que está arriba del pliegue, p. ej. el hero). */
  preload?: boolean;
  /** Punto de recorte, p. ej. "center top". */
  position?: string;
  /** Degradado inferior para dar profundidad / leer texto encima. */
  shade?: boolean;
  /** Contenido superpuesto (p. ej. botón de play). */
  children?: ReactNode;
};

/** Foto de Alejo en un marco con la proporción indicada (sin saltos de layout). */
export function Photo({
  foto,
  ratio = "4/5",
  className,
  sizes = "(min-width: 768px) 40vw, 100vw",
  preload = false,
  position = "center",
  shade = true,
  children,
}: PhotoProps) {
  const { src, alt } = fotos[foto];
  return (
    <div
      style={{ aspectRatio: ratio }}
      className={["relative overflow-hidden rounded-md border border-sf-line bg-sf-surface", className]
        .filter(Boolean)
        .join(" ")}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        placeholder="blur"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      {shade ? (
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-sf-black/60 via-transparent to-transparent" />
      ) : null}
      {children ? <div className="absolute inset-0 flex items-center justify-center">{children}</div> : null}
    </div>
  );
}
