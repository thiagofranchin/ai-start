import CodeCommandRow from './CodeCommandRow';
import type { CodeTopic } from '@/types';

export default function CodeTopicPage({ topic }: { topic: CodeTopic }) {
  const total = topic.groups.reduce((sum, g) => sum + g.commands.length, 0);

  return (
    <div className="section">
      <div className="section-meta">{total} comandos</div>
      <p className="code-topic-intro">{topic.intro}</p>
      {topic.repoUrl && (
        <div className="cmd-repo-ref">
          📁{' '}
          <a href={topic.repoUrl} target="_blank" rel="noopener noreferrer">
            {topic.repoUrl}
          </a>
        </div>
      )}
      {topic.groups.map((group) => (
        <div className="sub-section" key={group.title}>
          <div className="sub-section-header">
            <h2>{group.title}</h2>
            <span className="count-sm">{group.commands.length}</span>
          </div>
          <div className="sub-section-grid">
            {group.commands.map((command, i) => (
              <CodeCommandRow
                key={`${group.title}-${i}-${command.cmd}`}
                cmd={command.cmd}
                comment={command.comment}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
