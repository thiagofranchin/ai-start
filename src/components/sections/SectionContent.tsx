'use client';

import { ais, repos, skills, cursos, utils, jobs } from '@/data';
import Card from '@/components/cards/Card';
import AICard from '@/components/cards/AICard';
import PageSection from '@/components/sections/PageSection';
import SearchFilter from '@/components/sections/SearchFilter';
import type { SectionId } from '@/types';

const SECTION_EMOJIS: Record<string, string> = {
  ais: '🤖',
  repos: '📦',
  utils: '🧰',
  skills: '🛠️',
  cursos: '📚',
  jobs: '💼',
};

const SECTION_TITLES_CLIENT: Record<string, string> = {
  ais: 'IAs & APIs',
  repos: 'Repositórios',
  utils: 'Utilitários & Ferramentas',
  skills: 'Agents & Skills',
  cursos: 'Cursos',
  jobs: 'Oportunidades de Trabalho',
};

interface SectionContentProps {
  section: SectionId;
}

export default function SectionContent({ section }: SectionContentProps) {
  const title = SECTION_TITLES_CLIENT[section] || section;
  const emoji = SECTION_EMOJIS[section] || '📄';
  const wide = section === 'ais' || section === 'repos' || section === 'skills' || section === 'cursos' || section === 'jobs';

  return (
    <PageSection emoji={emoji} title={title} count={getCount(section)} wide={wide}>
      {renderCards(section)}
    </PageSection>
  );
}

function getCount(section: string): number {
  switch (section) {
    case 'ais': return ais.length;
    case 'repos': return repos.length;
    case 'skills': return skills.length;
    case 'cursos': return cursos.length;
    case 'utils': return utils.length;
    case 'jobs': return jobs.length;
    default: return 0;
  }
}

function renderCards(section: string) {
  switch (section) {
    case 'ais':
      return ais.map((item, i) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <AICard {...item} index={i} />
        </SearchFilter>
      ));

    case 'repos':
      return repos.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    case 'skills':
      return skills.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    case 'cursos':
      return cursos.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    case 'utils':
      return utils.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    case 'jobs':
      return jobs.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    default:
      return null;
  }
}
