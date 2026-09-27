import { TickerConfig } from "../typings/component/Ticker";

const AVAILABLE_TICKERS: TickerConfig[] = [
  // Major
  {
    symbol: "BTC-USD",
    title: "BTC/USD",
    fullname: "Bitcoin",
    source: "coinbase",
  },
  {
    symbol: "ETH-USD",
    title: "ETH/USD",
    fullname: "Ethereum",
    source: "coinbase",
  },
  {
    symbol: "SOL-USD",
    title: "SOL/USD",
    fullname: "Solana",
    source: "coinbase",
  },
  {
    symbol: "XRP-USD",
    title: "XRP/USD",
    fullname: "XRP",
    source: "coinbase",
  },

  // Others??
  {
    symbol: "ADA-USD",
    title: "ADA/USD",
    fullname: "Cardano",
    source: "coinbase",
  },
  {
    symbol: "AVAX-USD",
    title: "AVAX/USD",
    fullname: "Avalanche",
    source: "coinbase",
  },
  {
    symbol: "LINK-USD",
    title: "LINK/USD",
    fullname: "Chainlink",
    source: "coinbase",
  },
  {
    symbol: "DOT-USD",
    title: "DOT/USD",
    fullname: "Polkadot",
    source: "coinbase",
  },
  {
    symbol: "LTC-USD",
    title: "LTC/USD",
    fullname: "Litecoin",
    source: "coinbase",
  },
  {
    symbol: "BCH-USD",
    title: "BCH/USD",
    fullname: "Bitcoin Cash",
    source: "coinbase",
  },
  {
    symbol: "UNI-USD",
    title: "UNI/USD",
    fullname: "Uniswap",
    source: "coinbase",
  },
  {
    symbol: "ATOM-USD",
    title: "ATOM/USD",
    fullname: "Cosmos",
    source: "coinbase",
  },
  {
    symbol: "ETC-USD",
    title: "ETC/USD",
    fullname: "Ethereum Classic",
    source: "coinbase",
  },
  {
    symbol: "XLM-USD",
    title: "XLM/USD",
    fullname: "Stellar",
    source: "coinbase",
  },
  {
    symbol: "ALGO-USD",
    title: "ALGO/USD",
    fullname: "Algorand",
    source: "coinbase",
  },
  {
    symbol: "AAVE-USD",
    title: "AAVE/USD",
    fullname: "Aave",
    source: "coinbase",
  },
  {
    symbol: "NEAR-USD",
    title: "NEAR/USD",
    fullname: "NEAR Protocol",
    source: "coinbase",
  },
  {
    symbol: "MATIC-USD",
    title: "MATIC/USD",
    fullname: "Polygon",
    source: "coinbase",
  },
];

const MOCK_TICKERS: TickerConfig[] = Array.from(
  { length: 100 },
  (_, index) => ({
    symbol: `FAKE-${index + 1}`,
    title: `FAKE-${index + 1}/USD`,
    fullname: `Fake Asset ${index + 1}`,
    source: "mock" as const,
  }),
);

export const ALL_AVAILABLE_TICKERS: TickerConfig[] = [
  ...AVAILABLE_TICKERS,
  ...MOCK_TICKERS,
];
