"use client";

import { GameCard } from "@/components/game/card";
import { Bet } from "@/components/game/controls/bet";
import { HowToPlayBoard } from "@/components/game/scoreboards/rules";
import { Scoreboard } from "@/components/game/scoreboards/scoreboard";
import { Statsboard } from "@/components/game/scoreboards/statsboard";
import { Footer } from "@/components/layout/footer";
import {
  drawHand,
  evaluateHand,
  GAME_CARDS,
  getRandomCard,
} from "@/constants/game";
import { useGameStore } from "@/stores/game-store";
import { Card } from "@/types/game-types";
import {
  Cloud,
  FlyingSaucer,
  MoonStars,
  Planet,
  Sparkle,
  Sun,
} from "@phosphor-icons/react/dist/ssr";
import { useEffect, useState } from "react";

export default function Home() {
  const [gameRunning, setGameRunning] = useState<boolean>(true);
  const [round, setRound] = useState<number>(0);
  const [level, setLevel] = useState<number>(0);
  const [coins, setCoins] = useState<number>(10);
  const [poolCoins, setPoolCoins] = useState<number>(0);

  const [botHand, setBotHand] = useState<Card[]>([]);
  const [userHand, setUserHand] = useState<Card[]>([]);
  const [userHandNewCards, setUserHandNewCards] = useState<number[]>([]);

  function playGame() {
    const clonedBotHand = [...botHand];

    // Update user hand if new cards are selected
    if (userHandNewCards.length > 0) {
      const clonedHand = [...userHand];
      userHandNewCards.forEach((cardIndex) => {
        clonedHand[cardIndex] = getRandomCard();
      });

      setUserHand(clonedHand);
      setUserHandNewCards([]); // Reset selected cards after drawing
    }

    // Bot logic to replace random cards
    const botHandIndicesToReplace = getRandomBotHandIndices();
    if (botHandIndicesToReplace.length > 0) {
      botHandIndicesToReplace.forEach((cardIndex) => {
        clonedBotHand[cardIndex] = getRandomCard();
      });

      setBotHand(clonedBotHand);
    }

    // Evaluate both hands
    const userResult = evaluateHand(userHand);
    const botResult = evaluateHand(clonedBotHand);

    // Determine results and handle coins
    if (userResult.score > botResult.score) {
      console.log("User wins!");
      setCoins((prevCoins) => prevCoins + poolCoins); // Award pool to the user
      setPoolCoins(0); // Reset pool
    } else if (botResult.score > userResult.score) {
      console.log("Bot wins!");
      setPoolCoins(0); // Bot takes the pool (no change to player's coins)
    } else {
      console.log("It's a tie!");
      // In case of a tie, refund the player their coins
      const refund = poolCoins / 2;
      setCoins((prevCoins) => prevCoins + refund);
      setPoolCoins(0);
    }

    // Update round and level
    setRound((prevRound) => prevRound + 1);
    if (userResult.score > botResult.score) {
      setLevel((prevLevel) => prevLevel + 1);
    } else if (botResult.score > userResult.score) {
      setLevel((prevLevel) => {
        if (prevLevel > 0) {
          return prevLevel - 1;
        }

        return 0;
      });
    }

    // give new hands
    setBotHand(drawHand());
    setUserHand(drawHand());

    // console.log("USER:");
    // console.log({ userHand, userResult });
    // console.log("BOT:");
    // console.log({ botHand, botResult });
  }

  // Helper function to get random bot hand indices
  function getRandomBotHandIndices(): number[] {
    const numberOfCardsToReplace = Math.floor(Math.random() * 3); // Replace 0–2 cards
    const indices = Array.from({ length: 5 }, (_, index) => index);
    return shuffle(indices).slice(0, numberOfCardsToReplace);
  }

  // Utility function to shuffle an array
  function shuffle<T>(array: T[]): T[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  const startGame = () => {
    const startingBet = 3;
    setCoins((prev) => prev - startingBet);
    setPoolCoins((prev) => prev + startingBet);
    setBotHand(drawHand());
    setUserHand(drawHand());
  };

  const handleBetClick = () => {
    const betAmount = 1;
    setCoins((prev) => prev - betAmount);
    setPoolCoins((prev) => prev + betAmount);
  };

  const handleGameCardClick = (index: number) => {
    setUserHandNewCards((prev) =>
      prev.includes(index)
        ? prev.filter((cardIndex) => cardIndex !== index)
        : [...prev, index]
    );
  };

  useEffect(() => {
    startGame();
  }, []); // Empty dependency array ensures this runs once on mount.

  return (
    <div className="flex flex-col gap-2 h-full">
      <div className="grid flex-1 grid-cols-5 gap-2">
        {botHand.map((card, idx) => (
          <GameCard key={idx} variant={card.variant} state="inactive" />
        ))}
      </div>
      <div className="grid flex-1 grid-cols-5 gap-2 items-end">
        {userHand.map((card, idx) => (
          <GameCard
            key={idx}
            onClick={() => handleGameCardClick(idx)}
            variant={card.variant}
            state={userHandNewCards.includes(idx) ? "active" : "default"}
          />
        ))}
      </div>
    </div>
  );
}
