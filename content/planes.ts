/**
 * Planes y precios (COP, 2026). Fuente: SOYFUERTE_MARCA.md §6.
 * Todos los precios del sitio salen de aquí.
 */

export type Modalidad = "presencial" | "virtual";
export type PlanId = "base" | "constancia" | "fuerza";

export type Plan = {
  id: PlanId;
  name: string;
  daysPerWeek: number;
  daysExample: string;
  sessionsPerMonth: string;
  featured?: boolean;
  price: Record<Modalidad, number>;
};

export const planes: Plan[] = [
  {
    id: "base",
    name: "Base",
    daysPerWeek: 1,
    daysExample: "ej. martes",
    sessionsPerMonth: "4 a 5",
    price: { presencial: 380_000, virtual: 310_000 },
  },
  {
    id: "constancia",
    name: "Constancia",
    daysPerWeek: 2,
    daysExample: "ej. martes y jueves",
    sessionsPerMonth: "8 a 10",
    featured: true,
    price: { presencial: 650_000, virtual: 520_000 },
  },
  {
    id: "fuerza",
    name: "Fuerza",
    daysPerWeek: 3,
    daysExample: "ej. lunes, miércoles y viernes",
    sessionsPerMonth: "12 a 15",
    price: { presencial: 970_000, virtual: 780_000 },
  },
];

export const featuredLabel = "La más elegida";

export const modalidades: Record<Modalidad, { label: string; detail: string }> = {
  presencial: { label: "Presencial", detail: "Parques o domicilio en el Valle de Aburrá" },
  virtual: { label: "Virtual", detail: "Videollamada en vivo, desde donde estés" },
};

export const sessionInfo = {
  minutes: 60,
  billing: "Cobro mensual con días fijos a la semana.",
  monthNote:
    "Según el mes hay 4 o 5 sesiones por cada día elegido; eso se compensa a lo largo del año.",
  includes: ["Rutinas para los días de entrenamiento autónomo", "Seguimiento por WhatsApp"],
  gymNote: "En gimnasio la tarifa puede variar: consúltalo directamente con Alejo.",
} as const;

export const consulta = {
  name: "Consulta valorativa",
  modalidad: "virtual" as Modalidad,
  price: 60_000,
  creditDays: 7,
  creditNote: "Se abona a tu primera mensualidad si tomas un plan en los 7 días siguientes.",
} as const;

export const pareja = {
  discount: 0.4,
  conditions: [
    "Solo en presencial.",
    "Las dos personas coinciden 100% en días y horario.",
  ],
} as const;

/** Precio por persona en pareja = precio presencial × (1 − descuento). */
export function precioPareja(plan: Plan) {
  return Math.round(plan.price.presencial * (1 - pareja.discount));
}

export const referidos = {
  bonus: 50_000,
  body: "Por cada persona que refieras y contrate un plan, recibes un bono de $50.000 en tu siguiente mensualidad.",
  note: "Si dos personas toman planes sin coincidir en horario, no aplica el descuento de pareja, pero sí el bono de referido.",
} as const;

export type Zona = {
  id: string;
  name: string;
  municipios: string[];
  /** Recargo mensual por cada día semanal del plan. */
  surchargePerWeekday: number;
};

/** Recargos propuestos, PENDIENTES de validar. */
export const cobertura: Zona[] = [
  {
    id: "incluida",
    name: "Incluida",
    municipios: ["Medellín", "Envigado", "Itagüí", "Sabaneta", "Bello", "La Estrella"],
    surchargePerWeekday: 0,
  },
  {
    id: "zona-2",
    name: "Zona 2",
    municipios: ["Copacabana", "Girardota", "Caldas"],
    surchargePerWeekday: 70_000,
  },
  {
    id: "zona-3",
    name: "Zona 3",
    municipios: ["Barbosa", "Rionegro", "Guarne", "Llanogrande y similares"],
    surchargePerWeekday: 170_000,
  },
];

export const coberturaEjemplo =
  "Ejemplo: Constancia en Rionegro = $650.000 + 2 × $170.000 = $990.000.";

export const dondeEntrenamos = [
  { title: "Parques", body: "Al aire libre, en parques de tu zona." },
  { title: "Tu casa", body: "A domicilio, sin desplazarte." },
  { title: "Gimnasio", body: "La tarifa puede variar: pregúntale a Alejo." },
] as const;

export const reglas = [
  "La mensualidad se paga por anticipado.",
  "Si cancelas con al menos 24 horas de anticipación, la sesión se repone dentro del mismo mes.",
  "Los festivos se reponen.",
  "Las sesiones no usadas no se acumulan al mes siguiente.",
] as const;

/** Medios de pago: PENDIENTE de definir. */
export const mediosDePago: string[] | null = null;
