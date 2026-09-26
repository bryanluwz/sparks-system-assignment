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
import {
  TickerData,
  TickerProps,
  TradeSide,
} from "../../typings/component/Ticker";
import styles from "./style.module.scss";
import { LastUpdatedTimer } from "../LastUpdatedTimer";
import React, { useCallback, useEffect } from "react";

export const Ticker = ({
  symbol,
  title,
  fullname,
  onFetch,
  onExecute,
}: TickerProps) => {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(false);
  const [lastUpdated, setLastUpdated] = React.useState<string>("");
  const [data, setData] = React.useState<TickerData>();
  const [now, setNow] = React.useState(Date.now());

  const [tradeAmount, setTradeAmount] = React.useState<number | string>("");
  const [executingSide, setExecutingSide] = React.useState<TradeSide | null>(
    null,
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => clearInterval(intervalId);
  }, []);

  const fetchTicker = useCallback(async () => {
    try {
      setLoading(true);
      setError(false);

      const tickerData = await onFetch(symbol);

      setData(tickerData);
      setLastUpdated(new Date().toISOString());
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [symbol, onFetch]);

  const tickerStatus = React.useMemo(() => {
    if (loading) {
      return "LOADING";
    }

    if (error) {
      return "ERROR";
    }

    if (!lastUpdated) {
      return "STALE";
    }

    const elapsed = Date.now() - new Date(lastUpdated).getTime();

    if (elapsed > 5000) {
      return "STALE";
    }

    return "LIVE";
  }, [loading, error, lastUpdated, now]);

  useEffect(() => {
    fetchTicker();

    const intervalId = setInterval(fetchTicker, 8000);

    return () => clearInterval(intervalId);
  }, [fetchTicker]);

  const tickerTimer = (
    <Badge
      color={
        tickerStatus === "LIVE"
          ? "green"
          : tickerStatus === "STALE"
            ? "yellow"
            : tickerStatus === "ERROR"
              ? "red"
              : "gray"
      }
      variant="light"
    >
      <LastUpdatedTimer
        time={lastUpdated}
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

    const price = side === "BUY" ? data.ask : data.bid;

    try {
      setExecutingSide(side);

      await onExecute(symbol, side, amount, Number(price));

      notifications.show({
        title: "Trade successful",
        message: `${side} ${amount} ${symbol} @ ${price}`,
        color: "green",
      });
    } catch (error) {
      notifications.show({
        title: "Trade failed",
        message:
          error instanceof Error ? error.message : "Unable to execute trade.",
        color: "red",
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
            {loading ? (
              <>
                <Loader size="sm" />
                <Text size="sm" c="dimmed">
                  Loading ticker...
                </Text>
              </>
            ) : (
              <Text size="sm" c="red">
                Unable to load ticker.
              </Text>
            )}
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
            <Card withBorder p="md">
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  BID
                </Text>

                <Text size="xl" fw={700}>
                  {data.bid}
                </Text>
              </Stack>
            </Card>

            <Card withBorder p="md">
              <Stack gap={4}>
                <Text size="xs" c="dimmed">
                  ASK
                </Text>

                <Text size="xl" fw={700}>
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
          </Group>
        </Stack>
      </Card>
    </Container>
  );
};
