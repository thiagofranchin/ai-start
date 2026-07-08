'use client';

import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '16px',
    }}>
      <span style={{ fontSize: '3rem' }}>⚠️</span>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Algo deu errado</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '.85rem' }}>
        Ocorreu um erro ao carregar esta página.
      </p>
      <button
        onClick={reset}
        style={{
          background: 'var(--accent)',
          color: '#fff',
          border: 'none',
          borderRadius: 'var(--radius-xs)',
          padding: '8px 20px',
          fontSize: '.85rem',
          cursor: 'pointer',
          fontFamily: 'inherit',
          marginTop: '8px',
        }}
      >
        Tentar novamente
      </button>
    </div>
  );
}
