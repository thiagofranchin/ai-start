'use client';

import { formatChange, formatPrice } from '@/lib/utils';
import { useMarket } from '@/components/layout/MarketProvider';
import styles from './CryptoTicker.module.css';

export default function CryptoTicker() {
  const { prices, loading, refresh } = useMarket();

  const cards = [
    { cls: styles.btcCard, icon: '₿', name: 'BITCOIN', value: prices.btc, change: prices.btcChange, prefix: '$', pair: 'BTC / USD' },
    { cls: styles.ethCard, icon: '⟠', name: 'ETHEREUM', value: prices.eth, change: prices.ethChange, prefix: '$', pair: 'ETH / USD' },
    { cls: styles.solCard, icon: '◎', name: 'SOLANA', value: prices.sol, change: prices.solChange, prefix: '$', pair: 'SOL / USD' },
    { cls: styles.dolarCard, icon: '💵', name: 'DÓLAR', value: prices.dolar, change: null, prefix: 'R$', pair: 'USD / BRL' },
  ];

  return (
    <section className={styles.tickerSection} aria-labelledby="ticker-title">
      <div className={styles.tickerHead}>
        <h2 id="ticker-title" className={styles.tickerTitle}>
          <span aria-hidden="true">💹</span> Preços
        </h2>
        <button
          type="button"
          className={`${styles.refreshBtn} ${loading ? styles.loading : ''}`}
          onClick={refresh}
          disabled={loading}
        >
          {loading ? '⏳ Carregando' : '🔄 Atualizar'}
        </button>
      </div>
      <div className={styles.tickerGrid}>
        {cards.map((card) => (
          <div key={card.name} className={`${styles.tickerCard} ${card.cls}`}>
            <div className={styles.tickerHeader}>
              <span className={styles.tickerIcon} aria-hidden="true">{card.icon}</span> {card.name}
            </div>
            <div className={styles.tickerPrice}>
              {card.value !== null ? `${card.prefix} ${card.prefix === 'R$' ? card.value.toFixed(2) : formatPrice(card.value)}` : '—'}
            </div>
            <div className={styles.tickerMeta}>
              <span className={styles.tickerLabel}>{card.pair}</span>
              {card.change !== null && (
                <span className={`${styles.change} ${card.change >= 0 ? styles.up : styles.down}`}>
                  {formatChange(card.change)} <small>24h</small>
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.tickerFooter}>
        <span className={styles.tickerUpdateTime}>
          {prices.error ? '⚠️ Sem conexão com as fontes' : prices.updatedAt ? `⏱️ ${prices.updatedAt} · atualiza a cada 60s` : 'Sincronizando…'}
        </span>
        <span className={styles.tickerSource}>{prices.source ?? 'Binance'} · AwesomeAPI</span>
      </div>
    </section>
  );
}
