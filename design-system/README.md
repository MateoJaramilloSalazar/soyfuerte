# SoyFuerte

Sistema de diseño de SoyFuerte, la marca de entrenamiento personal de Alejo Jaramillo en Medellín. Frase de marca: **Créetelo. Entrénalo. Vívelo.** La marca es un guerrero noble con alma de rock: intensa, disciplinada y directa, pero cercana. Todo el sistema es oscuro, con el rojo del rayo como protagonista.

## Principios

1. **Oscuro e intenso, nunca frío.** Fondo `black` siempre; la calidez la ponen las fotos de Alejo sonriendo, los testimonios y el tono.
2. **Un solo protagonista.** `red` es el color de la marca. Una acción roja dominante por pantalla.
3. **Fuerza en movimiento.** Títulos en Saira condensada y en cursiva: deportivos, rápidos y sin sentirse pesados. Texto tranquilo y legible en Inter. Exige sin humillar.
4. **Angular y ascendente.** Esquinas casi rectas (`radius-sm`) y diagonales con `angle-diagonal` (−8°), la inclinación del logo.
5. **El rayo es la chispa.** El naranja aparece poco y donde hay energía: destellos, hover, momentos clave.

## Color

La paleta de marca son **5 colores**: `black`, `red`, `red-deep`, `orange` y `white`. `black-raised`, `text-body`, `text-muted` y `line` son variaciones del negro y del blanco, no colores nuevos. `wa-bubble` y `wa-check` existen solo para que los testimonios se vean como WhatsApp real.

| Rol | Token | Regla |
| --- | --- | --- |
| Fondo | `black` | Siempre. No hay modo claro. |
| Superficie | `black-raised` | Tarjetas, burbujas, menús. |
| Acción y marca | `red` | Botón principal, logo, palabras clave. Como texto, solo a 24px o más. |
| Profundidad | `red-deep` | Degradados con `red`, estado presionado. Nunca texto. |
| Chispa | `orange` | Destellos, hover, subrayados, íconos activos. Nunca fondo grande. |
| Títulos | `white` | Títulos y texto de botones. |
| Texto largo | `text-body` | Párrafos. |

**Degradado de energía:** `red-deep` → `red` → `orange`, a −8°. Solo para el rayo encendido, el subrayado del hero y la barra de progreso del método. Sin gris como color de marca.

## Tipografía

- **Saira** (`display`): títulos, antetítulos, botones y precios, en MAYÚSCULAS. Es deportiva y variable: cambia de ancho (de 50 a 125) y de grosor de forma continua, y tiene cursiva real. Los títulos van condensados (ancho 75–85), en cursiva y con pesos medios (600–700), para que transmitan velocidad sin verse pesados. Gratuita (Google Fonts).
- **Inter** (`text`): párrafos, listas, notas y datos. Pesos 400 y 700.

Escala: `display-xl` (solo hero) › `display-l` › `h1` › `h2` (cursivas) › `h3` (recta); luego `title-spaced` (rótulos con mucho espaciado), `eyebrow`, `button`, `price` en Saira, y `lead`, `body`, `small` en Inter. El ancho de cada estilo va en su nota (se aplica con `font-variation-settings: "wdth" N`). En móvil los tamaños bajan con `clamp()`.

**La tipografía también se mueve.** Por ser variable, el sitio puede animar el ancho y el grosor: títulos que se estiran al entrar (ancho 62 → 75), botones que se ensanchan al pasar el cursor, palabras que se comprimen con el scroll. Es la forma más propia de la marca de sumar movimiento.

## Espacio y forma

Escala de 4px: `space-1` (4) a `space-32` (128). Secciones con `space-24` vertical en escritorio y `space-16` en móvil; hero, manifiesto y cierre con `space-32`. Contenido a máximo 1200px de ancho, texto a 68 caracteres.

Radios: `radius-sm` en botones, `radius-md` en tarjetas, `radius-bubble` en burbujas de WhatsApp, `radius-pill` solo para el botón flotante y el interruptor presencial/virtual.

## Movimiento

Solo una dirección de partida; el movimiento real se define en el sitio. Carácter: entra con golpe y se asienta (curva sugerida `cubic-bezier(0.2, 0.8, 0.2, 1)`), como golpes de batería. Con `prefers-reduced-motion`, solo fundidos.

## Iconografía

Íconos de trazo (outline), 2px, esquinas rectas, en `white` o `orange` cuando están activos. Recomendado: Lucide. El rayo de la marca no se mezcla con íconos genéricos: es un recurso propio.

## Logo

Ver el grupo de assets **Logos**. Sobre `black`, el logo va en `red` o en `white`. Área de protección: la altura de la "O" de SOY alrededor. No rotar, no deformar, no poner sobre fotos sin oscurecerlas.

## Voz

Tutea, frases cortas como un riff, directa y transparente. Paisa natural, sin caricatura. Botones con verbo: "Escríbele a Alejo", "Quiero este plan". Nada de "cambia tu cuerpo en 21 días".

## Qué define este sistema y qué deja al sitio

Este sistema fija la **base**: colores, tipografía, espaciado, radios, sombras, voz y unos componentes de referencia. Es lo que mantiene la marca reconocible en cualquier pieza.

**No define**, a propósito, la experiencia del sitio: composiciones de cada sección, animaciones, transiciones entre páginas, efectos de scroll, interacciones, uso del video y la fotografía, ni el ritmo de la página. Eso se diseña y desarrolla en el sitio, que debe ser muy dinámico, con transiciones y atractivo; una página estática de referencia no lo puede mostrar. Los componentes de aquí son puntos de partida estáticos: el sitio puede animarlos, recombinarlos y crear nuevos, siempre con estos tokens.

## Componentes

- **Button**: principal (`red`), secundario (borde `white`), WhatsApp (pill flotante).
- **PlanCard**: tarjeta de plan con nombre, frecuencia, precio y llamado a la acción.
- **WhatsAppBubble**: testimonio con forma de mensaje de WhatsApp oscuro.
