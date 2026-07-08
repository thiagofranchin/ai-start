/** Formata valor numérico para exibição de preço */
export function formatPrice(val: number): string {
  if (val >= 1000) {
    return val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  if (val >= 1) return val.toFixed(2);
  return val.toFixed(4);
}

/** Gera string de data/hora para o ticker */
export function formatUpdateTime(): string {
  return '⏱️ ' + new Date().toLocaleTimeString('pt-BR');
}

/** Gera data para o footer do sidebar */
export function formatSidebarDate(): string {
  return 'Atualizado em ' + new Date().toLocaleDateString('pt-BR');
}
