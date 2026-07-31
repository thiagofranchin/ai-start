import CopyButton from '@/components/ui/CopyButton';

interface CodeCommandRowProps {
  cmd: string;
  comment: string;
}

export default function CodeCommandRow({ cmd, comment }: CodeCommandRowProps) {
  return (
    <div className="code-cmd-row">
      <div className="cmd-shell">
        <span className="prompt">$</span>
        <span className="cmd-text">{cmd}</span>
        <CopyButton text={cmd} />
      </div>
      <p className="code-cmd-comment"># {comment}</p>
    </div>
  );
}
