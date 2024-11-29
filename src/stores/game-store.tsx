import type { CardVariant } from "@/types/game-types";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  round: number;
  level: number;
  coins: number;
  botBet: number;
  botHand: CardVariant[];
  BotHandTradeIn: number[];
  userBet: number;
  userHand: CardVariant[];
  userHandTradeIn: number[];
}

interface Actions {
  increaseLevel: () => void;
  decreaseLevel: () => void;
  addCoinsToUserBet: (bet: number) => void;
}

export const useGameStore = create(
  persist<State & Actions>(
    (set) => ({
      round: 1,
      level: 0,
      coins: 10,
      botBet: 0,
      botHand: [],
      BotHandTradeIn: [],
      userBet: 0,
      userHand: [],
      userHandTradeIn: [],
      increaseRound: () => set((state) => ({ round: state.round + 1 })),
      increaseLevel: () => set((state) => ({ level: state.level + 1 })),
      decreaseLevel: () => set((state) => ({ level: state.level - 1 })),
      addCoinsToUserBet: (bet) =>
        set((state) => {
          if (state.coins - bet < 0) return state;
          return { userBet: state.userBet + bet, coins: state.coins - bet };
        }),
    }),
    {
      name: "game-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
