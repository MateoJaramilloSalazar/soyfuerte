import { Section } from "@/components/ui/Section";
import { manifesto } from "@/content/site";

/**
 * Manifiesto, línea por línea. La última ("Soy fuerte. Y tú también.") en rojo.
 * PENDIENTE (fase de movimiento): cada línea entra con el scroll y las palabras se comprimen/expanden.
 */
export function Manifesto() {
  const last = manifesto.length - 1;
  return (
    <Section size="hero" aria-label="Manifiesto">
      <p className="type-eyebrow text-sf-orange">Manifiesto</p>
      <div className="mt-8 flex max-w-4xl flex-col gap-6 md:gap-8">
        {manifesto.map((line, i) =>
          i === last ? (
            <p key={line} className="type-display-l mt-4 text-sf-red">
              {line}
            </p>
          ) : (
            <p key={line} className="type-h2 text-balance text-sf-white">
              {line}
            </p>
          ),
        )}
      </div>
    </Section>
  );
}
