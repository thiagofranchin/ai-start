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
  const total = stats.reduce((sum, stat) => sum + stat.value, 0);
  return (
    <>
      <div className="home-hero">
        <div className="hero-orbit" aria-hidden="true"><span /></div>
        <div className="hero-kicker"><span /> SISTEMA ONLINE</div>
        <h1>Seu ecossistema digital,<br /><em>em uma única órbita.</em></h1>
        <p>IAs, APIs, repositórios e comandos organizados em uma central rápida, inteligente e pronta para o seu próximo projeto.</p>
        <div className="hero-meta"><span><strong>{total}</strong> recursos indexados</span><span>⌘ Busca instantânea</span></div>
      </div>
      <div className="section">
        <div className="section-header"><span className="emoji">📊</span><h3>Visão geral</h3><span className="count">{total} itens no total</span></div>
        <div className="card-grid home-stats-grid">
          {stats.map((stat) => <StatCard key={stat.label} {...stat} />)}
        </div>
      </div>
    </>
  );
}
