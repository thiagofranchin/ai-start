'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { usePathname } from 'next/navigation';

interface SearchContextType {
  /** Filtro da página atual (zera ao navegar) */
  query: string;
  setQuery: (q: string) => void;
  paletteOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
}

const SearchContext = createContext<SearchContextType>({
  query: '',
  setQuery: () => {},
  paletteOpen: false,
  openPalette: () => {},
  closePalette: () => {},
});

export function useSearch() {
  return useContext(SearchContext);
}

export function SearchProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  // A query pertence à rota em que foi digitada: ao navegar, volta a ser vazia (sem efeito)
  const [state, setState] = useState({ query: '', path: pathname });
  const [paletteOpen, setPaletteOpen] = useState(false);

  const query = state.path === pathname ? state.query : '';
  const setQuery = useCallback((q: string) => setState({ query: q, path: pathname }), [pathname]);
  const openPalette = useCallback(() => setPaletteOpen(true), []);
  const closePalette = useCallback(() => setPaletteOpen(false), []);

  const value = useMemo(
    () => ({ query, setQuery, paletteOpen, openPalette, closePalette }),
    [query, setQuery, paletteOpen, openPalette, closePalette]
  );

  return <SearchContext.Provider value={value}>{children}</SearchContext.Provider>;
}
