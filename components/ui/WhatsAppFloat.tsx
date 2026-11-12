"use client";

import { MessageCircle } from "lucide-react";
import { Bolt } from "@/components/brand/Bolt";
import { trackWhatsAppClick } from "@/lib/analytics";
import { resolveCTA } from "@/lib/cta";
import { waMessages } from "@/lib/whatsapp";

const action = { type: "contact", message: waMessages.consulta, origin: "float" } as const;

/**
 * Botón flotante de WhatsApp (todas las páginas): abajo a la derecha, rayo + ícono.
 * Pulso sutil cada pocos segundos (desactivado con prefers-reduced-motion).
 */
export function WhatsAppFloat() {
  const { href, external } = resolveCTA(action);
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label="Escríbele a Alejo por WhatsApp"
      onClick={() => trackWhatsAppClick(action.origin)}
      className="group fixed right-4 bottom-4 z-50 flex size-14 items-center justify-center rounded-pill bg-sf-red text-sf-white shadow-glow-red transition-transform duration-150 ease-sf hover:-translate-y-0.5 active:bg-sf-red-deep md:right-6 md:bottom-6"
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 rounded-pill bg-sf-red motion-safe:animate-[sf-pulse_4s_var(--sf-ease)_infinite]"
      />
      <MessageCircle className="relative size-6" strokeWidth={2} aria-hidden="true" />
      <Bolt className="absolute -top-1 -right-1 h-5 w-auto text-sf-white" />
    </a>
  );
}
