'use client';

import { ais, repos, skills, cursos, utils, jobs } from '@/data';
import Card from '@/components/cards/Card';
import AICard from '@/components/cards/AICard';
import PageSection from '@/components/sections/PageSection';
import EmptyState from '@/components/ui/EmptyState';
import { useFilteredItems } from '@/components/sections/useFilteredItems';
import { itemKey } from '@/lib/registry';
import type { AIItem, BaseItem, LinkItem, SectionId } from '@/types';

type Item = AIItem | BaseItem;

const SOURCES: Partial<Record<SectionId, readonly Item[]>> = { ais, repos, skills, cursos, utils, jobs };

const WIDE_SECTIONS: SectionId[] = ['ais', 'repos', 'skills', 'cursos', 'jobs'];

// Rótulos dos links também entram na busca (ex.: "api", "vídeo")
const linkLabels = (item: Item) => ((item as { links?: LinkItem[] }).links ?? []).map((l) => l.label).join(' ');

export default function SectionContent({ section }: { section: SectionId }) {
  const items = SOURCES[section] ?? [];
  const filtered = useFilteredItems(items, linkLabels);

  return (
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
  );
}
