import CodeCommandRow from './CodeCommandRow';
import type { CodeTopic } from '@/types';

export default function CodeTopicPage({ topic }: { topic: CodeTopic }) {
  const total = topic.groups.reduce((sum, g) => sum + g.commands.length, 0);

  return (
    <div className="section">
      <div className="section-header">
        <span className="emoji">{topic.icon}</span>
        <h3>{topic.label}</h3>
        <span className="count">{total} comandos</span>
      </div>
      <p className="code-topic-intro">{topic.intro}</p>
      {topic.groups.map((group) => (
        <div className="sub-section" key={group.title}>
          <div className="sub-section-header">
            <h4>{group.title}</h4>
            <span className="count-sm">{group.commands.length}</span>
          </div>
          <div className="sub-section-grid">
            {group.commands.map((command) => (
              <CodeCommandRow key={command.cmd} cmd={command.cmd} comment={command.comment} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
