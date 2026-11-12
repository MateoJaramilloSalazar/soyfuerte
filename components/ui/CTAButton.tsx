"use client";

import Link from "next/link";
import type { PointerEvent, ReactNode } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { resolveCTA, type CTAAction } from "@/lib/cta";
import { canHoverFinely } from "@/lib/motion";

type Variant = "primary" | "secondary";

const sizes = {
  md: "px-5 py-3",
  /** Header: compacto pero cómodo de leer y de pulsar. */
  sm: "px-5 py-2.5 text-[0.8125rem]",
} as const;

const base =
  "type-button btn-stretch inline-flex items-center justify-center gap-2 rounded-sm border-2 " +
  "duration-200 ease-sf [transition-property:translate,box-shadow,background-color,border-color,color,--wdth] " +
  "hover:[--wdth:110] motion-reduce:transition-none motion-reduce:hover:[--wdth:100]";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-sf-red text-sf-white hover:shadow-glow-red active:bg-sf-red-deep",
  secondary: "border-sf-white bg-transparent text-sf-white hover:border-sf-red",
};

type CTAButtonProps = {
  action: CTAAction;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  icon?: ReactNode;
};

/** Botón magnético: se desplaza un poco hacia el cursor (solo escritorio con mouse). */
function onMagnetMove(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse" || !canHoverFinely()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  const x = (e.clientX - (r.left + r.width / 2)) * 0.25;
  const y = (e.clientY - (r.top + r.height / 2)) * 0.35;
  el.style.translate = `${x.toFixed(1)}px ${y.toFixed(1)}px`;
}

function onMagnetLeave(e: PointerEvent<HTMLElement>) {
  e.currentTarget.style.translate = "";
}

/**
 * Botón de llamado a la acción, desacoplado del destino (ver lib/cta.ts).
 * Las secciones declaran la intención (contacto + mensaje + origen); el destino
 * (WhatsApp hoy, /agenda en la etapa 2) se resuelve aquí.
 * Movimiento: magnético en escritorio y la letra se ensancha al pasar el cursor.
 */
export function CTAButton({ action, children, variant = "primary", size = "md", className, icon }: CTAButtonProps) {
  const { href, external } = resolveCTA(action);
  const classes = [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");
  const magnet = { onPointerMove: onMagnetMove, onPointerLeave: onMagnetLeave };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
        {...magnet}
        onClick={() => {
          if (action.type === "contact") trackWhatsAppClick(action.origin, action.meta);
        }}
      >
        {icon}
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes} {...magnet}>
      {icon}
      {children}
    </Link>
  );
}
