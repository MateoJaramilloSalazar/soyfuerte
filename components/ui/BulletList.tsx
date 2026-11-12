import type { ReactNode } from "react";

type BulletListProps = {
  items: readonly ReactNode[];
  className?: string;
  /** "check": viñeta roja inclinada (incluye). "cross": guion en muted (no incluye). */
  tone?: "check" | "cross";
};

/** Lista con la viñeta de la marca: un cuadro rojo inclinado con el ángulo del logo. */
export function BulletList({ items, className, tone = "check" }: BulletListProps) {
  return (
    <ul className={["flex flex-col gap-2", className].filter(Boolean).join(" ")}>
      {items.map((item, i) => (
        <li key={i} className="flex items-baseline gap-3">
          {tone === "check" ? (
            <span
              aria-hidden="true"
              className="inline-block size-2 shrink-0 -translate-y-px skew-x-[-8deg] bg-sf-red"
            />
          ) : (
            <span aria-hidden="true" className="inline-block h-0.5 w-2.5 shrink-0 -translate-y-1 bg-sf-muted" />
          )}
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
