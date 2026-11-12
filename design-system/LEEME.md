# Design system SoyFuerte — paquete exportado

Exportado el 11 de noviembre de 2026 desde https://claude.ai/artifact/KzjxgfSivGydMB5LnwUts1

## Contenido

| Archivo | Qué es |
| --- | --- |
| `README.md` | Guía de marca: principios, color, tipografía, espacio, movimiento, voz y qué deja el sistema al diseño del sitio. Leer primero. |
| `tokens.json` | Todos los tokens con su nota de uso (fuente de verdad). |
| `tokens.css` | Los mismos tokens como variables CSS, `@font-face` y una clase por estilo tipográfico. Listo para importar. |
| `fonts/` | Saira (variable, normal y cursiva) e Inter (variable). Licencia SIL Open Font License. |
| `assets/` | Logo SVG y sus reglas. |
| `components/` | Componentes de referencia estáticos (Button, PlanCard, WhatsAppBubble): guía, vista previa HTML y `bundle.css`. |

## Uso en el proyecto del sitio

Copiar esta carpeta en la raíz del proyecto como `design-system/`. Claude Code debe leer `design-system/README.md` y tomar colores, tipografía, espaciado, radios y sombras de `tokens.css` / `tokens.json`. En Next.js, las fuentes se pueden cargar con `next/font/local` desde `design-system/fonts/` o con `next/font/google` (Saira e Inter).

Los componentes son puntos de partida estáticos: la composición, las animaciones y las transiciones se diseñan en el sitio.
