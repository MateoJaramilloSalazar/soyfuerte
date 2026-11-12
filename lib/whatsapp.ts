import { formatCOP } from "@/lib/format";
import type { Modalidad, Plan } from "@/content/planes";
import { modalidades } from "@/content/planes";

/** +57 310 211 2040 por defecto; se sobrescribe con NEXT_PUBLIC_WHATSAPP_NUMBER. */
export const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "573102112040";

/**
 * Construye el enlace wa.me con el mensaje prellenado.
 * Es una función pura (se puede llamar en Server Components): el evento
 * `whatsapp_click { origin }` se registra en el clic, desde CTAButton (lib/analytics.ts).
 * `origin` se mantiene en la firma para que cada enlace declare su origen.
 */
export function buildWhatsAppLink(message: string, origin: string) {
  void origin;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** Mensajes prellenados por origen (§7). */
export const waMessages = {
  consulta: "Hola Alejo, vengo de la web y quiero agendar mi consulta valorativa 💪",
  plan: (plan: Plan, modalidad: Modalidad) =>
    `Hola Alejo, me interesa el plan ${plan.name} ${modalidades[modalidad].label.toLowerCase()} (${formatCOP(plan.price[modalidad])}/mes).`,
  pareja: "Hola Alejo, queremos entrenar en pareja en el mismo horario.",
  reto: (reto: string) => `Hola Alejo, mi reto es: ${reto}. ¿Cómo empiezo?`,
  general: "Hola Alejo, vengo de la web y quiero saber más de SoyFuerte.",
} as const;
