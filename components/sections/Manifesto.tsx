import { DiagonalBand } from "@/components/ui/Diagonal";
import { ManifestoLine } from "@/components/sections/ManifestoLine";
import { manifesto } from "@/content/site";

/**
 * Manifiesto en una franja diagonal. Cada línea se enciende con el scroll (Barlow Light);
 * la última ("Soy fuerte. Y tú también.") va en Saira roja y se expande.
 */
export function Manifesto() {
  const last = manifesto.length - 1;
  return (
    <DiagonalBand aria-label="Manifiesto">
      <p className="type-eyebrow eyebrow-mark text-sf-white">Manifiesto</p>
      <div className="mt-8 flex max-w-3xl flex-col gap-4 md:gap-5">
        {manifesto.map((line, i) => (
          <ManifestoLine key={line} text={line} final={i === last} />
        ))}
      </div>
    </DiagonalBand>
  );
}
