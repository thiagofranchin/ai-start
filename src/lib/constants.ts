import { CodeTopicId, SectionId } from '@/types';

export const SECTION_TITLES: Record<SectionId, string> = {
  home: 'Início',
  ais: 'IAs & APIs',
  repos: 'Repositórios',
  utils: 'Utilitários & Ferramentas',
  skills: 'Agents & Skills',
  cursos: 'Cursos',
  cripto: 'Cripto & DeFi',
  code: 'Code',
  jobs: 'Oportunidades de Trabalho',
};

export const SECTION_EMOJIS: Record<SectionId, string> = {
  home: '🏠',
  ais: '🧠',
  repos: '📦',
  utils: '🧰',
  skills: '🛠️',
  cursos: '📚',
  cripto: '🪙',
  code: '💻',
  jobs: '💼',
};

export const SECTION_DESCRIPTIONS: Record<SectionId, string> = {
  home: 'Seu launchpad pessoal de ferramentas e recursos',
  ais: 'Chats, modelos e consoles de API para IA e dados',
  repos: 'Repositórios open source que valem o acesso rápido',
  utils: 'Utilitários do dia a dia para desenvolvimento',
  skills: 'Skills e plugins para turbinar agentes de código',
  cursos: 'Plataformas e cursos para continuar aprendendo',
  cripto: 'DEXs, DeFi, analytics e segurança on-chain',
  code: 'Comandos prontos para copiar e colar',
  jobs: 'Plataformas de vagas e oportunidades',
};

/** Seções cujo conteúdo é uma grade de cards filtrável pelo campo de busca da página. */
export const FILTERABLE_SECTIONS: SectionId[] = ['ais', 'repos', 'utils', 'skills', 'cursos', 'cripto', 'jobs'];

export interface NavChild {
  id: CodeTopicId;
  label: string;
  icon: string;
}

export interface NavItem {
  id: SectionId;
  label: string;
  icon: string;
  /** Rótulo do grupo na sidebar; exibido quando muda em relação ao item anterior */
  group?: string;
  children?: NavChild[];
}

export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Início', icon: '🏠' },
  { id: 'ais', label: 'IAs & APIs', icon: '🧠', group: 'Explorar' },
  { id: 'skills', label: 'Agents & Skills', icon: '🛠️', group: 'Explorar' },
  { id: 'repos', label: 'Repositórios', icon: '📦', group: 'Explorar' },
  { id: 'utils', label: 'Utilitários', icon: '🧰', group: 'Explorar' },
  {
    id: 'code',
    label: 'Code',
    icon: '💻',
    group: 'Desenvolvimento',
    children: [
      { id: 'python', label: 'Python', icon: '🐍' },
      { id: 'node', label: 'Node', icon: '🟢' },
      { id: 'fcc', label: 'Free Claude Code', icon: '🆓' },
      { id: 'claude-codex', label: 'Claude Code & Codex', icon: '⌨️' },
      { id: 'dsh', label: 'DeepSeek Harness', icon: '🤖' },
    ],
  },
  { id: 'cripto', label: 'Cripto & DeFi', icon: '₿', group: 'Mercado & carreira' },
  { id: 'cursos', label: 'Cursos', icon: '📚', group: 'Mercado & carreira' },
  { id: 'jobs', label: 'Oportunidades', icon: '💼', group: 'Mercado & carreira' },
];
