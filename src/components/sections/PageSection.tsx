import type { ReactNode } from 'react';

interface PageSectionProps {
  /** Itens visíveis após o filtro */
  shown: number;
  /** Total de itens da seção */
  total: number;
  children: ReactNode;
  /** Se true, usa grid mais largo (minmax(300px, 1fr)) */
  wide?: boolean;
}

export default function PageSection({ shown, total, children, wide }: PageSectionProps) {
  return (
    <div className="section">
      <div className="section-meta" aria-live="polite">
        {shown === total ? `${total} itens` : `${shown} de ${total} itens`}
      </div>
      <div className={`card-grid ${wide ? 'wide' : ''}`}>
        {children}
      </div>
    </div>
  );
}
