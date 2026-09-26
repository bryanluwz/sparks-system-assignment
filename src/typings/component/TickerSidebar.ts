import { TickerConfig } from "./Ticker";

export interface TickerSidebarProps {
  opened: boolean;
  onClose: () => void;
  availableTickers: TickerConfig[];
  subscribedSymbols: string[];
  onToggleSubscription: (symbol: string) => void;
}
