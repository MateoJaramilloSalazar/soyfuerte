import { Fragment } from "react";
import { Bolt } from "@/components/brand/Bolt";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

/**
 * Franja infinita con frases y el rayo como separador. Versión liviana (16–20px).
 * El contenido se duplica para el bucle; la copia es aria-hidden.
 * Con prefers-reduced-motion queda quieta.
 * PENDIENTE (fase de movimiento): velocidad y ancho de letra según el scroll.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-6 pr-6 md:gap-8 md:pr-8">
      {items.map((text) => (
        <Fragment key={text}>
          <li className="type-marquee whitespace-nowrap text-sf-text">{text}</li>
          <li aria-hidden="true">
            <Bolt className="h-4 w-auto text-sf-red" />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      className={["overflow-hidden border-y border-sf-line bg-sf-black py-3.5", className]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex w-max motion-safe:animate-[sf-marquee_45s_linear_infinite]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
