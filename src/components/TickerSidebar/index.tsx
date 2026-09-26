import {
  ActionIcon,
  Badge,
  Button,
  Divider,
  Drawer,
  Group,
  ScrollArea,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { IconSearch, IconX } from "@tabler/icons-react";
import React from "react";
import { TickerSidebarProps } from "../../typings/component/TickerSidebar";

export const TickerSidebar = ({
  opened,
  onClose,
  availableTickers,
  subscribedSymbols,
  onToggleSubscription,
}: TickerSidebarProps) => {
  const [search, setSearch] = React.useState("");

  const filteredTickers = availableTickers.filter((ticker) => {
    const query = search.toLowerCase();

    return (
      ticker.symbol.toLowerCase().includes(query) ||
      ticker.fullname.toLowerCase().includes(query)
    );
  });

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      title="Manage tickers"
      position="left"
      size={320}
    >
      <Stack gap="md">
        <Text size="sm" c="dimmed">
          Subscribe to the instruments you want to display.
        </Text>

        <TextInput
          placeholder="Search tickers..."
          leftSection={<IconSearch size={16} />}
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
        />

        <Group justify="space-between">
          <Text size="sm" fw={600}>
            Available
          </Text>

          <Badge variant="light">{subscribedSymbols.length} subscribed</Badge>
        </Group>

        <Divider />

        <ScrollArea h="calc(100vh - 240px)">
          <Stack gap="xs">
            {filteredTickers.map((ticker) => {
              const subscribed = subscribedSymbols.includes(ticker.symbol);

              return (
                <Group
                  key={ticker.symbol}
                  justify="space-between"
                  wrap="nowrap"
                >
                  <div>
                    <Text size="sm" fw={600}>
                      {ticker.title}
                    </Text>

                    <Text size="xs" c="dimmed">
                      {ticker.fullname}
                    </Text>
                  </div>

                  <Button
                    size="xs"
                    variant={subscribed ? "light" : "filled"}
                    color={subscribed ? "red" : undefined}
                    onClick={() => onToggleSubscription(ticker.symbol)}
                  >
                    {subscribed ? "Unsubscribe" : "Subscribe"}
                  </Button>
                </Group>
              );
            })}
          </Stack>
        </ScrollArea>
      </Stack>
    </Drawer>
  );
};
