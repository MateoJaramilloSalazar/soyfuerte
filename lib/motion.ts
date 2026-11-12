import { useSyncExternalStore } from "react";

/**
 * Utilidades de movimiento compartidas (solo cliente).
 * Reglas del sitio (§5): animar solo transform y opacity; respetar prefers-reduced-motion;
 * en móvil, menos intensidad (sin cursor, menos parallax).
 */

/** Curva de la marca: entra con golpe y se asienta. */
export const EASE_SF = [0.2, 0.8, 0.2, 1] as const;

/** Ningún elemento tarda más de 400 ms en entrar. */
export const REVEAL_DURATION = 0.4;

const REDUCE_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeReduce(cb: () => void) {
  const mq = window.matchMedia(REDUCE_QUERY);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}

/**
 * prefers-reduced-motion sin desajustes de hidratación: en el servidor y en el primer
 * render del cliente vale false; tras hidratar toma el valor real.
 */
export function usePrefersReducedMotion() {
  return useSyncExternalStore(
    subscribeReduce,
    () => window.matchMedia(REDUCE_QUERY).matches,
    () => false,
  );
}

let fineHover: MediaQueryList | null = null;

/** true en escritorio con mouse (para efectos que siguen el cursor). */
export function canHoverFinely() {
  if (typeof window === "undefined") return false;
  fineHover ??= window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
  return fineHover.matches;
}
