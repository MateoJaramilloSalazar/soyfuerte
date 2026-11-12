import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Resultados",
  description: "Lo que dicen las personas que entrenan con Alejo en Medellín y en virtual.",
  alternates: { canonical: "/resultados" },
};

export default function ResultadosPage() {
  return (
    <PageIntro
      eyebrow="Resultados"
      title="Lo que nos escriben"
      lead="Mensajes de personas que entrenan con Alejo: cada sesión, una prueba más de que sí se puede."
    />
  );
}
