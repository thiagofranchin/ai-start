import Link from 'next/link';
import { codeTopics } from '@/data';
import type { CodeTopicId } from '@/types';

export default function CodeTabs({ active }: { active: CodeTopicId }) {
  return (
    <nav className="filter-bar" aria-label="Tópicos de Code">
      {codeTopics.map((topic) => (
        <Link
          key={topic.id}
          href={`/code/${topic.id}`}
          className={`filter-pill ${active === topic.id ? 'active' : ''}`}
          aria-current={active === topic.id ? 'page' : undefined}
        >
          {topic.icon} {topic.label}
        </Link>
      ))}
    </nav>
  );
}
