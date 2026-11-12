import { Section } from "@/components/ui/Section";
import { manifesto } from "@/content/site";

/**
 * Manifiesto, línea por línea, en Barlow Light (liviano).
 * Solo la última línea ("Soy fuerte. Y tú también.") va en Saira roja.
 * PENDIENTE (fase de movimiento): cada línea entra con el scroll.
 */
export function Manifesto() {
  const last = manifesto.length - 1;
  return (
    <Section aria-label="Manifiesto">
      <p className="type-eyebrow eyebrow-mark text-sf-white">Manifiesto</p>
      <div className="mt-8 flex max-w-3xl flex-col gap-4 md:gap-5">
        {manifesto.map((line, i) =>
          i === last ? (
            <p key={line} className="type-h1 mt-4 text-sf-red">
              {line}
            </p>
          ) : (
            <p key={line} className="type-manifesto text-pretty text-sf-white">
              {line}
            </p>
          ),
        )}
      </div>
    </Section>
  );
}
