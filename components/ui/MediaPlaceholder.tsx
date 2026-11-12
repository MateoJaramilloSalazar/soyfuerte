import Image from "next/image";
import { Bolt } from "@/components/brand/Bolt";

type MediaPlaceholderProps = {
  /** Texto accesible y rótulo visible: qué foto o video irá aquí. */
  label: string;
  /** Proporción final, p. ej. "16/9", "4/5". Reserva el espacio (sin saltos de layout). */
  ratio?: string;
  className?: string;
  /** Imagen temporal de referencia (ver lib/referencias.ts). */
  refSrc?: string | null;
  /** Tamaños para next/image cuando hay referencia. */
  sizes?: string;
  /** Contenido superpuesto (p. ej. botón de play del video). */
  children?: React.ReactNode;
  /** Precargar la imagen (solo la que está arriba del pliegue, p. ej. el póster del hero). */
  priority?: boolean;
};

/**
 * PLACEHOLDER de foto o video (§9) en la proporción final.
 * Sin referencia: fondo oscuro con el rayo y rótulo. Con referencia: la foto temporal.
 */
export function MediaPlaceholder({
  label,
  ratio = "4/5",
  className,
  refSrc,
  sizes = "(min-width: 768px) 40vw, 100vw",
  children,
  priority = false,
}: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={refSrc ? label : `${label} (próximamente)`}
      style={{ aspectRatio: ratio }}
      className={[
        "relative flex items-end overflow-hidden rounded-md border border-sf-line bg-sf-surface",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {refSrc ? (
        <>
          <Image src={refSrc} alt="" fill sizes={sizes} preload={priority} className="object-cover" />
          <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-sf-black/80 via-sf-black/10 to-transparent" />
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_50%,rgba(224,47,52,0.28),transparent_60%)]"
          />
          <Bolt className="absolute top-1/2 left-1/2 h-1/2 w-auto -translate-x-1/2 -translate-y-1/2 text-sf-red opacity-25" />
        </>
      )}
      {children ? <div className="absolute inset-0 flex items-center justify-center">{children}</div> : null}
      {refSrc ? null : <p className="type-eyebrow relative m-4 text-sf-text">{label}</p>}
    </div>
  );
}
