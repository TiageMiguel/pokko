"use client";

import { useGameStore } from "@/stores/game-store";
import { useMemo } from "react";

function calculateMinimumBet(level: number): number {
  const baseBet = 3;
  const growthRate = 1.1;

  return Math.floor(baseBet * Math.pow(growthRate, level - 1));
}

export const Bet = () => {
  const coins = useGameStore((state) => state.coins);
  const userBet = useGameStore((state) => state.userBet);
  const level = useGameStore((state) => state.level);
  const addCoinsToUserBet = useGameStore((state) => state.addCoinsToUserBet);

  const minimumBet = useMemo(() => calculateMinimumBet(level), [level]);

  function onClick() {
    addCoinsToUserBet(minimumBet);

    console.log(calculateMinimumBet(level));
  }

  return (
    <div>
      <button
        className=" bg-neutral-900 rounded-lg  py-4 text-lg font-medium text-left px-6 flex items-center justify-between"
        onClick={onClick}
      >
        BET +{minimumBet}
      </button>
    </div>
  );
};
