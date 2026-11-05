'use client';

import { usePathname } from 'next/navigation';
import { useSearch } from './SearchProvider';
import { FILTERABLE_SECTIONS, SECTION_DESCRIPTIONS, SECTION_EMOJIS, SECTION_TITLES } from '@/lib/constants';
import { codeTopics } from '@/data';
import { useModKey } from '@/lib/useIsClient';
import type { SectionId } from '@/types';
import styles from './TopBar.module.css';

export default function TopBar() {
  const pathname = usePathname();
  const { query, setQuery, openPalette } = useSearch();
  const modKey = useModKey();

  const segments = pathname.split('/').filter(Boolean);
  const sectionId = (pathname === '/' ? 'home' : segments[0]) as SectionId;
  let title = SECTION_TITLES[sectionId] ?? 'Página';
  let description = SECTION_DESCRIPTIONS[sectionId] ?? '';
  const emoji = SECTION_EMOJIS[sectionId] ?? '📄';

  if (sectionId === 'code' && segments[1]) {
    const topic = codeTopics.find((t) => t.id === segments[1]);
    if (topic) {
      title = `Code · ${topic.label}`;
      description = SECTION_DESCRIPTIONS.code;
    }
  }

  const filterable = FILTERABLE_SECTIONS.includes(sectionId);

  return (
    <header className={styles.topbar}>
      <div className={styles.titleBlock}>
        <h1>
          <span className={styles.emoji} aria-hidden="true">{emoji}</span>
          {title}
        </h1>
        {description && <p>{description}</p>}
      </div>

      <div className={styles.actions}>
        {filterable && (
          <div className={styles.searchBox}>
            <span aria-hidden="true">🔍</span>
            <input
              id="page-filter"
              type="search"
              placeholder="Filtrar nesta página…"
              aria-label={`Filtrar ${title}`}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && (setQuery(''), e.currentTarget.blur())}
              autoComplete="off"
            />
            {query ? (
              <button type="button" className={styles.clear} onClick={() => setQuery('')} aria-label="Limpar filtro">✕</button>
            ) : (
              <kbd className={styles.kbd} aria-hidden="true">/</kbd>
            )}
          </div>
        )}
        <button type="button" className={styles.paletteBtn} onClick={openPalette} aria-label="Buscar em todo o dashboard">
          <span aria-hidden="true">⌕</span>
          <span className={styles.paletteLabel}>Buscar em tudo</span>
          <kbd className={styles.kbd} aria-hidden="true">{modKey} K</kbd>
        </button>
      </div>
    </header>
  );
}
