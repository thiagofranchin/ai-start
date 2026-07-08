'use client';

import { ais, apis, repos, cmds, skills, cursos, utils } from '@/data';
import Card from '@/components/cards/Card';
import APICard from '@/components/cards/APICard';
import CmdCard from '@/components/cards/CmdCard';
import PageSection from '@/components/sections/PageSection';
import CommandGroup from '@/components/sections/CommandGroup';
import SearchFilter from '@/components/sections/SearchFilter';
import type { SectionId } from '@/types';

const SECTION_EMOJIS: Record<string, string> = {
  ais: '🤖',
  apis: '🔌',
  repos: '📦',
  commands: '⌨️',
  utils: '🧰',
  skills: '🛠️',
  cursos: '📚',
};

const SECTION_TITLES_CLIENT: Record<string, string> = {
  ais: 'Inteligências Artificiais',
  apis: 'APIs & Plataformas',
  repos: 'Repositórios',
  commands: 'Comandos & Caminhos',
  utils: 'Utilitários & Ferramentas',
  skills: 'Skills & Comandos Claude',
  cursos: 'Cursos & Plataformas de Ensino',
};

interface SectionContentProps {
  section: SectionId;
}

export default function SectionContent({ section }: SectionContentProps) {
  const title = SECTION_TITLES_CLIENT[section] || section;
  const emoji = SECTION_EMOJIS[section] || '📄';
  const wide = section === 'ais' || section === 'repos' || section === 'skills' || section === 'cursos';

  return (
    <PageSection emoji={emoji} title={title} count={getCount(section)} wide={wide}>
      {renderCards(section)}
    </PageSection>
  );
}

function getCount(section: string): number {
  switch (section) {
    case 'ais': return ais.length;
    case 'apis': return apis.length;
    case 'repos': return repos.length;
    case 'commands': return cmds.length;
    case 'skills': return skills.length;
    case 'cursos': return cursos.length;
    case 'utils': return utils.length;
    default: return 0;
  }
}

function renderCards(section: string) {
  switch (section) {
    case 'ais':
      return ais.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    case 'apis':
      return apis.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <APICard {...item} tag="API" />
        </SearchFilter>
      ));

    case 'repos':
      return repos.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc}`}>
          <Card {...item} />
        </SearchFilter>
      ));

    case 'commands':
      return renderCommandGroups();

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

    default:
      return null;
  }
}

function renderCommandGroups() {
  const groups = new Map<string, typeof cmds>();
  for (const cmd of cmds) {
    const existing = groups.get(cmd.group) || [];
    existing.push(cmd);
    groups.set(cmd.group, existing);
  }

  return Array.from(groups.entries()).map(([group, items]) => (
    <CommandGroup key={group} title={group} count={items.length}>
      {items.map((item) => (
        <SearchFilter key={item.name} searchText={`${item.name} ${item.desc} ${item.cmd || ''}`}>
          <CmdCard
            name={item.name}
            desc={item.desc}
            cmd={item.cmd}
            repoLink={item.repoLink}
            repoLabel="Ver repositório"
          />
        </SearchFilter>
      ))}
    </CommandGroup>
  ));
}
