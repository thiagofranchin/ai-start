import { notFound } from 'next/navigation';
import SectionContent from '@/components/sections/SectionContent';
import CriptoPage from '@/components/sections/CriptoPage';
import { SECTION_DESCRIPTIONS, SECTION_TITLES } from '@/lib/constants';
import { pageMetadata } from '@/lib/site';
import type { SectionId } from '@/types';

const VALID_SECTIONS: SectionId[] = ['ais', 'repos', 'utils', 'skills', 'cursos', 'cripto', 'jobs'];

export function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
}

export async function generateMetadata({ params }: { params: Promise<{ section: string }> }) {
  const { section } = await params;
  if (!VALID_SECTIONS.includes(section as SectionId)) return {};
  return pageMetadata(SECTION_TITLES[section as SectionId], SECTION_DESCRIPTIONS[section as SectionId], `/${section}`);
}

export default async function SectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;

  if (!VALID_SECTIONS.includes(section as SectionId)) {
    notFound();
  }

  if (section === 'cripto') {
    return <CriptoPage />;
  }

  return <SectionContent section={section as SectionId} />;
}
