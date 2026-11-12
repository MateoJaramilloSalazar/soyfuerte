import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { RetoSelector } from "@/components/sections/RetoSelector";
import { Metodo } from "@/components/sections/Metodo";
import { PlanesPreview } from "@/components/sections/PlanesPreview";
import { Testimonios } from "@/components/sections/Testimonios";
import { SobreAlejo } from "@/components/sections/SobreAlejo";
import { CierreCTA } from "@/components/sections/CierreCTA";
import { Marquee } from "@/components/ui/Marquee";
import { supportPhrases } from "@/content/site";
import { jsonLdScript, localBusinessLd } from "@/lib/jsonld";
import { PageTransition } from "@/components/ui/PageTransition";

export default function Home() {
  return (
    <PageTransition>
      <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(localBusinessLd())} />
      <Hero />
      <Marquee items={supportPhrases} />
      <Manifesto />
      <RetoSelector />
      <Metodo />
      <PlanesPreview />
      <Testimonios />
      <SobreAlejo />
      <CierreCTA />
    </PageTransition>
  );
}
