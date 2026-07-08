import { notFound } from 'next/navigation';
import SectionContent from '@/components/sections/SectionContent';
import CriptoPage from '@/components/sections/CriptoPage';
import type { SectionId } from '@/types';

const VALID_SECTIONS: SectionId[] = ['ais', 'apis', 'repos', 'commands', 'utils', 'skills', 'cursos', 'cripto'];

export function generateStaticParams() {
  return VALID_SECTIONS.map((section) => ({ section }));
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
