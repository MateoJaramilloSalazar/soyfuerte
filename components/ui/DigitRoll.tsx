type DigitRollProps = {
  /** Texto ya formateado, p. ej. "$650.000". */
  value: string;
  className?: string;
};

const DIGITS = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

/**
 * Cifras que ruedan al cambiar (como un odómetro). Cada dígito es una columna 0–9
 * que se desplaza con transform; los demás caracteres ($ .) quedan fijos.
 * El texto real va en sr-only; la rueda es aria-hidden.
 * Con prefers-reduced-motion el cambio es instantáneo.
 */
export function DigitRoll({ value, className }: DigitRollProps) {
  const chars = value.split("");
  // Alinear desde la derecha para que unidades, decenas… conserven su columna al cambiar de longitud.
  return (
    <span className={["relative inline-flex", className].filter(Boolean).join(" ")}>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="inline-flex overflow-hidden leading-none">
        {chars.map((ch, i) => {
          const key = chars.length - i; // posición desde la derecha
          if (!/\d/.test(ch)) {
            return (
              <span key={`s${key}`} className="inline-block">
                {ch}
              </span>
            );
          }
          const d = Number(ch);
          return (
            <span key={`d${key}`} className="relative inline-block h-[1em] overflow-hidden">
              {/* Reserva el ancho del dígito (cifras tabulares) */}
              <span className="invisible">0</span>
              <span
                className="absolute inset-x-0 top-0 flex flex-col transition-transform duration-500 ease-sf motion-reduce:transition-none"
                style={{ transform: `translateY(${-d * 10}%)`, transitionDelay: `${(chars.length - i) * 25}ms` }}
              >
                {DIGITS.map((n) => (
                  <span key={n} className="block h-[1em]">
                    {n}
                  </span>
                ))}
              </span>
            </span>
          );
        })}
      </span>
    </span>
  );
}
