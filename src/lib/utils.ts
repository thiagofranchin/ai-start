/** Formata valor numérico para exibição de preço */
export function formatPrice(val: number): string {
  if (val >= 1000) {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (val >= 1) return val.toFixed(2);
  return val.toFixed(4);
}

/** Formata variação percentual com seta: "▲ 1.23%" / "▼ 0.40%" */
export function formatChange(val: number): string {
  return `${val >= 0 ? '▲' : '▼'} ${Math.abs(val).toFixed(2)}%`;
}
