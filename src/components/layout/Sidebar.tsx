'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { formatSidebarDate } from '@/lib/utils';
import { ais, apis, repos, cmds, skills, cursos, utils, cripto } from '@/data';
import styles from './Sidebar.module.css';

const COUNTS: Record<string, number> = {
  ais: ais.length,
  apis: apis.length,
  repos: repos.length,
  commands: cmds.length,
  skills: skills.length,
  cursos: cursos.length,
  utils: utils.length,
  cripto: cripto.length,
};

export default function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [updatedDate, setUpdatedDate] = useState('');

  useEffect(() => {
    setUpdatedDate(formatSidebarDate());
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const currentSection = pathname === '/' ? 'home' : pathname.slice(1);

  // Fecha o sidebar ao navegar (mobile)
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className={styles.overlay} onClick={close} />}

      {/* Mobile toggle */}
      <button
        className={styles.toggle}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
      >
        {open ? '✕' : '☰'}
      </button>

      {/* Sidebar */}
      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <div className={styles.sidebarHeader}>
          <h1>ai-start</h1>
          <p>Launchpad · dashboard</p>
        </div>
        <nav className={styles.sidebarNav}>
          <div className={styles.navLabel}>Navegação</div>
          {NAV_ITEMS.map((item) => {
            const isActive = currentSection === item.id;
            const href = item.id === 'home' ? '/' : `/${item.id}`;
            const count = COUNTS[item.id];

            return (
              <Link
                key={item.id}
                href={href}
                className={`${styles.navItem} ${isActive ? styles.active : ''}`}
              >
                <span className={styles.icon}>{item.icon}</span>
                {item.label}
                {count !== undefined && (
                  <span className={styles.badge}>{count}</span>
                )}
              </Link>
            );
          })}
        </nav>
        <div className={styles.sidebarFooter}>
          <span>{updatedDate || 'Atualizado em —/—/——'}</span>
        </div>
      </aside>
    </>
  );
}
