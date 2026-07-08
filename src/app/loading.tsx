export default function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '50vh',
      color: 'var(--text-muted)',
      fontSize: '.9rem',
    }}>
      ⏳ Carregando...
    </div>
  );
}
