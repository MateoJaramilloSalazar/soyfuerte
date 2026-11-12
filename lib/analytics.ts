import { track } from "@vercel/analytics";

/**
 * Eventos personalizados (Vercel Analytics). Solo se llaman desde el cliente.
 * Métricas: clics en WhatsApp por botón y por plan, scroll depth, reproducciones del video.
 */

type Props = Record<string, string | number | boolean | null>;

export function trackWhatsAppClick(origin: string, extra: Props = {}) {
  track("whatsapp_click", { origin, ...extra });
}

export function trackScrollDepth(page: string, depth: 25 | 50 | 75 | 100) {
  track("scroll_depth", { page, depth });
}

export function trackVideo(action: "play" | "complete", source = "hero") {
  track("video_play", { action, source });
}
