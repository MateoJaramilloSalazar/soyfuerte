/**
 * URL pública del sitio: https://soyfuerte.co.
 * NEXT_PUBLIC_SITE_URL permite sobrescribirla (p. ej. en local o en previews).
 */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://soyfuerte.co").replace(/\/$/, "");

export const routes = [
  { path: "/", priority: 1 },
  { path: "/planes", priority: 0.9 },
  { path: "/metodo", priority: 0.8 },
  { path: "/resultados", priority: 0.7 },
  { path: "/sobre-alejo", priority: 0.7 },
  { path: "/preguntas", priority: 0.6 },
] as const;
