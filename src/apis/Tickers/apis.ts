import { TickerData, TradeSide } from "../../typings/component/Ticker";
import { _fetch, handleError } from "../utils";

export const fetchTicker = async (ticker: string): Promise<TickerData> => {
  const response = await _fetch(
    `https://api.exchange.coinbase.com/products/${ticker}-USD/ticker`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.json() as unknown as TickerData;
};

export const postExecute = async (
  symbol: string,
  side: TradeSide,
  amount: number,
  price: number,
): Promise<void> => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
};
