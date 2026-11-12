import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { FAQ } from "@/components/sections/FAQ";
import { CierreCTA } from "@/components/sections/CierreCTA";
import { faq } from "@/content/faq";
import { faqLd, jsonLdScript } from "@/lib/jsonld";
import { PageTransition } from "@/components/ui/PageTransition";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Dónde son las sesiones, cómo funciona lo virtual, cancelaciones, festivos, cobertura y pagos.",
  alternates: { canonical: "/preguntas" },
};

export default function PreguntasPage() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(faqLd(faq))} />
      <PageIntro
        eyebrow="Preguntas frecuentes"
        title="Lo que más nos preguntan"
        lead="Respuestas claras, sin letra pequeña."
      />
      <Section aria-label="Preguntas" className="pt-0!">
        <div className="max-w-3xl">
          <FAQ items={faq} />
        </div>
      </Section>
      <CierreCTA
        origin="preguntas-cierre"
        title="¿Te quedó alguna duda?"
        lead="Pregunta por WhatsApp: te responde Alejo mismo."
      />
    </PageTransition>
  );
}
