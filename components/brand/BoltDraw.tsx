"use client";

import { motion } from "motion/react";
import { BOLT_PATH, BOLT_VIEWBOX } from "@/components/brand/Bolt";
import { EASE_SF, usePrefersReducedMotion } from "@/lib/motion";

type BoltDrawProps = {
  className?: string;
  /** Retraso inicial en segundos. */
  delay?: number;
};

/**
 * Rayo que se dibuja (stroke) y luego "se enciende": relleno rojo + destello breve.
 * Decorativo (aria-hidden). Con prefers-reduced-motion aparece ya encendido.
 * El destello es una copia desenfocada que solo anima opacidad (sin filtros animados).
 */
export function BoltDraw({ className, delay = 0.5 }: BoltDrawProps) {
  const reduce = usePrefersReducedMotion();
  const draw = 0.9;

  if (reduce) {
    return (
      <svg viewBox={BOLT_VIEWBOX} aria-hidden="true" className={className}>
        <path d={BOLT_PATH} fill="var(--sf-red)" />
      </svg>
    );
  }

  return (
    <span aria-hidden="true" className={["block", className ?? "relative"].join(" ")}>
      {/* Destello: copia desenfocada que se enciende y se apaga */}
      <motion.svg
        viewBox={BOLT_VIEWBOX}
        className="absolute inset-0 h-full w-full blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0.35] }}
        transition={{ delay: delay + draw, duration: 0.9, times: [0, 0.25, 1], ease: "easeOut" }}
      >
        <path d={BOLT_PATH} fill="var(--sf-red)" />
      </motion.svg>

      <svg viewBox={BOLT_VIEWBOX} className="relative h-full w-full overflow-visible">
        {/* Relleno: se enciende al terminar el trazo */}
        <motion.path
          d={BOLT_PATH}
          fill="var(--sf-red)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + draw - 0.1, duration: 0.25, ease: EASE_SF }}
        />
        {/* Trazo que se dibuja */}
        <motion.path
          d={BOLT_PATH}
          fill="none"
          stroke="var(--sf-white)"
          strokeWidth={3}
          strokeLinejoin="miter"
          initial={{ pathLength: 0, opacity: 1 }}
          animate={{ pathLength: 1, opacity: [1, 1, 0] }}
          transition={{
            pathLength: { delay, duration: draw, ease: [0.65, 0, 0.35, 1] },
            opacity: { delay, duration: draw + 0.4, times: [0, 0.8, 1] },
          }}
        />
      </svg>
    </span>
  );
}
