const cop = new Intl.NumberFormat("es-CO", {
  style: "currency",
  currency: "COP",
  maximumFractionDigits: 0,
});

/** 650000 → "$650.000" (sin espacio entre el símbolo y la cifra). */
export function formatCOP(value: number) {
  return cop.format(value).replace(/\s/g, "");
}

/** 650000 → "$650.000 / mes" */
export function formatMonthly(value: number) {
  return `${formatCOP(value)} / mes`;
}
