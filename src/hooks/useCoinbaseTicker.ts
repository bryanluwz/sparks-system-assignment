import React from "react";
import { TickerData } from "../typings/component/Ticker";

type TickerMap = Record<string, TickerData>;

export const useCoinbaseTicker = (symbols: string[]) => {
  const [tickers, setTickers] = React.useState<TickerMap>({});
  const [connected, setConnected] = React.useState(false);

  const socketRef = React.useRef<WebSocket | null>(null);

  React.useEffect(() => {
    if (!symbols.length) {
      return;
    }

    const socket = new WebSocket("wss://ws-feed.exchange.coinbase.com");

    socketRef.current = socket;

    socket.onopen = () => {
      setConnected(true);

      socket.send(
        JSON.stringify({
          type: "subscribe",
          product_ids: symbols,
          channels: ["ticker"],
        }),
      );
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);

      if (message.type !== "ticker") {
        return;
      }

      const symbol = message.product_id;

      setTickers((previous) => ({
        ...previous,
        [symbol]: {
          bid: Number(message.best_bid),
          ask: Number(message.best_ask),
          provider: "Coinbase",
        },
      }));
    };

    socket.onerror = () => {
      setConnected(false);
    };

    socket.onclose = () => {
      setConnected(false);
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, [symbols.join(",")]);

  return {
    tickers,
    connected,
  };
};
