/** Normaliza texto para busca: minúsculas e sem acentos ("Repositórios" → "repositorios"). */
export function normalize(text: string): string {
  return text.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().trim();
}

/** Todos os termos da query precisam aparecer no texto (ordem livre). */
export function matchesQuery(query: string, text: string): boolean {
  const terms = normalize(query).split(/\s+/).filter(Boolean);
  if (terms.length === 0) return true;
  const haystack = normalize(text);
  return terms.every((term) => haystack.includes(term));
}
