// ===== TIPOS BASE =====
export interface BaseItem {
  name: string;
  url: string;
  desc: string;
  icon: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
}

export interface AIItem extends BaseItem {}

export interface APIItem extends BaseItem {}

export interface RepoItem extends BaseItem {
  extraUrl?: string;
  extraLabel?: string;
}

export interface CmdItem extends BaseItem {
  cmd: string;
  group: string;
  repoLink?: string;
}

export interface SkillItem extends BaseItem {
  extraUrl?: string;
  extraLabel?: string;
}

export interface CursoItem extends BaseItem {}

export interface UtilItem extends BaseItem {}

export interface CriptoItem extends BaseItem {
  categories: string[];
}

// ===== TIPOS DE SEÇÃO =====
export type SectionId =
  | 'home'
  | 'ais'
  | 'apis'
  | 'repos'
  | 'commands'
  | 'utils'
  | 'skills'
  | 'cursos'
  | 'cripto';

// ===== PREÇOS CRIPTO =====
export interface CriptoPrices {
  btc: number | null;
  eth: number | null;
  sol: number | null;
  dolar: number | null;
  updatedAt: string | null;
  error: boolean;
}

// ===== CONFIGURAÇÃO DE SEÇÃO =====
export interface SectionConfig {
  id: SectionId;
  label: string;
  emoji: string;
  count: number;
}
