import type { ReactNode } from 'react';

interface PageSectionProps {
  emoji: string;
  title: string;
  count: number;
  children: ReactNode;
  /** Se true, usa grid mais largo (minmax(300px, 1fr)) */
  wide?: boolean;
}

export default function PageSection({ emoji, title, count, children, wide }: PageSectionProps) {
  return (
    <div className="section">
      <div className="section-header">
        <span className="emoji">{emoji}</span>
        <h3>{title}</h3>
        <span className="count">{count} itens</span>
      </div>
      <div className={`card-grid ${wide ? 'wide' : ''}`}>
        {children}
      </div>
    </div>
  );
}
