import { AIItem } from '@/types';

export const ais: AIItem[] = [
  {
    name: 'Claude',
    url: 'https://claude.ai/',
    desc: 'Assistente IA da Anthropic',
    icon: '/icons/claude.svg',
    color: 'purple',
    links: [{ url: 'https://platform.claude.com/', label: '⚙️ Platform' }],
  },
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    desc: 'Assistente IA da OpenAI',
    icon: '/icons/chatgpt.svg',
    color: 'green',
    links: [{ url: 'https://platform.openai.com/home', label: '⚙️ Platform' }],
  },
  {
    name: 'Gemini',
    url: 'https://gemini.google.com/',
    desc: 'Assistente IA do Google',
    icon: '/icons/gemini.svg',
    color: 'blue',
    links: [
      { url: 'https://aistudio.google.com/', label: '🧪 AI Studio' },
      { url: 'https://notebooklm.google.com/', label: '📓 NotebookLM' },
    ],
  },
  {
    name: 'DeepSeek Chat',
    url: 'https://chat.deepseek.com/',
    desc: 'Assistente IA da DeepSeek',
    icon: '/icons/deepseek.svg',
    color: 'cyan',
    links: [{ url: 'https://platform.deepseek.com/usage', label: '⚙️ Platform' }],
  },
  {
    name: 'Grok',
    url: 'https://grok.com/',
    desc: 'Assistente IA da xAI',
    icon: '/icons/grok.svg',
    color: 'orange',
  },
];
