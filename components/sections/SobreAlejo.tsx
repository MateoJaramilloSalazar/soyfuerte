import Link from "next/link";
import { Counter } from "@/components/ui/Counter";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BulletList } from "@/components/ui/BulletList";
import { alejo } from "@/content/site";

/** Inicio: "Quién es Alejo" — foto, contadores, 3 líneas y enlace a /sobre-alejo. */
export function SobreAlejo() {
  return (
    <Section aria-labelledby="alejo-title">
      <div className="grid items-center gap-12 md:grid-cols-[0.9fr_1.1fr]">
        {/* PLACEHOLDER: foto de Alejo en alto contraste, luz lateral roja. */}
        <MediaPlaceholder label="Foto de Alejo" ratio="4/5" className="max-w-md" />

        <div>
          <SectionHeading id="alejo-title" eyebrow={alejo.role} title="Quién es Alejo" />
          <div className="mt-8 flex flex-wrap gap-10">
            <Counter value={alejo.years} label="Años entrenando" />
            <Counter value={alejo.people} label="Personas acompañadas" />
          </div>
          <BulletList className="type-body mt-8" items={alejo.summary} />
          <Link
            href="/sobre-alejo"
            className="type-button mt-10 inline-block text-sf-white underline decoration-sf-orange decoration-2 underline-offset-8 hover:text-sf-orange"
          >
            Conoce su historia
          </Link>
        </div>
      </div>
    </Section>
  );
}
