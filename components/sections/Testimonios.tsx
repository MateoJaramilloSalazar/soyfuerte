import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppBubble } from "@/components/sections/WhatsAppBubble";
import { testimonios } from "@/content/testimonios";

/**
 * Inicio: carrusel de 4–6 testimonios (los marcados como `destacado`).
 * Carrusel nativo con scroll-snap: se desliza con el dedo o el trackpad y es accesible por teclado.
 * Las burbujas visibles aparecen una a una ("escribiendo…" → mensaje → doble check azul).
 */
export function Testimonios() {
  const destacados = testimonios.filter((t) => t.destacado).slice(0, 6);

  return (
    <Section aria-labelledby="testimonios-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="testimonios-title"
          eyebrow="Resultados"
          title="Lo que nos escriben"
          lead="Mensajes de personas que ya se lo creyeron."
        />
        <Link href="/resultados" className="type-button text-sf-white underline decoration-sf-red decoration-2 underline-offset-8">
          Ver todos
        </Link>
      </div>

      <ul
        tabIndex={0}
        aria-label="Testimonios"
        className="mt-10 -mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-4 [scrollbar-width:thin] md:-mx-8 md:px-8"
      >
        {destacados.map((t, i) => (
          <li key={t.id} className="w-[85%] shrink-0 snap-start sm:w-[24rem]">
            <WhatsAppBubble testimonio={t} stagger={(i % 3) * 1.1} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
