import { SectionId } from '@/types';

export const SECTION_TITLES: Record<SectionId, string> = {
  home: 'Início',
  ais: 'Inteligências Artificiais',
  apis: 'APIs & Plataformas',
  repos: 'Repositórios',
  commands: 'Terminal',
  utils: 'Utilitários & Ferramentas',
  skills: 'Skills & Comandos Claude',
  cursos: 'Cursos & Plataformas de Ensino',
  cripto: 'Cripto & DeFi',
};

export const NAV_ITEMS: { id: SectionId; label: string; icon: string }[] = [
  { id: 'home', label: 'Início', icon: '🏠' },
  { id: 'ais', label: 'Inteligências Artificiais', icon: '🧠' },
  { id: 'apis', label: 'APIs & Plataformas', icon: '🔌' },
  { id: 'repos', label: 'Repositórios', icon: '📦' },
  { id: 'commands', label: 'Terminal', icon: '>_' },
  { id: 'utils', label: 'Utilitários & Ferramentas', icon: '🧰' },
  { id: 'skills', label: 'Skills & Comandos Claude', icon: '🛠️' },
  { id: 'cursos', label: 'Cursos & Plataformas', icon: '📚' },
  { id: 'cripto', label: 'Cripto & DeFi', icon: '₿' },
];
