import type { Metadata, Viewport } from "next";
import { Barlow, Saira } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppFloat } from "@/components/ui/WhatsAppFloat";
import { ScrollDepth } from "@/components/ui/ScrollDepth";
import { site } from "@/content/site";
import { SITE_URL } from "@/lib/seo";
import "./globals.css";

/** Saira variable: ejes wght + wdth, normal y cursiva (títulos, botones, precios). */
const saira = Saira({
  subsets: ["latin"],
  axes: ["wdth"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-saira",
});

/**
 * Barlow (texto): reemplaza a Inter por decisión del cliente. Gratuita (Google Fonts, OFL).
 * No es variable: se cargan solo los pesos que usa el sitio.
 */
const barlow = Barlow({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "SoyFuerte · Entrenador personal en Medellín",
    template: "%s · SoyFuerte",
  },
  description: site.description,
  keywords: [
    "entrenador personal Medellín",
    "entrenador personal El Poblado",
    "entrenador personal Laureles",
    "entrenador personal Envigado",
    "entrenamiento personalizado a domicilio Medellín",
    "entrenador personal virtual",
  ],
  applicationName: site.name,
  openGraph: {
    type: "website",
    locale: "es_CO",
    siteName: site.name,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#0e0e0e",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-CO" className={`${saira.variable} ${barlow.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#contenido"
          className="type-button sr-only z-[60] bg-sf-red px-4 py-3 text-sf-white focus:not-sr-only focus:fixed focus:top-4 focus:left-4"
        >
          Saltar al contenido
        </a>
        <Header />
        {/* Espacio del header fijo (alto expandido: h-20 / md:h-24) */}
        <div aria-hidden="true" className="h-20 shrink-0 md:h-24" />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
        <WhatsAppFloat />
        <ScrollDepth />
        <Analytics />
      </body>
    </html>
  );
}
