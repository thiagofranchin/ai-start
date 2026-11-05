export interface CryptoQuotes {
  btc: number; eth: number; sol: number;
  btcChange: number | null; ethChange: number | null; solChange: number | null;
}

export interface MarketSnapshot {
  crypto: CryptoQuotes | null;
  /** Fonte que respondeu (para exibir na UI) */
  cryptoSource: 'Binance' | 'CoinGecko' | null;
  dolar: number | null;
}

// Binance (endpoint público só de dados de mercado, com CORS liberado) é a fonte principal:
// o plano gratuito da CoinGecko limita por IP e responde sem cabeçalhos CORS, o que no
// navegador aparece como "blocked by CORS policy".
const BINANCE_URL =
  'https://data-api.binance.vision/api/v3/ticker/24hr?symbols=%5B%22BTCUSDT%22,%22ETHUSDT%22,%22SOLUSDT%22%5D';
const COINGECKO_URL =
  'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd&include_24hr_change=true';
const AWESOMEAPI_URL = 'https://economia.awesomeapi.com.br/json/last/USD-BRL';

async function getJson(url: string): Promise<unknown> {
  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

const num = (v: unknown): number | null => {
  const n = typeof v === 'string' ? Number.parseFloat(v) : v;
  return typeof n === 'number' && Number.isFinite(n) ? n : null;
};

async function fromBinance(): Promise<CryptoQuotes> {
  const data = (await getJson(BINANCE_URL)) as Array<{ symbol?: string; lastPrice?: string; priceChangePercent?: string }>;
  const find = (symbol: string) => data.find((d) => d.symbol === symbol);
  const btc = num(find('BTCUSDT')?.lastPrice);
  const eth = num(find('ETHUSDT')?.lastPrice);
  const sol = num(find('SOLUSDT')?.lastPrice);
  if (btc === null || eth === null || sol === null) throw new Error('Resposta inesperada da Binance');
  return {
    btc, eth, sol,
    btcChange: num(find('BTCUSDT')?.priceChangePercent),
    ethChange: num(find('ETHUSDT')?.priceChangePercent),
    solChange: num(find('SOLUSDT')?.priceChangePercent),
  };
}

async function fromCoinGecko(): Promise<CryptoQuotes> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const d = (await getJson(COINGECKO_URL)) as any;
  const btc = num(d?.bitcoin?.usd);
  const eth = num(d?.ethereum?.usd);
  const sol = num(d?.solana?.usd);
  if (btc === null || eth === null || sol === null) throw new Error('Resposta inesperada da CoinGecko');
  return {
    btc, eth, sol,
    btcChange: num(d.bitcoin.usd_24h_change),
    ethChange: num(d.ethereum.usd_24h_change),
    solChange: num(d.solana.usd_24h_change),
  };
}

async function fetchCrypto(): Promise<{ crypto: CryptoQuotes | null; source: MarketSnapshot['cryptoSource'] }> {
  try {
    return { crypto: await fromBinance(), source: 'Binance' };
  } catch {
    try {
      return { crypto: await fromCoinGecko(), source: 'CoinGecko' };
    } catch {
      return { crypto: null, source: null };
    }
  }
}

async function fetchDolar(): Promise<number | null> {
  try {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return num(((await getJson(AWESOMEAPI_URL)) as any)?.USDBRL?.bid);
  } catch {
    return null;
  }
}

/** Busca cotações; cada fonte falha de forma independente (valor `null`). */
export async function fetchMarket(): Promise<MarketSnapshot> {
  const [{ crypto, source }, dolar] = await Promise.all([fetchCrypto(), fetchDolar()]);
  return { crypto, cryptoSource: source, dolar };
}
