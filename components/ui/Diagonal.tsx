"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useRef, type ReactNode } from "react";

/** tan(8°) × 100: altura del corte en % del ancho para la inclinación del logo (−8°). */
const CUT = 14.05;

type DiagonalBandProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

/**
 * Franja con los bordes superior e inferior cortados en diagonal ascendente (−8°, como el logo),
 * con una línea roja fina en cada corte. Al hacer scroll los cortes se desplazan levemente
 * (parallax, solo transform). Con prefers-reduced-motion quedan quietos.
 */
export function DiagonalBand({ children, className, ...aria }: DiagonalBandProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const topY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [22, -22]);
  const bottomY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [-22, 22]);

  return (
    <section
      ref={ref}
      {...aria}
      className={["grain relative overflow-hidden bg-sf-surface", className].filter(Boolean).join(" ")}
      style={{ paddingBlock: `calc(${CUT}vw + 3rem)` }}
    >
      {/* Corte superior: cuña negra + línea roja */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-10 z-10" style={{ y: topY }}>
        <div className="h-10 bg-sf-black" />
        <svg viewBox={`0 0 100 ${CUT}`} preserveAspectRatio="none" className="block w-full" style={{ height: `${CUT}vw` }}>
          <polygon points={`0,0 100,0 0,${CUT}`} fill="var(--sf-black)" />
          <line x1="0" y1={CUT} x2="100" y2="0" stroke="var(--sf-red)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
      </motion.div>

      <div className="relative z-0 mx-auto w-full max-w-content px-4 md:px-8">{children}</div>

      {/* Corte inferior */}
      <motion.div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-10 z-10" style={{ y: bottomY }}>
        <svg viewBox={`0 0 100 ${CUT}`} preserveAspectRatio="none" className="block w-full" style={{ height: `${CUT}vw` }}>
          <polygon points={`100,0 100,${CUT} 0,${CUT}`} fill="var(--sf-black)" />
          <line x1="0" y1={CUT} x2="100" y2="0" stroke="var(--sf-red)" strokeWidth="2" vectorEffect="non-scaling-stroke" />
        </svg>
        <div className="h-10 bg-sf-black" />
      </motion.div>
    </section>
  );
}
