import { useCallback, useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'ai-start:favorites';
const EMPTY = '[]';

const listeners = new Set<() => void>();
let cache: string | null = null;

function readStorage(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? EMPTY;
  } catch {
    return EMPTY;
  }
}

function getSnapshot(): string {
  if (cache === null) cache = readStorage();
  return cache;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY || event.key === null) {
      cache = null;
      listener();
    }
  };
  window.addEventListener('storage', onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
  };
}

function parse(raw: string): string[] {
  try {
    const value: unknown = JSON.parse(raw);
    return Array.isArray(value) ? value.filter((v): v is string => typeof v === 'string') : [];
  } catch {
    return [];
  }
}

function write(keys: string[]): void {
  const raw = JSON.stringify(keys);
  cache = raw;
  try {
    window.localStorage.setItem(STORAGE_KEY, raw);
  } catch {
    // localStorage indisponível (modo privado etc.): mantém só em memória
  }
  listeners.forEach((listener) => listener());
}

/** Favoritos persistidos em localStorage, sincronizados entre componentes e abas. */
export function useFavorites() {
  const raw = useSyncExternalStore(subscribe, getSnapshot, () => EMPTY);
  const keys = useMemo(() => parse(raw), [raw]);

  const isFavorite = useCallback((key: string) => keys.includes(key), [keys]);

  const toggle = useCallback(
    (key: string) => {
      write(keys.includes(key) ? keys.filter((k) => k !== key) : [...keys, key]);
    },
    [keys]
  );

  return { keys, isFavorite, toggle };
}
