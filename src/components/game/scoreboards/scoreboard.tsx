"use client";

import { useGameStore } from "@/stores/game-store";
import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const Scoreboard = () => {
  const level = useGameStore((state) => state.level);
  const round = useGameStore((state) => state.round);

  return (
    <div>
      <section className="p-6 bg-neutral-900 rounded-t-lg">
        <div className="flex flex-col gap-4">
          <span className="text-3xl font-bold tracking-tight leading-tight">
            Pokko.
          </span>
          <ul className="flex flex-col gap-1">
            <li>
              <span className="text-lg font-medium leading-tight">
                Star Level: {level}
              </span>
            </li>
            <li>
              <span className="text-lg font-medium leading-tight">
                Round: {round}
              </span>
            </li>
          </ul>
        </div>
      </section>
      <button className="w-full bg-neutral-900 rounded-b-lg  mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        See all statistics
        <ArrowRight size={22} />
      </button>
    </div>
  );
};
