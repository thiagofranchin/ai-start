import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      gap: '16px',
    }}>
      <span style={{ fontSize: '3rem' }}>🔍</span>
      <h2 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Página não encontrada</h2>
      <p style={{ color: 'var(--text-secondary)', fontSize: '.85rem' }}>
        A seção que você procura não existe.
      </p>
      <Link
        href="/"
        style={{
          color: 'var(--accent)',
          fontSize: '.85rem',
          textDecoration: 'underline',
          marginTop: '8px',
        }}
      >
        ← Voltar ao início
      </Link>
    </div>
  );
}
