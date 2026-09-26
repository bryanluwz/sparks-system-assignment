import React from "react";
import styles from "./style.module.scss";
import { TickersPage } from "./TickersPage";
import { TickerProps } from "../typings/component/Ticker";

const tickerSymbols: Omit<TickerProps, "onFetch" | "onExecute">[] = [
  { symbol: "BTC", title: "BTC/USD", fullname: "Bitcoin" },
  { symbol: "ETH", title: "ETH/USD", fullname: "Ethereum" },
  // { symbol: "LTC", title: "Litecoin", fullname: "Litecoin" },
];

export const App = () => {
  return (
    <>
      <div className={styles.container}>
        <TickersPage tickerSymbols={tickerSymbols} />
      </div>
    </>
  );
};

export default App;
