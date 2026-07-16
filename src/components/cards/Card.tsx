import Link from 'next/link';
import { LinkItem } from '@/types';

interface CardProps {
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
  links?: LinkItem[];
}

export default function Card({ name, url, desc, icon, color, links }: CardProps) {
  const isImage = icon.startsWith('/');
  return (
    <div className="card">
      <div className={`card-icon ${color}`}>
        {isImage ? <img src={icon} alt={name} className="card-icon-img" /> : icon}
      </div>
      <h4>{name}</h4>
      <p>{desc}</p>
      <Link href={url} className="card-link" target="_blank" rel="noopener noreferrer" />
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
