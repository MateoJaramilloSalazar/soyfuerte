import type { Metadata } from "next";
import { PageIntro } from "@/components/ui/PageIntro";
import { CTAButton } from "@/components/ui/CTAButton";
import { waMessages } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "El método",
  description:
    "Créetelo, Entrénalo, Vívelo: consulta valorativa, sesiones con días fijos y seguimiento por WhatsApp entre sesiones.",
  alternates: { canonical: "/metodo" },
};

export default function MetodoPage() {
  return (
    <PageIntro
      eyebrow="Método SoyFuerte"
      title="Créetelo. Entrénalo. Vívelo."
      lead="Un acompañamiento hecho para tu cuerpo, tu vida y tu punto de partida."
    >
      <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "metodo" }}>
        Empieza por la consulta
      </CTAButton>
    </PageIntro>
  );
}
