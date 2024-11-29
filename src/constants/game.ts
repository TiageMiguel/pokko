import type { Card } from "@/types/game-types";

import {
  Cloud,
  FlyingSaucer,
  MoonStars,
  Planet,
  Sparkle,
  Sun,
} from "@phosphor-icons/react/dist/ssr";

export const GAME_CARDS: Card[] = [
  {
    variant: "cloud",
    icon: Cloud,
    value: 1,
    chance: 25,
  },
  {
    variant: "moon",
    icon: MoonStars,
    value: 2,
    chance: 20,
  },
  {
    variant: "sun",
    icon: Sun,
    value: 3,
    chance: 20,
  },
  {
    variant: "planet",
    icon: Planet,
    value: 4,
    chance: 15,
  },
  {
    variant: "ship",
    icon: FlyingSaucer,
    value: 5,
    chance: 10,
  },
  {
    variant: "star",
    icon: Sparkle,
    value: 6,
    chance: 5,
  },
];

export const ALLOWED_PATTERNS = [
  [5], // X X X X X
  [4], // X X X X
  [3, 2], // X X X O O
  [3], // X X X
  [2, 2], // X X O O
  [2], // X X
];

export function getRandomCard(): Card {
  const totalWeight = GAME_CARDS.reduce((sum, card) => sum + card.chance, 0);
  const randomValue = Math.random() * totalWeight;

  let cumulativeWeight = 0;
  for (const card of GAME_CARDS) {
    cumulativeWeight += card.chance;
    if (randomValue < cumulativeWeight) {
      return card;
    }
  }

  return GAME_CARDS[0];
}

export function organizeCards(cards: Card[]) {
  return cards.sort((a, b) => a.value - b.value);
}

export function drawHand() {
  let cards = Array.from({ length: 5 }, () => getRandomCard());

  cards = organizeCards(cards);

  return cards;
}
// Assign priorities to ALLOWED_PATTERNS based on difficulty (higher is better).
const PATTERN_PRIORITIES = [
  6, // [5] (e.g., five of a kind)
  5, // [4] (e.g., four of a kind)
  4, // [3, 2] (e.g., full house)
  3, // [3] (e.g., three of a kind)
  2, // [2, 2] (e.g., two pairs)
  1, // [2] (e.g., one pair)
];

// Match `ALLOWED_PATTERNS` with their corresponding priority.
const PATTERN_PRIORITY_MAP = ALLOWED_PATTERNS.map((pattern, index) => ({
  pattern,
  priority: PATTERN_PRIORITIES[index],
}));

export function evaluateHand(hand: Card[]) {
  const cardCounts: Record<string, number> = {};

  // Organize the cards.
  hand = organizeCards(hand);

  // Count the occurrences of each card variant.
  for (const card of hand) {
    cardCounts[card.variant] = (cardCounts[card.variant] || 0) + 1;
  }

  // Extract counts, sorted in descending order.
  const counts = Object.values(cardCounts).sort((a, b) => b - a);

  console.log("Counts:", counts);

  // Find the best matching pattern based on priority.
  let bestMatch = { score: 0, pattern: [] as number[], priority: 0 };
  for (const { pattern, priority } of PATTERN_PRIORITY_MAP) {
    if (
      pattern.every((count, index) => count <= (counts[index] || 0)) &&
      priority > bestMatch.priority
    ) {
      // Calculate score based on card values.
      const score = pattern.reduce((acc, val, index) => {
        const topVariant = Object.keys(cardCounts).sort(
          (a, b) => cardCounts[b] - cardCounts[a]
        )[index];
        const card = GAME_CARDS.find((c) => c.variant === topVariant);
        return acc + (card ? card.value * val : 0);
      }, 0);

      bestMatch = { score, pattern, priority };
    }
  }

  return { score: bestMatch.score, pattern: bestMatch.pattern };
}
