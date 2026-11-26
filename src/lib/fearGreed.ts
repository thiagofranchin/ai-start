export interface FearGreedZone {
  /** Limite inferior (inclusivo) e superior da faixa, em pontos do índice */
  from: number;
  to: number;
  label: string;
  color: string;
}

/** Faixas do Crypto Fear & Greed Index (alternative.me). */
export const FEAR_GREED_ZONES: FearGreedZone[] = [
  { from: 0, to: 25, label: 'Medo extremo', color: '#ef4444' },
  { from: 25, to: 45, label: 'Medo', color: '#f97316' },
  { from: 45, to: 55, label: 'Neutro', color: '#eab308' },
  { from: 55, to: 75, label: 'Ganância', color: '#84cc16' },
  { from: 75, to: 100, label: 'Ganância extrema', color: '#22c55e' },
];

export function getFearGreedZone(value: number): FearGreedZone {
  const v = Math.min(100, Math.max(0, value));
  return FEAR_GREED_ZONES.find((z) => v < z.to) ?? FEAR_GREED_ZONES[FEAR_GREED_ZONES.length - 1];
}
