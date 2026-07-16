import Link from 'next/link';

interface CardProps {
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
  extraUrl?: string;
  extraLabel?: string;
}

export default function Card({ name, url, desc, icon, color, extraUrl, extraLabel }: CardProps) {
  const isImage = icon.startsWith('/');
  return (
    <div className="card">
      <div className={`card-icon ${color}`}>
        {isImage ? <img src={icon} alt={name} className="card-icon-img" /> : icon}
      </div>
      <h4>{name}</h4>
      <p>{desc}</p>
      <Link href={url} className="card-link" target="_blank" rel="noopener noreferrer" />
      {extraUrl && (
        <Link
          href={extraUrl}
          className="card-extra-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          {extraLabel || '🔗 Extra'}
        </Link>
      )}
    </div>
  );
}
