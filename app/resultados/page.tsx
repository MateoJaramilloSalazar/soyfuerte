import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { WhatsAppBubble } from "@/components/sections/WhatsAppBubble";
import { CierreCTA } from "@/components/sections/CierreCTA";
import { Logo } from "@/components/brand/Logo";
import { testimonios } from "@/content/testimonios";

export const metadata: Metadata = {
  title: "Resultados",
  description: "Lo que dicen las personas que entrenan con Alejo en Medellín y en virtual.",
  alternates: { canonical: "/resultados" },
};

export default function ResultadosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Resultados"
        title="Lo que nos escriben"
        lead="Mensajes de personas que entrenan con Alejo: cada sesión, una prueba más de que sí se puede."
      />

      <Section aria-label="Testimonios" className="pt-0!">
        {/* Ventana tipo chat en modo oscuro */}
        <div className="mx-auto max-w-2xl overflow-hidden rounded-md border border-sf-line bg-sf-surface">
          <div className="flex items-center gap-3 border-b border-sf-line px-5 py-4">
            <span className="flex size-10 items-center justify-center rounded-pill bg-sf-black">
              <Logo className="h-5 w-auto text-sf-red" title="SoyFuerte" />
            </span>
            <div>
              <p className="type-button text-sf-white">Alejo · SoyFuerte</p>
              <p className="type-small text-sf-muted">{testimonios.length} mensajes</p>
            </div>
          </div>
          <ul className="flex flex-col gap-4 px-4 py-6 md:px-6">
            {testimonios.map((t) => (
              <li key={t.id}>
                <WhatsAppBubble testimonio={t} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CierreCTA origin="resultados-cierre" title="El próximo mensaje puede ser el tuyo." />
    </>
  );
}
