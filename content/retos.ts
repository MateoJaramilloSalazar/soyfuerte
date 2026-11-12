/**
 * Selector "¿Cuál es tu reto?" (Inicio). Fuente: SOYFUERTE_MARCA.md §4 (perfiles).
 * `reto` se inserta en el mensaje de WhatsApp: "Hola Alejo, mi reto es: {reto}. ¿Cómo empiezo?"
 */

export type Reto = {
  id: string;
  label: string;
  /** Texto que va en el mensaje de WhatsApp. */
  reto: string;
  mensaje: string;
  detalle: string;
};

export const retos: Reto[] = [
  {
    id: "volver-a-empezar",
    label: "Volver a empezar",
    reto: "volver a empezar",
    mensaje: "No empiezas de cero, empiezas desde tu fuerza.",
    detalle: "Recupera la forma a tu ritmo, sin lesionarte y sin abandonar.",
  },
  {
    id: "poco-tiempo",
    label: "Tengo poco tiempo",
    reto: "tengo poco tiempo",
    mensaje: "Tu hora fija con alguien que no te deja fallar.",
    detalle: "Días y horas fijos cada semana, y seguimiento para que no se te caiga el hábito.",
  },
  {
    id: "cambio-visible",
    label: "Un cambio visible",
    reto: "quiero un cambio visible",
    mensaje: "El cambio que buscas empieza cuando te lo crees.",
    detalle: "Un plan claro y alguien a tu lado que te mantenga constante.",
  },
  {
    id: "no-me-creo-capaz",
    label: "No me creo capaz",
    reto: "no me creo capaz",
    mensaje: "Antes de entrenar tu cuerpo, entrenamos tu convicción.",
    detalle: "Un espacio sin juicio, con alguien que cree en ti desde la primera sesión.",
  },
];
