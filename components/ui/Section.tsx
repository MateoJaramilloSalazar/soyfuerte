import type { ComponentPropsWithoutRef, ReactNode } from "react";

type SectionProps = ComponentPropsWithoutRef<"section"> & {
  /** "hero": ritmo vertical mayor (hero, manifiesto, cierre). */
  size?: "default" | "hero";
  /** Capa de grano sutil (por defecto sí, el sitio es oscuro). */
  grain?: boolean;
  children: ReactNode;
};

/**
 * Contenedor de sección: fondo negro, grano, padding vertical según el design system
 * (space-24 escritorio / space-16 móvil; space-32 para hero, manifiesto y cierre)
 * y contenido a 1200px máximo con margen lateral de 16px en móvil.
 */
export function Section({ size = "default", grain = true, className, children, ...props }: SectionProps) {
  const padY =
    size === "hero" ? "py-[var(--sf-section-y-hero)]" : "py-[var(--sf-section-y)]";
  return (
    <section
      className={[grain ? "grain" : "relative", padY, className].filter(Boolean).join(" ")}
      {...props}
    >
      <div className="mx-auto w-full max-w-content px-4 md:px-8">{children}</div>
    </section>
  );
}
