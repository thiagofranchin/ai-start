import Link from 'next/link';
import styles from './StatCard.module.css';

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  description: string;
  href: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
}

/** Atalho de seção na home: ícone, contagem, descrição e link para a página. */
export default function StatCard({ icon, value, label, description, href, color }: StatCardProps) {
  return (
    <Link href={href} className={styles.card}>
      <div className={`${styles.icon} ${styles[color]}`} aria-hidden="true">{icon}</div>
      <div className={styles.body}>
        <h4>
          <span className={styles.value}>{value}</span> {label}
        </h4>
        <p>{description}</p>
      </div>
      <span className={styles.arrow} aria-hidden="true">→</span>
    </Link>
  );
}
