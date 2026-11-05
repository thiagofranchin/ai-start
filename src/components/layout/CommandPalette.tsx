'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { catalog, catalogByKey, pages } from '@/lib/registry';
import { matchesQuery } from '@/lib/search';
import { useFavorites } from '@/lib/favorites';
import { useModKey } from '@/lib/useIsClient';
import { useSearch } from './SearchProvider';
import styles from './CommandPalette.module.css';

interface Result {
  id: string;
  group: string;
  title: string;
  subtitle: string;
  icon: string;
  href: string;
  external: boolean;
}

const MAX_RESULTS = 40;

const pageResults: Result[] = pages.map((p) => ({
  id: p.key, group: 'Ir para', title: p.title, subtitle: p.desc, icon: p.icon, href: p.href, external: false,
}));

const toResult = (item: (typeof catalog)[number], group: string): Result => ({
  id: `${group}:${item.key}`,
  group,
  title: item.name,
  subtitle: `${item.sectionLabel} · ${item.desc}`,
  icon: item.icon,
  href: item.url,
  external: true,
});

/** Atalhos globais: Ctrl/⌘+K abre a paleta; "/" foca o filtro da página. */
export default function CommandPalette() {
  const { paletteOpen, openPalette, closePalette } = useSearch();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        if (paletteOpen) closePalette();
        else openPalette();
        return;
      }
      if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey && !paletteOpen) {
        const target = event.target as HTMLElement | null;
        if (target && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))) return;
        const filter = document.getElementById('page-filter');
        if (filter) {
          event.preventDefault();
          filter.focus();
        }
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [paletteOpen, openPalette, closePalette]);

  return paletteOpen ? <PaletteDialog onClose={closePalette} /> : null;
}

function PaletteDialog({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const modKey = useModKey();
  const { keys: favoriteKeys } = useFavorites();
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo<Result[]>(() => {
    if (!query.trim()) {
      const favorites = favoriteKeys
        .map((key) => catalogByKey.get(key))
        .filter((item): item is NonNullable<typeof item> => !!item)
        .map((item) => toResult(item, 'Favoritos'));
      return [...favorites, ...pageResults];
    }
    const pageHits = pageResults.filter((p) => matchesQuery(query, `${p.title} ${p.subtitle}`));
    const itemHits = catalog
      .filter((item) => matchesQuery(query, `${item.name} ${item.desc} ${item.sectionLabel} ${item.keywords}`))
      .map((item) => toResult(item, 'Recursos'));
    return [...pageHits, ...itemHits].slice(0, MAX_RESULTS);
  }, [query, favoriteKeys]);

  const activeIndex = Math.min(active, Math.max(results.length - 1, 0));

  // Mantém o item ativo visível ao navegar com as setas
  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>('[aria-selected="true"]')?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex, results]);

  // Trava o scroll da página e devolve o foco ao elemento anterior ao fechar
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  const choose = (result: Result | undefined) => {
    if (!result) return;
    onClose();
    if (result.external) window.open(result.href, '_blank', 'noopener,noreferrer');
    else router.push(result.href);
  };

  const onKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      onClose();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActive(results.length ? (activeIndex + 1) % results.length : 0);
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActive(results.length ? (activeIndex - 1 + results.length) % results.length : 0);
    } else if (event.key === 'Enter') {
      event.preventDefault();
      choose(results[activeIndex]);
    }
  };

  let lastGroup = '';

  return (
    <div className={styles.backdrop} onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
      <div className={styles.dialog} role="dialog" aria-modal="true" aria-label="Buscar em todo o dashboard" onKeyDown={onKeyDown}>
        <div className={styles.inputRow}>
          <span aria-hidden="true">🔍</span>
          <input
            autoFocus
            type="text"
            className={styles.input}
            placeholder="Buscar ferramentas, IAs, cursos, comandos…"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setActive(0); }}
            role="combobox"
            aria-expanded="true"
            aria-controls="palette-results"
            aria-activedescendant={results[activeIndex] ? `palette-${activeIndex}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck={false}
          />
          <kbd className={styles.kbd}>Esc</kbd>
        </div>

        <ul id="palette-results" className={styles.list} role="listbox" ref={listRef}>
          {results.length === 0 && (
            <li className={styles.empty} role="presentation">Nada encontrado para “{query}”.</li>
          )}
          {results.map((result, index) => {
            const showGroup = result.group !== lastGroup;
            lastGroup = result.group;
            return (
              <li key={result.id} role="presentation">
                {showGroup && <div className={styles.group}>{result.group}</div>}
                <div
                  id={`palette-${index}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  className={`${styles.item} ${index === activeIndex ? styles.active : ''}`}
                  onMouseMove={() => index !== activeIndex && setActive(index)}
                  onClick={() => choose(result)}
                >
                  <span className={styles.icon} aria-hidden="true">
                    {result.icon.startsWith('/') ? (
                      <Image src={result.icon} alt="" width={18} height={18} unoptimized />
                    ) : (
                      result.icon
                    )}
                  </span>
                  <span className={styles.text}>
                    <span className={styles.title}>{result.title}</span>
                    <span className={styles.subtitle}>{result.subtitle}</span>
                  </span>
                  <span className={styles.hint} aria-hidden="true">{result.external ? '↗' : '↵'}</span>
                </div>
              </li>
            );
          })}
        </ul>

        <div className={styles.footer}>
          <span><kbd>↑</kbd><kbd>↓</kbd> navegar</span>
          <span><kbd>↵</kbd> abrir</span>
          <span><kbd>{modKey}</kbd><kbd>K</kbd> fechar</span>
        </div>
      </div>
    </div>
  );
}
