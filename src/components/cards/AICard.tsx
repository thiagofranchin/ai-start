import Link from 'next/link';
import { LinkItem } from '@/types';

const COLOR_RGB: Record<string, string> = {
  purple: '124,92,252',
  green: '52,211,153',
  orange: '251,191,36',
  blue: '96,165,250',
  red: '248,113,113',
  cyan: '34,211,238',
};

type AICardStyle = React.CSSProperties & { '--ai-accent': string };

interface AICardProps {
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
  links?: LinkItem[];
  index?: number;
}

export default function AICard({ name, url, desc, icon, color, links, index = 0 }: AICardProps) {
  const isImage = icon.startsWith('/');
  const style: AICardStyle = {
    '--ai-accent': COLOR_RGB[color] || COLOR_RGB.purple,
    animationDelay: `${index * 0.04}s`,
  };

  return (
    <div className="ai-card" style={style}>
      <span className="ai-card-pulse" aria-hidden="true" />
      <div className={`card-icon ${color}`}>
        {isImage ? <img src={icon} alt={name} className="card-icon-img" /> : icon}
      </div>
      <h4>{name}</h4>
      <p>{desc}</p>
      <div className="ai-card-actions">
        <Link href={url} target="_blank" rel="noopener noreferrer" className="ai-card-primary">
          💬 Abrir chat
        </Link>
        {links && links.length > 0 && (
          <div className="ai-card-secondary">
            {links.map((link) => (
              <Link
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="ai-card-secondary-link"
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
