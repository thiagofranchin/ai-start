import { CodeTopicId, SectionId } from '@/types';

export const SECTION_TITLES: Record<SectionId, string> = {
  home: 'Início',
  ais: 'Inteligências Artificiais',
  repos: 'Repositórios',
  utils: 'Utilitários & Ferramentas',
  skills: 'Agents & Skills',
  cursos: 'Cursos & Plataformas de Ensino',
  cripto: 'Cripto & DeFi',
  code: 'Code',
  jobs: 'Oportunidades de Trabalho',
};

export interface NavChild {
  id: CodeTopicId;
  label: string;
  icon: string;
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Início', icon: '🏠' },
  { id: 'ais', label: 'Inteligências Artificiais', icon: '🧠' },
  { id: 'skills', label: 'Agents & Skills', icon: '🛠️' },
  { id: 'repos', label: 'Repositórios', icon: '📦' },
  {
    id: 'code',
    label: 'Code',
    icon: '💻',
    children: [
      { id: 'python', label: 'Python', icon: '🐍' },
      { id: 'node', label: 'Node', icon: '🟢' },
      { id: 'fcc', label: 'Free Claude Code', icon: '🆓' },
    ],
  },
  { id: 'utils', label: 'Utilitários & Ferramentas', icon: '🧰' },
  { id: 'cursos', label: 'Cursos & Plataformas', icon: '📚' },
  { id: 'cripto', label: 'Cripto & DeFi', icon: '₿' },
  { id: 'jobs', label: 'Oportunidades', icon: '💼' },
];
