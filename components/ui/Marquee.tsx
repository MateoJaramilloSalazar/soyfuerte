"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  wrap,
} from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { Fragment, useRef } from "react";
import { Bolt } from "@/components/brand/Bolt";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
  /** Velocidad base en % del ancho de una copia por segundo. */
  baseVelocity?: number;
};

/**
 * Franja infinita con frases y el rayo como separador.
 * - Velocidad que reacciona al scroll (acelera y cambia de sentido con la dirección).
 * - Ancho de letra variable según la velocidad (eje wdth de Saira).
 * - Con prefers-reduced-motion queda quieta.
 * Solo se anima transform; el ancho de letra queda aislado con `contain`.
 */
export function Marquee({ items, className, baseVelocity = 2.2 }: MarqueeProps) {
  const reduce = usePrefersReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const wdth = useTransform(smoothVelocity, (v) => 90 + Math.min(Math.abs(v) / 120, 20));
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);
  const direction = useRef(-1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    const vf = velocityFactor.get();
    if (vf < 0) direction.current = 1;
    else if (vf > 0) direction.current = -1;
    const move = direction.current * baseVelocity * (delta / 1000) * (1 + Math.abs(vf));
    baseX.set(baseX.get() + move / 2);
  });

  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6 md:gap-8 md:pr-8">
      {items.map((text) => (
        <Fragment key={text}>
          <li className="type-marquee whitespace-nowrap text-sf-text">{text}</li>
          <li aria-hidden="true">
            <Bolt className="h-4 w-auto text-sf-red" />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      className={["overflow-hidden border-y border-sf-line bg-sf-black py-3.5 [--wdth:90] [contain:layout_paint]", className]
        .filter(Boolean)
        .join(" ")}
    >
      <motion.div className="flex w-max" style={reduce ? undefined : { x, ["--wdth" as string]: wdth }}>
        {row(false)}
        {row(true)}
      </motion.div>
    </div>
  );
}
