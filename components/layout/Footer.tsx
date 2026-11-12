import Link from "next/link";
import { InstagramIcon } from "@/components/brand/InstagramIcon";
import { Logo } from "@/components/brand/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { cobertura } from "@/content/planes";
import { nav, site, social } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/** Footer global: logo, frase de marca, cobertura, redes y WhatsApp. */
export function Footer() {
  const incluida = cobertura.find((z) => z.surchargePerWeekday === 0);

  return (
    <footer className="grain border-t border-sf-line">
      <div className="mx-auto grid w-full max-w-content gap-12 px-4 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div className="flex flex-col items-start gap-6">
          <Logo className="h-16 w-auto text-sf-red" title="SoyFuerte" />
          <p className="type-h2 text-sf-white">{site.tagline}</p>
          <CTAButton action={{ type: "contact", message: waMessages.consulta, origin: "footer" }}>
            Escríbele a Alejo
          </CTAButton>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="type-eyebrow text-sf-orange">Cobertura</h2>
          <p className="type-small">
            Presencial en {incluida?.municipios.join(", ")}, sin costo adicional. Otros municipios
            con recargo de movilización.
          </p>
          <p className="type-small">Virtual desde donde estés.</p>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="type-eyebrow text-sf-orange">Explora</h2>
          <ul className="flex flex-col gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="type-small text-sf-white hover:text-sf-orange">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          {/* Redes: content/site.ts → social. Sin href = ícono sin enlace. */}
          <ul className="mt-2 flex gap-4" aria-label="Redes sociales">
            {social.map((s) => (
              <li key={s.id}>
                {s.href ? (
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center text-sf-white transition-colors duration-150 hover:text-sf-orange"
                  >
                    <InstagramIcon className="size-6" />
                  </a>
                ) : (
                  <span
                    role="img"
                    aria-label={s.label}
                    className="flex size-11 items-center justify-center text-sf-white"
                  >
                    <InstagramIcon className="size-6" />
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-sf-line">
        <p className="type-small mx-auto w-full max-w-content px-4 py-6 text-sf-muted md:px-8">
          SoyFuerte · Entrenamiento personal en Medellín
        </p>
      </div>
    </footer>
  );
}
