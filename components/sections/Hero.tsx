import { Play } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { Bolt } from "@/components/brand/Bolt";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/**
 * Hero del Inicio.
 * PENDIENTE (fase de movimiento): rayo que se dibuja y se enciende; frase palabra por palabra.
 * PENDIENTE (contenido): video de presentación (60–90 s) con póster de Alejo.
 */
export function Hero() {
  return (
    <Section size="hero" className="overflow-hidden" aria-labelledby="hero-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="type-eyebrow text-sf-orange">Entrenamiento personal · Medellín</p>
          <h1 id="hero-title" className="type-display-xl mt-4 text-sf-white">
            {site.taglineWords.map((word, i) => (
              <span
                key={word}
                className={["block", i === site.taglineWords.length - 1 ? "text-sf-red" : ""].join(" ")}
              >
                {word}
              </span>
            ))}
          </h1>
          <p className="type-lead mt-8 max-w-[34rem] text-pretty">{site.description}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "hero" }}>
              Escríbele a Alejo
            </CTAButton>
            <CTAButton action={{ type: "link", href: "/planes" }} variant="secondary">
              Ver planes
            </CTAButton>
          </div>
        </div>

        {/* Espacio del video reservado en 16:9 (sin saltos de layout). */}
        <figure className="relative">
          <div
            role="img"
            aria-label="Video de presentación de Alejo (próximamente)"
            className="relative flex aspect-video items-center justify-center overflow-hidden rounded-md border border-sf-line bg-sf-surface"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(90%_90%_at_0%_100%,rgba(224,47,52,0.35),transparent_60%),radial-gradient(60%_60%_at_100%_0%,rgba(255,106,19,0.12),transparent_70%)]"
            />
            <Bolt className="absolute -right-6 -bottom-10 h-[130%] w-auto text-sf-red opacity-20" />
            <span
              aria-hidden="true"
              className="relative flex size-16 items-center justify-center rounded-pill border-2 border-sf-white/70 text-sf-white"
            >
              <Play className="ml-1 size-7" />
            </span>
          </div>
          <figcaption className="type-small mt-3 text-sf-muted">
            Conoce a Alejo · video de presentación (próximamente)
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}
