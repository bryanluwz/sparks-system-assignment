export type TickerStatus = "LIVE" | "STALE" | "ERROR" | "LOADING";

export interface LastUpdatedTimerProps {
  time?: string;
  status: TickerStatus;
  messages: {
    LIVE: string;
    STALE: string;
    ERROR: string;
    LOADING: string;
  };
}
