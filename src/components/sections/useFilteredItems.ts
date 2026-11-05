'use client';

import { useMemo } from 'react';
import { useSearch } from '@/components/layout/SearchProvider';
import { matchesQuery } from '@/lib/search';

/** Filtra itens pela query de busca da página (nome, descrição e texto extra, sem acentos). */
export function useFilteredItems<T extends { name: string; desc: string }>(
  items: readonly T[],
  extraText?: (item: T) => string
): T[] {
  const { query } = useSearch();
  return useMemo(
    () => items.filter((item) => matchesQuery(query, `${item.name} ${item.desc} ${extraText?.(item) ?? ''}`)),
    [items, query, extraText]
  );
}
