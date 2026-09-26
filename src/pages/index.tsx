import React from "react";
import styles from "./style.module.scss";
import { TickersPage } from "./TickersPage";
import { useCoinbaseTicker } from "../hooks/useCoinbaseTicker";
import { TickerProps, TradeSide } from "../typings/component/Ticker";
import { postExecute } from "../apis/Tickers/apis";

const tickerSymbols: Omit<TickerProps, "data" | "onExecute">[] = [
  {
    symbol: "BTC-USD",
    title: "BTC/USD",
    fullname: "Bitcoin",
  },
  {
    symbol: "ETH-USD",
    title: "ETH/USD",
    fullname: "Ethereum",
  },
];

export const App = () => {
  const symbols = tickerSymbols.map((ticker) => ticker.symbol);

  const { tickers } = useCoinbaseTicker(symbols);

  return (
    <div className={styles.container}>
      <TickersPage
        tickerSymbols={tickerSymbols}
        tickers={tickers}
        onExecute={postExecute}
      />
    </div>
  );
};

export default App;
