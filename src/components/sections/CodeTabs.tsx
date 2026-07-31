import Link from 'next/link';
import { codeTopics } from '@/data';
import type { CodeTopicId } from '@/types';

export default function CodeTabs({ active }: { active: CodeTopicId }) {
  return (
    <div className="filter-bar">
      {codeTopics.map((topic) => (
        <Link
          key={topic.id}
          href={`/code/${topic.id}`}
          className={`filter-pill ${active === topic.id ? 'active' : ''}`}
        >
          {topic.icon} {topic.label}
        </Link>
      ))}
    </div>
  );
}
