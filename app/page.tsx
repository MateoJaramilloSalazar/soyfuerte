import { Section } from "@/components/ui/Section";
import { CTAButton } from "@/components/ui/CTAButton";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/**
 * Inicio. Base estática: las secciones (Hero animado, Marquee, Manifiesto,
 * RetoSelector, Método, PlanesPreview, Testimonios, SobreAlejo, CierreCTA)
 * se construyen en components/sections/ en la siguiente fase.
 */
export default function Home() {
  return (
    <Section size="hero">
      <h1 className="type-display-xl max-w-[12ch] text-sf-white">
        {site.taglineWords.map((word, i) => (
          <span key={word} className={i === site.taglineWords.length - 1 ? "text-sf-red" : undefined}>
            {word}{" "}
          </span>
        ))}
      </h1>
      <p className="type-lead mt-8 max-w-prose">{site.description}</p>
      <div className="mt-10 flex flex-wrap gap-4">
        <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "hero" }}>
          Escríbele a Alejo
        </CTAButton>
        <CTAButton action={{ type: "link", href: "/planes" }} variant="secondary">
          Ver planes
        </CTAButton>
      </div>
    </Section>
  );
}
