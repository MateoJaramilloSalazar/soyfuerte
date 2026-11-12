"use client";

import { CheckCheck } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Testimonio } from "@/content/testimonios";
import { EASE_SF, usePrefersReducedMotion } from "@/lib/motion";

type WhatsAppBubbleProps = {
  testimonio: Testimonio;
  className?: string;
  /** Retraso extra (s) antes de empezar a "escribir", para escalonar burbujas visibles a la vez. */
  stagger?: number;
};

type Phase = "wait" | "typing" | "shown" | "read";

/**
 * Testimonio con forma de mensaje de WhatsApp en modo oscuro:
 * inicial en círculo, nombre y zona, mensaje, hora y doble check.
 * Movimiento: al entrar en pantalla aparece "escribiendo…" (tres puntos), luego la burbuja,
 * y el doble check pasa de gris a azul. El espacio de la burbuja está reservado desde el
 * inicio (sin saltos de layout). Con prefers-reduced-motion se muestra directo.
 */
export function WhatsAppBubble({ testimonio, className, stagger = 0 }: WhatsAppBubbleProps) {
  const { nombre, zona, hora, mensaje } = testimonio;
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("wait");

  useEffect(() => {
    if (!inView || reduce) return;
    const typingMs = 650 + Math.min(mensaje.length, 160) * 2; // 650–970 ms
    const t1 = setTimeout(() => setPhase("typing"), stagger * 1000);
    const t2 = setTimeout(() => setPhase("shown"), stagger * 1000 + typingMs);
    const t3 = setTimeout(() => setPhase("read"), stagger * 1000 + typingMs + 450);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [inView, reduce, stagger, mensaje.length]);

  const visible = reduce || phase === "shown" || phase === "read";
  const read = reduce || phase === "read";

  return (
    <figure ref={ref} className={["relative flex items-start gap-3", className].filter(Boolean).join(" ")}>
      <span
        aria-hidden="true"
        className="type-button flex size-10 shrink-0 items-center justify-center rounded-pill bg-sf-red-deep text-sf-white"
      >
        {nombre.charAt(0)}
      </span>

      <div className="relative">
        {/* Indicador "escribiendo…" sobre el espacio reservado de la burbuja */}
        {phase === "typing" ? (
          <span
            aria-hidden="true"
            className="absolute top-0 left-0 inline-flex gap-1 rounded-bubble rounded-tl-sm bg-sf-wa-bubble px-4 py-3"
          >
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-[7px] rounded-pill bg-sf-muted motion-safe:animate-[sf-dot_1.2s_infinite]"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </span>
        ) : null}

        <motion.div
          initial={false}
          animate={visible ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: 0.3, ease: EASE_SF }}
          style={{ transformOrigin: "top left" }}
          className="max-w-[26rem] rounded-bubble rounded-tl-sm bg-sf-wa-bubble px-4 pt-3 pb-2 text-[0.9375rem] leading-[1.45] text-sf-white"
        >
          <figcaption className="mb-0.5 text-[0.8125rem] font-bold text-sf-white">
            {nombre} <span className="font-normal text-sf-muted">· {zona}</span>
          </figcaption>
          <blockquote>
            <p>{mensaje}</p>
          </blockquote>
          <p className="mt-1 flex items-center justify-end gap-1 text-[0.6875rem] text-sf-muted">
            <span>{hora}</span>
            <CheckCheck
              aria-label="Leído"
              className={[
                "size-4 transition-colors duration-300",
                read ? "text-sf-wa-check" : "text-sf-muted",
              ].join(" ")}
            />
          </p>
        </motion.div>
      </div>
    </figure>
  );
}
