"use client";

import { motion } from "motion/react";
import { useId, useState, type PointerEvent } from "react";
import { DigitRoll } from "@/components/ui/DigitRoll";
import { RevealGroup, RevealItem } from "@/components/ui/Reveal";
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
import { canHoverFinely, EASE_SF } from "@/lib/motion";
import { waMessages } from "@/lib/whatsapp";

type PlanesSelectorProps = {
  /** Origen para analytics: "home" o "planes". */
  origin: string;
};

/**
 * Interruptor Presencial / Virtual + 3 tarjetas de plan.
 * Movimiento: el interruptor desliza su píldora (layout), los precios ruedan como odómetro
 * y en escritorio un brillo rojo sigue al cursor sobre las tarjetas.
 */
export function PlanesSelector({ origin }: PlanesSelectorProps) {
  const [modalidad, setModalidad] = useState<Modalidad>("presencial");

  return (
    <div className="flex flex-col gap-10">
      <ModalidadSwitch value={modalidad} onChange={setModalidad} />

      <RevealGroup as="ul" className="grid gap-6 md:grid-cols-3 md:items-stretch">
        {planes.map((plan) => (
          <RevealItem as="li" key={plan.id} className="flex">
            <PlanCard plan={plan} modalidad={modalidad} origin={origin} />
          </RevealItem>
        ))}
      </RevealGroup>
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
  const pillId = useId();
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
            {value === m ? (
              <motion.span
                layoutId={pillId}
                aria-hidden="true"
                className="absolute inset-0 rounded-pill bg-sf-white"
                transition={{ type: "spring", stiffness: 500, damping: 38 }}
              />
            ) : null}
            <span className="type-button relative block rounded-pill px-5 py-3 text-sf-text transition-colors duration-200 peer-checked:text-sf-black peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-sf-red hover:text-sf-white peer-checked:hover:text-sf-black">
              {modalidades[m].label}
            </span>
          </label>
        ))}
      </div>
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: EASE_SF }}
        className="type-small text-sf-muted"
        aria-live="polite"
      >
        {modalidades[value].detail}
      </motion.p>
    </fieldset>
  );
}

/** Brillo rojo que sigue al cursor (solo escritorio con mouse; actualiza variables CSS, sin re-render). */
function onGlowMove(e: PointerEvent<HTMLElement>) {
  if (e.pointerType !== "mouse" || !canHoverFinely()) return;
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty("--mx", `${e.clientX - r.left}px`);
  el.style.setProperty("--my", `${e.clientY - r.top}px`);
}

function PlanCard({ plan, modalidad, origin }: { plan: Plan; modalidad: Modalidad; origin: string }) {
  const featured = Boolean(plan.featured);
  const price = plan.price[modalidad];
  const days = plan.daysPerWeek === 1 ? "1 día a la semana" : `${plan.daysPerWeek} días a la semana`;

  return (
    <article
      onPointerMove={onGlowMove}
      className={[
        "card-glow flex w-full flex-col gap-5 rounded-md bg-sf-surface p-6 md:p-8",
        featured ? "border-2 border-sf-red shadow-glow-red" : "border border-sf-line",
      ].join(" ")}
    >
      {featured ? (
        <span className="type-eyebrow absolute -top-3 left-6 rounded-sm bg-sf-red px-2.5 py-1 text-[0.75rem] text-sf-white md:left-8">
          {featuredLabel}
        </span>
      ) : null}

      <div>
        <p className="type-eyebrow eyebrow-mark text-sf-white">{days}</p>
        <h3 className="type-h3 mt-2 text-sf-white">{plan.name}</h3>
      </div>

      <p className="type-price whitespace-nowrap text-sf-white">
        <DigitRoll value={formatCOP(price)} />{" "}
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
