import styles from './StatCard.module.css';

interface StatCardProps {
  icon: string;
  value: number;
  label: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
}

export default function StatCard({ icon, value, label, color }: StatCardProps) {
  return (
    <div className={styles.card}>
      <div className={`${styles.icon} ${styles[color]}`}>{icon}</div>
      <h4>{value}</h4>
      <p>{label}</p>
    </div>
  );
}
