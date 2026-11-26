'use client';

import styles from './CategoryFilter.module.css';

export interface CategoryOption<T extends string> {
  value: T;
  label: string;
  count: number;
}

interface CategoryFilterProps<T extends string> {
  label: string;
  options: readonly CategoryOption<T>[];
  value: T;
  onChange: (value: T) => void;
}

/** Pílulas de filtro por categoria (toggle com aria-pressed). */
export default function CategoryFilter<T extends string>({ label, options, value, onChange }: CategoryFilterProps<T>) {
  return (
    <div className={styles.bar} role="group" aria-label={label}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          className={`${styles.pill} ${opt.value === value ? styles.active : ''}`}
          aria-pressed={opt.value === value}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
          <span className={styles.count}>{opt.count}</span>
        </button>
      ))}
    </div>
  );
}
