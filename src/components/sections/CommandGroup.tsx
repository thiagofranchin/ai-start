import type { ReactNode } from 'react';

interface CommandGroupProps {
  title: string;
  count: number;
  children: ReactNode;
}

export default function CommandGroup({ title, count, children }: CommandGroupProps) {
  return (
    <div className="sub-section">
      <div className="sub-section-header">
        <h4>{title}</h4>
        <span className="count-sm">{count}</span>
      </div>
      <div className="sub-section-grid">
        {children}
      </div>
    </div>
  );
}
