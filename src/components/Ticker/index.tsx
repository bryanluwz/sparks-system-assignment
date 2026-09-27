import {
  Badge,
  Button,
  Card,
  Container,
  Divider,
  Group,
  Loader,
  NumberInput,
  Stack,
  Text,
} from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { TickerProps, TradeSide } from "../../typings/component/Ticker";
import styles from "./style.module.scss";
import { LastUpdatedTimer } from "../LastUpdatedTimer";
import React, { memo } from "react";

const TickerComponent = ({
  symbol,
  title,
  fullname,
  data,
  connected = true,
  onExecute,
}: TickerProps) => {
  const [tradeAmount, setTradeAmount] = React.useState<number | string>(0);
  const [executingSide, setExecutingSide] = React.useState<TradeSide | null>(
    null,
  );
  const [priceFlash, setPriceFlash] = React.useState<{
    bid: "up" | "down" | null;
    ask: "up" | "down" | null;
  }>({
    bid: null,
    ask: null,
  });
  const currentBidRef = React.useRef<number>(0);
  const currentAskRef = React.useRef<number>(0);

  React.useEffect(() => {
    if (!data) {
      return;
    }

    setPriceFlash((current) => ({
      bid:
        data.bid > (currentBidRef.current ?? data.bid)
          ? "up"
          : data.bid < (currentBidRef.current ?? data.bid)
            ? "down"
            : null,
      ask:
        data.ask > (currentAskRef.current ?? data.ask)
          ? "up"
          : data.ask < (currentAskRef.current ?? data.ask)
            ? "down"
            : null,
    }));

    currentBidRef.current = data.bid;
    currentAskRef.current = data.ask;
  }, [data]);

  React.useEffect(() => {
    if (!priceFlash.bid && !priceFlash.ask) {
      return;
    }

    const timeoutId = setTimeout(() => {
      setPriceFlash({
        bid: null,
        ask: null,
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [priceFlash]);

  const tickerStatus = !data ? "LOADING" : connected ? "LIVE" : "STALE";

  const tickerTimer = (
    <Badge
      color={
        tickerStatus === "LIVE"
          ? "green"
          : tickerStatus === "STALE"
            ? "yellow"
            : "gray"
      }
      variant="light"
    >
      <LastUpdatedTimer
        time={data?.updatedAt ? new Date(data.updatedAt).toISOString() : ""}
        status={tickerStatus}
        messages={{
          LIVE: "LIVE",
          STALE: "STALE",
          ERROR: "Error updating",
          LOADING: "Loading...",
        }}
      />
    </Badge>
  );

  const amount = Number(tradeAmount);

  const hasValidAmount =
    tradeAmount !== "" && Number.isFinite(amount) && amount > 0;

  const executeTrade = async (side: TradeSide) => {
    if (!data || !hasValidAmount) {
      return;
    }

    // BUY executes against ASK
    // SELL executes against BID
    const price = side === "BUY" ? data.ask : data.bid;

    try {
      setExecutingSide(side);

      await onExecute(symbol, side, amount, Number(price));

      notifications.show({
        title: "Trade successful",
        message: `${side} ${amount} ${symbol} @ ${price}`,
        color: "green",
        position: "top-right",
      });
    } catch (error) {
      notifications.show({
        title: "Trade failed",
        message:
          error instanceof Error ? error.message : "Unable to execute trade.",
        color: "red",
        position: "top-right",
      });
    } finally {
      setExecutingSide(null);
    }
  };

  if (!data) {
    return (
      <Container p={0} className={styles.tickerContainer}>
        <Card withBorder radius="md" p="lg" className={styles.tickerCard}>
          <Stack align="center" justify="center" py="xl">
            <Loader size="sm" />

            <Text size="sm" c="dimmed">
              Loading ticker {symbol} ...
            </Text>
          </Stack>
        </Card>
      </Container>
    );
  }

  const buyPrice = Number(data.ask);
  const sellPrice = Number(data.bid);

  const buyTotal = hasValidAmount ? amount * buyPrice : 0;
  const sellTotal = hasValidAmount ? amount * sellPrice : 0;

  return (
    <Container p={0} className={styles.tickerContainer}>
      <Card withBorder radius="md" p="lg" className={styles.tickerCard}>
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between">
            <div>
              <Text fw={700} size="lg">
                {title}
              </Text>

              <Text size="xs" c="dimmed">
                {fullname}
              </Text>

              <Text size="xs" c="dimmed">
                Provider: {data.provider ?? "No provider"}
              </Text>
            </div>

            {tickerTimer}
          </Group>

          <Divider />

          {/* Bid / Ask */}
          <Group grow align="stretch">
            {/* Bid */}
            <Card withBorder p="md">
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  BID
                </Text>

                <Text
                  size="xl"
                  fw={700}
                  className={
                    priceFlash.bid === "up"
                      ? styles.priceUp
                      : priceFlash.bid === "down"
                        ? styles.priceDown
                        : undefined
                  }
                >
                  {data.bid}
                </Text>
              </Stack>
            </Card>

            {/* Ask */}
            <Card withBorder p="md">
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  ASK
                </Text>

                <Text
                  size="xl"
                  fw={700}
                  className={
                    priceFlash.ask === "up"
                      ? styles.priceUp
                      : priceFlash.ask === "down"
                        ? styles.priceDown
                        : undefined
                  }
                >
                  {data.ask}
                </Text>
              </Stack>
            </Card>
          </Group>

          <Divider />

          {/* Trade amount */}
          <NumberInput
            label="Trade Amount"
            placeholder="Enter amount"
            min={0}
            decimalScale={2}
            value={tradeAmount}
            onChange={setTradeAmount}
            disabled={executingSide !== null}
          />

          {/* Execution */}
          <Group grow>
            {/* SELL */}
            <Stack
              gap={4}
              align="stretch"
              className={styles.executionButtonContainer}
            >
              <Button
                color="red"
                size="lg"
                className={styles.executionButton}
                fullWidth
                disabled={!hasValidAmount || executingSide !== null}
                loading={executingSide === "SELL"}
                onClick={() => executeTrade("SELL")}
              >
                <Stack gap={0} align="flex-start">
                  <Text size="xs" fw={600}>
                    SELL
                  </Text>

                  <Text size="sm" fw={500}>
                    {sellTotal.toFixed(2)}
                  </Text>
                </Stack>
              </Button>

              <Text size="xs" c="dimmed" ta="center">
                {hasValidAmount
                  ? `${tradeAmount} @ ${sellPrice}`
                  : "Enter amount"}
              </Text>
            </Stack>

            {/* BUY */}
            <Stack
              gap={4}
              align="stretch"
              className={styles.executionButtonContainer}
            >
              <Button
                color="green"
                size="lg"
                className={styles.executionButton}
                fullWidth
                disabled={!hasValidAmount || executingSide !== null}
                loading={executingSide === "BUY"}
                onClick={() => executeTrade("BUY")}
              >
                <Stack gap={0} align="flex-start">
                  <Text size="xs" fw={600}>
                    BUY
                  </Text>

                  <Text size="sm" fw={500}>
                    {buyTotal.toFixed(2)}
                  </Text>
                </Stack>
              </Button>

              <Text size="xs" c="dimmed" ta="center">
                {hasValidAmount
                  ? `${tradeAmount} @ ${buyPrice}`
                  : "Enter amount"}
              </Text>
            </Stack>
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};

export default memo(TickerComponent);
