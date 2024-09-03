export const CONSTANTS2 = {
  COLORS: {
    blue1: "#4371eb",
    red1: "#ea7880",
  }
};


export let FOREXSYMBOLS = {
  audusd: { ticker: "AUD/USD", name: "", keywords: "Aussie" },
  euraud: { ticker: "EUR/AUD", name: "", keywords: "Aussie" },
  eurchf: { ticker: "EUR/CHF", name: "Euro / Swiss Franc", keywords: "Aussie" },
  eurjpy: { ticker: "EUR/JPY", name: "Japanese Yen", keywords: "Aussie" },
  eurusd: { ticker: "EUR/USD", name: "", keywords: "Fiber" },
  gbpusd: { ticker: "GBP/USD", name: "", keywords: "Aussie" },
  gbpjpy: { ticker: "GBP/JPY", name: "", keywords: "Aussie" },
  nzdjpy: { ticker: "NZD/JPY", name: "", keywords: "Kiwi" },
  usdchf: { ticker: "USD/CHF", name: "", keywords: "Aussie" },
  usdjpy: { ticker: "USD/JPY", name: "", keywords: "Yen" },
  bchusd: { ticker: "BCH/USD", name: "Bitcoin Cash / US Dollar", keywords: "Bitcoin" },
  bnbusd: { ticker: "BNB/USD", name: "Binance Coin / US Dollar", keywords: "Binance" },
  btcusd: { ticker: "BTC/USD", name: "Bitcoin / US Dollar", keywords: "Bitcoin" },
  dogeusd: { ticker: "DOGE/BTC", name: "Dogecoin / US Dollar", keywords: "Doge Meme Dog Dogcoin" },
  eurbtc: { ticker: "EUR/BTC", name: "Euro / US Dollar", keywords: "Nakamoto" },
  ethusd: { ticker: "ETH/USD", name: "Ethereum / US Dollar", keywords: "Ethereum 2.0" },
  xmrusd: { ticker: "XMR/USD", name: "Monero / US Dollar", keywords: "Monero" },
  solusd: { ticker: "SOL/USD", name: "Solana / US Dollar", keywords: "Solana" },
  trxusd: { ticker: "TRX/USD", name: "Tron / US Dollar", keywords: "Tron" },
  xrpusd: { ticker: "XRP/USD", name: "Ripple / US Dollar", keywords: "Ripple" },
};

/*
    USD (U.S. Dollar) – Greenback or Buck
    GBP (British Pound) – Sterling
    EUR (Euro) – Fiber
    CHF (Swiss Franc) – Swissy
    CAD (Canadian Dollar) – Loonie
    AUD (Australian Dollar) – Aussie
    NZD (New Zealand Dollar)- Kiwi
    NOK (Norwegian Krone) – Noki
    SEK (Swedish Krona) – Stoki
    EUR/GBP (Euro/ British Pound) – Chunnel
    EUR/JPY (Euro/ Japanese Yen nickname) – Euppy
    EUR/USD (Euro/ U.S Dollar) – Fiber
    GBP/USD (British Pound/ U.S Dollar) – Cable
    GBP/JPY (British Pound) – Gopher
    USD/JPY (U.S Dollar/ Japanese Yen nickname) – Ninja
    USD/RUB ( U.S Dollar/ Russian Ruble) – Barney
    EUR/RUB ( Euro / Russian Ruble) – Betty
    EUR/BTC ( EURO/Bitcoin ) – Nakamoto

    */

export function getRealSymbol(urlSymbol) {
  return FOREXSYMBOLS[urlSymbol]['ticker'];
}

export let myGoodArray = [333423];
