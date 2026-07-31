import { notFound } from 'next/navigation';
import CodeTabs from '@/components/sections/CodeTabs';
import CodeTopicPage from '@/components/sections/CodeTopicPage';
import { codeTopics } from '@/data';
import type { CodeTopicId } from '@/types';

const VALID_TOPICS: CodeTopicId[] = ['python', 'node', 'fcc'];

export function generateStaticParams() {
  return VALID_TOPICS.map((topic) => ({ topic }));
}

export default async function CodeTopicRoute({
  params,
}: {
  params: Promise<{ topic: string }>;
}) {
  const { topic } = await params;

  if (!VALID_TOPICS.includes(topic as CodeTopicId)) {
    notFound();
  }

  const data = codeTopics.find((t) => t.id === topic)!;

  return (
    <>
      <CodeTabs active={data.id} />
      <CodeTopicPage topic={data} />
    </>
  );
}
