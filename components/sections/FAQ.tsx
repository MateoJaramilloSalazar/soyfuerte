import { Plus } from "lucide-react";
import type { FAQ as FAQItem } from "@/content/faq";

type FAQProps = {
  items: FAQItem[];
};

/**
 * Acordeón accesible con <details>/<summary> nativos: teclado y lectores de pantalla
 * funcionan sin JavaScript.
 */
export function FAQ({ items }: FAQProps) {
  return (
    <div className="divide-y divide-sf-line border-y border-sf-line">
      {items.map((item) => (
        <details key={item.id} id={item.id} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <h3 className="type-h3 text-sf-white">{item.q}</h3>
            <Plus
              aria-hidden="true"
              className="size-6 shrink-0 text-sf-red transition-transform duration-200 ease-sf group-open:rotate-45 motion-reduce:transition-none"
            />
          </summary>
          <p className="type-body max-w-prose pb-6">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
