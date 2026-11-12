# SoyFuerte — Indicaciones del sitio web (para Claude Code)

> Lee primero `SOYFUERTE_MARCA.md`: es la fuente de verdad de contenido, precios, tono e identidad.
> Este documento define cómo construir el sitio. Idioma del sitio: **español (Colombia)**.
> Design system: carpeta `design-system/` en la raíz del proyecto (paquete `soyfuerte-design-system.zip`; versión en línea: https://claude.ai/artifact/KzjxgfSivGydMB5LnwUts1). Leer primero `design-system/README.md`; importar `design-system/tokens.css` (variables, fuentes y clases tipográficas). El design system define la **base** (colores, tipografía, espaciado, radios, sombras, voz) y esos valores son obligatorios. **No define la experiencia del sitio**: composiciones, animaciones, transiciones, scroll, interacciones y ritmo se diseñan aquí, con total libertad, para que el sitio sea muy dinámico, con transiciones y atractivo. Sus componentes son puntos de partida estáticos: anímalos, recombínalos y crea nuevos con los mismos tokens.

---

## 0. Antes de empezar: instalar skills y repos

Ejecuta esto al iniciar el proyecto, en la raíz:

```bash
npx skills add https://github.com/vercel-labs/agent-skills --skill web-design-guidelines
npx skills add https://github.com/anthropics/skills --skill web-artifacts-builder
npx skills add https://github.com/vercel-labs/agent-skills --skill deploy-to-vercel
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-best-practices
npx skills add https://github.com/vercel-labs/agent-skills --skill vercel-react-view-transitions

# Repo de referencia (no forma parte del build)
git clone https://github.com/vercel-labs/agent-skills.git .references/agent-skills
echo ".references/" >> .gitignore
```

Cómo usar cada skill:
- **web-design-guidelines:** revisar cada sección contra estas pautas antes de darla por terminada.
- **vercel-react-best-practices:** arquitectura, Server Components, rendimiento, carga de datos.
- **vercel-react-view-transitions:** transiciones entre páginas y cambios de estado (selector de planes, filtros).
- **deploy-to-vercel:** despliegue final.
- **web-artifacts-builder:** está pensado para artefactos de claude.ai (un solo HTML empaquetado). Úsalo solo para prototipar componentes sueltos si sirve; **el sitio de producción es un proyecto Next.js**, no un artefacto.

Lee el `SKILL.md` de cada skill relevante antes de escribir el código de esa parte.

---

## 1. Objetivo y alcance

**Etapa 1 (este proyecto): sitio de captación.** Todo lleva a un botón de WhatsApp para que el visitante le escriba a Alejo. No hay agenda, pagos ni login.

**Etapa 2 (fuera de alcance):** agendamiento propio conectado a Google Calendar. Deja la arquitectura lista (ruta `/agenda` reservada, componente `CTAButton` desacoplado del destino) para cambiar el destino sin tocar las secciones.

**Métricas:** clics en WhatsApp por botón y por plan, scroll depth, reproducciones del video.

**Sensación buscada:** muy dinámico, atractivo y moderno. Oscuro, intenso, con energía de concierto de rock, pero cálido en el trato. Debe sentirse premium (el público es estrato 4 a 6).

---

## 2. Stack

- **Next.js** (última versión estable, App Router) + **TypeScript** + **React Server Components** por defecto; Client Components solo donde haya interacción o animación.
- **Tailwind CSS** con los tokens de marca como variables CSS.
- **Motion** (`motion/react`) para animaciones de componentes, scroll y layout.
- **View Transitions** según el skill `vercel-react-view-transitions`.
- **next/font** (Google) para tipografías, con `display: swap`: **Saira** variable con ejes `wght` y `wdth` y su cursiva (`axes: ["wdth"]`, `style: ["normal","italic"]`) para títulos, antetítulos, botones y precios; **Inter** para texto.
- **next/image** para todas las imágenes; video con `<video>` nativo, `preload="none"` y póster.
- **Vercel Analytics** + eventos personalizados para clics de WhatsApp.
- Contenido en archivos tipados en `/content` (no en un CMS): fácil de editar a mano.
- Despliegue en **Vercel**.

---

## 3. Estructura del proyecto

```
/app
  layout.tsx            # fuentes, metadata, botón flotante de WhatsApp, analytics
  page.tsx              # Inicio
  metodo/page.tsx
  planes/page.tsx
  resultados/page.tsx
  sobre-alejo/page.tsx
  preguntas/page.tsx
  sitemap.ts
  robots.ts
  opengraph-image.tsx
/components
  brand/   Logo.tsx, Bolt.tsx (rayo SVG animable)
  ui/      CTAButton.tsx, Section.tsx, Diagonal.tsx, Marquee.tsx, Counter.tsx
  sections/ Hero.tsx, Manifesto.tsx, RetoSelector.tsx, Metodo.tsx, PlanesPreview.tsx,
            PlanesSelector.tsx, Testimonios.tsx, WhatsAppBubble.tsx, SobreAlejo.tsx,
            FAQ.tsx, CierreCTA.tsx, Cobertura.tsx
/content
  site.ts          # whatsapp, frases, manifiesto, datos de Alejo
  planes.ts        # planes presencial/virtual, pareja, consulta, referidos, recargos
  testimonios.ts   # lista editable de testimonios
  faq.ts
  retos.ts
/lib
  whatsapp.ts      # buildWhatsAppLink(mensaje, origen)
  analytics.ts
/public/brand
  logo-soyfuerte-rojo.svg   # el archivo entregado
```

---

## 4. Tokens de diseño

```css
:root {
  /* Paleta de marca: 5 colores */
  --sf-black: #0E0E0E;     /* fondo dominante */
  --sf-red: #E02F34;       /* marca, CTA, protagonista */
  --sf-red-deep: #8E1B1F;  /* profundidad, degradados, estados presionados */
  --sf-orange: #FF6A13;    /* acentos pequeños: destellos, brillos, hover */
  --sf-white: #FFFFFF;     /* títulos, textos, íconos */

  /* Derivados (no son colores nuevos) */
  --sf-surface: color-mix(in srgb, var(--sf-white) 6%, var(--sf-black));  /* tarjetas */
  --sf-text: color-mix(in srgb, var(--sf-white) 85%, transparent);        /* texto largo */
  --sf-energy: linear-gradient(120deg, var(--sf-red-deep), var(--sf-red) 55%, var(--sf-orange));

  --sf-angle: -8deg;       /* inclinación del logo para diagonales */
}
```

- El sitio es **oscuro siempre** (no hay modo claro). Fondos `--sf-black`, tarjetas `--sf-surface`.
- Rojo solo para CTA, palabras clave y el rayo. Una sola acción roja dominante por pantalla.
- Naranja solo en dosis pequeñas (destellos del rayo, brillos, hover, subrayados); nunca como fondo grande ni compitiendo con un CTA rojo.
- Degradado de energía `--sf-energy` (rojo profundo → rojo → naranja) para el brillo del rayo y momentos de máxima intensidad. Nunca gris como color de marca.
- Títulos: Saira en MAYÚSCULAS, cursiva, pesos 600–700 (nunca 900), condensada con `font-variation-settings: "wdth" N`. Escala: display-xl 104px wdth 75 (solo hero), display-l 72px wdth 75, h1 56px wdth 80, h2 40px wdth 85, h3 26px recta wdth 87,5; en móvil con `clamp()` según las notas del design system. Rótulos con mucho espaciado: Saira 16px/600, tracking 0.3em.
- **Tipografía en movimiento** (clave del sitio): animar los ejes de Saira. Títulos que entran estirándose (wdth 62 → 75, wght 600 → 700), botones que se ensanchan al pasar el cursor (wdth 100 → 110), palabras del manifiesto que se comprimen o expanden con el scroll, y el marquee con ancho variable según la velocidad del scroll. Animar `font-variation-settings` solo en títulos y botones; respetar `prefers-reduced-motion`.
- Espaciado en escala de 4px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). Radios: 4px botones, 12px tarjetas, 16px burbujas, pill solo botón flotante e interruptor.
- Texto: eyebrow en Saira 14px/600 MAYÚSCULAS (tracking 0.16em), botones en Saira 16px/700 MAYÚSCULAS, precios en Saira cursiva 42px/700 con cifras tabulares; lead 20px, body 17px y small 14px en Inter. Color `--sf-text`.
- Contraste mínimo WCAG AA en todo texto.
- Textura: capa de grano muy sutil (SVG noise, opacidad ≤ 0.06) sobre secciones oscuras.

