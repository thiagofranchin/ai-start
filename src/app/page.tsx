import StatCard from '@/components/cards/StatCard';
import FavoritesSection from '@/components/sections/FavoritesSection';
import HeroSearch from '@/components/sections/HeroSearch';
import { ais, repos, skills, cursos, utils, cripto, jobs } from '@/data';
import { SECTION_DESCRIPTIONS, SECTION_TITLES } from '@/lib/constants';

const stats = [
  { icon: '🧠', value: ais.length, label: SECTION_TITLES.ais, description: SECTION_DESCRIPTIONS.ais, href: '/ais', color: 'purple' as const },
  { icon: '🛠️', value: skills.length, label: SECTION_TITLES.skills, description: SECTION_DESCRIPTIONS.skills, href: '/skills', color: 'purple' as const },
  { icon: '📦', value: repos.length, label: SECTION_TITLES.repos, description: SECTION_DESCRIPTIONS.repos, href: '/repos', color: 'green' as const },
  { icon: '🧰', value: utils.length, label: SECTION_TITLES.utils, description: SECTION_DESCRIPTIONS.utils, href: '/utils', color: 'orange' as const },
  { icon: '🪙', value: cripto.length, label: SECTION_TITLES.cripto, description: SECTION_DESCRIPTIONS.cripto, href: '/cripto', color: 'red' as const },
  { icon: '📚', value: cursos.length, label: SECTION_TITLES.cursos, description: SECTION_DESCRIPTIONS.cursos, href: '/cursos', color: 'cyan' as const },
  { icon: '💼', value: jobs.length, label: SECTION_TITLES.jobs, description: SECTION_DESCRIPTIONS.jobs, href: '/jobs', color: 'green' as const },
];

export default function HomePage() {
  const total = stats.reduce((sum, stat) => sum + stat.value, 0);
  return (
    <>
      <div className="home-hero">
        <div className="hero-orbit" aria-hidden="true"><span /></div>
        <div className="hero-kicker"><span aria-hidden="true" /> SISTEMA ONLINE</div>
        <h2 className="hero-title">Seu ecossistema digital,<br /><em>em uma única órbita.</em></h2>
        <p>IAs, repositórios e comandos organizados em uma central rápida, inteligente e pronta para o seu próximo projeto.</p>
        <HeroSearch />
        <div className="hero-meta"><span><strong>{total}</strong> recursos indexados</span><span>⭐ Fixe seus favoritos</span></div>
      </div>

      <FavoritesSection />

      <section className="section" aria-labelledby="sections-title">
        <div className="section-header">
          <span className="emoji" aria-hidden="true">🗂️</span>
          <h2 id="sections-title">Explorar seções</h2>
          <span className="count">{total} itens no total</span>
        </div>
        <div className="card-grid home-stats-grid">
          {stats.map((stat) => <StatCard key={stat.href} {...stat} />)}
        </div>
      </section>
    </>
  );
}
