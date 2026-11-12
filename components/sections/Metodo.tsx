import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { metodo } from "@/content/site";

type MetodoProps = {
  /** En el Inicio muestra el enlace a /metodo. */
  showLink?: boolean;
};

/**
 * Método en 3 pasos (Créetelo, Entrénalo, Vívelo).
 * PENDIENTE (fase de movimiento): sección sticky con rayo vertical como barra de progreso.
 */
export function Metodo({ showLink = true }: MetodoProps) {
  return (
    <Section aria-labelledby="metodo-title">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          id="metodo-title"
          eyebrow="Método SoyFuerte"
          title="Tres pasos. Una convicción."
          lead="Primero te lo crees. Después lo entrenas. Al final lo vives."
        />
        {showLink ? (
          <Link
            href="/metodo"
            className="type-button text-sf-white underline decoration-sf-red decoration-2 underline-offset-8"
          >
            Conoce el método
          </Link>
        ) : null}
      </div>

      <ol className="mt-12 grid gap-6 md:grid-cols-3">
        {metodo.map((etapa, i) => (
          <li
            key={etapa.id}
            className="relative flex flex-col gap-4 overflow-hidden rounded-md border border-sf-line bg-sf-surface p-6 md:p-8"
          >
            <span
              aria-hidden="true"
              className="type-display-l pointer-events-none absolute right-4 -bottom-3 text-sf-white/5"
            >
              0{i + 1}
            </span>
            <p className="type-eyebrow eyebrow-mark text-sf-white">
              Paso {i + 1} · {etapa.note}
            </p>
            <h3 className="type-h2 text-sf-white">{etapa.step}</h3>
            <p className="type-h3 text-sf-text">{etapa.title}</p>
            <p className="type-body">{etapa.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
