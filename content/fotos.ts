/**
 * Fotos de Alejo. Archivos en public/fotos/.
 * Importación estática: Next conoce ancho y alto (sin saltos de layout) y genera
 * un desenfoque de carga (blurDataURL) automáticamente.
 * Para cambiar una foto, reemplaza el archivo o la importación.
 */
import gym from "@/public/fotos/gym.png";
import portrait from "@/public/fotos/portrait.png";
import red from "@/public/fotos/red.png";
import train1 from "@/public/fotos/train-1.png";
import train2 from "@/public/fotos/train-2.png";

export const fotos = {
  /** Alejo corrigiendo la postura de una clienta en el gimnasio. Hero y fondo del cierre. */
  gym: {
    src: gym,
    alt: "Alejo acompaña a una clienta durante un ejercicio en el gimnasio",
  },
  /** Retrato sonriente, camiseta roja con el rayo. Sobre Alejo y manifiesto. */
  portrait: {
    src: portrait,
    alt: "Retrato de Alejo sonriendo, con los brazos cruzados y camiseta roja",
  },
  /** Alejo en el gimnasio con luz lateral roja. Quién es Alejo y galería. */
  red: {
    src: red,
    alt: "Alejo en el gimnasio iluminado con luz roja",
  },
  /** Alejo conversando con una clienta en la ciudad. Galería. */
  train1: {
    src: train1,
    alt: "Alejo riendo con una clienta después de entrenar al aire libre en Medellín",
  },
  /** Alejo chocando las manos con una clienta en el parque. Galería. */
  train2: {
    src: train2,
    alt: "Alejo choca las manos con una clienta durante una sesión en el parque",
  },
} as const;

export type FotoKey = keyof typeof fotos;
