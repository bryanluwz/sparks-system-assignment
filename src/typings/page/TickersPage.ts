import { TickerData, TickerProps, TradeSide } from "../component/Ticker";

export interface TickersPageProps {
  tickerSymbols: Omit<TickerProps, "data" | "onExecute">[];
  tickers: Record<string, TickerData>;
  onExecute: (
    symbol: string,
    side: TradeSide,
    amount: number,
    price: number,
  ) => Promise<void>;
}
