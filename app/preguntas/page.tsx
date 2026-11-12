import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Dónde son las sesiones, cómo funciona lo virtual, cancelaciones, festivos, cobertura y pagos.",
  alternates: { canonical: "/preguntas" },
};

export default function PreguntasPage() {
  return (
    <PageIntro
      eyebrow="Preguntas frecuentes"
      title="Lo que más nos preguntan"
      lead="Respuestas claras, sin letra pequeña."
    />
  );
}
