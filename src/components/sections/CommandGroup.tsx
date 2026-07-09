import type { ReactNode } from 'react';

interface CommandGroupProps {
  title: string;
  count: number;
  children: ReactNode;
  titleUrl?: string;
}

export default function CommandGroup({ title, count, children, titleUrl }: CommandGroupProps) {
  return (
    <div className="sub-section">
      <div className="sub-section-header">
        {titleUrl ? (
          <a href={titleUrl} target="_blank" rel="noopener noreferrer" className="sub-section-title-link">
            <h4>{title} ↗</h4>
          </a>
        ) : (
          <h4>{title}</h4>
        )}
        <span className="count-sm">{count}</span>
      </div>
      <div className="sub-section-grid">
        {children}
      </div>
    </div>
  );
}
