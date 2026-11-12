import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Planes y tarifas",
  description:
    "Planes de entrenamiento personal en Medellín, presencial y virtual: Base, Constancia y Fuerza. Precios claros, cobro mensual y días fijos.",
  alternates: { canonical: "/planes" },
};

export default function PlanesPage() {
  return (
    <PageIntro
      eyebrow="Planes"
      title="Planes y tarifas"
      lead="Cobro mensual, días fijos a la semana y sesiones de 60 minutos. Todos incluyen rutinas para tus días autónomos y seguimiento por WhatsApp."
    />
  );
}