---

## 5. Lineamientos de movimiento (clave del proyecto)

El sitio debe sentirse vivo. Ideas obligatorias:

1. **Rayo que se dibuja:** en el hero, el rayo del logo se traza con animación de `stroke-dashoffset` y luego "se enciende" (relleno rojo + destello naranja breve con `--sf-energy`).
2. **Tipografía cinética:** "CRÉETELO. ENTRÉNALO. VÍVELO." entra palabra por palabra con golpe seco (escala 1.15 → 1, opacidad, ligero desenfoque de movimiento), como golpes de batería.
3. **Diagonales:** las secciones se cortan con la inclinación del logo; al hacer scroll las diagonales se desplazan levemente (parallax).
4. **Marquee:** franja infinita con frases de apoyo y el rayo como separador, velocidad que reacciona al scroll.
5. **Reveals al scroll:** contenidos que entran desde abajo con stagger; nunca más de 400 ms por elemento.
6. **Método pegajoso (sticky):** las 3 etapas en una sección fija mientras se hace scroll; un rayo vertical se va llenando como barra de progreso.
7. **Contadores:** "+9 años" y "+200 personas" cuentan hacia arriba al entrar en pantalla.
8. **Selector de planes:** interruptor Presencial / Virtual con animación de layout; los precios cambian con transición de números (rueda de dígitos).
9. **Testimonios WhatsApp:** burbujas que aparecen una a una, precedidas por el indicador "escribiendo…" (tres puntos), con doble check azul que se activa.
10. **Botones magnéticos** (solo escritorio) y brillo rojo que sigue al cursor sobre tarjetas de planes.
11. **View Transitions** entre páginas: el logo y los títulos se conservan (shared element) y el contenido entra con un barrido diagonal.

