import type { Metadata } from "next";
import { Check, X } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTAButton } from "@/components/ui/CTAButton";
import { CierreCTA } from "@/components/sections/CierreCTA";
import { metodo, noIncluye } from "@/content/site";
import { sessionInfo } from "@/content/planes";
import { waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "El método",
  description:
    "Créetelo, Entrénalo, Vívelo: consulta valorativa, sesiones con días fijos y seguimiento por WhatsApp entre sesiones.",
  alternates: { canonical: "/metodo" },
};

export default function MetodoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Método SoyFuerte"
        title="Créetelo. Entrénalo. Vívelo."
        lead="La fuerza no empieza en el músculo, empieza en reconocerte fuerte. El entrenamiento es el lugar donde lo compruebas: cada sesión es una prueba más de que sí puedes."
      >
        <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "metodo-intro" }}>
          Empieza por la consulta
        </CTAButton>
      </PageIntro>

      {/* Las 3 etapas en detalle */}
      <Section aria-label="Etapas del método" className="pt-0!">
        <ol className="flex flex-col gap-6">
          {metodo.map((etapa, i) => (
            <li
              key={etapa.id}
              className="grid gap-6 rounded-md border border-sf-line bg-sf-surface p-6 md:grid-cols-[auto_1fr] md:gap-12 md:p-10"
            >
              <span aria-hidden="true" className="type-display-l text-sf-red tabular-nums">
                0{i + 1}
              </span>
              <div>
                <p className="type-eyebrow eyebrow-mark text-sf-white">{etapa.note}</p>
                <h2 className="type-h1 mt-2 text-sf-white">{etapa.step}</h2>
                <p className="type-h3 mt-2 text-sf-text">{etapa.title}</p>
                <p className="type-lead mt-4 max-w-prose">{etapa.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* Qué incluye / qué no */}
      <Section aria-labelledby="incluye-title">
        <SectionHeading
          id="incluye-title"
          eyebrow="Transparencia"
          title="Qué incluye cada plan"
          lead="Todos los planes incluyen lo mismo; cambia cuántos días a la semana entrenas con Alejo."
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-md border border-sf-line bg-sf-surface p-6 md:p-8">
            <h3 className="type-h3 text-sf-white">Incluye</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {[`Sesiones de ${sessionInfo.minutes} minutos con días y horas fijos`, ...sessionInfo.includes].map(
                (item) => (
                  <li key={item} className="type-body flex gap-3">
                    <Check aria-hidden="true" className="mt-1 size-5 shrink-0 text-sf-red" />
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
          <div className="rounded-md border border-sf-line p-6 md:p-8">
            <h3 className="type-h3 text-sf-white">No incluye</h3>
            <ul className="mt-6 flex flex-col gap-4">
              {noIncluye.map((item) => (
                <li key={item} className="type-body flex gap-3">
                  <X aria-hidden="true" className="mt-1 size-5 shrink-0 text-sf-muted" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <CierreCTA
        origin="metodo-cierre"
        title="Empieza por la consulta."
        lead="Es virtual y se abona a tu primera mensualidad si tomas un plan en los 7 días siguientes."
      />
    </>
  );
}
