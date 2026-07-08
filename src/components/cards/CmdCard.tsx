import CopyButton from '@/components/ui/CopyButton';

interface CmdCardProps {
  name: string;
  desc: string;
  cmd: string;
  repoLink?: string;
  repoLabel?: string;
}

export default function CmdCard({ name, desc, cmd, repoLink, repoLabel }: CmdCardProps) {
  return (
    <div className="cmd-card">
      <div className="cmd-header">
        <div className="cmd-info">
          <h4>{name}</h4>
          <p>{desc}</p>
          {repoLink && (
            <div className="cmd-repo-ref">
              📁{' '}
              <a href={repoLink} target="_blank" rel="noopener noreferrer">
                {repoLabel || repoLink}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="cmd-shell">
        <span className="prompt">$</span>
        <span className="cmd-text">{cmd}</span>
        <CopyButton text={cmd} />
      </div>
    </div>
  );
}
