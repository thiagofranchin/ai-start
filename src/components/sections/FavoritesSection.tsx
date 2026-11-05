'use client';

import Link from 'next/link';
import { catalogByKey } from '@/lib/registry';
import { useFavorites } from '@/lib/favorites';
import CardIcon from '@/components/ui/CardIcon';
import FavoriteButton from '@/components/ui/FavoriteButton';

/** Atalhos fixados pelo usuário (★ em qualquer card), guardados no navegador. */
export default function FavoritesSection() {
  const { keys } = useFavorites();
  const items = keys.map((key) => catalogByKey.get(key)).filter((item): item is NonNullable<typeof item> => !!item);

  return (
    <section className="section" aria-labelledby="favorites-title">
      <div className="section-header">
        <span className="emoji" aria-hidden="true">⭐</span>
        <h2 id="favorites-title">Favoritos</h2>
        {items.length > 0 && <span className="count">{items.length}</span>}
      </div>

      {items.length === 0 ? (
        <div className="fav-empty">
          <span aria-hidden="true">☆</span>
          <p>
            Fixe aqui as ferramentas que você mais usa: clique na <strong>☆</strong> de qualquer card
            e ele aparece neste atalho (e no topo da busca <kbd>Ctrl K</kbd>).
          </p>
        </div>
      ) : (
        <div className="fav-grid">
          {items.map((item) => (
            <div className="fav-tile" key={item.key}>
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="fav-tile-link"
                aria-label={`Abrir ${item.name} em nova aba`}
              />
              <CardIcon icon={item.icon} color={item.color} className="card-icon fav-tile-icon" size={20} />
              <div className="fav-tile-text">
                <strong>{item.name}</strong>
                <span>{item.sectionLabel}</span>
              </div>
              <FavoriteButton itemKey={item.key} name={item.name} />
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
