'use client';

import { usePathname } from 'next/navigation';
import { useSearch } from './SearchProvider';
import { SECTION_TITLES } from '@/lib/constants';
import { codeTopics } from '@/data';
import styles from './TopBar.module.css';

export default function TopBar() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();

  const segments = pathname.split('/').filter(Boolean);
  const sectionId = pathname === '/' ? 'home' : segments[0];
  let title = SECTION_TITLES[sectionId as keyof typeof SECTION_TITLES] || 'Início';

  if (sectionId === 'code' && segments[1]) {
    const topic = codeTopics.find((t) => t.id === segments[1]);
    if (topic) title = `Code · ${topic.label}`;
  }

  return (
    <div className={styles.topbar}>
      <h2>
        <span>{title}</span>
      </h2>
      <div className={styles.topbarRight}>
        <div className={styles.searchBox}>
          <span>🔍</span>
          <input
            type="text"
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
