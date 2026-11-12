"use client";

import { motion, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { EASE_SF, REVEAL_DURATION, usePrefersReducedMotion } from "@/lib/motion";

type Tag = "div" | "ul" | "ol" | "li" | "section" | "header" | "p";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: Tag;
  /** Retraso en segundos. */
  delay?: number;
  /** Distancia de entrada desde abajo, en px. */
  y?: number;
};

const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Entra desde abajo al aparecer en pantalla (máx. 400 ms).
 * Con prefers-reduced-motion: solo opacidad.
 */
export function Reveal({ children, className, as = "div", delay = 0, y = 24 }: RevealProps) {
  const reduce = usePrefersReducedMotion();
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport}
      transition={{ duration: REVEAL_DURATION, ease: EASE_SF, delay }}
    >
      {children}
    </Comp>
  );
}

const groupVariants: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.08 } },
};

/** Contenedor que escalona la entrada de sus RevealItem. */
export function RevealGroup({ children, className, as = "div" }: Omit<RevealProps, "delay" | "y">) {
  const Comp = motion[as];
  return (
    <Comp className={className} initial="hidden" whileInView="shown" viewport={viewport} variants={groupVariants}>
      {children}
    </Comp>
  );
}

/** Hijo de RevealGroup: entra en escalón. */
export function RevealItem({ children, className, as = "div", y = 24 }: Omit<RevealProps, "delay">) {
  const reduce = usePrefersReducedMotion();
  const Comp = motion[as];
  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    shown: { opacity: 1, y: 0, transition: { duration: REVEAL_DURATION, ease: EASE_SF } },
  };
  return (
    <Comp className={className} variants={variants}>
      {children}
    </Comp>
  );
}
