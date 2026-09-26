import React from "react";
import styles from "./style.module.scss";
import { TickersPage } from "./TickersPage";
import { useCoinbaseTicker } from "../hooks/useCoinbaseTicker";
import { postExecute } from "../apis/Tickers/apis";
import { AVAILABLE_TICKERS } from "../constants/Ticker";
import { TickerSidebar } from "../components/TickerSidebar";
import { Button, Flex, Stack } from "@mantine/core";

export const App = () => {
  const [sidebarOpened, setSidebarOpened] = React.useState(false);

  const [subscribedSymbols, setSubscribedSymbols] = React.useState<string[]>(
    () => {
      const saved = localStorage.getItem("subscribed-tickers");

      if (!saved) {
        return ["BTC-USD", "ETH-USD"];
      }

      try {
        return JSON.parse(saved);
      } catch {
        return ["BTC-USD", "ETH-USD"];
      }
    },
  );

  React.useEffect(() => {
    localStorage.setItem(
      "subscribed-tickers",
      JSON.stringify(subscribedSymbols),
    );
  }, [subscribedSymbols]);

  const toggleSubscription = (symbol: string) => {
    setSubscribedSymbols((current) =>
      current.includes(symbol)
        ? current.filter((item) => item !== symbol)
        : [...current, symbol],
    );
  };

  const subscribedTickers = AVAILABLE_TICKERS.filter((ticker) =>
    subscribedSymbols.includes(ticker.symbol),
  );

  const realSymbols = subscribedTickers
    .filter((ticker) => ticker.source === "coinbase")
    .map((ticker) => ticker.symbol);

  const { tickers } = useCoinbaseTicker(realSymbols);

  return (
    <>
      <TickerSidebar
        opened={sidebarOpened}
        onClose={() => setSidebarOpened(false)}
        availableTickers={AVAILABLE_TICKERS}
        subscribedSymbols={subscribedSymbols}
        onToggleSubscription={toggleSubscription}
      />
      <Stack gap={"md"} className={styles.container}>
        <Button w={200} onClick={() => setSidebarOpened(true)}>
          Manage tickers
        </Button>

        <TickersPage
          tickerSymbols={subscribedTickers}
          tickers={tickers}
          onExecute={postExecute}
        />
      </Stack>
    </>
  );
};

export default App;
