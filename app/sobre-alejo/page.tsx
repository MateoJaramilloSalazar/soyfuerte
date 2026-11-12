import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { alejo } from "@/content/site";

export const metadata: Metadata = {
  title: "Sobre Alejo",
  description: `${alejo.role} en Medellín. Más de ${alejo.years} años de experiencia y más de ${alejo.people} personas acompañadas. Atiende en español e inglés.`,
  alternates: { canonical: "/sobre-alejo" },
};

export default function SobreAlejoPage() {
  return (
    <PageIntro
      eyebrow={alejo.role}
      title="Alejo Jaramillo"
      lead={`Más de ${alejo.years} años en entrenamiento personal y más de ${alejo.people} personas acompañadas. La disciplina es su sello. Atiende en español e inglés.`}
    />
  );
}
