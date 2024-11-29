"use client";

import { useGameStore } from "@/stores/game-store";
import { Hand, PlayPause, ChartLineUp } from "@phosphor-icons/react";

export const Statsboard = () => {
  const coins = useGameStore((state) => state.coins);
  const botBet = useGameStore((state) => state.botBet);
  const userBet = useGameStore((state) => state.userBet);
  const poolCoins = botBet + userBet;

  return (
    <div>
      <section className="p-6 bg-neutral-900 rounded-t-lg">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-bold tracking-tight leading-tight">
            Current round
          </span>
          <ul className="flex flex-col gap-1">
            <li>
              <span className="text-lg font-medium leading-tight">
                Coins: {coins}
              </span>
            </li>
            <li>
              <span className="text-lg font-medium leading-tight">
                Bot Bet: {botBet}
              </span>
            </li>
            <li>
              <span className="text-lg font-medium leading-tight">
                User Bet: {botBet}
              </span>
            </li>
            <li>
              <span className="text-lg font-medium leading-tight">
                Coin Pool: {poolCoins}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <div className="flex gap-1">
        <button className="w-full bg-neutral-900 mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
          Bet
          <ChartLineUp size={22} />
        </button>
        <button className="w-full bg-neutral-900 mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
          Play Round
          <PlayPause size={22} />
        </button>
      </div>
      <button className="w-full bg-neutral-900 rounded-b-lg mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        Hold Hand
        <Hand size={22} />
      </button>
    </div>
  );
};
