'use client';

import { useState, useEffect, useCallback } from 'react';
import { formatPrice } from '@/lib/utils';
import type { CriptoPrices } from '@/types';
import styles from './CryptoTicker.module.css';

export default function CryptoTicker() {
  const [prices, setPrices] = useState<CriptoPrices>({
    btc: null,
    eth: null,
    sol: null,
    dolar: null,
    updatedAt: null,
    error: false,
  });
  const [loading, setLoading] = useState(false);

  const fetchPrices = useCallback(async () => {
    setLoading(true);
    const results = await Promise.allSettled([fetchCryptoPrices(), fetchDolarRate()]);
    setLoading(false);

    const updatedAt = new Date().toLocaleTimeString('pt-BR');

    setPrices((prev) => {
      const next = { ...prev, updatedAt, error: false };
      if (results[0].status === 'fulfilled') {
        const crypto = results[0].value;
        if (crypto) {
          next.btc = crypto.btc;
          next.eth = crypto.eth;
          next.sol = crypto.sol;
        }
      }
      if (results[1].status === 'fulfilled') {
        next.dolar = results[1].value;
      }
      next.error = results.every((r) => r.status === 'rejected');
      return next;
    });
  }, []);

  useEffect(() => {
    fetchPrices();
  }, [fetchPrices]);

  return (
    <div className={styles.tickerSection}>
      <div className="section-header" style={{ justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="emoji" style={{ fontSize: '1rem', filter: 'saturate(.8)' }}>💹</span>
          <h3 style={{
            fontFamily: 'var(--font-jetbrains-mono), monospace',
            fontSize: '1.1rem',
            fontWeight: 600,
            letterSpacing: '.04em',
            textTransform: 'uppercase',
            color: 'var(--term-text, #d4d4d4)',
          }}>
            PREÇOS
          </h3>
        </div>
        <button
          className={`${styles.refreshBtn} ${loading ? styles.loading : ''}`}
          onClick={fetchPrices}
          disabled={loading}
        >
          {loading ? '⏳ CARREGANDO' : '🔄 ATUALIZAR'}
        </button>
      </div>
      <div className={styles.tickerGrid}>
        <div className={`${styles.tickerCard} ${styles.btcCard}`}>
          <div className={styles.tickerHeader}>
            <span className={styles.tickerIcon}>₿</span> BITCOIN
          </div>
          <div className={styles.tickerPrice}>{prices.btc !== null ? `$ ${formatPrice(prices.btc)}` : '—'}</div>
          <div className={styles.tickerLabel}>BTC / USD</div>
        </div>
        <div className={`${styles.tickerCard} ${styles.ethCard}`}>
          <div className={styles.tickerHeader}>
            <span className={styles.tickerIcon}>⟠</span> ETHEREUM
          </div>
          <div className={styles.tickerPrice}>{prices.eth !== null ? `$ ${formatPrice(prices.eth)}` : '—'}</div>
          <div className={styles.tickerLabel}>ETH / USD</div>
        </div>
        <div className={`${styles.tickerCard} ${styles.solCard}`}>
          <div className={styles.tickerHeader}>
            <span className={styles.tickerIcon}>◎</span> SOLANA
          </div>
          <div className={styles.tickerPrice}>{prices.sol !== null ? `$ ${formatPrice(prices.sol)}` : '—'}</div>
          <div className={styles.tickerLabel}>SOL / USD</div>
        </div>
        <div className={`${styles.tickerCard} ${styles.dolarCard}`}>
          <div className={styles.tickerHeader}>
            <span className={styles.tickerIcon}>💵</span> DÓLAR
          </div>
          <div className={styles.tickerPrice}>{prices.dolar !== null ? `R$ ${prices.dolar.toFixed(2)}` : '—'}</div>
          <div className={styles.tickerLabel}>USD / BRL</div>
        </div>
      </div>
      <div className={styles.tickerFooter}>
        <span className={styles.tickerUpdateTime}>
          {prices.updatedAt ? `⏱️ ${prices.updatedAt}` : '—'}
        </span>
        <span className={styles.tickerSource}>
          CoinGecko · AwesomeAPI
        </span>
      </div>
    </div>
  );
}

async function fetchCryptoPrices(): Promise<{ btc: number; eth: number; sol: number } | null> {
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd'
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return {
      btc: data.bitcoin.usd,
      eth: data.ethereum.usd,
      sol: data.solana.usd,
    };
  } catch {
    return null;
  }
}

async function fetchDolarRate(): Promise<number | null> {
  try {
    const res = await fetch('https://economia.awesomeapi.com.br/json/last/USD-BRL');
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    return parseFloat(data.USDBRL.bid);
  } catch {
    return null;
  }
}
