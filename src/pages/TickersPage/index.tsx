import { SimpleGrid } from "@mantine/core";
import Ticker from "../../components/Ticker";
import { TickersPageProps } from "../../typings/page/TickersPage";
import React from "react";

export const TickersPage = ({
  tickerSymbols,
  tickers,
  onExecute,
}: TickersPageProps) => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 2, lg: 3, xl: 4 }} spacing="md">
      {tickerSymbols.map((ticker) => (
        <Ticker
          key={ticker.symbol}
          {...ticker}
          data={tickers[ticker.symbol]}
          onExecute={onExecute}
        />
      ))}
    </SimpleGrid>
  );
};
