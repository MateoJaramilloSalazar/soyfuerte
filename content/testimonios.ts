/**
 * Testimonios estilo WhatsApp. Fuente inicial: SOYFUERTE_MARCA.md §8.
 * PENDIENTE: el equipo decide si se mantienen o se reemplazan por mensajes reales.
 * Para agregar uno, añade un objeto a la lista; no hay que tocar componentes.
 */

export type Testimonio = {
  id: string;
  nombre: string;
  zona: string;
  hora: string;
  mensaje: string;
  /** Mostrar en el carrusel de Inicio. */
  destacado?: boolean;
};

export const testimonios: Testimonio[] = [
  {
    id: "caro-m",
    nombre: "Caro M.",
    zona: "Laureles",
    hora: "7:42 p. m.",
    mensaje:
      "Aleeejo 🙌 hoy me medí el jean que no me entraba desde diciembre y me entró!! qué chimba. Gracias por no dejarme tirar la toalla esas primeras semanas 🔥",
    destacado: true,
  },
  {
    id: "andres-r",
    nombre: "Andrés R.",
    zona: "Envigado",
    hora: "6:15 a. m.",
    mensaje:
      "Parce le cuento que ayer subí las escalas del metro sin quedar asfixiado jajaja hace 3 meses no era capaz. Nos vemos el jueves 💪",
    destacado: true,
  },
  {
    id: "natalia-s",
    nombre: "Natalia S.",
    zona: "El Poblado",
    hora: "9:03 p. m.",
    mensaje:
      "Usted es muy directo y eso me gusta, me dice las cosas como son. Hoy hice 10 flexiones seguidas, yo que no hacía ni una. Soy fuerte o qué? 😎",
    destacado: true,
  },
  {
    id: "sebas-g",
    nombre: "Sebas G.",
    zona: "Belén",
    hora: "8:20 p. m.",
    mensaje:
      "Yo pensaba que entrenar no era pa mí, me daba pena hasta ir al gym. Con usted es otra cosa, uno se siente acompañado y sin que lo juzguen. Gracias de verdad hermano 🙏",
    destacado: true,
  },
  {
    id: "juliana-p",
    nombre: "Juliana P.",
    zona: "El Poblado",
    hora: "10:11 a. m.",
    mensaje:
      "Alejo mil gracias por la rutina pa los días que no nos vemos, la hice en el hotel en el viaje 4 de 5 días 🙈 nunca había entrenado sola, ya me la estoy creyendo",
    destacado: true,
  },
  {
    id: "daniela-mateo",
    nombre: "Daniela y Mateo",
    zona: "Sabaneta",
    hora: "6:48 a. m.",
    mensaje:
      "Ya ni peleamos por quién va a entrenar jajaja martes y jueves a las 6 con Alejo es sagrado en esta casa 😂❤️",
    destacado: true,
  },
  {
    id: "laura-v",
    nombre: "Laura V.",
    zona: "Bogotá (virtual)",
    hora: "7:30 p. m.",
    mensaje:
      "Pensé que por videollamada iba a ser más relajado y nada, igualito me exige jajaja 😅 pero salgo feliz. Gracias Alejo!",
  },
  {
    id: "felipe-o",
    nombre: "Felipe O.",
    zona: "Itagüí",
    hora: "1:05 p. m.",
    mensaje:
      "Ve Alejo, con las pausas que me dejó pa la oficina ya casi ni siento la espalda al final del día. Usted sabe lo que hace 👊",
  },
];
