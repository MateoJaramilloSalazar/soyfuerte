import { CheckCheck } from "lucide-react";
import type { Testimonio } from "@/content/testimonios";

type WhatsAppBubbleProps = {
  testimonio: Testimonio;
  className?: string;
};

/**
 * Testimonio con forma de mensaje de WhatsApp en modo oscuro:
 * inicial en círculo, nombre en blanco y zona en muted, mensaje, hora y doble check azul.
 * PENDIENTE (fase de movimiento): indicador "escribiendo…" y check que se activa.
 */
export function WhatsAppBubble({ testimonio, className }: WhatsAppBubbleProps) {
  const { nombre, zona, hora, mensaje } = testimonio;
  return (
    <figure className={["flex items-start gap-3", className].filter(Boolean).join(" ")}>
      <span
        aria-hidden="true"
        className="type-button flex size-10 shrink-0 items-center justify-center rounded-pill bg-sf-red-deep text-sf-white"
      >
        {nombre.charAt(0)}
      </span>
      <div className="relative max-w-[26rem] rounded-bubble rounded-tl-sm bg-sf-wa-bubble px-4 pt-3 pb-2 text-[0.9375rem] leading-[1.45] text-sf-white">
        <figcaption className="mb-0.5 text-[0.8125rem] font-bold text-sf-white">
          {nombre} <span className="font-normal text-sf-muted">· {zona}</span>
        </figcaption>
        <blockquote>
          <p>{mensaje}</p>
        </blockquote>
        <p className="mt-1 flex items-center justify-end gap-1 text-[0.6875rem] text-sf-muted">
          <span>{hora}</span>
          <CheckCheck className="size-4 text-sf-wa-check" aria-label="Leído" />
        </p>
      </div>
    </figure>
  );
}
