export interface TickerData {
  ask: string;
  bid: string;
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
