export const CONSTANTS2 = {
  COLORS: {
    blue1: "#4371eb",
    red1: "#ea7880",
  },
  FOREXSYMBOLS: {
    audusd: { ticker: "AUD/USD", name: "", keywords: "Aussie" },
    euraud: { ticker: "EUR/AUD", name: "", keywords: "Aussie" },
    eurchf: { ticker: "EUR/CHF", name: "", keywords: "Aussie" },
    eurjpy: { ticker: "EUR/JPY", name: "Japanese Yen", keywords: "Aussie" },
    eurusd: { ticker: "EUR/USD", name: "", keywords: "Aussie" },
    gbpusd: { ticker: "GBP/USD", name: "", keywords: "Aussie" },
    gbpjpy: { ticker: "GBP/JPY", name: "", keywords: "Aussie" },
    usdchf: { ticker: "USD/CHF", name: "", keywords: "Aussie" },
    usdjpy: { ticker: "USD/JPY", name: "", keywords: "Aussie" },
    bnbusd: { ticker: "BNB/USD", name: "Binance Coin/US Dollar", keywords: "Binance" },
    btcusd: { ticker: "BTC/USD", name: "Bitcoin/US Dollar", keywords: "Bitcoin" },
    ethusd: { ticker: "ETH/USD", name: "Ethereum/US Dollar", keywords: "Ethereum 2.0" },
    solusd: { ticker: "SOL/USD", name: "Solana/US Dollar", keywords: "Aussie" },
    trxusd: { ticker: "TRX/USD", name: "Tron/US Dollar", keywords: "Tron" },
  }
}

export function showAlert() {
  alert();
}

export function getRealSymbol(urlSymbol) {
  return CONSTANTS2.FOREXSYMBOLS[urlSymbol.ticker];
}


export let myGoodArray = [333423];
