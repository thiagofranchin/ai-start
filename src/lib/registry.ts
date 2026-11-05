import { ais, repos, skills, cursos, utils, jobs, cripto, codeTopics } from '@/data';
import { SECTION_TITLES } from '@/lib/constants';
import type { BaseItemFields, LinkItem, SectionId } from '@/types';

type CatalogSection = Extract<SectionId, 'ais' | 'repos' | 'utils' | 'skills' | 'cursos' | 'cripto' | 'jobs'>;

export interface CatalogItem extends BaseItemFields {
  /** Identificador estável (`seção:nome`), usado em favoritos */
  key: string;
  section: CatalogSection;
  sectionLabel: string;
  /** Destino principal do card (links de API quando não há site) */
  url: string;
  links?: LinkItem[];
  /** Texto extra pesquisável (categorias, rótulos de links) */
  keywords: string;
}

export interface PageEntry {
  key: string;
  title: string;
  desc: string;
  icon: string;
  href: string;
}

export const itemKey = (section: string, name: string) => `${section}:${name}`;

function build(
  section: CatalogSection,
  list: ReadonlyArray<BaseItemFields & { url?: string; links?: LinkItem[]; categories?: string[] }>
): CatalogItem[] {
  return list.map((item) => ({
    key: itemKey(section, item.name),
    section,
    sectionLabel: SECTION_TITLES[section],
    name: item.name,
    desc: item.desc,
    icon: item.icon,
    color: item.color,
    url: item.url ?? item.links?.[0]?.url ?? '#',
    links: item.links,
    keywords: [...(item.categories ?? []), ...(item.links?.map((l) => l.label) ?? [])].join(' '),
  }));
}

export const catalog: CatalogItem[] = [
  ...build('ais', ais),
  ...build('skills', skills),
  ...build('repos', repos),
  ...build('utils', utils),
  ...build('cripto', cripto),
  ...build('cursos', cursos),
  ...build('jobs', jobs),
];

export const catalogByKey = new Map(catalog.map((item) => [item.key, item]));

/** Páginas navegáveis do dashboard (seções + tópicos de Code). */
export const pages: PageEntry[] = [
  { key: 'page:home', title: 'Início', desc: SECTION_TITLES.home, icon: '🏠', href: '/' },
  { key: 'page:ais', title: 'IAs & APIs', desc: 'Seção', icon: '🧠', href: '/ais' },
  { key: 'page:skills', title: 'Agents & Skills', desc: 'Seção', icon: '🛠️', href: '/skills' },
  { key: 'page:repos', title: 'Repositórios', desc: 'Seção', icon: '📦', href: '/repos' },
  { key: 'page:utils', title: 'Utilitários & Ferramentas', desc: 'Seção', icon: '🧰', href: '/utils' },
  ...codeTopics.map((topic) => ({
    key: `page:code:${topic.id}`,
    title: `Code · ${topic.label}`,
    desc: `${topic.groups.reduce((n, g) => n + g.commands.length, 0)} comandos`,
    icon: topic.icon,
    href: `/code/${topic.id}`,
  })),
  { key: 'page:cripto', title: 'Cripto & DeFi', desc: 'Seção', icon: '🪙', href: '/cripto' },
  { key: 'page:cursos', title: 'Cursos', desc: 'Seção', icon: '📚', href: '/cursos' },
  { key: 'page:jobs', title: 'Oportunidades de Trabalho', desc: 'Seção', icon: '💼', href: '/jobs' },
];
