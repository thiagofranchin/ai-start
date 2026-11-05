'use client';

import { useSearch } from '@/components/layout/SearchProvider';

interface EmptyStateProps {
  title?: string;
  hint?: string;
  /** Mostra o botão "Limpar busca" quando o vazio vem de um filtro de texto */
  clearable?: boolean;
}

export default function EmptyState({
  title = 'Nenhum resultado encontrado',
  hint = 'Tente outro termo ou limpe o filtro para ver tudo.',
  clearable = true,
}: EmptyStateProps) {
  const { query, setQuery } = useSearch();
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-icon" aria-hidden="true">🔎</span>
      <p className="empty-state-title">{title}{query ? <> para “{query}”</> : null}</p>
      <p className="empty-state-hint">{hint}</p>
      {clearable && query && (
        <button type="button" className="btn-ghost" onClick={() => setQuery('')}>Limpar busca</button>
      )}
    </div>
  );
}
