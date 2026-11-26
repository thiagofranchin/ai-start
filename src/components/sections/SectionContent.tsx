'use client';

import { useMemo, useState } from 'react';
import { ais, repos, skills, cursos, utils, jobs } from '@/data';
import Card from '@/components/cards/Card';
import AICard from '@/components/cards/AICard';
import PageSection from '@/components/sections/PageSection';
import EmptyState from '@/components/ui/EmptyState';
import CategoryFilter from '@/components/ui/CategoryFilter';
import { useFilteredItems } from '@/components/sections/useFilteredItems';
import { itemKey } from '@/lib/registry';
import type { AICategory, AIItem, BaseItem, LinkItem, SectionId } from '@/types';

type Item = AIItem | BaseItem;

const NO_ITEMS: readonly Item[] = [];
const SOURCES: Partial<Record<SectionId, readonly Item[]>> = { ais, repos, skills, cursos, utils, jobs };

const WIDE_SECTIONS: SectionId[] = ['ais', 'repos', 'skills', 'cursos', 'jobs'];

// Rótulos dos links também entram na busca (ex.: "api", "vídeo")
const linkLabels = (item: Item) => ((item as { links?: LinkItem[] }).links ?? []).map((l) => l.label).join(' ');

type AIFilter = 'todos' | AICategory;

const categoryOf = (item: Item): AICategory => (item as AIItem).category ?? 'ia';

export default function SectionContent({ section }: { section: SectionId }) {
  const [aiFilter, setAiFilter] = useState<AIFilter>('todos');
  const allItems = SOURCES[section] ?? NO_ITEMS;

  // Em /ais, o filtro de categoria (IAs / Finanças) vem antes da busca por texto
  const items = useMemo(
    () => (section === 'ais' && aiFilter !== 'todos' ? allItems.filter((i) => categoryOf(i) === aiFilter) : allItems),
    [allItems, section, aiFilter]
  );
  const filtered = useFilteredItems(items, linkLabels);

  const countOf = (cat: AICategory) => allItems.filter((i) => categoryOf(i) === cat).length;

  return (
    <>
      {section === 'ais' && (
        <CategoryFilter<AIFilter>
          label="Filtrar por categoria"
          value={aiFilter}
          onChange={setAiFilter}
          options={[
            { value: 'todos', label: 'Todos', count: allItems.length },
            { value: 'ia', label: '🧠 IAs', count: countOf('ia') },
            { value: 'financas', label: '💹 Finanças', count: countOf('financas') },
          ]}
        />
      )}
      <PageSection shown={filtered.length} total={items.length} wide={WIDE_SECTIONS.includes(section)}>
        {filtered.length === 0 && <EmptyState />}
        {filtered.map((item, i) =>
          section === 'ais' ? (
            <AICard key={item.name} {...(item as AIItem)} index={i} favKey={itemKey(section, item.name)} />
          ) : (
            <Card key={item.name} {...(item as BaseItem)} favKey={itemKey(section, item.name)} />
          )
        )}
      </PageSection>
    </>
  );
}
