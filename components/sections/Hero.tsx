import { Play } from "lucide-react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { MediaPlaceholder } from "@/components/ui/MediaPlaceholder";
import { BoltDraw } from "@/components/brand/BoltDraw";
import { refImage } from "@/lib/referencias";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/**
 * Hero del Inicio.
 * - "CRÉETELO. ENTRÉNALO. VÍVELO." entra palabra por palabra con golpe seco (CSS: .hero-word).
 * - El rayo del logo se dibuja sobre el póster y se enciende (BoltDraw).
 * PENDIENTE (contenido): video de presentación (60–90 s); hoy el póster es una imagen temporal.
 */
export function Hero() {
  const poster = refImage("heroPoster");
  const words = site.taglineWords;
  return (
    <Section size="hero" className="overflow-hidden" aria-labelledby="hero-title">
      <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_1fr]">
        <div>
          <p className="type-eyebrow eyebrow-mark text-sf-white">Entrenamiento personal · Medellín</p>
          <h1 id="hero-title" className="type-display-xl mt-4 text-sf-white">
            {words.map((word, i) => (
              <span
                key={word}
                style={{ ["--i" as string]: i }}
                className={["hero-word", i === words.length - 1 ? "text-sf-red" : ""].join(" ")}
              >
                {word}
              </span>
            ))}
          </h1>
          <Reveal delay={0.85}>
            <p className="type-lead mt-8 max-w-[34rem] text-pretty">{site.description}</p>
            <div className="mt-10 flex flex-wrap gap-4">
              <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "hero" }}>
                Escríbeme
              </CTAButton>
              <CTAButton action={{ type: "link", href: "/planes" }} variant="secondary">
                Ver planes
              </CTAButton>
            </div>
          </Reveal>
        </div>

        {/* Espacio del video reservado en 16:9 (sin saltos de layout). */}
        <figure className="relative">
          <MediaPlaceholder
            label="Video de presentación"
            ratio="16/9"
            refSrc={poster}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
          >
            <PlayBadge />
          </MediaPlaceholder>
          {/* Rayo que se dibuja y se enciende, montado sobre el borde del póster */}
          <BoltDraw className="pointer-events-none absolute -top-10 -right-4 h-[78%] w-auto md:-right-8" delay={0.6} />
          <figcaption className="type-small mt-3 text-sf-muted">
            Conoce a Alejo · video de presentación (próximamente)
          </figcaption>
        </figure>
      </div>
    </Section>
  );
}

function PlayBadge() {
  return (
    <span
      aria-hidden="true"
      className="relative flex size-16 items-center justify-center rounded-pill border-2 border-sf-white/80 bg-sf-black/30 text-sf-white backdrop-blur-sm transition-transform duration-200 ease-sf"
    >
      <Play className="ml-1 size-7" />
    </span>
  );
}
