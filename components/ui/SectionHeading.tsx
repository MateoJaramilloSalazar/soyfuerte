import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  /** h1 solo en cabeceras de página; por defecto h2. */
  as?: "h1" | "h2";
  align?: "start" | "center";
  id?: string;
  className?: string;
};

/** Antetítulo (con marca roja) + título (Saira) + lead (Barlow). */
export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: Tag = "h2",
  align = "start",
  id,
  className,
}: SectionHeadingProps) {
  const center = align === "center";
  return (
    <div className={[center ? "mx-auto text-center" : "", "max-w-3xl", className].filter(Boolean).join(" ")}>
      {eyebrow ? <p className="type-eyebrow eyebrow-mark text-sf-white">{eyebrow}</p> : null}
      <Tag id={id} className={`${Tag === "h1" ? "type-h1" : "type-h2"} mt-2 text-balance text-sf-white`}>
        {title}
      </Tag>
      {lead ? (
        <p className={`type-lead mt-4 max-w-prose text-pretty ${center ? "mx-auto" : ""}`}>{lead}</p>
      ) : null}
    </div>
  );
}