Reglas:
- Respetar `prefers-reduced-motion`: sin parallax, sin marquee, reveals solo con opacidad.
- Animar solo `transform` y `opacity`. Nada que provoque reflow en scroll.
- Nada de animación bloquea la lectura ni el CTA.
- En móvil, reducir la intensidad (sin cursor, menos parallax).

---

## 6. Páginas y secciones

### Inicio `/`
1. **Hero**
   - Título: CRÉETELO. ENTRÉNALO. VÍVELO.
   - Subtítulo: "Entrenamiento personal en Medellín, presencial y virtual. Con Alejo, más de 9 años sacando la fuerza de más de 200 personas."
   - CTA principal: "Escríbele a Alejo" → WhatsApp (mensaje: consulta valorativa).
   - CTA secundario: "Ver planes".
   - Video de presentación (60–90 s, producido aparte): se reproduce al hacer clic; mientras tanto, póster con Alejo y el rayo animado. Reservar el espacio (sin saltos de layout).
2. **Marquee** de frases de apoyo.
3. **Manifiesto** (texto en `SOYFUERTE_MARCA.md`), línea por línea al hacer scroll; la última línea "Soy fuerte. Y tú también." en rojo.
4. **¿Cuál es tu reto?** Selector de 4 opciones (volver a empezar, poco tiempo, un cambio visible, no me creo capaz). Al elegir, aparece el mensaje del perfil correspondiente y un CTA con mensaje de WhatsApp personalizado.
5. **Método** en 3 pasos (sticky, ver §5).
6. **Planes resumidos** con interruptor Presencial / Virtual y enlace a `/planes`.
7. **Testimonios** (carrusel de 4–6 burbujas).
8. **Quién es Alejo**: foto, contadores, 3 líneas, enlace a `/sobre-alejo`.
9. **Cierre**: "EL PRIMER PASO ES CREÉRTELO." + CTA.

### El método `/metodo`
Las 3 etapas en detalle (Créetelo, Entrénalo, Vívelo), qué incluye cada plan (rutinas + WhatsApp) y qué no (sin nutrición, sin preparación para competencias). CTA: "Empieza por la consulta".

### Planes `/planes`
- Interruptor Presencial / Virtual.
- 3 tarjetas: Base, Constancia (destacada como "la más elegida"), Fuerza. Mostrar: días por semana, "4 a 5 / 8 a 10 / 12 a 15 sesiones al mes", precio mensual, qué incluye, botón "Quiero este plan" con mensaje de WhatsApp del plan y modalidad.
- Bloque **Consulta valorativa**: virtual, $60.000, abonable si tomas plan en 7 días.
- Bloque **Entrena en pareja**: 40% c/u, solo presencial y mismo horario; tabla de precios por persona.
- Bloque **Referidos**: bono de $50.000.
- Bloque **Cobertura**: mapa estilizado o lista del Valle de Aburrá con zonas y recargos.
- Bloque **Dónde entrenamos**: parques o domicilio; gimnasio, consultar.
- **Reglas del servicio** en lenguaje claro.
- Todos los precios salen de `/content/planes.ts`. Formato: `$650.000 / mes`.

### Resultados `/resultados`
Todas las burbujas de WhatsApp. Diseño tipo chat en modo oscuro: nombre, barrio, hora, doble check azul, inicial en círculo.
Los testimonios viven en `testimonios.ts` (nombre, zona, hora, mensaje) para poder editarlos, cambiarlos o agregar nuevos sin tocar componentes. Usar los de `SOYFUERTE_MARCA.md` como contenido inicial.

### Sobre Alejo `/sobre-alejo`
Historia corta, contadores (+9 años, +200 personas), su disciplina, fotos en alto contraste. Nunca decir "profesional" ni "licenciado". Mencionar que atiende en español e inglés.

