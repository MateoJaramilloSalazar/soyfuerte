"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { trackWhatsAppClick } from "@/lib/analytics";
import { resolveCTA, type CTAAction } from "@/lib/cta";

type Variant = "primary" | "secondary";

const sizes = {
  md: "px-5 py-3",
  /** Compacto: header y espacios reducidos. */
  sm: "px-3.5 py-2 text-[0.75rem]",
} as const;

const base =
  "type-button inline-flex items-center justify-center gap-2 rounded-sm border-2 " +
  "transition-[transform,box-shadow,background-color,border-color,color,font-variation-settings] " +
  "duration-150 ease-sf motion-reduce:transition-none";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-sf-red text-sf-white hover:-translate-y-px hover:shadow-glow-red " +
    "hover:[--wdth:110] active:translate-y-0 active:bg-sf-red-deep",
  secondary:
    "border-sf-white bg-transparent text-sf-white hover:border-sf-red",
};

type CTAButtonProps = {
  action: CTAAction;
  children: ReactNode;
  variant?: Variant;
  size?: keyof typeof sizes;
  className?: string;
  icon?: ReactNode;
};

/**
 * Botón de llamado a la acción, desacoplado del destino (ver lib/cta.ts).
 * Las secciones declaran la intención (contacto + mensaje + origen); el destino
 * (WhatsApp hoy, /agenda en la etapa 2) se resuelve aquí.
 */
export function CTAButton({ action, children, variant = "primary", size = "md", className, icon }: CTAButtonProps) {
  const { href, external } = resolveCTA(action);
  const classes = [base, sizes[size], variants[variant], className].filter(Boolean).join(" ");

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
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
    <Link href={href} className={classes}>
      {icon}
      {children}
    </Link>
  );
}
