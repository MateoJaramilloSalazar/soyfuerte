/**
 * Preguntas frecuentes. Fuente: SOYFUERTE_SITIO_WEB.md §6 (/preguntas).
 * También alimenta el JSON-LD FAQPage.
 */

export type FAQ = { id: string; q: string; a: string };

export const faq: FAQ[] = [
  {
    id: "nunca-he-entrenado",
    q: "¿Sirve si nunca he entrenado?",
    a: "Sí. La consulta valorativa existe para eso: Alejo parte de donde estás.",
  },
  {
    id: "donde",
    q: "¿Dónde son las sesiones?",
    a: "En parques o en tu casa. Si prefieres un gimnasio, la tarifa puede variar: pregúntale a Alejo.",
  },
  {
    id: "virtual",
    q: "¿Funciona lo virtual?",
    a: "Sí: sesiones en vivo por videollamada, con el mismo seguimiento por WhatsApp y rutinas.",
  },
  {
    id: "sesiones-mes",
    q: "¿Cuántas sesiones tiene el mes?",
    a: "Depende del mes: 4 o 5 por cada día de la semana elegido.",
  },
  {
    id: "cancelar",
    q: "¿Qué pasa si cancelo?",
    a: "Si avisas con al menos 24 horas, la sesión se repone dentro del mismo mes.",
  },
  {
    id: "festivos",
    q: "¿Y los festivos?",
    a: "Se reponen.",
  },
  {
    id: "alimentacion",
    q: "¿Incluye plan de alimentación?",
    a: "No. SoyFuerte se enfoca en el entrenamiento; para nutrición te recomendamos un nutricionista.",
  },
  {
    id: "municipio",
    q: "¿Cubren mi municipio?",
    a: "Medellín, Envigado, Itagüí, Sabaneta, Bello y La Estrella sin costo adicional; otros municipios con recargo de movilización.",
  },
  {
    id: "pago",
    // PENDIENTE: medios de pago por definir.
    q: "¿Cómo pago?",
    a: "Mensualidad anticipada.",
  },
];
