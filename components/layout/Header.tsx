"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/brand/Logo";
import { CTAButton } from "@/components/ui/CTAButton";
import { MobileNav } from "@/components/layout/MobileNav";
import { nav } from "@/content/site";
import { waMessages } from "@/lib/whatsapp";

/**
 * Header global (fijo): logo, navegación y CTA "Escríbeme".
 * Se compacta al hacer scroll (menos alto, logo más pequeño, fondo más opaco).
 * Como es fijo, compactarse no mueve el contenido de la página.
 */
export function Header() {
  const pathname = usePathname();
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-compact={compact}
      className="group fixed inset-x-0 top-0 z-40 border-b border-transparent bg-sf-black/70 backdrop-blur-md transition-[background-color,border-color] duration-300 data-[compact=true]:border-sf-line data-[compact=true]:bg-sf-black/90"
    >
      <div className="mx-auto flex h-20 w-full max-w-content items-center justify-between gap-6 px-4 transition-[height] duration-300 ease-sf group-data-[compact=true]:h-16 md:h-24 md:px-8 md:group-data-[compact=true]:h-[4.5rem]">
        <Link href="/" aria-label="SoyFuerte, inicio" className="shrink-0">
          <Logo
            className="h-14 w-auto origin-left text-sf-red transition-transform duration-300 ease-sf group-data-[compact=true]:scale-[0.78] md:h-[4.5rem]"
            title="SoyFuerte"
          />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={pathname === item.href ? "page" : undefined}
                  className="type-eyebrow text-sf-white decoration-sf-red decoration-2 underline-offset-8 hover:underline aria-[current=page]:underline"
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
