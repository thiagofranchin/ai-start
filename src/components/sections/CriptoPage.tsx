'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { cripto } from '@/data';
import CryptoTicker from './CryptoTicker';
import SearchFilter from './SearchFilter';
import styles from './CriptoPage.module.css';

const CATEGORY_COLORS: Record<string, string> = {
  'Swap': styles.catSwap,
  'Liquidity Pools': styles.catLiquidity,
  'Analytics': styles.catAnalytics,
  'DeFi': styles.catDeFi,
  'Lending': styles.catLending,
  'Exchange': styles.catExchange,
  'Trading': styles.catTrading,
  'Bridges': styles.catBridges,
  'Payments': styles.catPayments,
};

export default function CriptoPage() {
  const [currentFilter, setCurrentFilter] = useState('Todas');

  // Constrói categorias únicas
  const categories = useMemo(() => {
    const allCats = cripto.flatMap((c) => c.categories);
    return ['Todas', ...new Set(allCats)];
  }, []);

  // Filtra items
  const filtered = useMemo(() => {
    if (currentFilter === 'Todas') return cripto;
    return cripto.filter((c) => c.categories.includes(currentFilter));
  }, [currentFilter]);

  // Conta por categoria
  const getCount = (cat: string) => {
    if (cat === 'Todas') return cripto.length;
    return cripto.filter((c) => c.categories.includes(cat)).length;
  };

  return (
    <div className={styles.container}>
      {/* Section header */}
      <div className={styles.sectionHeader}>
        <span className={styles.emoji}>🪙</span>
        <h3>Cripto & DeFi</h3>
        <span className={styles.count}>{filtered.length} itens</span>
      </div>

      {/* Filter bar */}
      <div className={styles.filterBar}>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`${styles.filterPill} ${cat === currentFilter ? styles.active : ''}`}
            onClick={() => setCurrentFilter(cat)}
          >
            {cat}
            <span className={styles.pillCount}>{getCount(cat)}</span>
          </button>
        ))}
      </div>

      {/* Cards grid */}
      <div className={styles.cardGrid}>
        {filtered.map((item, i) => {
          // Pega a primeira categoria para a cor da borda
          const primaryCategory = item.categories[0];
          const borderClass = primaryCategory ? CATEGORY_COLORS[primaryCategory] : '';

          return (
            <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
              <div
                className={`${styles.termCard} ${borderClass}`}
                style={{ animationDelay: `${i * 0.03}s` }}
              >
                <div className={styles.termCardIcon}>{item.icon}</div>
                <h4>{item.name}</h4>
                <p>{item.desc}</p>
                <Link
                  href={item.url}
                  className={styles.termCardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              </div>
            </SearchFilter>
          );
        })}
      </div>

      {/* Price ticker */}
      <CryptoTicker />
    </div>
  );
}
