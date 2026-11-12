"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useRef } from "react";

type ManifestoLineProps = {
  text: string;
  /** Última línea: Saira roja que se expande con el scroll. */
  final?: boolean;
};

/**
 * Línea del manifiesto ligada al scroll: se enciende (opacidad) y sube a medida que llega
 * al centro de la pantalla. La línea final además se expande (eje wdth de Saira 62 → 75).
 * Con prefers-reduced-motion: texto quieto y visible.
 */
export function ManifestoLine({ text, final = false }: ManifestoLineProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 95%", "start 55%"] });
  const opacity = useTransform(scrollYProgress, [0, 1], [0.15, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const wdth = useTransform(scrollYProgress, [0, 1], [62, 75]);

  if (reduce) {
    return (
      <p ref={ref} className={final ? "type-h1 mt-4 text-sf-red" : "type-manifesto text-pretty text-sf-white"}>
        {text}
      </p>
    );
  }

  return (
    <motion.p
      ref={ref}
      style={final ? { opacity, y, ["--wdth" as string]: wdth } : { opacity, y }}
      className={final ? "type-h1 mt-4 text-sf-red" : "type-manifesto text-pretty text-sf-white"}
    >
      {text}
    </motion.p>
  );
}
