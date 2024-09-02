export const CONSTANTS2 = {
  COLORS: {
    blue1: "#4371eb",
    red1: "#ea7880",
  },
  FOREXSYMBOLS: {
    audusd: "AUD/USD",
    euraud: "EUR/AUD",
    eurchf: "EUR/CHF",
    eurjpy: "EUR/JPY",
    eurusd: "EUR/USD",
    gbpusd: "GBP/USD",
    gbpjpy: "GBP/JPY",
    usdchf: "USD/CHF",
    usdjpy: "USD/JPY",
    btcusd: "BTC/USD",
  }
}

export function showAlert() {
  alert();
}

export function getRealSymbol(urlSymbol) {
  return CONSTANTS2.FOREXSYMBOLS[urlSymbol];
}


export let myGoodArray = [333423];
