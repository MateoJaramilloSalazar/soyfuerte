import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { nav } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/**
 * Header global: logo, navegación y CTA "Escríbele a Alejo".
 * PENDIENTE (fase de movimiento): compactarse al hacer scroll.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-sf-line bg-sf-black/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 w-full max-w-content items-center justify-between gap-6 px-4 md:h-20 md:px-8">
        <Link href="/" aria-label="SoyFuerte, inicio" className="shrink-0">
          <Logo className="h-10 w-auto text-sf-red md:h-12" title="SoyFuerte" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="type-eyebrow text-sf-white transition-colors duration-150 hover:text-sf-orange"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <CTAButton
            action={{ type: "contact", message: waMessages.consulta, origin: "header" }}
            size="sm"
            className="hidden sm:inline-flex"
          >
            Escríbeme
          </CTAButton>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
