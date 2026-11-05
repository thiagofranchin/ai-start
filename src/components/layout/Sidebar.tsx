'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_ITEMS } from '@/lib/constants';
import { useModKey } from '@/lib/useIsClient';
import { ais, repos, skills, cursos, utils, cripto, jobs } from '@/data';
import styles from './Sidebar.module.css';

const COUNTS: Record<string, number> = {
  ais: ais.length,
  repos: repos.length,
  skills: skills.length,
  cursos: cursos.length,
  utils: utils.length,
  cripto: cripto.length,
  jobs: jobs.length,
};

export default function Sidebar() {
  const pathname = usePathname();
  const modKey = useModKey();

  // O menu mobile pertence à rota em que foi aberto: ao navegar, fecha sozinho (sem efeito)
  const [openPath, setOpenPath] = useState<string | null>(null);
  const open = openPath === pathname;
  const close = useCallback(() => setOpenPath(null), []);

  // Submenus: o escolhido pelo usuário vence; sem escolha, abre quando a seção está ativa
  const [manual, setManual] = useState<Record<string, boolean>>({});

  const segments = pathname.split('/').filter(Boolean);
  const currentSection = pathname === '/' ? 'home' : segments[0];
  const currentSubSection = segments[1];

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, close]);

  return (
    <>
      {open && <div className={styles.overlay} onClick={close} aria-hidden="true" />}

      <button
        type="button"
        className={styles.toggle}
        onClick={() => setOpenPath(open ? null : pathname)}
        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
        aria-expanded={open}
        aria-controls="sidebar"
      >
        {open ? '✕' : '☰'}
      </button>

      <aside id="sidebar" className={`${styles.sidebar} ${open ? styles.open : ''}`}>
        <Link href="/" className={styles.brand} aria-label="ai-start — ir para o início">
          <span className={styles.logo} aria-hidden="true">🚀</span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>ai-start</span>
            <span className={styles.brandSub}>Launchpad</span>
          </span>
        </Link>

        <nav className={styles.sidebarNav} aria-label="Navegação principal">
          {NAV_ITEMS.map((item, index) => {
            const isActive = currentSection === item.id;
            const href = item.id === 'home' ? '/' : `/${item.id}`;
            const count = COUNTS[item.id];
            const hasChildren = !!item.children;
            const isExpanded = hasChildren && (manual[item.id] ?? isActive);
            const showGroup = !!item.group && item.group !== NAV_ITEMS[index - 1]?.group;

            return (
              <Fragment key={item.id}>
                {showGroup && <div className={styles.navLabel}>{item.group}</div>}
                {hasChildren ? (
                  <button
                    type="button"
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    onClick={() => setManual((prev) => ({ ...prev, [item.id]: !isExpanded }))}
                    aria-expanded={isExpanded}
                    aria-controls={`nav-children-${item.id}`}
                  >
                    <span className={styles.icon} aria-hidden="true">{item.icon}</span>
                    {item.label}
                    <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`} aria-hidden="true">›</span>
                  </button>
                ) : (
                  <Link
                    href={href}
                    className={`${styles.navItem} ${isActive ? styles.active : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    <span className={styles.icon} aria-hidden="true">{item.icon}</span>
                    {item.label}
                    {count !== undefined && <span className={styles.badge}>{count}</span>}
                  </Link>
                )}
                {hasChildren && (
                  <div
                    id={`nav-children-${item.id}`}
                    className={`${styles.navChildrenWrapper} ${isExpanded ? styles.open : ''}`}
                  >
                    <div className={styles.navChildren}>
                      {item.children!.map((child) => {
                        const isChildActive = isActive && currentSubSection === child.id;
                        return (
                          <Link
                            key={child.id}
                            href={`/${item.id}/${child.id}`}
                            className={`${styles.navChildItem} ${isChildActive ? styles.active : ''}`}
                            aria-current={isChildActive ? 'page' : undefined}
                            tabIndex={isExpanded ? 0 : -1}
                          >
                            <span className={styles.icon} aria-hidden="true">{child.icon}</span>
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </Fragment>
            );
          })}
        </nav>

        <div className={styles.sidebarFooter}>
          <span><kbd>{modKey}</kbd><kbd>K</kbd> buscar</span>
          <span><kbd>/</kbd> filtrar</span>
        </div>
      </aside>
    </>
  );
}
