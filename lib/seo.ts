/**
 * URL pública del sitio, en este orden:
 * 1. NEXT_PUBLIC_SITE_URL, si se define a mano.
 * 2. VERCEL_PROJECT_PRODUCTION_URL: la variable de sistema de Vercel con el dominio de
 *    producción. Hoy es el *.vercel.app; cuando se agregue soyfuerte.co en Vercel
 *    pasa a ser ese, sin tocar código.
 * 3. https://soyfuerte.co (dominio final; fuera de Vercel o en local).
 */
const vercelProd = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (vercelProd ? `https://${vercelProd}` : "https://soyfuerte.co")
).replace(/\/$/, "");

export const routes = [
  { path: "/", priority: 1 },
  { path: "/planes", priority: 0.9 },
  { path: "/metodo", priority: 0.8 },
  { path: "/resultados", priority: 0.7 },
  { path: "/sobre-alejo", priority: 0.7 },
  { path: "/preguntas", priority: 0.6 },
] as const;
