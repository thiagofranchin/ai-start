// ===== TIPOS BASE =====
export interface BaseItemFields {
  name: string;
  desc: string;
  icon: string;
  color: 'purple' | 'green' | 'orange' | 'blue' | 'red' | 'cyan';
}

export interface BaseItem extends BaseItemFields {
  url: string;
}

export interface LinkItem {
  url: string;
  label: string;
}

export interface AIItem extends BaseItem {
  links?: LinkItem[];
}

export interface RepoItem extends BaseItem {
  links?: LinkItem[];
}

export interface CmdItem extends BaseItemFields {
  cmd: string;
  group: string;
  repoLink?: string;
}

export interface SkillItem extends BaseItem {
  links?: LinkItem[];
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
