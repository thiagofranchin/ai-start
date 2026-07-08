'use client';

import { usePathname } from 'next/navigation';
import { useSearch } from './SearchProvider';
import { SECTION_TITLES } from '@/lib/constants';
import styles from './TopBar.module.css';

export default function TopBar() {
  const pathname = usePathname();
  const { query, setQuery } = useSearch();

  const sectionId = pathname === '/' ? 'home' : pathname.slice(1);
  const title = SECTION_TITLES[sectionId as keyof typeof SECTION_TITLES] || 'Início';

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
