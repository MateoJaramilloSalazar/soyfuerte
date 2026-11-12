import { Bolt } from "@/components/brand/Bolt";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

type CierreCTAProps = {
  origin?: string;
  title?: string;
  lead?: string;
};

/** Cierre: "EL PRIMER PASO ES CREÉRTELO." + CTA. */
export function CierreCTA({
  origin = "cierre",
  title = site.closing,
  lead = "Escríbele a Alejo y agenda tu consulta valorativa.",
}: CierreCTAProps) {
  return (
    <Section size="hero" className="overflow-hidden" aria-labelledby={`${origin}-title`}>
      <Bolt className="pointer-events-none absolute top-1/2 right-[-6%] h-[140%] w-auto -translate-y-1/2 text-sf-red opacity-10" />
      <div className="relative flex flex-col items-start gap-8">
        <h2 id={`${origin}-title`} className="type-display-l max-w-[14ch] text-sf-white">
          {title}
        </h2>
        <p className="type-lead max-w-prose">{lead}</p>
        <CTAButton action={{ type: "contact", message: waMessages.consulta, origin }}>
          Escríbele a Alejo
        </CTAButton>
      </div>
    </Section>
  );
}
