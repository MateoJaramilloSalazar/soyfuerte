import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlanesSelector } from "@/components/sections/PlanesSelector";
import { consulta } from "@/content/planes";
import { formatCOP } from "@/lib/format";

/** Inicio: planes resumidos con interruptor Presencial / Virtual y enlace a /planes. */
export function PlanesPreview() {
  return (
    <Section aria-labelledby="planes-title">
      <SectionHeading
        id="planes-title"
        eyebrow="Planes"
        title="Días fijos. Precio claro."
        lead="Cobro mensual y sesiones de 60 minutos. Todos incluyen rutinas para tus días autónomos y seguimiento por WhatsApp."
      />
      <div className="mt-10">
        <PlanesSelector origin="home" />
      </div>
      <p className="type-small mt-8 text-sf-muted">
        ¿Primera vez? Empieza por la consulta valorativa virtual ({formatCOP(consulta.price)}), abonable a tu
        primera mensualidad.{" "}
        <Link href="/planes" className="text-sf-white underline decoration-sf-red underline-offset-4">
          Ver todos los detalles
        </Link>
      </p>
    </Section>
  );
}
