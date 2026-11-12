"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { fotos } from "@/content/fotos";
import { EASE_SF, usePrefersReducedMotion } from "@/lib/motion";

/**
 * Retrato de Alejo junto al manifiesto.
 * - Entra con un barrido diagonal (−8°, la inclinación del logo) y un leve zoom que se asienta.
 * - Con el scroll, la foto sube en parallax y un marco rojo detrás se mueve en sentido
 *   contrario (profundidad). Solo transform; la revelación inicial es única.
 * - Con prefers-reduced-motion: foto quieta, solo fundido.
 */
export function ManifestoPortrait({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40]);
  const frameY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-24, 24]);
  const { src, alt } = fotos.portrait;

  return (
    <div ref={ref} className={["relative", className].filter(Boolean).join(" ")}>
      {/* Marco rojo desplazado, detrás de la foto */}
      <motion.div
        aria-hidden="true"
        style={{ y: frameY }}
        className="absolute inset-0 translate-x-4 translate-y-4 rounded-md border-2 border-sf-red/70 md:translate-x-6 md:translate-y-6"
      />

      <motion.div
        className="relative aspect-[4/5] overflow-hidden rounded-md bg-sf-black"
        initial={reduce ? { opacity: 0 } : { clipPath: "polygon(0 100%, 100% 86%, 100% 100%, 0 100%)" }}
        whileInView={
          reduce ? { opacity: 1 } : { clipPath: "polygon(0 0, 100% -14%, 100% 100%, 0 100%)" }
        }
        viewport={{ once: true, margin: "0px 0px -15% 0px" }}
        transition={{ duration: 0.9, ease: EASE_SF }}
      >
        <motion.div
          className="absolute -inset-y-[8%] inset-x-0"
          style={{ y: photoY }}
          initial={reduce ? false : { scale: 1.12 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_SF }}
        >
          <Image
            src={src}
            alt={alt}
            fill
            placeholder="blur"
            sizes="(min-width: 1024px) 34vw, (min-width: 640px) 60vw, 90vw"
            className="object-cover object-top"
          />
        </motion.div>
        {/* Funde la parte baja con la franja */}
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-sf-surface via-transparent to-transparent" />
      </motion.div>
    </div>
  );
}
