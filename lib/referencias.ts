/**
 * Imágenes TEMPORALES de referencia (tomadas de Pinterest), publicadas por decisión del
 * cliente hasta tener las fotos reales de Alejo. Viven en public/referencias/.
 *
 * PENDIENTE: reemplazar cada archivo por la foto definitiva (mismo nombre o nueva ruta aquí).
 * Para ocultarlas y volver a los placeholders con el rayo: NEXT_PUBLIC_SHOW_REFERENCES=0.
 */
export const SHOW_REFERENCES = process.env.NEXT_PUBLIC_SHOW_REFERENCES !== "0";

const referencias = {
  heroPoster: "/referencias/entrenador-gimnasio.jpg",
  alejo: "/referencias/carrera-humo.jpg",
  conClientes: "/referencias/entrenador-gimnasio.jpg",
  domicilio: "/referencias/kettlebell-neon.jpg",
  virtual: "/referencias/mancuernas-rojo.jpg",
  cierre: "/referencias/pasillo-rojo.jpg",
} as const;

export type ReferenciaKey = keyof typeof referencias;

/** Ruta de la imagen temporal, o null si están desactivadas. */
export function refImage(key: ReferenciaKey): string | null {
  return SHOW_REFERENCES ? referencias[key] : null;
}
