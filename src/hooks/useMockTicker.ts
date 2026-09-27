import React from "react";
import { TickerData } from "../typings/component/Ticker";

export const useMockTicker = (symbols: string[]) => {
  const [tickers, setTickers] = React.useState<Record<string, TickerData>>({});

  React.useEffect(() => {
    if (symbols.length === 0) {
      setTickers({});
      return;
    }

    const prices: Record<string, number> = {};

    symbols.forEach((symbol, index) => {
      prices[symbol] = 100 + index * 10;
    });

    const intervalId = setInterval(() => {
      setTickers((current) => {
        const next = { ...current };

        symbols.forEach((symbol) => {
          const currentPrice = prices[symbol];

          const movement = (Math.random() - 0.5) * 2;
          const mid = currentPrice + movement;
          const spread = mid * 0.001;

          const bid = Number((mid - spread / 2).toFixed(4));
          const ask = Number((mid + spread / 2).toFixed(4));

          prices[symbol] = mid;

          next[symbol] = {
            bid,
            ask,
            provider: "Mock",
            updatedAt: Date.now(),
          };
        });

        return next;
      });
    }, 10);

    return () => clearInterval(intervalId);
  }, [symbols]);

  return { tickers };
};