### Preguntas frecuentes `/preguntas`
Acordeón accesible con:
- **¿Sirve si nunca he entrenado?** Sí. La consulta valorativa existe para eso: Alejo parte de donde estás.
- **¿Dónde son las sesiones?** En parques o en tu casa. Si prefieres un gimnasio, la tarifa puede variar: pregúntale a Alejo.
- **¿Funciona lo virtual?** Sí: sesiones en vivo por videollamada, con el mismo seguimiento por WhatsApp y rutinas.
- **¿Cuántas sesiones tiene el mes?** Depende del mes: 4 o 5 por cada día de la semana elegido.
- **¿Qué pasa si cancelo?** Si avisas con al menos 24 horas, la sesión se repone dentro del mismo mes.
- **¿Y los festivos?** Se reponen.
- **¿Incluye plan de alimentación?** No. SoyFuerte se enfoca en el entrenamiento; para nutrición te recomendamos un nutricionista.
- **¿Cubren mi municipio?** Medellín, Envigado, Itagüí, Sabaneta, Bello y La Estrella sin costo adicional; otros municipios con recargo de movilización.
- **¿Cómo pago?** Mensualidad anticipada. *(Medios de pago: pendiente de definir.)*
Generar JSON-LD `FAQPage`.

### Global
- **Botón flotante de WhatsApp** en todas las páginas (abajo a la derecha, rayo + ícono), con pulso sutil cada pocos segundos.
- **Header**: logo, navegación, CTA "Escríbele a Alejo". Se compacta al hacer scroll.
- **Footer**: logo, frase de marca, cobertura, redes (placeholders), WhatsApp.

---

## 7. WhatsApp

```ts
// /lib/whatsapp.ts
export function buildWhatsAppLink(message: string, origin: string) {
  // registrar evento analytics: whatsapp_click { origin }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
```

- `WHATSAPP_NUMBER` en variable de entorno (`NEXT_PUBLIC_WHATSAPP_NUMBER=573102112040`, es decir +57 310 211 2040).
- Mensajes prellenados por origen, por ejemplo:
  - Hero: "Hola Alejo, vengo de la web y quiero agendar mi consulta valorativa 💪"
  - Plan: "Hola Alejo, me interesa el plan {Plan} {modalidad} ({precio}/mes)."
  - Pareja: "Hola Alejo, queremos entrenar en pareja en el mismo horario."
  - Reto: "Hola Alejo, mi reto es: {reto}. ¿Cómo empiezo?"

---

## 8. SEO, rendimiento y accesibilidad

**SEO local**
- Metadata por página en español; `lang="es-CO"`.
- Palabras clave: entrenador personal Medellín, entrenador personal El Poblado / Laureles / Envigado, entrenamiento personalizado a domicilio Medellín, entrenador personal virtual.
- JSON-LD `LocalBusiness` (o `SportsActivityLocation`) con área de servicio del Valle de Aburrá; `Person` para Alejo; `FAQPage`.
- `sitemap.ts`, `robots.ts`, imagen Open Graph generada con el logo sobre negro.

**Rendimiento (metas)**
- LCP < 2.5 s en móvil, CLS < 0.1, INP < 200 ms.
- Video nunca en el LCP: póster optimizado con `next/image` y `priority`.
- Componentes de animación con carga diferida cuando estén bajo el pliegue.

**Accesibilidad**
- Navegación por teclado completa, foco visible en rojo.
- `prefers-reduced-motion` respetado (ver §5).
- Textos alternativos en todas las imágenes; el rayo decorativo con `aria-hidden`.

---

## 9. Contenido pendiente (usar placeholders claramente marcados)

- Fotos de Alejo con clientes → placeholders oscuros con el rayo, en las proporciones finales.
- Video de presentación → póster placeholder.
- Testimonios → los de `SOYFUERTE_MARCA.md` como contenido inicial; el equipo decide si se mantienen o se actualizan.
- Redes sociales y medios de pago → variables a confirmar.

---

## 10. Criterios de aceptación

- [ ] Todos los precios y textos coinciden con `SOYFUERTE_MARCA.md` y viven en `/content`.
- [ ] Cada CTA abre WhatsApp con un mensaje distinto según su origen y registra el evento.
- [ ] Ninguna mención a plan nutricional, competencias, sesiones sueltas ni título profesional.
- [ ] Las 11 ideas de movimiento de §5 implementadas, con versión reducida para `prefers-reduced-motion`.
- [ ] Lighthouse móvil ≥ 90 en Performance, Accessibility, Best Practices y SEO.
- [ ] Revisado con el skill `web-design-guidelines`.
- [ ] Desplegado en Vercel con el skill `deploy-to-vercel`.
