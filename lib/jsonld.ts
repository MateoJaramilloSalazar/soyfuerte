import { alejo, site } from "@/content/site";
import { cobertura } from "@/content/planes";
import type { FAQ } from "@/content/faq";
import { SITE_URL } from "@/lib/seo";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

/** Serializa JSON-LD escapando "<" para que no pueda cerrar el <script>. */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

const personId = `${SITE_URL}/sobre-alejo#alejo`;
const businessId = `${SITE_URL}/#negocio`;

export function personLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: "Alejandro Jaramillo",
    alternateName: "Alejo",
    jobTitle: alejo.role,
    knowsLanguage: ["es", "en"],
    worksFor: { "@id": businessId },
    url: `${SITE_URL}/sobre-alejo`,
  };
}

export function localBusinessLd() {
  const municipios = cobertura.flatMap((z) => z.municipios).filter((m) => !m.includes("similares"));
  return {
    "@context": "https://schema.org",
    "@type": "SportsActivityLocation",
    "@id": businessId,
    name: site.name,
    slogan: site.tagline,
    description: site.description,
    url: SITE_URL,
    telephone: `+${WHATSAPP_NUMBER}`,
    image: `${SITE_URL}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Medellín",
      addressRegion: "Antioquia",
      addressCountry: "CO",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Valle de Aburrá" },
      ...municipios.map((name) => ({ "@type": "City", name })),
    ],
    founder: { "@id": personId },
    priceRange: "$$",
  };
}

export function faqLd(items: FAQ[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}
