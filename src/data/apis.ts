import { APIItem } from '@/types';

export const apis: APIItem[] = [
  { name: 'Claude Platform', url: 'https://platform.claude.com/', desc: 'Dashboard da API Anthropic — uso, keys e modelos', icon: '/icons/claude.svg', color: 'orange' },
  { name: 'DeepSeek Platform', url: 'https://platform.deepseek.com/usage', desc: 'Dashboard de uso da API DeepSeek', icon: '/icons/deepseek.svg', color: 'purple' },
  { name: 'OpenAI Platform', url: 'https://platform.openai.com/home', desc: 'Dashboard da API OpenAI — uso, keys e modelos', icon: '/icons/chatgpt.svg', color: 'green' },
  { name: 'Google AI Studio', url: 'https://aistudio.google.com/', desc: 'Plataforma de prototipação com modelos Gemini — playground, tuning e API key', icon: '/icons/gemini.svg', color: 'blue' },
  { name: 'NotebookLM', url: 'https://notebooklm.google.com/', desc: 'Notebook inteligente com IA — pesquisa, análise de documentos e podcasts gerados', icon: '/icons/notebooklm.svg', color: 'blue' },
];
