import type { SVGProps } from "react";

/** Trazo del rayo, extraído del logo oficial (primer subtrazo). */
export const BOLT_PATH =
  "M241.2,420.6l-61.4,7.6,105.5-155.3-41.1,109.5,73.7-11.3-118.1,156,41.5-106.5Z";

/** viewBox con un margen pequeño para que el trazo (outline) no se recorte. */
export const BOLT_VIEWBOX = "174 267 150 266";

type BoltProps = SVGProps<SVGSVGElement> & {
  /** solid: relleno (viñeta, separador, favicon). outline: solo trazo (base para animar el dibujo). */
  variant?: "solid" | "outline";
};

/**
 * Rayo de la marca. Decorativo por defecto (aria-hidden).
 * Para animarlo (hero), envolverlo en un elemento animado o animar el <path>
 * con stroke-dashoffset usando pathLength={1}.
 */
export function Bolt({ variant = "solid", className, ...props }: BoltProps) {
  const solid = variant === "solid";
  return (
    <svg
      viewBox={BOLT_VIEWBOX}
      aria-hidden="true"
      focusable="false"
      className={className}
      {...props}
    >
      <path
        d={BOLT_PATH}
        fill={solid ? "currentColor" : "none"}
        stroke={solid ? "none" : "currentColor"}
        strokeWidth={solid ? undefined : 4}
        strokeLinejoin="miter"
        pathLength={1}
      />
    </svg>
  );
}
