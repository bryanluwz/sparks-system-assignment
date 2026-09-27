import { TickerData } from "../../typings/component/Ticker";

const prices: Record<string, number> = {};

export const startMockTicker = (
  symbols: string[],
  onUpdate: (symbol: string, data: TickerData) => void,
) => {
  symbols.forEach((symbol, index) => {
    prices[symbol] = 100 + index * 10;
  });

  const intervalId = setInterval(() => {
    symbols.forEach((symbol) => {
      const currentPrice = prices[symbol];

      const movement = (Math.random() - 0.5) * 2;

      const mid = currentPrice + movement;

      const spread = mid * 0.001;

      const bid = mid - spread / 2;
      const ask = mid + spread / 2;

      prices[symbol] = mid;

      onUpdate(symbol, {
        bid,
        ask,
        provider: "mock",
        updatedAt: Date.now(),
      });
    });
  }, 500);

  return () => clearInterval(intervalId);
};
