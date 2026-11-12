"use client";

import { animate, useInView } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useEffect, useRef } from "react";

type CounterProps = {
  value: number;
  label: string;
  prefix?: string;
  className?: string;
};

/**
 * Cifra destacada ("+9 años", "+200 personas") que cuenta hacia arriba al entrar en pantalla.
 * El número final está en el HTML (SEO y sin JS); la animación solo reescribe el texto.
 */
export function Counter({ value, label, prefix = "+", className }: CounterProps) {
  const numRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(numRef, { once: true, margin: "0px 0px -10% 0px" });
  const reduce = usePrefersReducedMotion();

  // Al hidratar, deja el número en 0 para que cuente cuando aparezca.
  useEffect(() => {
    if (!reduce && numRef.current && !inView) numRef.current.textContent = "0";
    // Solo al montar.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const el = numRef.current;
    if (!inView || reduce || !el) return;
    const controls = animate(0, value, {
      duration: value > 50 ? 1.4 : 0.9,
      ease: [0.2, 0.8, 0.2, 1],
      onUpdate: (v) => {
        el.textContent = String(Math.round(v));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value]);

  return (
    <div className={["flex flex-col", className].filter(Boolean).join(" ")}>
      <span className="type-display-l text-sf-white tabular-nums" aria-label={`${prefix}${value}`}>
        <span aria-hidden="true" className="text-sf-red">
          {prefix}
        </span>
        <span ref={numRef} aria-hidden="true">
          {value}
        </span>
      </span>
      <span className="type-eyebrow mt-2 text-sf-text">{label}</span>
    </div>
  );
}
