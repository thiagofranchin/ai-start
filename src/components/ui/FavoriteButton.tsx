'use client';

import { useFavorites } from '@/lib/favorites';

interface FavoriteButtonProps {
  itemKey: string;
  name: string;
  className?: string;
}

export default function FavoriteButton({ itemKey, name, className = '' }: FavoriteButtonProps) {
  const { isFavorite, toggle } = useFavorites();
  const active = isFavorite(itemKey);
  const label = active ? `Remover ${name} dos favoritos` : `Adicionar ${name} aos favoritos`;

  return (
    <button
      type="button"
      className={`fav-btn ${active ? 'on' : ''} ${className}`}
      aria-pressed={active}
      aria-label={label}
      title={label}
      onClick={(event) => {
        event.preventDefault();
        event.stopPropagation();
        toggle(itemKey);
      }}
    >
      <span aria-hidden="true">{active ? '★' : '☆'}</span>
    </button>
  );
}
