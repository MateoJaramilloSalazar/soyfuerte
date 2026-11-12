import { Bolt } from "@/components/brand/Bolt";

type MediaPlaceholderProps = {
  /** Texto accesible y rótulo visible: qué foto o video irá aquí. */
  label: string;
  /** Proporción final, p. ej. "16/9", "4/5". Reserva el espacio (sin saltos de layout). */
  ratio?: string;
  className?: string;
};

/**
 * PLACEHOLDER de foto o video (§9): fondo oscuro con el rayo, en la proporción final.
 * Reemplazar por next/image (o <video>) cuando llegue el material.
 */
export function MediaPlaceholder({ label, ratio = "4/5", className }: MediaPlaceholderProps) {
  return (
    <div
      role="img"
      aria-label={`${label} (próximamente)`}
      style={{ aspectRatio: ratio }}
      className={[
        "relative flex items-end overflow-hidden rounded-md border border-sf-line bg-sf-surface",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(120%_80%_at_0%_50%,rgba(224,47,52,0.28),transparent_60%)]"
      />
      <Bolt className="absolute top-1/2 left-1/2 h-1/2 w-auto -translate-x-1/2 -translate-y-1/2 text-sf-red opacity-25" />
      <p className="type-eyebrow relative m-4 text-sf-muted">{label}</p>
    </div>
  );
}
