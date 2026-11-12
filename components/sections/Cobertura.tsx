import { MapPin } from "lucide-react";
import { cobertura, coberturaEjemplo } from "@/content/planes";
import { formatCOP } from "@/lib/format";

/** Cobertura presencial por zonas, con su recargo de movilización. */
export function Cobertura() {
  return (
    <div className="flex flex-col gap-6">
      <ul className="grid gap-4 md:grid-cols-3">
        {cobertura.map((zona) => {
          const incluida = zona.surchargePerWeekday === 0;
          return (
            <li
              key={zona.id}
              className={[
                "flex flex-col gap-4 rounded-md bg-sf-surface p-6",
                incluida ? "border-2 border-sf-white/80" : "border border-sf-line",
              ].join(" ")}
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="type-h3 text-sf-white">{zona.name}</h3>
                <MapPin aria-hidden="true" className="size-5 text-sf-orange" />
              </div>
              <p className="type-body">{zona.municipios.join(", ")}</p>
              <p className="type-eyebrow mt-auto text-sf-white">
                {incluida ? "Sin recargo" : `+${formatCOP(zona.surchargePerWeekday)} / mes por cada día semanal`}
              </p>
            </li>
          );
        })}
      </ul>
      <p className="type-small text-sf-muted">{coberturaEjemplo}</p>
    </div>
  );
}
