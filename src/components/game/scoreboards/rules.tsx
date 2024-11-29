"use client";

import { ArrowRight } from "@phosphor-icons/react/dist/ssr";

export const HowToPlayBoard = () => {
  return (
    <div>
      <section className="p-6 bg-neutral-900 rounded-t-lg">
        <div className="flex flex-col gap-4">
          <h3 className="text-3xl font-bold tracking-tight leading-tight">
            How to play?
          </h3>
          <p className="text-sm ">add patterns here</p>
        </div>
      </section>
      <button className="w-full bg-neutral-900 mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        Game Rules
        <ArrowRight size={22} />
      </button>
      <button className="w-full bg-neutral-900 mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        Tips
        <ArrowRight size={22} />
      </button>
      <button className="w-full bg-neutral-900 mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        Import game
        <ArrowRight size={22} />
      </button>
      <button className="w-full bg-neutral-900 mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        Export game
        <ArrowRight size={22} />
      </button>
      <button className="w-full bg-red-700 rounded-b-lg mt-1 py-4 text-lg font-medium text-left px-6 flex items-center justify-between">
        Start a new game
        <ArrowRight size={22} />
      </button>
    </div>
  );
};
