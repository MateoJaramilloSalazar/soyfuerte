import Image from "next/image";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { site } from "@/content/site";
import { fotos } from "@/content/fotos";
import { waMessages } from "@/lib/whatsapp";

type CierreCTAProps = {
  origin?: string;
  title?: string;
  lead?: string;
};

/**
 * Cierre: "EL PRIMER PASO ES CREÉRTELO." + CTA.
 * Fondo: foto "gym" de Alejo con degradado para que el texto se lea.
 */
export function CierreCTA({
  origin = "cierre",
  title = site.closing,
  lead = "Agenda tu consulta valorativa por WhatsApp.",
}: CierreCTAProps) {
  return (
    <Section size="hero" className="overflow-hidden" aria-labelledby={`${origin}-title`}>
      {/* Fondo: Alejo en el gimnasio (decorativo: el texto lleva el mensaje) */}
      <Image
        src={fotos.gym.src}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        className="-z-10 object-cover object-[70%_center]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-gradient-to-r from-sf-black via-sf-black/80 to-sf-black/20"
      />
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
