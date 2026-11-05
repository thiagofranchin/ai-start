export interface MarketSnapshot {
  crypto: {
    btc: number; eth: number; sol: number;
    btcChange: number | null; ethChange: number | null; solChange: number | null;
  } | null;
  dolar: number | null;
}

const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true';
const AWESOMEAPI_URL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const num = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) ? v : null);

/** Busca cotações; cada fonte falha de forma independente (valor `null`). */
export async function fetchMarket(): Promise<MarketSnapshot> {
  const [crypto, dolar] = await Promise.allSettled([getJson(COINGECKO_URL), getJson(AWESOMEAPI_URL)]);

  let cryptoData: MarketSnapshot['crypto'] = null;
  if (crypto.status === 'fulfilled') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const d = crypto.value as any;
    const btc = num(d?.bitcoin?.usd);
    const eth = num(d?.ethereum?.usd);
    const sol = num(d?.solana?.usd);
    if (btc !== null && eth !== null && sol !== null) {
      cryptoData = {
        btc, eth, sol,
        btcChange: num(d.bitcoin.usd_24h_change),
        ethChange: num(d.ethereum.usd_24h_change),
        solChange: num(d.solana.usd_24h_change),
      };
    }
  }

  let dolarData: number | null = null;
  if (dolar.status === 'fulfilled') {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const parsed = Number.parseFloat((dolar.value as any)?.USDBRL?.bid);
    dolarData = Number.isFinite(parsed) ? parsed : null;
  }

  return { crypto: cryptoData, dolar: dolarData };
}
