import type { ReactNode } from "react";
import { Section } from "@/components/ui/Section";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  lead?: ReactNode;
  children?: ReactNode;
};

/** Cabecera de página interna: antetítulo, h1 y lead. */
export function PageIntro({ eyebrow, title, lead, children }: PageIntroProps) {
  return (
    <Section size="hero">
      <p className="type-eyebrow text-sf-orange">{eyebrow}</p>
      <h1 className="type-h1 mt-2 max-w-[18ch] text-sf-white">{title}</h1>
      {lead ? <p className="type-lead mt-6 max-w-prose">{lead}</p> : null}
      {children ? <div className="mt-8 flex flex-wrap gap-4">{children}</div> : null}
    </Section>
  );
}
