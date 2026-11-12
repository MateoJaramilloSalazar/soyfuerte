import { Fragment } from "react";
import { Bolt } from "@/components/brand/Bolt";

type MarqueeProps = {
  items: readonly string[];
  className?: string;
};

/**
 * Franja infinita con frases y el rayo como separador.
 * El contenido se duplica para el bucle; la copia es aria-hidden.
 * Con prefers-reduced-motion queda quieta.
 * PENDIENTE (fase de movimiento): velocidad y ancho de letra según el scroll.
 */
export function Marquee({ items, className }: MarqueeProps) {
  const row = (hidden: boolean) => (
    <ul
      aria-hidden={hidden || undefined}
      className="flex shrink-0 items-center gap-8 pr-8 md:gap-12 md:pr-12"
    >
      {items.map((text) => (
        <Fragment key={text}>
          <li className="type-h2 whitespace-nowrap text-sf-white">{text}</li>
          <li aria-hidden="true">
            <Bolt className="h-8 w-auto text-sf-red md:h-10" />
          </li>
        </Fragment>
      ))}
    </ul>
  );

  return (
    <div
      className={[
        "overflow-hidden border-y border-sf-line bg-sf-black py-6 md:py-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="flex w-max motion-safe:animate-[sf-marquee_40s_linear_infinite]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
