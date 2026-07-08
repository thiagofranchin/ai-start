'use client';

import { useSearch } from '@/components/layout/SearchProvider';

interface SearchFilterProps {
  /** Texto a ser comparado com a query de busca */
  searchText: string;
  children: React.ReactNode;
}

/**
 * Renderiza children apenas se searchText contiver a query de busca.
 */
export default function SearchFilter({ searchText, children }: SearchFilterProps) {
  const { query } = useSearch();

  if (!query.trim()) {
    return <>{children}</>;
  }

  const normalizedQuery = query.toLowerCase().trim();
  const normalizedText = searchText.toLowerCase();

  if (normalizedText.includes(normalizedQuery)) {
    return <>{children}</>;
  }

  return null;
}
