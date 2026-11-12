type CounterProps = {
  value: number;
  label: string;
  prefix?: string;
  className?: string;
};

/**
 * Cifra destacada ("+9 años", "+200 personas").
 * PENDIENTE (fase de movimiento): contar hacia arriba al entrar en pantalla.
 */
export function Counter({ value, label, prefix = "+", className }: CounterProps) {
  return (
    <div className={["flex flex-col", className].filter(Boolean).join(" ")}>
      <span className="type-display-l text-sf-white tabular-nums">
        <span className="text-sf-red">{prefix}</span>
        {value}
      </span>
      <span className="type-eyebrow mt-2 text-sf-text">{label}</span>
    </div>
  );
}
