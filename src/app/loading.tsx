export default function Loading() {
  return (
    <div className="section" role="status" aria-label="Carregando conteúdo">
      <div className="card-grid wide">
        {Array.from({ length: 6 }, (_, i) => (
          <div className="skeleton-card" key={i} aria-hidden="true">
            <span className="skeleton skeleton-icon" />
            <span className="skeleton skeleton-line" style={{ width: '45%' }} />
            <span className="skeleton skeleton-line" style={{ width: '90%' }} />
            <span className="skeleton skeleton-line" style={{ width: '70%' }} />
          </div>
        ))}
      </div>
    </div>
  );
}
