"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { usePrefersReducedMotion } from "@/lib/motion";
import { useId, useRef, useState } from "react";
import { BOLT_PATH, BOLT_VIEWBOX } from "@/components/brand/Bolt";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { metodo } from "@/content/site";

type MetodoProps = {
  /** En el Inicio muestra el enlace a /metodo. */
  showLink?: boolean;
};

/**
 * Método en 3 pasos (Créetelo, Entrénalo, Vívelo).
 * Escritorio: sección pegajosa (sticky) mientras se hace scroll; un rayo vertical se llena
 * como barra de progreso y se ilumina la etapa activa.
 * Móvil y prefers-reduced-motion: las 3 etapas apiladas, sin sticky.
 */
export function Metodo({ showLink = true }: MetodoProps) {
  const ref = useRef<HTMLElement>(null);
  const reduce = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const next = Math.min(metodo.length - 1, Math.floor(p * metodo.length));
    setActive((prev) => (prev === next ? prev : next));
  });

  const sticky = !reduce;

  return (
    <section
      ref={ref}
      aria-labelledby="metodo-title"
      className={["grain relative", sticky ? "lg:h-[260vh]" : ""].join(" ")}
    >
      <div
        className={[
          "py-[var(--sf-section-y)]",
          sticky ? "lg:sticky lg:top-0 lg:flex lg:h-dvh lg:items-center lg:py-0 lg:pt-24" : "",
        ].join(" ")}
      >
        <div className="mx-auto w-full max-w-content px-4 md:px-8">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="flex gap-8">
              {sticky ? <BoltProgress progress={fill} /> : null}
              <div className="flex flex-col items-start gap-8">
                <SectionHeading
                  id="metodo-title"
                  eyebrow="Método SoyFuerte"
                  title="Tres pasos. Una convicción."
                  lead="Primero te lo crees. Después lo entrenas. Al final lo vives."
                />
                {showLink ? (
                  <Link
                    href="/metodo"
                    className="type-button text-sf-white underline decoration-sf-red decoration-2 underline-offset-8"
                  >
                    Conoce el método
                  </Link>
                ) : null}
              </div>
            </div>

            <ol className="flex flex-col gap-4">
              {metodo.map((etapa, i) => {
                const isActive = !sticky || i === active;
                return (
                  <li
                    key={etapa.id}
                    data-active={isActive}
                    className={[
                      "relative flex flex-col gap-3 overflow-hidden rounded-md border bg-sf-surface p-6 transition-[opacity,border-color,translate] duration-300 ease-sf md:p-8",
                      "border-sf-line data-[active=true]:border-sf-red/70",
                      sticky ? "lg:opacity-35 lg:data-[active=true]:translate-x-2 lg:data-[active=true]:opacity-100" : "",
                    ].join(" ")}
                  >
                    <span
                      aria-hidden="true"
                      className="type-display-l pointer-events-none absolute right-4 -bottom-3 text-sf-white/5"
                    >
                      0{i + 1}
                    </span>
                    <p className="type-eyebrow eyebrow-mark text-sf-white">
                      Paso {i + 1} · {etapa.note}
                    </p>
                    <h3 className="type-h2 text-sf-white">{etapa.step}</h3>
                    <p className="type-h3 text-sf-text">{etapa.title}</p>
                    <p className="type-body">{etapa.body}</p>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Rayo vertical que se llena de abajo hacia arriba con el progreso (solo escritorio). */
function BoltProgress({ progress }: { progress: ReturnType<typeof useSpring> }) {
  const clipId = useId();
  const gradId = useId();
  return (
    <svg viewBox={BOLT_VIEWBOX} aria-hidden="true" className="hidden h-[52vh] w-auto shrink-0 lg:block">
      <defs>
        <clipPath id={clipId}>
          <path d={BOLT_PATH} />
        </clipPath>
        <linearGradient id={gradId} x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--sf-red-deep)" />
          <stop offset="100%" stopColor="var(--sf-red)" />
        </linearGradient>
      </defs>
      <path d={BOLT_PATH} fill="var(--sf-surface)" stroke="var(--sf-line)" strokeWidth={2} />
      <g clipPath={`url(#${clipId})`}>
        <motion.rect
          x="174"
          y="267"
          width="150"
          height="266"
          fill={`url(#${gradId})`}
          style={{ scaleY: progress, transformOrigin: "bottom", transformBox: "fill-box" }}
        />
      </g>
    </svg>
  );
}
