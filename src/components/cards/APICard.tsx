import Link from 'next/link';

interface APICardProps {
  name: string;
  url: string;
  desc: string;
  icon: string;
  tag?: string;
}

export default function APICard({ name, url, desc, icon, tag }: APICardProps) {
  const isImage = icon.startsWith('/');
  return (
    <div className="api-highlight">
      <div className="api-icon">
        {isImage ? (
          <img src={icon} alt={name} className="api-icon-img" />
        ) : (
          icon
        )}
      </div>
      <div className="api-content">
        <h4>{name}</h4>
        <p>{desc}</p>
      </div>
      {tag && <span className="api-tag">{tag}</span>}
      <Link href={url} className="api-link" target="_blank" rel="noopener noreferrer" />
    </div>
  );
}
