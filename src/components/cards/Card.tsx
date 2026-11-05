import Link from 'next/link';
import { LinkItem } from '@/types';
import TruncatedDescription from '@/components/ui/TruncatedDescription';
import CardIcon from '@/components/ui/CardIcon';
import FavoriteButton from '@/components/ui/FavoriteButton';

interface CardProps {
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
  links?: LinkItem[];
  /** Chave do favorito (`seção:nome`); sem ela o botão de favoritar não aparece */
  favKey?: string;
}

export default function Card({ name, url, desc, icon, color, links, favKey }: CardProps) {
  return (
    <div className="card">
      <CardIcon icon={icon} color={color} />
      <h4>{name}</h4>
      <TruncatedDescription text={desc} />
      <Link
        href={url}
        className="card-link"
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Abrir ${name} em nova aba`}
      />
      {favKey && <FavoriteButton itemKey={favKey} name={name} />}
      {links && links.length > 0 && (
        <div className="card-links">
          {links.map((link) => (
            <Link
              key={link.url}
              href={link.url}
              className="card-extra-link"
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
