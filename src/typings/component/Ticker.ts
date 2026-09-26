export interface TickerData {
  ask: number;
  bid: number;
  volume: string;
  trade_id: number;
  price: string;
  size: string;
  time: string;
  rfq_volume: string;
  provider: string;
  updatedAt: number;
}

export type TradeSide = "BUY" | "SELL";

export interface TickerProps {
  symbol: string;
  title: string;
  fullname: string;
  data?: TickerData;
  onExecute: (
    symbol: string,
    side: TradeSide,
    amount: number,
    price: number,
  ) => Promise<void>;
}

export type TickerSource = "coinbase" | "mock";

export type TickerConfig = {
  symbol: string;
  title: string;
  fullname: string;
  source: TickerSource;
};
