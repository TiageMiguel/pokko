import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface State {
  allTimeCoins: number;
  allTimeLevel: number;
  allTimeRound: number;
  maxCoins: number;
  maxLevel: number;
  maxRound: number;
}

interface Actions {
  setAllTimeCoins: (coins: number) => void;
  setAllTimeLevel: (level: number) => void;
  setAllTimeRound: (round: number) => void;
  setNewMaxCoins: (coins: number) => void;
  setNewMaxLevel: (level: number) => void;
  setNewMaxRound: (round: number) => void;
}

export const useGameStore = create(
  persist<State & Actions>(
    (set) => ({
      allTimeCoins: 0,
      allTimeLevel: 0,
      allTimeRound: 0,
      maxCoins: 0,
      maxLevel: 0,
      maxRound: 0,
      setAllTimeCoins: (coins) => {
        set((state) => ({
          allTimeCoins: coins,
        }));
      },
      setAllTimeLevel: (level) => {
        set((state) => ({
          allTimeLevel: level,
        }));
      },
      setAllTimeRound: (round) => {
        set((state) => ({
          allTimeRound: round,
        }));
      },
      setNewMaxCoins: () => {},
      setNewMaxLevel: () => {},
      setNewMaxRound: () => {},
    }),
    {
      name: "statistics-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
