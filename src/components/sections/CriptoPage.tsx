'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { cripto } from '@/data';
import CryptoTicker from './CryptoTicker';
import EmptyState from '@/components/ui/EmptyState';
import FavoriteButton from '@/components/ui/FavoriteButton';
import { useFilteredItems } from './useFilteredItems';
import { itemKey } from '@/lib/registry';
import type { CriptoItem } from '@/types';
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
  'Security': styles.catSecurity,
  'RWA': styles.catRWA,
};

// As categorias também entram na busca (ex.: "bridge", "lending")
const categoryText = (item: CriptoItem) => item.categories.join(' ');

export default function CriptoPage() {
  const [currentFilter, setCurrentFilter] = useState('Todas');

  const categories = useMemo(() => ['Todas', ...new Set(cripto.flatMap((c) => c.categories))], []);

  const byCategory = useMemo(
    () => (currentFilter === 'Todas' ? cripto : cripto.filter((c) => c.categories.includes(currentFilter))),
    [currentFilter]
  );
  const filtered = useFilteredItems(byCategory, categoryText);

  const getCount = (cat: string) =>
    cat === 'Todas' ? cripto.length : cripto.filter((c) => c.categories.includes(cat)).length;

  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <h2>
          <span className={styles.prompt}>$</span> ls ./{currentFilter === 'Todas' ? 'all' : currentFilter.toLowerCase().replace(/\s+/g, '-')}
        </h2>
        <span className={styles.count} aria-live="polite">
          {filtered.length === cripto.length ? `${cripto.length} itens` : `${filtered.length} de ${byCategory.length} itens`}
        </span>
      </div>

      <div className={styles.filterBar} role="group" aria-label="Filtrar por categoria">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            className={`${styles.filterPill} ${cat === currentFilter ? styles.active : ''}`}
            aria-pressed={cat === currentFilter}
            onClick={() => setCurrentFilter(cat)}
          >
            {cat}
            <span className={styles.pillCount}>{getCount(cat)}</span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className={styles.cardGrid}>
          {filtered.map((item, i) => {
            const primaryCategory = item.categories[0];
            const borderClass = primaryCategory ? CATEGORY_COLORS[primaryCategory] : '';

            return (
              <div
                key={item.name}
                className={`${styles.termCard} ${borderClass}`}
                style={{ animationDelay: `${Math.min(i, 15) * 0.03}s` }}
              >
                <div className={styles.termCardIcon} aria-hidden="true">{item.icon}</div>
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className={styles.termTags}>
                  {item.categories.map((cat) => <span key={cat}>{cat}</span>)}
                </div>
                <Link
                  href={item.url}
                  className={styles.termCardLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Abrir ${item.name} em nova aba`}
                />
                <FavoriteButton itemKey={itemKey('cripto', item.name)} name={item.name} />
              </div>
            );
          })}
        </div>
      )}

      <CryptoTicker />
    </div>
  );
}
