import type { Metadata } from "next";
import { Languages } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Counter } from "@/components/ui/Counter";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { CierreCTA } from "@/components/sections/CierreCTA";
import { alejo, valores } from "@/content/site";
import { jsonLdScript, personLd } from "@/lib/jsonld";
import { refImage } from "@/lib/referencias";

export const metadata: Metadata = {
  title: "Sobre Alejo",
  description: `${alejo.role} en Medellín. Más de ${alejo.years} años de experiencia y más de ${alejo.people} personas acompañadas. Atiende en español e inglés.`,
  alternates: { canonical: "/sobre-alejo" },
};

export default function SobreAlejoPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(personLd())} />
      <PageIntro eyebrow={alejo.role} title="Alejo Jaramillo" lead="Intenso por dentro, noble por fuera." />

      <Section aria-label="Historia" className="pt-0!">
        <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:items-start">
          {/* PLACEHOLDER: retrato en alto contraste, luz lateral roja. */}
          <MediaPlaceholder label="Retrato de Alejo" ratio="4/5" className="md:sticky md:top-28" refSrc={refImage("alejo")} />
          <div>
            <div className="flex flex-wrap gap-10">
              <Counter value={alejo.years} label="Años entrenando" />
              <Counter value={alejo.people} label="Personas acompañadas" />
            </div>
            <div className="mt-10 flex flex-col gap-5">
              {alejo.story.map((p) => (
                <p key={p} className="type-lead text-pretty">
                  {p}
                </p>
              ))}
            </div>
            <p className="type-eyebrow mt-10 flex items-center gap-2 text-sf-white">
              <Languages aria-hidden="true" className="size-5 text-sf-red" />
              {alejo.languageNote}
            </p>
          </div>
        </div>
      </Section>

      <Section aria-labelledby="valores-title">
        <SectionHeading id="valores-title" eyebrow="Lo que lo mueve" title="Sus valores" />
        <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {valores.map((v) => (
            <li key={v.name} className="rounded-md border border-sf-line bg-sf-surface p-6">
              <h3 className="type-h3 text-sf-white">{v.name}</h3>
              <p className="type-small mt-3">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      {/* PLACEHOLDER: fotos de Alejo con clientes, en alto contraste. */}
      <Section aria-label="Fotos">
        <div className="grid gap-4 sm:grid-cols-3">
          <MediaPlaceholder label="Entrenando con clientes" ratio="4/5" refSrc={refImage("conClientes")} sizes="(min-width: 640px) 33vw, 100vw" />
          <MediaPlaceholder label="Sesión a domicilio" ratio="4/5" refSrc={refImage("domicilio")} sizes="(min-width: 640px) 33vw, 100vw" />
          <MediaPlaceholder label="Sesión virtual" ratio="4/5" refSrc={refImage("virtual")} sizes="(min-width: 640px) 33vw, 100vw" />
        </div>
      </Section>

      <CierreCTA origin="alejo-cierre" />
    </>
  );
}
