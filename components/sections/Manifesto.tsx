import { DiagonalBand } from "@/components/ui/Diagonal";
import { ManifestoLine } from "@/components/sections/ManifestoLine";
import { ManifestoPortrait } from "@/components/sections/ManifestoPortrait";
import { manifesto } from "@/content/site";

/**
 * Manifiesto en una franja diagonal, con el retrato de Alejo al lado.
 * Cada línea se enciende con el scroll (Barlow Light); la última ("Soy fuerte. Y tú también.")
 * va en Saira roja y se expande. El retrato entra con un barrido diagonal y parallax.
 */
export function Manifesto() {
  const last = manifesto.length - 1;
  return (
    <DiagonalBand aria-label="Manifiesto">
      <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
        <div>
          <p className="type-eyebrow eyebrow-mark text-sf-white">Manifiesto</p>
          <div className="mt-8 flex max-w-2xl flex-col gap-4 md:gap-5">
            {manifesto.map((line, i) => (
              <ManifestoLine key={line} text={line} final={i === last} />
            ))}
          </div>
        </div>
        <ManifestoPortrait className="mx-auto w-full max-w-sm lg:max-w-none" />
      </div>
    </DiagonalBand>
  );
}
