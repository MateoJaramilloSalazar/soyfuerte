import { ViewTransition, type ReactNode } from "react";

/**
 * View Transition de página: al navegar, el contenido nuevo entra con un barrido diagonal
 * (sf-sweep-in) y el anterior se desvanece (sf-fade-out). CSS en app/globals.css.
 * Va en cada página (no en el layout) para que el layout persistente no lo bloquee.
 * Sin soporte del navegador, la navegación funciona igual, sin animación.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <ViewTransition enter="sf-sweep-in" exit="sf-fade-out" default="none">
      <div>{children}</div>
    </ViewTransition>
  );
}

/**
 * Título compartido entre páginas: el h1 de una página se transforma en el de la siguiente
 * (morph de posición y tamaño). Un solo "page-title" montado por página.
 */
export function SharedTitle({ children }: { children: ReactNode }) {
  return (
    <ViewTransition name="page-title" share="sf-morph" default="none">
      {children}
    </ViewTransition>
  );
}
