import { useGameStore } from "@/stores/game-store";
import { GAME_CARDS, getRandomCard } from "@/constants/game";

type Card = string;

const ALLOWED_PATTERNS = [[5], [4], [3, 2], [3], [2, 2], [2]];

export const useGameLogic = () => {
  const {
    poolCoins,
    botHand,
    userHand,
    userHandTradeIn,
    updateCoins,
    updatePoolCoins,
    setBotHand,
    setUserHand,
    resetUserHandTradeIn,
  } = useGameStore();

  const drawCards = (): Card[] =>
    Array.from({ length: 5 }, () => getRandomCard());

  const evaluateHand = (hand: Card[]) => {
    const cardCounts: Record<string, number> = {};
    hand.forEach((cardName) => {
      const card = GAME_CARDS.find(
        (gameCard) => gameCard.variant === cardName
      )!;
      cardCounts[card.variant] = (cardCounts[card.variant] || 0) + 1;
    });

    const counts = Object.values(cardCounts).sort((a, b) => b - a);
    const matchedPattern = ALLOWED_PATTERNS.find((pattern) =>
      pattern.every((count, index) => count <= (counts[index] || 0))
    );

    if (!matchedPattern) return { score: 0, pattern: [] };

    const score = Object.entries(cardCounts).reduce(
      (total, [variant, count]) =>
        total +
        GAME_CARDS.find((gameCard) => gameCard.variant === variant)!.value *
          count,
      0
    );

    return { score, pattern: matchedPattern };
  };

  const playGame = () => {
    const clonedHand = [...userHand];
    userHandTradeIn.forEach((cardIndex: number) => {
      clonedHand[cardIndex] = getRandomCard();
    });

    setUserHand(clonedHand);
    resetUserHandTradeIn();

    const clonedBotHand = [...botHand];
    clonedBotHand[Math.floor(Math.random() * clonedBotHand.length)] =
      getRandomCard();
    setBotHand(clonedBotHand);

    const userResult = evaluateHand(userHand);
    const botResult = evaluateHand(botHand);

    if (userResult.score > botResult.score) {
      updateCoins(userResult.score);
      updatePoolCoins(-userResult.score);
    } else if (botResult.score > userResult.score) {
      updatePoolCoins(0);
    } else {
      updateCoins(poolCoins / 2);
      updatePoolCoins(-poolCoins / 2);
    }
  };

  const startGame = () => {
    setUserHand(drawCards());
    setBotHand(drawCards());
  };

  return { playGame, startGame, evaluateHand, drawCards };
};
