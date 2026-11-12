"use client";

import { useId, useState } from "react";
import { CTAButton } from "@/components/ui/CTAButton";
import { BulletList } from "@/components/ui/BulletList";
import {
  featuredLabel,
  modalidades,
  planes,
  sessionInfo,
  type Modalidad,
  type Plan,
} from "@/content/planes";
import { formatCOP } from "@/lib/format";
import { waMessages } from "@/lib/whatsapp";

type PlanesSelectorProps = {
  /** Origen para analytics: "home" o "planes". */
  origin: string;
};

/**
 * Interruptor Presencial / Virtual + 3 tarjetas de plan.
 * PENDIENTE (fase de movimiento): animación de layout del interruptor y rueda de dígitos en precios.
 */
export function PlanesSelector({ origin }: PlanesSelectorProps) {
  const [modalidad, setModalidad] = useState<Modalidad>("presencial");

  return (
    <div className="flex flex-col gap-10">
      <ModalidadSwitch value={modalidad} onChange={setModalidad} />

      <ul className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {planes.map((plan) => (
          <li key={plan.id} className="flex">
            <PlanCard plan={plan} modalidad={modalidad} origin={origin} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ModalidadSwitch({
  value,
  onChange,
}: {
  value: Modalidad;
  onChange: (m: Modalidad) => void;
}) {
  const name = useId();
  return (
    <fieldset className="flex flex-col items-start gap-3">
      <legend className="sr-only">Modalidad de entrenamiento</legend>
      <div className="inline-flex rounded-pill border border-sf-line bg-sf-surface p-1">
        {(Object.keys(modalidades) as Modalidad[]).map((m) => (
          <label key={m} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={m}
              checked={value === m}
              onChange={() => onChange(m)}
              className="peer sr-only"
            />
            <span className="type-button block rounded-pill px-5 py-3 text-sf-text transition-colors duration-150 peer-checked:bg-sf-white peer-checked:text-sf-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sf-red hover:text-sf-white peer-checked:hover:text-sf-black">
              {modalidades[m].label}
            </span>
          </label>
        ))}
      </div>
      <p className="type-small text-sf-muted" aria-live="polite">
        {modalidades[value].detail}
      </p>
    </fieldset>
  );
}

function PlanCard({ plan, modalidad, origin }: { plan: Plan; modalidad: Modalidad; origin: string }) {
  const featured = Boolean(plan.featured);
  const price = plan.price[modalidad];
  const days = plan.daysPerWeek === 1 ? "1 día a la semana" : `${plan.daysPerWeek} días a la semana`;

  return (
    <article
      className={[
        "relative flex w-full flex-col gap-5 rounded-md bg-sf-surface p-6 md:p-8",
        featured ? "border-2 border-sf-red shadow-glow-red" : "border border-sf-line",
      ].join(" ")}
    >
      {featured ? (
        <span className="type-eyebrow absolute -top-3 left-6 rounded-sm bg-sf-red px-2.5 py-1 text-[0.75rem] text-sf-white md:left-8">
          {featuredLabel}
        </span>
      ) : null}

      <div>
        <p className="type-eyebrow text-sf-orange">{days}</p>
        <h3 className="type-h3 mt-2 text-sf-white">{plan.name}</h3>
      </div>

      <p className="type-price whitespace-nowrap text-sf-white">
        {formatCOP(price)}{" "}
        <span className="type-small font-normal not-italic text-sf-muted [font-variation-settings:normal]">
          / mes
        </span>
      </p>

      <BulletList
        className="type-small text-sf-text"
        items={[
          `${plan.sessionsPerMonth} sesiones al mes (${plan.daysExample})`,
          `Sesiones de ${sessionInfo.minutes} minutos`,
          ...sessionInfo.includes,
        ]}
      />

      <CTAButton
        className="mt-auto w-full"
        variant={featured ? "primary" : "secondary"}
        action={{
          type: "contact",
          message: waMessages.plan(plan, modalidad),
          origin: `${origin}-plan`,
          meta: { plan: plan.id, modalidad },
        }}
      >
        Quiero este plan
      </CTAButton>
    </article>
  );
}
