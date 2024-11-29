import type { Icon } from "@phosphor-icons/react";

export type CardVariant = "cloud" | "moon" | "sun" | "planet" | "ship" | "star";

export interface Card {
  variant: CardVariant;
  icon: Icon;
  value: number;
  chance: number;
}
