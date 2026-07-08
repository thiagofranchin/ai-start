import StatCard from '@/components/cards/StatCard';
import { ais, apis, repos, cmds, skills, cursos, utils, cripto } from '@/data';

const stats = [
  { icon: '🤖', value: ais.length, label: 'Inteligências Artificiais', color: 'purple' as const },
  { icon: '🔌', value: apis.length, label: 'APIs cadastradas', color: 'blue' as const },
  { icon: '📦', value: repos.length, label: 'Repositórios', color: 'green' as const },
  { icon: '⌨️', value: cmds.length, label: 'Comandos salvos', color: 'orange' as const },
  { icon: '🧰', value: utils.length, label: 'Utilitários', color: 'orange' as const },
  { icon: '🛠️', value: skills.length, label: 'Skills', color: 'purple' as const },
  { icon: '📚', value: cursos.length, label: 'Cursos', color: 'cyan' as const },
  { icon: '🪙', value: cripto.length, label: 'Cripto & DeFi', color: 'red' as const },
];

export default function HomePage() {
  const total = stats.reduce((sum, s) => sum + s.value, 0);

  return (
    <>
      <div className="section">
        <div className="section-header">
          <span className="emoji">🚀</span>
          <h3>Bem-vindo ao ai-start</h3>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '.9rem', maxWidth: '600px' }}>
          Seu hub pessoal para acesso rápido a inteligências artificiais, APIs, repositórios e
          comandos do dia a dia. Use o menu ao lado ou a busca para encontrar o que precisa.
        </p>
      </div>

      <div className="section">
        <div className="section-header">
          <span className="emoji">📊</span>
          <h3>Visão geral</h3>
          <span className="count">{total} itens no total</span>
        </div>
        <div className="card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))' }}>
          {stats.map((stat) => (
            <StatCard
              key={stat.label}
              icon={stat.icon}
              value={stat.value}
              label={stat.label}
              color={stat.color}
            />
          ))}
        </div>
      </div>
    </>
  );
}
