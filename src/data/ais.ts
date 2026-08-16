import { AIItem } from '@/types';

export const ais: AIItem[] = [
  {
    name: 'Claude',
    url: 'https://claude.ai/',
    desc: 'Assistente IA da Anthropic',
    icon: '/icons/claude.svg',
    color: 'purple',
    links: [{ url: 'https://platform.claude.com/', label: '⚙️ API' }],
  },
  {
    name: 'ChatGPT',
    url: 'https://chatgpt.com/',
    desc: 'Assistente IA da OpenAI',
    icon: '/icons/chatgpt.svg',
    color: 'green',
    links: [{ url: 'https://platform.openai.com/home', label: '⚙️ API' }],
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
    links: [{ url: 'https://platform.deepseek.com/usage', label: '⚙️ API' }],
  },
  {
    name: 'Grok',
    url: 'https://grok.com/',
    desc: 'Assistente IA da xAI',
    icon: '/icons/grok.svg',
    color: 'orange',
  },
  {
    name: 'NVIDIA',
    desc: 'Plataforma de IA NVIDIA',
    icon: '/icons/nvidia.svg',
    color: 'green',
    links: [{ url: 'https://build.nvidia.com/settings/api-keys', label: '⚙️ API' }],
  },
  {
    name: 'Infura',
    desc: 'API e infraestrutura Web3 para Ethereum e IPFS',
    icon: '/icons/infura.svg',
    color: 'orange',
    links: [{ url: 'https://app.infura.io/', label: '⚙️ API' }],
  },
  {
    name: 'Dune',
    desc: 'Análise e dashboards de dados on-chain',
    icon: '/icons/dune.svg',
    color: 'blue',
    links: [{ url: 'https://dune.com/', label: '⚙️ API' }],
  },
  {
    name: 'FMP',
    desc: 'API de dados financeiros e fundamentos de empresas',
    icon: '/icons/fmp.svg',
    color: 'cyan',
    links: [{ url: 'https://site.financialmodelingprep.com/developer/docs/dashboard', label: '⚙️ API' }],
  },
];
