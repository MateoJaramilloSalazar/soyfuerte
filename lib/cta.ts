import { buildWhatsAppLink } from "@/lib/whatsapp";

/**
 * Destino de los CTA, desacoplado de las secciones.
 * Etapa 1: todo va a WhatsApp. Etapa 2: cambiar CONTACT_CHANNEL a "agenda"
 * para que los CTA de contacto apunten a la ruta reservada /agenda, sin tocar secciones.
 */
export const CONTACT_CHANNEL: "whatsapp" | "agenda" = "whatsapp";
export const AGENDA_PATH = "/agenda";

export type CTAAction =
  /** Contacto con Alejo: mensaje prellenado + origen (para analytics). */
  | { type: "contact"; message: string; origin: string; meta?: Record<string, string> }
  /** Navegación interna (p. ej. "Ver planes"). */
  | { type: "link"; href: string };

export type ResolvedCTA = { href: string; external: boolean };

export function resolveCTA(action: CTAAction): ResolvedCTA {
  if (action.type === "link") return { href: action.href, external: false };
  if (CONTACT_CHANNEL === "agenda") return { href: AGENDA_PATH, external: false };
  return { href: buildWhatsAppLink(action.message, action.origin), external: true };
}
