'use client';

import { formatChange, formatPrice } from '@/lib/utils';
import { useMarket } from './MarketProvider';
import styles from './MarketBar.module.css';

export default function MarketBar() {
  const { prices, loading, refresh } = useMarket();

  const items = [
    { symbol: 'BTC', icon: '₿', value: prices.btc, change: prices.btcChange, prefix: '$', tone: 'btc' },
    { symbol: 'ETH', icon: '⟠', value: prices.eth, change: prices.ethChange, prefix: '$', tone: 'eth' },
    { symbol: 'SOL', icon: '◎', value: prices.sol, change: prices.solChange, prefix: '$', tone: 'sol' },
    { symbol: 'USD', icon: '$', value: prices.dolar, change: null, prefix: 'R$', tone: 'usd' },
  ];

  return (
    <div className={styles.bar} role="region" aria-label="Cotações do mercado">
      <div className={styles.status}>
        <span className={prices.error ? styles.errorDot : styles.liveDot} aria-hidden="true" />
        <span>{prices.error ? 'OFFLINE' : 'MERCADO'}</span>
      </div>
      <div className={styles.track}>
        {items.map((item) => (
          <div className={styles.quote} key={item.symbol}>
            <span className={`${styles.coinIcon} ${styles[item.tone]}`} aria-hidden="true">{item.icon}</span>
            <span className={styles.symbol}>{item.symbol}</span>
            <strong>{item.value === null ? '—' : `${item.prefix} ${formatPrice(item.value)}`}</strong>
            {item.change !== null && (
              <span className={`${styles.change} ${item.change >= 0 ? styles.up : styles.down}`}>
                {formatChange(item.change)}
              </span>
            )}
          </div>
        ))}
      </div>
      <span className={styles.updated} aria-live="polite">{prices.updatedAt || 'sincronizando'}</span>
      <button
        type="button"
        className={`${styles.refresh} ${loading ? styles.spinning : ''}`}
        onClick={refresh}
        disabled={loading}
        aria-label="Atualizar cotações"
        title="Atualizar cotações"
      >
        ↻
      </button>
    </div>
  );
}
