'use client';

import { useMarket } from '@/components/layout/MarketProvider';
import { FEAR_GREED_ZONES, getFearGreedZone } from '@/lib/fearGreed';
import styles from './FearGreedGauge.module.css';

// Geometria do velocímetro (semicírculo): centro (100,100), raio 80
const CX = 100;
const CY = 100;
const R = 80;
const GAP_DEG = 1.5;

/** Ponto no semicírculo: 0 → esquerda, 100 → direita (passando pelo topo). */
function pointAt(value: number, radius = R) {
  const angle = Math.PI * (1 - value / 100);
  return { x: CX + radius * Math.cos(angle), y: CY - radius * Math.sin(angle) };
}

function arcPath(from: number, to: number) {
  const gap = (GAP_DEG / 180) * 100;
  const start = pointAt(from + (from === 0 ? 0 : gap / 2));
  const end = pointAt(to - (to === 100 ? 0 : gap / 2));
  return `M ${start.x.toFixed(2)} ${start.y.toFixed(2)} A ${R} ${R} 0 0 1 ${end.x.toFixed(2)} ${end.y.toFixed(2)}`;
}

export default function FearGreedGauge() {
  const { prices } = useMarket();
  const value = prices.fearGreed;
  const zone = value === null ? null : getFearGreedZone(value);
  // Ponteiro desenhado apontando para cima; gira de -90° (0) a +90° (100)
  const rotation = (value ?? 50) * 1.8 - 90;

  return (
    <section className={styles.section} aria-labelledby="fng-title">
      <div className={styles.head}>
        <h2 id="fng-title" className={styles.title}>
          <span aria-hidden="true">🧭</span> Fear &amp; Greed
        </h2>
        <span className={styles.subtitle}>Sentimento do mercado cripto</span>
      </div>

      <div className={styles.body}>
        <svg
          className={styles.gauge}
          viewBox="0 0 200 118"
          role="img"
          aria-label={
            value === null
              ? 'Crypto Fear & Greed Index indisponível'
              : `Crypto Fear & Greed Index: ${Math.round(value)} de 100, ${zone?.label}`
          }
        >
          {FEAR_GREED_ZONES.map((z) => (
            <path
              key={z.label}
              d={arcPath(z.from, z.to)}
              stroke={z.color}
              className={`${styles.arc} ${zone && zone.label !== z.label ? styles.arcDim : ''}`}
              fill="none"
              strokeWidth="14"
            />
          ))}

          {[0, 25, 50, 75, 100].map((tick) => {
            const inner = pointAt(tick, R - 13);
            const outer = pointAt(tick, R - 19);
            const text = pointAt(tick, R - 28);
            return (
              <g key={tick} className={styles.tick}>
                <line x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} />
                <text x={text.x} y={text.y} textAnchor="middle" dominantBaseline="middle">{tick}</text>
              </g>
            );
          })}

          <g className={styles.needle} style={{ transform: `rotate(${rotation}deg)` }}>
            <polygon points={`${CX - 3.5},${CY} ${CX + 3.5},${CY} ${CX},${CY - 66}`} fill={zone?.color ?? '#8a8a9c'} />
          </g>
          <circle cx={CX} cy={CY} r="7" className={styles.hub} />
          <circle cx={CX} cy={CY} r="2.5" fill={zone?.color ?? '#8a8a9c'} />
        </svg>

        <div className={styles.readout}>
          <div className={styles.value} style={{ color: zone?.color }}>
            {value === null ? '—' : Math.round(value)}
          </div>
          <div className={styles.label} style={{ color: zone?.color }} aria-live="polite">
            {zone?.label ?? 'Indisponível'}
          </div>
          <div className={styles.scale}>
            <span>Medo extremo</span>
            <span>Ganância extrema</span>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <span>Atualizado 1x por dia</span>
        <span className={styles.source}>alternative.me</span>
      </div>
    </section>
  );
}
