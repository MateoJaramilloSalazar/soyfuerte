/**
 * Datos generales de SoyFuerte.
 * Fuente: SOYFUERTE_MARCA.md. Editar aquí, no en los componentes.
 */

export const site = {
  name: "SoyFuerte",
  descriptor: "Personal Training",
  tagline: "Créetelo. Entrénalo. Vívelo.",
  taglineWords: ["Créetelo.", "Entrénalo.", "Vívelo."],
  city: "Medellín",
  locale: "es-CO",
  description:
    "Entrenamiento personal en Medellín, presencial y virtual. Con Alejo, más de 9 años sacando la fuerza de más de 200 personas.",
  closing: "El primer paso es creértelo.",
} as const;

/** Frases de apoyo: marquee, secciones, piezas. */
export const supportPhrases = [
  "La fuerza empieza por dentro.",
  "Antes de levantar una pesa, levántate tú.",
  "Tu cuerpo llega a donde tu mente decide ir.",
] as const;

/** Manifiesto: una línea por elemento. La última va en rojo. */
export const manifesto = [
  "Nadie te va a regalar la fuerza. Ya la tienes.",
  "Está debajo del cansancio, de las excusas, del “yo no soy capaz”.",
  "Aquí no venimos a gritarte. Venimos a demostrarte, sesión a sesión, que sí puedes.",
  "Primero te lo crees. Después lo entrenas. Al final lo vives.",
  "Soy fuerte. Y tú también.",
] as const;

/**
 * Alejo. Nunca decir "profesional", "licenciado" ni "graduado".
 */
export const alejo = {
  name: "Alejandro “Alejo” Jaramillo",
  shortName: "Alejo",
  role: "Preparador físico y entrenador personal",
  years: 9,
  people: 200,
  education: "Estudios en Actividad Física y Deporte (Universidad Católica Luis Amigó)",
  languages: ["Español", "Inglés"],
  traits: ["Disciplina", "Liderazgo", "Trato directo y transparente"],
} as const;

/** Las 3 etapas del método (usan la frase de marca). */
export const metodo = [
  {
    id: "creetelo",
    step: "Créetelo",
    title: "Consulta valorativa",
    note: "Siempre virtual",
    body: "Alejo conoce tu objetivo, tu historial de lesiones, tus hábitos y tu punto de partida. En la misma consulta te da sus recomendaciones y define contigo la frecuencia y la modalidad de tu plan.",
  },
  {
    id: "entrenalo",
    step: "Entrénalo",
    title: "Sesiones",
    note: "Presencial o virtual",
    body: "Días y horas fijos cada semana. Cada sesión tiene un objetivo concreto que sabes que lograste.",
  },
  {
    id: "vivelo",
    step: "Vívelo",
    title: "Entre sesiones",
    note: "Rutinas + WhatsApp",
    body: "Rutinas para los días que entrenas solo y seguimiento por WhatsApp, para que el hábito se quede en tu vida diaria.",
  },
] as const;

/**
 * Lo que los planes NO incluyen (/metodo). Se presenta como exclusión, nunca como servicio.
 * Lo que sí incluyen está en content/planes.ts → sessionInfo.includes.
 */
export const noIncluye = [
  "Plan de alimentación: para nutrición te recomendamos un nutricionista.",
  "Preparación para competencias de un deporte específico.",
] as const;

/**
 * Redes sociales. Por ahora solo Instagram y sin enlace.
 * Cuando exista la cuenta, poner la URL en `href` y el ícono pasa a ser un enlace.
 */
export const social: { id: "instagram"; label: string; href: string | null }[] = [
  { id: "instagram", label: "Instagram", href: null },
];

export const nav = [
  { href: "/metodo", label: "El método" },
  { href: "/planes", label: "Planes" },
  { href: "/resultados", label: "Resultados" },
  { href: "/sobre-alejo", label: "Sobre Alejo" },
  { href: "/preguntas", label: "Preguntas" },
] as const;
