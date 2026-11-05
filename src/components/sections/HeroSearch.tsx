'use client';

import { useSearch } from '@/components/layout/SearchProvider';
import { useModKey } from '@/lib/useIsClient';

export default function HeroSearch() {
  const { openPalette } = useSearch();
  const modKey = useModKey();

  return (
    <button type="button" className="hero-search" onClick={openPalette}>
      <span aria-hidden="true">🔍</span>
      <span className="hero-search-text">Buscar ferramentas, IAs, cursos, comandos…</span>
      <kbd aria-hidden="true">{modKey} K</kbd>
    </button>
  );
}
