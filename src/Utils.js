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
    btcusd: { ticker: "BTC/USD", name: "Bitcoin/US Dollar", keywords: "Aussie" },
    ethusd: { ticker: "ETH/USD", name: "Ethereum/US Dollar", keywords: "Aussie" },
  }
}

export function showAlert() {
  alert();
}

export function getRealSymbol(urlSymbol) {
  return CONSTANTS2.FOREXSYMBOLS[urlSymbol.ticker];
}


export let myGoodArray = [333423];
