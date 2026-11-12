"use client";

import { useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { retos } from "@/content/retos";
import { waMessages } from "@/lib/whatsapp";

/**
 * "¿Cuál es tu reto?": 4 opciones; al elegir aparece el mensaje del perfil
 * y un CTA con mensaje de WhatsApp personalizado.
 */
export function RetoSelector() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = retos.find((r) => r.id === selectedId) ?? null;

  return (
    <Section aria-labelledby="reto-title">
      <SectionHeading
        id="reto-title"
        eyebrow="Empieza por aquí"
        title="¿Cuál es tu reto?"
        lead="Elige el que más se parece a ti."
      />

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-start">
        <div role="group" aria-label="Retos" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {retos.map((reto) => {
            const active = reto.id === selectedId;
            return (
              <button
                key={reto.id}
                type="button"
                aria-pressed={active}
                aria-controls="reto-respuesta"
                onClick={() => setSelectedId(reto.id)}
                className={[
                  "type-h3 flex items-center justify-between gap-4 rounded-md border px-5 py-4 text-left transition-colors duration-150",
                  active
                    ? "border-sf-red bg-sf-surface text-sf-white"
                    : "border-sf-line text-sf-text hover:border-sf-white hover:text-sf-white",
                ].join(" ")}
              >
                {reto.label}
                <span
                  aria-hidden="true"
                  className={[
                    "size-2.5 shrink-0 skew-x-[-8deg] transition-colors",
                    active ? "bg-sf-red" : "bg-sf-line",
                  ].join(" ")}
                />
              </button>
            );
          })}
        </div>

        <div
          id="reto-respuesta"
          aria-live="polite"
          className="flex min-h-[16rem] flex-col justify-center rounded-md border border-sf-line bg-sf-surface p-6 md:p-10"
        >
          {selected ? (
            <>
              <p className="type-h2 text-balance text-sf-white">“{selected.mensaje}”</p>
              <p className="type-body mt-4 max-w-prose">{selected.detalle}</p>
              <div className="mt-8">
                <CTAButton
                  action={{
                    type: "contact",
                    message: waMessages.reto(selected.reto),
                    origin: "reto",
                    meta: { reto: selected.id },
                  }}
                >
                  Cuéntaselo a Alejo
                </CTAButton>
              </div>
            </>
          ) : (
            <p className="type-lead text-sf-muted">
              Elige tu reto y te contamos cómo lo trabajamos.
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}
