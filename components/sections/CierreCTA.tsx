import Image from "next/image";
import { Bolt } from "@/components/brand/Bolt";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { refImage } from "@/lib/referencias";
import { waMessages } from "@/lib/whatsapp";

type CierreCTAProps = {
  origin?: string;
  title?: string;
  lead?: string;
};

/**
 * Cierre: "EL PRIMER PASO ES CREÉRTELO." + CTA.
 * Fondo: foto oscura (referencia en local; foto real cuando exista) o el rayo de marca de agua.
 */
export function CierreCTA({
  origin = "cierre",
  title = site.closing,
  lead = "Agenda tu consulta valorativa por WhatsApp.",
}: CierreCTAProps) {
  const bg = refImage("cierre");
  return (
    <Section size="hero" className="overflow-hidden" aria-labelledby={`${origin}-title`}>
      {bg ? (
        <>
          <Image src={bg} alt="" fill sizes="100vw" className="-z-10 object-cover object-center opacity-90" />
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-gradient-to-r from-sf-black via-sf-black/70 to-transparent"
          />
        </>
      ) : (
        <Bolt className="pointer-events-none absolute top-1/2 right-[-6%] h-[140%] w-auto -translate-y-1/2 text-sf-red opacity-10" />
      )}
      <div className="relative flex flex-col items-start gap-8">
        <h2 id={`${origin}-title`} className="type-display-l max-w-[14ch] text-sf-white">
          {title}
        </h2>
        <p className="type-lead max-w-prose">{lead}</p>
        <CTAButton action={{ type: "contact", message: waMessages.consulta, origin }}>Escríbeme</CTAButton>
      </div>
    </Section>
  );
}
