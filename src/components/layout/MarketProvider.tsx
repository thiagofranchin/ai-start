'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { fetchMarket } from '@/lib/market';
import type { CriptoPrices } from '@/types';

const REFRESH_INTERVAL_MS = 60_000;
const MIN_GAP_MS = 30_000;

const initialPrices: CriptoPrices = {
  btc: null, eth: null, sol: null, dolar: null,
  btcChange: null, ethChange: null, solChange: null,
  updatedAt: null, error: false,
};

interface MarketContextType {
  prices: CriptoPrices;
  loading: boolean;
  refresh: () => Promise<void>;
}

const MarketContext = createContext<MarketContextType>({
  prices: initialPrices,
  loading: false,
  refresh: async () => {},
});

export function useMarket() {
  return useContext(MarketContext);
}

/**
 * Uma única fonte de cotações para a MarketBar e para a página Cripto:
 * busca ao montar, a cada 60s (só com a aba visível) e sob demanda.
 */
export function MarketProvider({ children }: { children: ReactNode }) {
  const [prices, setPrices] = useState<CriptoPrices>(initialPrices);
  const [loading, setLoading] = useState(false);
  const lastFetch = useRef(0);

  const load = useCallback(async () => {
    lastFetch.current = Date.now();
    const { crypto, dolar } = await fetchMarket();
    setPrices((prev) => ({
      btc: crypto?.btc ?? prev.btc,
      eth: crypto?.eth ?? prev.eth,
      sol: crypto?.sol ?? prev.sol,
      btcChange: crypto?.btcChange ?? prev.btcChange,
      ethChange: crypto?.ethChange ?? prev.ethChange,
      solChange: crypto?.solChange ?? prev.solChange,
      dolar: dolar ?? prev.dolar,
      updatedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
      error: crypto === null && dolar === null,
    }));
  }, []);

  const refresh = useCallback(async () => {
    setLoading(true);
    try {
      await load();
    } finally {
      setLoading(false);
    }
  }, [load]);

  useEffect(() => {
    const tick = () => {
      if (document.visibilityState === 'visible' && Date.now() - lastFetch.current >= MIN_GAP_MS) {
        void load();
      }
    };
    const first = window.setTimeout(() => void load(), 0);
    const interval = window.setInterval(tick, REFRESH_INTERVAL_MS);
    document.addEventListener('visibilitychange', tick);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', tick);
    };
  }, [load]);

  const value = useMemo(() => ({ prices, loading, refresh }), [prices, loading, refresh]);
  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}
