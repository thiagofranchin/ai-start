import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};

/** `false` no servidor e na hidratação, `true` no cliente — sem setState em efeito. */
export function useIsClient(): boolean {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

/** Tecla modificadora do atalho de busca: ⌘ no Mac/iOS, Ctrl nos demais. */
export function useModKey(): string {
  return useSyncExternalStore(
    subscribe,
    () => (/Mac|iPhone|iPad/i.test(navigator.platform) ? '⌘' : 'Ctrl'),
    () => 'Ctrl'
  );
}
