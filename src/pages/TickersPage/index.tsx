import React from "react";
import { Ticker } from "../../components/Ticker";
import { TickerData } from "../../typings/component/Ticker";
import { TickersPageProps } from "../../typings/page/TickersPage";
import { fetchTicker, postExecute } from "../../apis/Tickers/apis";
import { Flex } from "@mantine/core";

export const TickersPage = ({ tickerSymbols }: TickersPageProps) => {
  return (
    <Flex gap={"sm"}>
      {tickerSymbols.map((ticker) => (
        <div key={ticker.symbol}>
          <Ticker onFetch={fetchTicker} onExecute={postExecute} {...ticker} />
        </div>
      ))}
    </Flex>
  );
};
