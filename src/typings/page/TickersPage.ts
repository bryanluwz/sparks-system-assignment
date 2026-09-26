import { TickerProps } from "../component/Ticker";

export interface TickersPageProps {
  tickerSymbols: Omit<TickerProps, "onFetch" | "onExecute">[];
}
