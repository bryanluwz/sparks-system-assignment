import {
  TickerConfig,
  TickerData,
  TickerProps,
  TradeSide,
} from "../component/Ticker";

export interface TickersPageProps {
  tickerSymbols: TickerConfig[];
  tickers: Record<string, TickerData>;
  onExecute: (
    symbol: string,
    side: TradeSide,
    amount: number,
    price: number,
  ) => Promise<void>;
}
