'use client';

import { useCallback, useEffect, useState } from 'react';
import { formatPrice } from '@/lib/utils';
import type { CriptoPrices } from '@/types';
import styles from './MarketBar.module.css';

const initialPrices: CriptoPrices = { btc: null, eth: null, sol: null, dolar: null, updatedAt: null, error: false };

export default function MarketBar() {
  const [prices, setPrices] = useState(initialPrices);
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    const [crypto, dolar] = await Promise.allSettled([
      fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd', { cache: 'no-store' }).then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      }),
      fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL', { cache: 'no-store' }).then(async (response) => {
        if (!response.ok) throw new Error(String(response.status));
        return response.json();
      }),
    ]);
    setPrices((previous) => ({
      ...previous,
      btc: crypto.status === 'fulfilled' ? crypto.value.bitcoin.usd : previous.btc,
      eth: crypto.status === 'fulfilled' ? crypto.value.ethereum.usd : previous.eth,
      sol: crypto.status === 'fulfilled' ? crypto.value.solana.usd : previous.sol,
      dolar: dolar.status === 'fulfilled' ? Number.parseFloat(dolar.value.USDBRL.bid) : previous.dolar,
      updatedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      error: crypto.status === 'rejected' && dolar.status === 'rejected',
    }));
    setLoading(false);
  }, []);

  useEffect(() => { refresh(); }, [refresh]);

  const items = [
    { symbol: 'BTC', icon: '₿', value: prices.btc, prefix: '$', tone: 'btc' },
    { symbol: 'ETH', icon: '⟠', value: prices.eth, prefix: '$', tone: 'eth' },
    { symbol: 'SOL', icon: '◎', value: prices.sol, prefix: '$', tone: 'sol' },
    { symbol: 'USD', icon: '$', value: prices.dolar, prefix: 'R$', tone: 'usd' },
  ];

  return (
    <div className={styles.bar} role="region" aria-label="Cotações do mercado">
      <div className={styles.status}><span className={prices.error ? styles.errorDot : styles.liveDot} /><span>MERCADO</span></div>
      <div className={styles.track}>
        {items.map((item) => (
          <div className={styles.quote} key={item.symbol}>
            <span className={`${styles.coinIcon} ${styles[item.tone]}`}>{item.icon}</span>
            <span className={styles.symbol}>{item.symbol}</span>
            <strong>{item.value === null ? '—' : `${item.prefix} ${formatPrice(item.value)}`}</strong>
          </div>
        ))}
      </div>
      <span className={styles.updated}>{prices.updatedAt || 'sincronizando'}</span>
      <button className={`${styles.refresh} ${loading ? styles.spinning : ''}`} onClick={refresh} disabled={loading} aria-label="Atualizar cotações" title="Atualizar cotações">↻</button>
    </div>
  );
}
