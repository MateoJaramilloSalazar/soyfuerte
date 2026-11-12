import type { Metadata } from "next";
import { Home, Trees, Dumbbell, Gift, Users, Video } from "lucide-react";
import { PageIntro } from "@/components/ui/PageIntro";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BulletList } from "@/components/ui/BulletList";
import { CTAButton } from "@/components/ui/CTAButton";
import { PlanesSelector } from "@/components/sections/PlanesSelector";
import { Cobertura } from "@/components/sections/Cobertura";
import { CierreCTA } from "@/components/sections/CierreCTA";
import {
  consulta,
  dondeEntrenamos,
  pareja,
  planes,
  precioPareja,
  referidos,
  reglas,
  sessionInfo,
} from "@/content/planes";
import { formatCOP, formatMonthly } from "@/lib/format";
import { waMessages } from "@/lib/whatsapp";
import { PageTransition } from "@/components/ui/PageTransition";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Planes y tarifas",
  description:
    "Planes de entrenamiento personal en Medellín, presencial y virtual: Base, Constancia y Fuerza. Precios claros, cobro mensual y días fijos.",
  alternates: { canonical: "/planes" },
};

const lugarIcon = { Parques: Trees, "Tu casa": Home, Gimnasio: Dumbbell } as const;

export default function PlanesPage() {
  return (
    <PageTransition>
      <PageIntro
        eyebrow="Planes"
        title="Planes y tarifas"
        lead={`${sessionInfo.billing} Sesiones de ${sessionInfo.minutes} minutos. ${sessionInfo.monthNote}`}
      />

      {/* Selector de planes */}
      <Section className="pt-0!" aria-label="Planes mensuales">
        <PlanesSelector origin="planes" />
      </Section>

      {/* Consulta valorativa */}
      <Section aria-labelledby="consulta-title">
        <Reveal className="grid gap-8 rounded-md border border-sf-line bg-sf-surface p-6 md:grid-cols-[1.4fr_1fr] md:items-center md:p-10">
          <div>
            <p className="type-eyebrow flex items-center gap-2 text-sf-white [&_svg]:text-sf-red">
              <Video aria-hidden="true" className="size-4" /> Paso 1 · Créetelo
            </p>
            <h2 id="consulta-title" className="type-h2 mt-2 text-sf-white">
              {consulta.name}
            </h2>
            <p className="type-body mt-4 max-w-prose">
              Siempre virtual. Alejo conoce tu objetivo, tu historial de lesiones, tus hábitos y tu punto de
              partida, y define contigo la frecuencia y la modalidad de tu plan. {consulta.creditNote}
            </p>
          </div>
          <div className="flex flex-col items-start gap-6 md:items-end">
            <p className="type-price text-sf-white">{formatCOP(consulta.price)}</p>
            <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "planes-consulta" }}>
              Agenda tu consulta
            </CTAButton>
          </div>
        </Reveal>
      </Section>

      {/* Pareja + referidos */}
      <Section aria-label="Pareja y referidos">
        <RevealGroup className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <RevealItem className="flex flex-col gap-6 rounded-md border border-sf-line bg-sf-surface p-6 md:p-8">
            <p className="type-eyebrow flex items-center gap-2 text-sf-white [&_svg]:text-sf-red">
              <Users aria-hidden="true" className="size-4" /> {Math.round(pareja.discount * 100)}% de descuento c/u
            </p>
            <h2 className="type-h2 text-sf-white">Entrena en pareja</h2>
            <BulletList className="type-body" items={pareja.conditions} />
            <table className="w-full text-left">
              <caption className="sr-only">Precio por persona entrenando en pareja</caption>
              <thead>
                <tr className="type-eyebrow border-b border-sf-line text-sf-muted">
                  <th scope="col" className="py-3 font-semibold">Plan</th>
                  <th scope="col" className="py-3 text-right font-semibold">Por persona</th>
                </tr>
              </thead>
              <tbody>
                {planes.map((plan) => (
                  <tr key={plan.id} className="border-b border-sf-line last:border-0">
                    <th scope="row" className="type-h3 py-4 text-sf-white">
                      {plan.name} en pareja
                    </th>
                    <td className="type-h3 py-4 text-right text-sf-white tabular-nums">
                      {formatMonthly(precioPareja(plan))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <CTAButton
              variant="secondary"
              className="self-start"
              action={{ type: "contact", message: waMessages.pareja, origin: "planes-pareja" }}
            >
              Queremos entrenar juntos
            </CTAButton>
          </RevealItem>

          <RevealItem className="flex flex-col gap-6 rounded-md border border-sf-line bg-sf-surface p-6 md:p-8">
            <p className="type-eyebrow flex items-center gap-2 text-sf-white [&_svg]:text-sf-red">
              <Gift aria-hidden="true" className="size-4" /> Referidos
            </p>
            <h2 className="type-h2 text-sf-white">Trae a alguien</h2>
            <p className="type-price text-sf-white">{formatCOP(referidos.bonus)}</p>
            <p className="type-body">{referidos.body}</p>
            <p className="type-small text-sf-muted">{referidos.note}</p>
          </RevealItem>
        </RevealGroup>
      </Section>

      {/* Dónde entrenamos + cobertura */}
      <Section aria-labelledby="donde-title">
        <SectionHeading
          id="donde-title"
          eyebrow="Presencial"
          title="Dónde entrenamos"
          lead="Presencial en el Valle de Aburrá; virtual desde donde estés."
        />
        <RevealGroup as="ul" className="mt-10 grid gap-4 sm:grid-cols-3">
          {dondeEntrenamos.map((lugar) => {
            const Icon = lugarIcon[lugar.title];
            return (
              <RevealItem as="li" key={lugar.title} className="flex gap-4 rounded-md border border-sf-line p-6">
                <Icon aria-hidden="true" className="size-6 shrink-0 text-sf-red" />
                <div>
                  <h3 className="type-h3 text-sf-white">{lugar.title}</h3>
                  <p className="type-small mt-1">{lugar.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <h3 className="type-h2 mt-16 text-sf-white">Cobertura</h3>
        <p className="type-body mt-2 mb-8 max-w-prose">
          Fuera de la zona incluida hay un recargo de movilización por cada día de la semana de tu plan.
        </p>
        <Cobertura />
      </Section>

      {/* Reglas */}
      <Section aria-labelledby="reglas-title">
        <SectionHeading id="reglas-title" eyebrow="Sin letra pequeña" title="Reglas del servicio" />
        <RevealGroup as="ol" className="mt-10 grid gap-4 md:grid-cols-2">
          {reglas.map((regla, i) => (
            <RevealItem as="li" key={regla} className="flex gap-4 rounded-md border border-sf-line p-6">
              <span className="type-h2 text-sf-red tabular-nums">{i + 1}</span>
              <p className="type-body">{regla}</p>
            </RevealItem>
          ))}
        </RevealGroup>
        <p className="type-small mt-6 text-sf-muted">{sessionInfo.gymNote}</p>
      </Section>

      <CierreCTA origin="planes-cierre" />
    </PageTransition>
  );
}
